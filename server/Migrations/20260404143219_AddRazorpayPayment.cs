using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuyTogether.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddRazorpayPayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TransactionId",
                table: "Payments",
                newName: "RazorpayPaymentId");

            migrationBuilder.AddColumn<string>(
                name: "RazorpayOrderId",
                table: "Payments",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RazorpaySignature",
                table: "Payments",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PaymentId",
                table: "DealGroupMembers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "DealGroupMembers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RazorpayOrderId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "RazorpaySignature",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "PaymentId",
                table: "DealGroupMembers");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "DealGroupMembers");

            migrationBuilder.RenameColumn(
                name: "RazorpayPaymentId",
                table: "Payments",
                newName: "TransactionId");
        }
    }
}
