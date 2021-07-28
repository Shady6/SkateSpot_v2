using Microsoft.EntityFrameworkCore.Migrations;

namespace SkateSpot.Infrastructure.Migrations
{
    public partial class Renameaddresscolumnsaddonenew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address_Street",
                table: "TempSpots",
                newName: "Address_StreetNumber");

            migrationBuilder.RenameColumn(
                name: "Address_PostalCode",
                table: "TempSpots",
                newName: "Address_StreetName");

            migrationBuilder.RenameColumn(
                name: "Address_Street",
                table: "Spots",
                newName: "Address_StreetNumber");

            migrationBuilder.RenameColumn(
                name: "Address_PostalCode",
                table: "Spots",
                newName: "Address_StreetName");

            migrationBuilder.AddColumn<string>(
                name: "Address_PostCode",
                table: "TempSpots",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_PostCode",
                table: "Spots",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_PostCode",
                table: "TempSpots");

            migrationBuilder.DropColumn(
                name: "Address_PostCode",
                table: "Spots");

            migrationBuilder.RenameColumn(
                name: "Address_StreetNumber",
                table: "TempSpots",
                newName: "Address_Street");

            migrationBuilder.RenameColumn(
                name: "Address_StreetName",
                table: "TempSpots",
                newName: "Address_PostalCode");

            migrationBuilder.RenameColumn(
                name: "Address_StreetNumber",
                table: "Spots",
                newName: "Address_Street");

            migrationBuilder.RenameColumn(
                name: "Address_StreetName",
                table: "Spots",
                newName: "Address_PostalCode");
        }
    }
}
