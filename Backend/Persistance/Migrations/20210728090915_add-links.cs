using Microsoft.EntityFrameworkCore.Migrations;

namespace SkateSpot.Infrastructure.Migrations
{
    public partial class addlinks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Link",
                table: "TempSpots_Images",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "Link",
                table: "SpotImagesVerifications_ImagesToBeVerified",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "Image_Link",
                table: "SpotImage",
                newName: "Image_Url");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "TempSpots_Images",
                newName: "Link");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "SpotImagesVerifications_ImagesToBeVerified",
                newName: "Link");

            migrationBuilder.RenameColumn(
                name: "Image_Url",
                table: "SpotImage",
                newName: "Image_Link");
        }
    }
}
