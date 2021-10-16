using Microsoft.EntityFrameworkCore.Migrations;

namespace SkateSpot.Infrastructure.Migrations
{
    public partial class AddIsPositiveToLike : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Positive",
                table: "Likes",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Positive",
                table: "Likes");
        }
    }
}
