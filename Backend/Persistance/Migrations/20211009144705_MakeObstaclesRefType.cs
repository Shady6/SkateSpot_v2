using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace SkateSpot.Infrastructure.Migrations
{
    public partial class MakeObstaclesRefType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Spots_Obstacles",
                columns: table => new
                {
                    SpotId = table.Column<Guid>(type: "uuid", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ObstacleType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spots_Obstacles", x => new { x.SpotId, x.Id });
                    table.ForeignKey(
                        name: "FK_Spots_Obstacles_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TempSpots_Obstacles",
                columns: table => new
                {
                    TempSpotId = table.Column<Guid>(type: "uuid", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ObstacleType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TempSpots_Obstacles", x => new { x.TempSpotId, x.Id });
                    table.ForeignKey(
                        name: "FK_TempSpots_Obstacles_TempSpots_TempSpotId",
                        column: x => x.TempSpotId,
                        principalTable: "TempSpots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Spots_Obstacles");

            migrationBuilder.DropTable(
                name: "TempSpots_Obstacles");
        }
    }
}
