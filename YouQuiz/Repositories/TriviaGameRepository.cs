using System;
using System.Collections.Generic;
using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using YouQuiz.Models;
using YouQuiz.Utils;
using YouQuiz.Repositories;
using System.Linq;

namespace YouQuiz.Repositories
{
    public class TriviaGameRepository : BaseRepository, ITriviaGameRepository
    {
        public TriviaGameRepository(IConfiguration configuration) : base(configuration)
        {
           
        }

        public List<TriviaGame> GetAllTriviaGames()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT tg.Id, tg.Name, tg.UserProfileId, tg.ImageUrl, c.Id AS CategoryId, c.Name AS CategoryName
                    FROM TriviaGame tg 
                    LEFT JOIN TriviaGameCategory tgc ON tgc.TriviaGameId = tg.Id
                    LEFT JOIN Category c ON tgc.CategoryId = c.Id
                    ORDER BY Name ASC";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var triviaGames = new List<TriviaGame>();
                        while (reader.Read())
                        {
                            var triviaId = DbUtils.GetInt(reader, "Id");

                            var existingTriviaGame = triviaGames.FirstOrDefault(p => p.Id == triviaId);
                            if (existingTriviaGame == null)
                            {
                                existingTriviaGame = new TriviaGame()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    Categories = new List<Category>()
                                };

                                triviaGames.Add(existingTriviaGame);
                            }

                            if (DbUtils.IsNotDbNull(reader, "CategoryId"))
                            {
                                existingTriviaGame.Categories.Add(new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                                });
                            }
                        }

                        return triviaGames;
                    }
                }
            }
        }


        public void AddTriviaGame(TriviaGame triviaGame)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO TriviaGame ( Name, UserProfileId, ImageUrl )
                        OUTPUT INSERTED.ID
                        VALUES ( @Name, @UserProfileId, @ImageUrl )";

                    cmd.Parameters.AddWithValue("@Name", triviaGame.Name);
                    cmd.Parameters.AddWithValue("@UserProfileId", triviaGame.UserProfileId);
                    cmd.Parameters.AddWithValue("@ImageUrl", triviaGame.ImageUrl);

                    triviaGame.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void AddTriviaGameCategory(TriviaGameCategory triviaGameCategory)
        {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        INSERT INTO TriviaGameCategory ( CategoryId, TriviaGameId )
                        OUTPUT INSERTED.ID
                        VALUES ( @CategoryId, @TriviaGameId )";

                        cmd.Parameters.AddWithValue("@CategoryId", triviaGameCategory.CategoryId);
                        cmd.Parameters.AddWithValue("@TriviaGameId", triviaGameCategory.TriviaGameId);

                    triviaGameCategory.Id = (int)cmd.ExecuteScalar();
                    }
                }
        }

        public void DeleteTriviaGame(int triviaGameId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM TriviaGame WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", triviaGameId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateTriviaGame(TriviaGame triviaGame)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE TriviaGame
                           SET Name = @Name,
                               UserProfileId = @UserProfileId,
                               ImageUrl = @ImageUrl
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", triviaGame.Name);
                    DbUtils.AddParameter(cmd, "@UserProfileId", triviaGame.UserProfileId);
                    DbUtils.AddParameter(cmd, "@ImageUrl", triviaGame.ImageUrl);
                    DbUtils.AddParameter(cmd, "@Id", triviaGame.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public TriviaGame GetTriviaGameById(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT tg.Id, tg.Name, tg.UserProfileId, tg.ImageUrl, c.Id AS CategoryId, c.Name AS CategoryName
                        FROM TriviaGame tg 
                        LEFT JOIN TriviaGameCategory tgc ON tgc.TriviaGameId = tg.Id
                        LEFT JOIN Category c ON tgc.CategoryId = c.Id
                        WHERE tg.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", Id);

                    TriviaGame triviaGame = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        triviaGame = new TriviaGame()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            Categories = new List<Category>()
                        };

                        if (DbUtils.IsNotDbNull(reader, "CategoryId"))
                        {
                            triviaGame.Categories.Add(new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = reader.GetString(reader.GetOrdinal("CategoryName"))

                            });
                        };
                    }
                    reader.Close();

                    return triviaGame;
                }
            }
        }

        public List<TriviaGame> GetByCategoryId(int categoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT tg.Id, tg.Name, tg.UserProfileId, tg.ImageUrl, c.Id AS CategoryId, c.Name AS CategoryName, tgc.CategoryId AS tgcId
                        FROM TriviaGame tg 
                        LEFT JOIN TriviaGameCategory tgc ON tgc.TriviaGameId = tg.Id
                        LEFT JOIN Category c ON tgc.CategoryId = c.Id
                        WHERE tgc.CategoryId = @tgcId";

                    DbUtils.AddParameter(cmd, "@tgcId", categoryId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var triviaGames = new List<TriviaGame>();
                        while (reader.Read())
                        {
                            var triviaId = DbUtils.GetInt(reader, "Id");

                            var existingTriviaGame = triviaGames.FirstOrDefault(p => p.Id == triviaId);
                            if (existingTriviaGame == null)
                            {
                                existingTriviaGame = new TriviaGame()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    Categories = new List<Category>()
                                };

                                triviaGames.Add(existingTriviaGame);
                            }

                            if (DbUtils.IsNotDbNull(reader, "CategoryId"))
                            {
                                existingTriviaGame.Categories.Add(new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                                });
                            }
                        }

                        return triviaGames;
                    }
                }
            }
        }

        public List<TriviaGame> GetByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT tg.Id, tg.Name, tg.ImageUrl, tg.UserProfileId, c.Id AS CategoryId, c.Name AS CategoryName
                       FROM TriviaGame tg 
                       LEFT JOIN TriviaGameCategory tgc ON tgc.TriviaGameId = tg.Id
                       LEFT JOIN Category c ON tgc.CategoryId = c.Id
                       WHERE tg.UserProfileId = @UserProfileId";

                    DbUtils.AddParameter(cmd, "@UserProfileId", userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var triviaGames = new List<TriviaGame>();
                        while (reader.Read())
                        {
                            var triviaId = DbUtils.GetInt(reader, "Id");

                            var existingTriviaGame = triviaGames.FirstOrDefault(p => p.Id == triviaId);
                            if (existingTriviaGame == null)
                            {
                                existingTriviaGame = new TriviaGame()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    Categories = new List<Category>()
                                };

                                triviaGames.Add(existingTriviaGame);
                            }

                            if (DbUtils.IsNotDbNull(reader, "CategoryId"))
                            {
                                existingTriviaGame.Categories.Add(new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                                });
                            }
                        }

                        return triviaGames;
                    }
                }
            }
        }
    }
}