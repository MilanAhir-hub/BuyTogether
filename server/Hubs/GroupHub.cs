using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace BuyTogether.Server.Hubs
{
    public class GroupHub : Hub
    {
        // Called when a user opens the deal detail page.
        public async Task JoinDealGroup(string dealId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, dealId);
        }

        public async Task LeaveDealGroup(string dealId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, dealId);
        }

        // Broadcast to clients listening to a specific deal
        public async Task BroadcastGroupUpdated(string dealId, int newCount, string status)
        {
            // E.g., tells frontend: "A new user joined, count is now X"
            await Clients.Group(dealId).SendAsync("GroupUpdated", new { dealId, newCount, status });
        }

        public async Task BroadcastGroupActivated(string dealId)
        {
            // Alerts members: "Deal is locked in!"
            await Clients.Group(dealId).SendAsync("GroupActivated", new { dealId });
        }

        public async Task BroadcastGroupExpired(string dealId)
        {
            await Clients.Group(dealId).SendAsync("GroupExpired", new { dealId });
        }
    }
}
