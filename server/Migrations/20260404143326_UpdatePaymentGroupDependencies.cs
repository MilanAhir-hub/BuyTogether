using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuyTogether.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePaymentGroupDependencies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Groups_GroupId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_GroupId_UserId",
                table: "Payments");

            migrationBuilder.AlterColumn<Guid>(
                name: "GroupId",
                table: "Payments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "DealGroupId",
                table: "Payments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_DealGroupId",
                table: "Payments",
                column: "DealGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_GroupId_UserId",
                table: "Payments",
                columns: new[] { "GroupId", "UserId" },
                unique: true,
                filter: "[GroupId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_DealGroups_DealGroupId",
                table: "Payments",
                column: "DealGroupId",
                principalTable: "DealGroups",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Groups_GroupId",
                table: "Payments",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_DealGroups_DealGroupId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Groups_GroupId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_DealGroupId",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_GroupId_UserId",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "DealGroupId",
                table: "Payments");

            migrationBuilder.AlterColumn<Guid>(
                name: "GroupId",
                table: "Payments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_GroupId_UserId",
                table: "Payments",
                columns: new[] { "GroupId", "UserId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Groups_GroupId",
                table: "Payments",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
