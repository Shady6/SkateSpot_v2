using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkateSpot.Infrastructure.Migrations
{
    public partial class RemoveHistoricalTypeEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_HistoricalComments_HistoricalCommentId",
                table: "Likes");

            migrationBuilder.DropForeignKey(
                name: "FK_SpotImage_Spots_SpotId",
                table: "SpotImage");

            migrationBuilder.DropTable(
                name: "HistoricalComments");

            migrationBuilder.DropTable(
                name: "HistoricalVerificationStatements");

            migrationBuilder.DropTable(
                name: "HistoricalVerificationProcesses");

            migrationBuilder.DropIndex(
                name: "IX_Likes_HistoricalCommentId",
                table: "Likes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SpotImage",
                table: "SpotImage");

            migrationBuilder.DropColumn(
                name: "HistoricalCommentId",
                table: "Likes");

            migrationBuilder.RenameTable(
                name: "SpotImage",
                newName: "SpotImages");

            migrationBuilder.RenameIndex(
                name: "IX_SpotImage_SpotId",
                table: "SpotImages",
                newName: "IX_SpotImages_SpotId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SpotImages",
                table: "SpotImages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SpotImages_Spots_SpotId",
                table: "SpotImages",
                column: "SpotId",
                principalTable: "Spots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SpotImages_Spots_SpotId",
                table: "SpotImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SpotImages",
                table: "SpotImages");

            migrationBuilder.RenameTable(
                name: "SpotImages",
                newName: "SpotImage");

            migrationBuilder.RenameIndex(
                name: "IX_SpotImages_SpotId",
                table: "SpotImage",
                newName: "IX_SpotImage_SpotId");

            migrationBuilder.AddColumn<Guid>(
                name: "HistoricalCommentId",
                table: "Likes",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SpotImage",
                table: "SpotImage",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "HistoricalVerificationProcesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    SpotId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoricalVerificationProcesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoricalVerificationProcesses_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HistoricalComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EditedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    HistoricalVerificatinProcessId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoricalComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoricalComments_HistoricalVerificationProcesses_Historic~",
                        column: x => x.HistoricalVerificatinProcessId,
                        principalTable: "HistoricalVerificationProcesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HistoricalComments_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "HistoricalVerificationStatements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    VoterId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    HistoricalVerificationProcessId = table.Column<Guid>(type: "uuid", nullable: true),
                    IsReal = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoricalVerificationStatements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoricalVerificationStatements_HistoricalVerificationProc~",
                        column: x => x.HistoricalVerificationProcessId,
                        principalTable: "HistoricalVerificationProcesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HistoricalVerificationStatements_Users_VoterId",
                        column: x => x.VoterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_HistoricalCommentId",
                table: "Likes",
                column: "HistoricalCommentId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoricalComments_AuthorId",
                table: "HistoricalComments",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoricalComments_HistoricalVerificatinProcessId",
                table: "HistoricalComments",
                column: "HistoricalVerificatinProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoricalVerificationProcesses_SpotId",
                table: "HistoricalVerificationProcesses",
                column: "SpotId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_HistoricalVerificationStatements_HistoricalVerificationProc~",
                table: "HistoricalVerificationStatements",
                column: "HistoricalVerificationProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoricalVerificationStatements_VoterId",
                table: "HistoricalVerificationStatements",
                column: "VoterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_HistoricalComments_HistoricalCommentId",
                table: "Likes",
                column: "HistoricalCommentId",
                principalTable: "HistoricalComments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SpotImage_Spots_SpotId",
                table: "SpotImage",
                column: "SpotId",
                principalTable: "Spots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
