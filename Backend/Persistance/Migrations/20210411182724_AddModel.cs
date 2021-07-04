using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace SkateSpot.Infrastructure.Migrations
{
    public partial class AddModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: true),
                    UserName = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Spots",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Address_Street = table.Column<string>(type: "text", nullable: true),
                    Address_PostalCode = table.Column<string>(type: "text", nullable: true),
                    Address_City = table.Column<string>(type: "text", nullable: true),
                    Address_Country = table.Column<string>(type: "text", nullable: true),
                    Address_Latitude = table.Column<string>(type: "text", nullable: true),
                    Address_Longitude = table.Column<string>(type: "text", nullable: true),
                    SurfaceScore = table.Column<byte>(type: "smallint", nullable: false),
                    Obstacles_Ledge = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Stairs = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Quater = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Kicker = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Downhill = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Rail = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Bank = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Flatground = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Manualpad = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Skatepark = table.Column<bool>(type: "boolean", nullable: true),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EditedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Spots_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "TempSpots",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Address_Street = table.Column<string>(type: "text", nullable: true),
                    Address_PostalCode = table.Column<string>(type: "text", nullable: true),
                    Address_City = table.Column<string>(type: "text", nullable: true),
                    Address_Country = table.Column<string>(type: "text", nullable: true),
                    Address_Latitude = table.Column<string>(type: "text", nullable: true),
                    Address_Longitude = table.Column<string>(type: "text", nullable: true),
                    SurfaceScore = table.Column<byte>(type: "smallint", nullable: false),
                    Obstacles_Ledge = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Stairs = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Quater = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Kicker = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Downhill = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Rail = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Bank = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Flatground = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Manualpad = table.Column<bool>(type: "boolean", nullable: true),
                    Obstacles_Skatepark = table.Column<bool>(type: "boolean", nullable: true),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TempSpots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TempSpots_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "HistoricalVerificationProcesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    SpotId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
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
                name: "SpotImage",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Image_Link = table.Column<string>(type: "text", nullable: true),
                    SpotId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpotImage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpotImage_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SpotImagesVerifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SpotId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpotImagesVerifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpotImagesVerifications_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SpotVideos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: false),
                    SpotId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EditedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpotVideos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpotVideos_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_SpotVideos_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TempSpots_Images",
                columns: table => new
                {
                    TempSpotId = table.Column<Guid>(type: "uuid", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Link = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TempSpots_Images", x => new { x.TempSpotId, x.Id });
                    table.ForeignKey(
                        name: "FK_TempSpots_Images_TempSpots_TempSpotId",
                        column: x => x.TempSpotId,
                        principalTable: "TempSpots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HistoricalComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    Text = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    EditedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    HistoricalVerificatinProcessId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
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
                    IsReal = table.Column<bool>(type: "boolean", nullable: false),
                    HistoricalVerificationProcessId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "SpotImagesVerifications_ImagesToBeVerified",
                columns: table => new
                {
                    SpotImagesVerificationId = table.Column<Guid>(type: "uuid", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Link = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpotImagesVerifications_ImagesToBeVerified", x => new { x.SpotImagesVerificationId, x.Id });
                    table.ForeignKey(
                        name: "FK_SpotImagesVerifications_ImagesToBeVerified_SpotImagesVerifi~",
                        column: x => x.SpotImagesVerificationId,
                        principalTable: "SpotImagesVerifications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VerificationProcesses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    IsVerified = table.Column<bool>(type: "boolean", nullable: false),
                    SpotImagesVerificationId = table.Column<Guid>(type: "uuid", nullable: true),
                    TempSpotId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VerificationProcesses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VerificationProcesses_SpotImagesVerifications_SpotImagesVer~",
                        column: x => x.SpotImagesVerificationId,
                        principalTable: "SpotImagesVerifications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VerificationProcesses_TempSpots_TempSpotId",
                        column: x => x.TempSpotId,
                        principalTable: "TempSpots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    Text = table.Column<string>(type: "text", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    SubjectType = table.Column<int>(type: "integer", nullable: false),
                    SpotId = table.Column<Guid>(type: "uuid", nullable: true),
                    SpotVideoId = table.Column<Guid>(type: "uuid", nullable: true),
                    VerificationProcessId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EditedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_SpotVideos_SpotVideoId",
                        column: x => x.SpotVideoId,
                        principalTable: "SpotVideos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Comments_VerificationProcesses_VerificationProcessId",
                        column: x => x.VerificationProcessId,
                        principalTable: "VerificationProcesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VerificationStatements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    VoterId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsReal = table.Column<bool>(type: "boolean", nullable: false),
                    VerificationProcessId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VerificationStatements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VerificationStatements_Users_VoterId",
                        column: x => x.VoterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_VerificationStatements_VerificationProcesses_VerificationPr~",
                        column: x => x.VerificationProcessId,
                        principalTable: "VerificationProcesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GiverId = table.Column<Guid>(type: "uuid", nullable: false),
                    SubjectType = table.Column<int>(type: "integer", nullable: false),
                    CommentId = table.Column<Guid>(type: "uuid", nullable: true),
                    HistoricalCommentId = table.Column<Guid>(type: "uuid", nullable: true),
                    SpotId = table.Column<Guid>(type: "uuid", nullable: true),
                    SpotVideoId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Likes_Comments_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Likes_HistoricalComments_HistoricalCommentId",
                        column: x => x.HistoricalCommentId,
                        principalTable: "HistoricalComments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Likes_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Likes_SpotVideos_SpotVideoId",
                        column: x => x.SpotVideoId,
                        principalTable: "SpotVideos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Likes_Users_GiverId",
                        column: x => x.GiverId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AuthorId",
                table: "Comments",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_SpotId",
                table: "Comments",
                column: "SpotId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_SpotVideoId",
                table: "Comments",
                column: "SpotVideoId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_VerificationProcessId",
                table: "Comments",
                column: "VerificationProcessId");

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

            migrationBuilder.CreateIndex(
                name: "IX_Likes_CommentId",
                table: "Likes",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_GiverId",
                table: "Likes",
                column: "GiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_HistoricalCommentId",
                table: "Likes",
                column: "HistoricalCommentId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_SpotId",
                table: "Likes",
                column: "SpotId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_SpotVideoId",
                table: "Likes",
                column: "SpotVideoId");

            migrationBuilder.CreateIndex(
                name: "IX_SpotImage_SpotId",
                table: "SpotImage",
                column: "SpotId");

            migrationBuilder.CreateIndex(
                name: "IX_SpotImagesVerifications_SpotId",
                table: "SpotImagesVerifications",
                column: "SpotId");

            migrationBuilder.CreateIndex(
                name: "IX_Spots_AuthorId",
                table: "Spots",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_SpotVideos_AuthorId",
                table: "SpotVideos",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_SpotVideos_SpotId",
                table: "SpotVideos",
                column: "SpotId");

            migrationBuilder.CreateIndex(
                name: "IX_TempSpots_AuthorId",
                table: "TempSpots",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_VerificationProcesses_SpotImagesVerificationId",
                table: "VerificationProcesses",
                column: "SpotImagesVerificationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VerificationProcesses_TempSpotId",
                table: "VerificationProcesses",
                column: "TempSpotId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VerificationStatements_VerificationProcessId",
                table: "VerificationStatements",
                column: "VerificationProcessId");

            migrationBuilder.CreateIndex(
                name: "IX_VerificationStatements_VoterId",
                table: "VerificationStatements",
                column: "VoterId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HistoricalVerificationStatements");

            migrationBuilder.DropTable(
                name: "Likes");

            migrationBuilder.DropTable(
                name: "SpotImage");

            migrationBuilder.DropTable(
                name: "SpotImagesVerifications_ImagesToBeVerified");

            migrationBuilder.DropTable(
                name: "TempSpots_Images");

            migrationBuilder.DropTable(
                name: "VerificationStatements");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "HistoricalComments");

            migrationBuilder.DropTable(
                name: "SpotVideos");

            migrationBuilder.DropTable(
                name: "VerificationProcesses");

            migrationBuilder.DropTable(
                name: "HistoricalVerificationProcesses");

            migrationBuilder.DropTable(
                name: "SpotImagesVerifications");

            migrationBuilder.DropTable(
                name: "TempSpots");

            migrationBuilder.DropTable(
                name: "Spots");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
