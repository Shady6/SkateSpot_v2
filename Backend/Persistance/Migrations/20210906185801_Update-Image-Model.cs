using Microsoft.EntityFrameworkCore.Migrations;

namespace SkateSpot.Infrastructure.Migrations
{
    public partial class UpdateImageModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Obstacles_Bank",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Downhill",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Flatground",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Kicker",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Ledge",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Manualpad",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Quater",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Rail",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Skatepark",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Stairs",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Bank",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Downhill",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Flatground",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Kicker",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Ledge",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Manualpad",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Quater",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Rail",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Skatepark",
                table: "Spots");

            migrationBuilder.DropColumn(
                name: "Obstacles_Stairs",
                table: "Spots");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "TempSpots_Images",
                newName: "Base64");

            migrationBuilder.RenameColumn(
                name: "Url",
                table: "SpotImagesVerifications_ImagesToBeVerified",
                newName: "Base64");

            migrationBuilder.RenameColumn(
                name: "Image_Url",
                table: "SpotImage",
                newName: "Image_Base64");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Base64",
                table: "TempSpots_Images",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "Base64",
                table: "SpotImagesVerifications_ImagesToBeVerified",
                newName: "Url");

            migrationBuilder.RenameColumn(
                name: "Image_Base64",
                table: "SpotImage",
                newName: "Image_Url");

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Bank",
                table: "TempSpots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Downhill",
                table: "TempSpots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Flatground",
                table: "TempSpots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Kicker",
                table: "TempSpots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Ledge",
                table: "TempSpots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Manualpad",
                table: "TempSpots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Quater",
                table: "TempSpots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Rail",
                table: "TempSpots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Skatepark",
                table: "TempSpots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Stairs",
                table: "TempSpots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Bank",
                table: "Spots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Downhill",
                table: "Spots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Flatground",
                table: "Spots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Kicker",
                table: "Spots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Ledge",
                table: "Spots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Manualpad",
                table: "Spots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Quater",
                table: "Spots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Rail",
                table: "Spots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Skatepark",
                table: "Spots",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Obstacles_Stairs",
                table: "Spots",
                type: "boolean",
                nullable: true);
        }
    }
}
