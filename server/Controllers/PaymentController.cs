// PAYMENT CONTROLLER (RAZORPAY): Handles secure online payments using the Razorpay gateway for joining deals and properties.
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Razorpay.Api;
using BuyTogether.Server.Data;
using BuyTogether.Server.Constants;
using BuyTogether.Server.Models;
using BuyTogether.Server.Interfaces;
using Microsoft.AspNetCore.SignalR;
using BuyTogether.Server.Hubs;

namespace BuyTogether.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PaymentController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IDealGroupService _dealGroupService;
        private readonly IHubContext<GroupHub> _hubContext;
        private readonly string _keyId;
        private readonly string _keySecret;

        public PaymentController(AppDbContext context, IConfiguration configuration, IDealGroupService dealGroupService, IHubContext<GroupHub> hubContext)
        {
            _context = context;
            _configuration = configuration;
            _dealGroupService = dealGroupService;
            _hubContext = hubContext;
            _keyId = _configuration["Razorpay:KeyId"] ?? throw new ArgumentNullException("Razorpay:KeyId is missing");
            _keySecret = _configuration["Razorpay:KeySecret"] ?? throw new ArgumentNullException("Razorpay:KeySecret is missing");
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            {
                return Unauthorized(new { success = false, message = "Invalid token." });
            }

            // Fixed commitment fee
            decimal amount = 500.00m;
            int amountInPaise = (int)(amount * 100);

            try
            {
                RazorpayClient client = new RazorpayClient(_keyId, _keySecret);
                Dictionary<string, object> options = new Dictionary<string, object>
                {
                    { "amount", amountInPaise },
                    { "currency", "INR" },
                    { "receipt", $"receipt_{Guid.NewGuid().ToString().Substring(0, 8)}" },
                    { "payment_capture", 1 }
                };

                Razorpay.Api.Order order = client.Order.Create(options);
                string orderId = order["id"].ToString();

                var payment = new BuyTogether.Server.Models.Payment
                {
                    UserId = userId,
                    DealGroupId = null, // Set to null because group is joined AFTER verify
                    Amount = amount,
                    PaymentStatus = PaymentStatuses.Pending,
                    RazorpayOrderId = orderId
                };

                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    key = _keyId, // Pass public key to frontend
                    orderId = orderId,
                    amount = amountInPaise,
                    paymentId = payment.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpPost("verify")]
        public async Task<IActionResult> VerifyPayment([FromBody] VerifyPaymentRequest request)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            {
                return Unauthorized(new { success = false, message = "Invalid token." });
            }

            try
            {
                // Verify signature
                string payload = request.RazorpayOrderId + "|" + request.RazorpayPaymentId;
                string generatedSignature = ComputeSha256Hash(payload, _keySecret);

                if (generatedSignature != request.RazorpaySignature)
                {
                    return BadRequest(new { success = false, message = "Invalid payment signature." });
                }

                // Find payment record
                var payment = await _context.Payments.FirstOrDefaultAsync(p => p.RazorpayOrderId == request.RazorpayOrderId);
                if (payment == null)
                {
                    return NotFound(new { success = false, message = "Payment record not found." });
                }

                payment.RazorpayPaymentId = request.RazorpayPaymentId;
                payment.RazorpaySignature = request.RazorpaySignature;
                payment.PaymentStatus = PaymentStatuses.Paid;
                payment.UpdatedAt = DateTime.UtcNow;

                // Process the actual join now that payment is confirmed
                var joinResult = await _dealGroupService.JoinDealAsync(userId, request.DealId);

                if (!joinResult.Success || joinResult.Group == null)
                {
                    // Payment succeeded but joining failed somehow
                    await _context.SaveChangesAsync();
                    return BadRequest(new { success = false, message = "Payment successful, but failed to join deal: " + joinResult.Message });
                }

                // Update the payment record with the confirmed group
                payment.DealGroupId = joinResult.Group.Id;

                // Sync the DealGroupMember status to reflect Payment confirmation
                var member = await _context.DealGroupMembers.FirstOrDefaultAsync(m => m.UserId == userId && m.DealGroupId == payment.DealGroupId);
                if (member != null)
                {
                    member.PaymentId = payment.Id;
                    member.Status = "Active";
                }

                await _context.SaveChangesAsync();

                // SignalR broadcast for the newly joined group
                await _hubContext.Clients.Group(request.DealId.ToString())
                   .SendAsync("GroupUpdated", new { dealId = request.DealId, newCount = joinResult.Group.CurrentCount, status = joinResult.Group.Status });

                if (joinResult.Group.Status == "active")
                {
                    await _hubContext.Clients.Group(request.DealId.ToString())
                       .SendAsync("GroupActivated", new { dealId = request.DealId });
                }

                return Ok(new { success = true, message = "Payment verified and joined successfully.", data = joinResult.Group });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpPost("property/create-order")]
        public async Task<IActionResult> CreatePropertyOrder([FromBody] CreatePropertyOrderRequest request)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            {
                return Unauthorized(new { success = false, message = "Invalid token." });
            }

            var property = await _context.Properties.FindAsync(request.PropertyId);
            if (property == null || property.Status != PropertyStatuses.Available)
            {
                return BadRequest(new { success = false, message = "Property is not available." });
            }

            decimal amount = 500.00m;
            int amountInPaise = (int)(amount * 100);

            try
            {
                RazorpayClient client = new RazorpayClient(_keyId, _keySecret);
                Dictionary<string, object> options = new Dictionary<string, object>
                {
                    { "amount", amountInPaise },
                    { "currency", "INR" },
                    { "receipt", $"receipt_prop_{Guid.NewGuid().ToString().Substring(0, 8)}" },
                    { "payment_capture", 1 }
                };

                Razorpay.Api.Order order = client.Order.Create(options);
                string orderId = order["id"].ToString();

                var payment = new BuyTogether.Server.Models.Payment
                {
                    UserId = userId,
                    GroupId = null, // Set null initially, updated after verification calls JoinPropertyGroupAsync
                    Amount = amount,
                    PaymentStatus = PaymentStatuses.Pending,
                    RazorpayOrderId = orderId
                };

                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    success = true,
                    key = _keyId,
                    orderId = orderId,
                    amount = amountInPaise,
                    paymentId = payment.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpPost("property/verify")]
        public async Task<IActionResult> VerifyPropertyPayment([FromServices] IBuyerDealService buyerDealService, [FromBody] VerifyPropertyPaymentRequest request)
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            {
                return Unauthorized(new { success = false, message = "Invalid token." });
            }

            try
            {
                // Verify signature
                string payload = request.RazorpayOrderId + "|" + request.RazorpayPaymentId;
                string generatedSignature = ComputeSha256Hash(payload, _keySecret);

                if (generatedSignature != request.RazorpaySignature)
                {
                    return BadRequest(new { success = false, message = "Invalid payment signature." });
                }

                // Find payment record
                var payment = await _context.Payments.FirstOrDefaultAsync(p => p.RazorpayOrderId == request.RazorpayOrderId);
                if (payment == null)
                {
                    return NotFound(new { success = false, message = "Payment record not found." });
                }

                payment.RazorpayPaymentId = request.RazorpayPaymentId;
                payment.RazorpaySignature = request.RazorpaySignature;
                payment.PaymentStatus = PaymentStatuses.Paid;
                payment.UpdatedAt = DateTime.UtcNow;

                // Process property group join
                var groupDetail = await buyerDealService.JoinPropertyGroupAsync(request.PropertyId, userId);

                // Update payment record to link with new/active Group
                payment.GroupId = groupDetail.GroupId;
                await _context.SaveChangesAsync();

                return Ok(new { success = true, message = "Payment verified and Property Group joined successfully.", data = groupDetail });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        private static string ComputeSha256Hash(string rawData, string key)
        {
            using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(key)))
            {
                byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }
    }

    public class CreateOrderRequest
    {
        public Guid DealId { get; set; }
    }

    public class VerifyPaymentRequest
    {
        public string RazorpayOrderId { get; set; } = string.Empty;
        public string RazorpayPaymentId { get; set; } = string.Empty;
        public string RazorpaySignature { get; set; } = string.Empty;
        public Guid DealId { get; set; }
    }

    public class CreatePropertyOrderRequest
    {
        public Guid PropertyId { get; set; }
    }

    public class VerifyPropertyPaymentRequest
    {
        public string RazorpayOrderId { get; set; } = string.Empty;
        public string RazorpayPaymentId { get; set; } = string.Empty;
        public string RazorpaySignature { get; set; } = string.Empty;
        public Guid PropertyId { get; set; }
    }
}
