using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuyTogether.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddGroupBuyingFeature : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Deals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    OriginalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GroupPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MinBuyers = table.Column<int>(type: "int", nullable: false),
                    MaxBuyers = table.Column<int>(type: "int", nullable: true),
                    ExpiryDurationHours = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DealGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DealId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CurrentCount = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DealGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DealGroups_Deals_DealId",
                        column: x => x.DealId,
                        principalTable: "Deals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DealGroupMembers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DealGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    JoinedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DealGroupMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DealGroupMembers_DealGroups_DealGroupId",
                        column: x => x.DealGroupId,
                        principalTable: "DealGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DealGroupMembers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DealGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DealId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_DealGroups_DealGroupId",
                        column: x => x.DealGroupId,
                        principalTable: "DealGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Deals_DealId",
                        column: x => x.DealId,
                        principalTable: "Deals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DealGroupMembers_DealGroupId_UserId",
                table: "DealGroupMembers",
                columns: new[] { "DealGroupId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DealGroupMembers_UserId",
                table: "DealGroupMembers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DealGroups_DealId",
                table: "DealGroups",
                column: "DealId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DealGroupId",
                table: "Orders",
                column: "DealGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DealId",
                table: "Orders",
                column: "DealId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DealGroupMembers");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "DealGroups");

            migrationBuilder.DropTable(
                name: "Deals");
        }
    }
}
