﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SkateSpot.Infrastructure.DbContexts;

namespace SkateSpot.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20210411182724_AddModel")]
    partial class AddModel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("SkateSpot.Domain.Models.Comment", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AuthorId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EditedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<Guid?>("SpotId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("SpotVideoId")
                        .HasColumnType("uuid");

                    b.Property<int>("SubjectType")
                        .HasColumnType("integer");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.Property<Guid?>("VerificationProcessId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("SpotId");

                    b.HasIndex("SpotVideoId");

                    b.HasIndex("VerificationProcessId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.HistoricalComment", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AuthorId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EditedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid?>("HistoricalVerificatinProcessId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("boolean");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("HistoricalVerificatinProcessId");

                    b.ToTable("HistoricalComments");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.HistoricalVerificationProcess", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid?>("SpotId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("SpotId")
                        .IsUnique();

                    b.ToTable("HistoricalVerificationProcesses");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.HistoricalVerificationStatement", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid?>("HistoricalVerificationProcessId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsReal")
                        .HasColumnType("boolean");

                    b.Property<Guid>("VoterId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("HistoricalVerificationProcessId");

                    b.HasIndex("VoterId");

                    b.ToTable("HistoricalVerificationStatements");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.Like", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("CommentId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("GiverId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("HistoricalCommentId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("SpotId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("SpotVideoId")
                        .HasColumnType("uuid");

                    b.Property<int>("SubjectType")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CommentId");

                    b.HasIndex("GiverId");

                    b.HasIndex("HistoricalCommentId");

                    b.HasIndex("SpotId");

                    b.HasIndex("SpotVideoId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.Spot", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AuthorId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime>("EditedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<byte>("SurfaceScore")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("Spots");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.SpotImage", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid?>("SpotId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("SpotId");

                    b.ToTable("SpotImage");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.SpotImagesVerification", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid?>("SpotId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("SpotId");

                    b.ToTable("SpotImagesVerifications");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.SpotVideo", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<Guid>("AuthorId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EditedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid?>("SpotId")
                        .HasColumnType("uuid");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("SpotId");

                    b.ToTable("SpotVideos");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.TempSpot", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AuthorId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<byte>("SurfaceScore")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.ToTable("TempSpots");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.VerificationProcess", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("boolean");

                    b.Property<Guid?>("SpotImagesVerificationId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("TempSpotId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("SpotImagesVerificationId")
                        .IsUnique();

                    b.HasIndex("TempSpotId")
                        .IsUnique();

                    b.ToTable("VerificationProcesses");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.VerificationStatement", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsReal")
                        .HasColumnType("boolean");

                    b.Property<Guid?>("VerificationProcessId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("VoterId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("VerificationProcessId");

                    b.HasIndex("VoterId");

                    b.ToTable("VerificationStatements");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.Comment", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.User", "Author")
                        .WithMany("PostedComments")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("SkateSpot.Domain.Models.Spot", null)
                        .WithMany("Comments")
                        .HasForeignKey("SpotId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkateSpot.Domain.Models.SpotVideo", null)
                        .WithMany("Comments")
                        .HasForeignKey("SpotVideoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkateSpot.Domain.Models.VerificationProcess", null)
                        .WithMany("Discussion")
                        .HasForeignKey("VerificationProcessId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Author");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.HistoricalComment", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.User", "Author")
                        .WithMany("SuccessfulSpotsVerificationsComments")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("SkateSpot.Domain.Models.HistoricalVerificationProcess", null)
                        .WithMany("Discussion")
                        .HasForeignKey("HistoricalVerificatinProcessId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Author");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.HistoricalVerificationProcess", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.Spot", null)
                        .WithOne("VerificationHistory")
                        .HasForeignKey("SkateSpot.Domain.Models.HistoricalVerificationProcess", "SpotId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.HistoricalVerificationStatement", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.HistoricalVerificationProcess", null)
                        .WithMany("Votes")
                        .HasForeignKey("HistoricalVerificationProcessId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkateSpot.Domain.Models.User", "Voter")
                        .WithMany("SuccessfulSpotsVerifications")
                        .HasForeignKey("VoterId")
                        .OnDelete(DeleteBehavior.SetNull)
                        .IsRequired();

                    b.Navigation("Voter");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.Like", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.Comment", null)
                        .WithMany("Likes")
                        .HasForeignKey("CommentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkateSpot.Domain.Models.User", "Giver")
                        .WithMany("GivenLikes")
                        .HasForeignKey("GiverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SkateSpot.Domain.Models.HistoricalComment", null)
                        .WithMany("Likes")
                        .HasForeignKey("HistoricalCommentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkateSpot.Domain.Models.Spot", null)
                        .WithMany("Likes")
                        .HasForeignKey("SpotId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkateSpot.Domain.Models.SpotVideo", null)
                        .WithMany("Likes")
                        .HasForeignKey("SpotVideoId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Giver");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.Spot", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.User", "Author")
                        .WithMany("AddedSpots")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.OwnsOne("SkateSpot.Domain.Models.Address", "Address", b1 =>
                        {
                            b1.Property<Guid>("SpotId")
                                .HasColumnType("uuid");

                            b1.Property<string>("City")
                                .HasColumnType("text");

                            b1.Property<string>("Country")
                                .HasColumnType("text");

                            b1.Property<string>("Latitude")
                                .HasColumnType("text");

                            b1.Property<string>("Longitude")
                                .HasColumnType("text");

                            b1.Property<string>("PostalCode")
                                .HasColumnType("text");

                            b1.Property<string>("Street")
                                .HasColumnType("text");

                            b1.HasKey("SpotId");

                            b1.ToTable("Spots");

                            b1.WithOwner()
                                .HasForeignKey("SpotId");
                        });

                    b.OwnsOne("SkateSpot.Domain.Models.Obstacles", "Obstacles", b1 =>
                        {
                            b1.Property<Guid>("SpotId")
                                .HasColumnType("uuid");

                            b1.Property<bool>("Bank")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Downhill")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Flatground")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Kicker")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Ledge")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Manualpad")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Quater")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Rail")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Skatepark")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Stairs")
                                .HasColumnType("boolean");

                            b1.HasKey("SpotId");

                            b1.ToTable("Spots");

                            b1.WithOwner()
                                .HasForeignKey("SpotId");
                        });

                    b.Navigation("Address");

                    b.Navigation("Author");

                    b.Navigation("Obstacles");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.SpotImage", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.Spot", "Spot")
                        .WithMany("Images")
                        .HasForeignKey("SpotId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.OwnsOne("SkateSpot.Domain.Models.Image", "Image", b1 =>
                        {
                            b1.Property<Guid>("SpotImageId")
                                .HasColumnType("uuid");

                            b1.Property<string>("Link")
                                .HasColumnType("text");

                            b1.HasKey("SpotImageId");

                            b1.ToTable("SpotImage");

                            b1.WithOwner()
                                .HasForeignKey("SpotImageId");
                        });

                    b.Navigation("Image");

                    b.Navigation("Spot");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.SpotImagesVerification", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.Spot", "Spot")
                        .WithMany("ImagesVerifications")
                        .HasForeignKey("SpotId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.OwnsMany("SkateSpot.Domain.Models.Image", "ImagesToBeVerified", b1 =>
                        {
                            b1.Property<Guid>("SpotImagesVerificationId")
                                .HasColumnType("uuid");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("integer")
                                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                            b1.Property<string>("Link")
                                .HasColumnType("text");

                            b1.HasKey("SpotImagesVerificationId", "Id");

                            b1.ToTable("SpotImagesVerifications_ImagesToBeVerified");

                            b1.WithOwner()
                                .HasForeignKey("SpotImagesVerificationId");
                        });

                    b.Navigation("ImagesToBeVerified");

                    b.Navigation("Spot");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.SpotVideo", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.User", "Author")
                        .WithMany("AddedVideos")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SkateSpot.Domain.Models.Spot", "Spot")
                        .WithMany("Videos")
                        .HasForeignKey("SpotId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Author");

                    b.Navigation("Spot");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.TempSpot", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.User", "Author")
                        .WithMany("CurrentAddedTempSpots")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.OwnsOne("SkateSpot.Domain.Models.Address", "Address", b1 =>
                        {
                            b1.Property<Guid>("TempSpotId")
                                .HasColumnType("uuid");

                            b1.Property<string>("City")
                                .HasColumnType("text");

                            b1.Property<string>("Country")
                                .HasColumnType("text");

                            b1.Property<string>("Latitude")
                                .HasColumnType("text");

                            b1.Property<string>("Longitude")
                                .HasColumnType("text");

                            b1.Property<string>("PostalCode")
                                .HasColumnType("text");

                            b1.Property<string>("Street")
                                .HasColumnType("text");

                            b1.HasKey("TempSpotId");

                            b1.ToTable("TempSpots");

                            b1.WithOwner()
                                .HasForeignKey("TempSpotId");
                        });

                    b.OwnsMany("SkateSpot.Domain.Models.Image", "Images", b1 =>
                        {
                            b1.Property<Guid>("TempSpotId")
                                .HasColumnType("uuid");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("integer")
                                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                            b1.Property<string>("Link")
                                .HasColumnType("text");

                            b1.HasKey("TempSpotId", "Id");

                            b1.ToTable("TempSpots_Images");

                            b1.WithOwner()
                                .HasForeignKey("TempSpotId");
                        });

                    b.OwnsOne("SkateSpot.Domain.Models.Obstacles", "Obstacles", b1 =>
                        {
                            b1.Property<Guid>("TempSpotId")
                                .HasColumnType("uuid");

                            b1.Property<bool>("Bank")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Downhill")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Flatground")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Kicker")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Ledge")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Manualpad")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Quater")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Rail")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Skatepark")
                                .HasColumnType("boolean");

                            b1.Property<bool>("Stairs")
                                .HasColumnType("boolean");

                            b1.HasKey("TempSpotId");

                            b1.ToTable("TempSpots");

                            b1.WithOwner()
                                .HasForeignKey("TempSpotId");
                        });

                    b.Navigation("Address");

                    b.Navigation("Author");

                    b.Navigation("Images");

                    b.Navigation("Obstacles");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.VerificationProcess", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.SpotImagesVerification", null)
                        .WithOne("VerificationProcess")
                        .HasForeignKey("SkateSpot.Domain.Models.VerificationProcess", "SpotImagesVerificationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkateSpot.Domain.Models.TempSpot", null)
                        .WithOne("VerificationProcess")
                        .HasForeignKey("SkateSpot.Domain.Models.VerificationProcess", "TempSpotId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.VerificationStatement", b =>
                {
                    b.HasOne("SkateSpot.Domain.Models.VerificationProcess", null)
                        .WithMany("Votes")
                        .HasForeignKey("VerificationProcessId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("SkateSpot.Domain.Models.User", "Voter")
                        .WithMany("CurrentSpotsVerifications")
                        .HasForeignKey("VoterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Voter");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.Comment", b =>
                {
                    b.Navigation("Likes");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.HistoricalComment", b =>
                {
                    b.Navigation("Likes");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.HistoricalVerificationProcess", b =>
                {
                    b.Navigation("Discussion");

                    b.Navigation("Votes");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.Spot", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Images");

                    b.Navigation("ImagesVerifications");

                    b.Navigation("Likes");

                    b.Navigation("VerificationHistory");

                    b.Navigation("Videos");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.SpotImagesVerification", b =>
                {
                    b.Navigation("VerificationProcess");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.SpotVideo", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Likes");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.TempSpot", b =>
                {
                    b.Navigation("VerificationProcess");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.User", b =>
                {
                    b.Navigation("AddedSpots");

                    b.Navigation("AddedVideos");

                    b.Navigation("CurrentAddedTempSpots");

                    b.Navigation("CurrentSpotsVerifications");

                    b.Navigation("GivenLikes");

                    b.Navigation("PostedComments");

                    b.Navigation("SuccessfulSpotsVerifications");

                    b.Navigation("SuccessfulSpotsVerificationsComments");
                });

            modelBuilder.Entity("SkateSpot.Domain.Models.VerificationProcess", b =>
                {
                    b.Navigation("Discussion");

                    b.Navigation("Votes");
                });
#pragma warning restore 612, 618
        }
    }
}
