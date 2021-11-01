using Microsoft.EntityFrameworkCore.Migrations;

namespace SkateSpot.Infrastructure.Migrations
{
    public partial class ChangeSpotVideoUrlToPlatformTypeAndEmbedId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "SpotVideos",
                newName: "EmbedId");

            migrationBuilder.AddColumn<int>(
                name: "PlatformType",
                table: "SpotVideos",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlatformType",
                table: "SpotVideos");

            migrationBuilder.RenameColumn(
                name: "EmbedId",
                table: "SpotVideos",
                newName: "Url");
        }
    }
}
