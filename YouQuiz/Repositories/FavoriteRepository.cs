using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using YouQuiz.Models;
using YouQuiz.Utils;

namespace YouQuiz.Repositories
{

    public class FavoriteRepository : BaseRepository, IFavoriteRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }

        public List<Favorite> GetAllFavorites()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, TriviaGameId, UserProfileId FROM Favorites";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var favorites = new List<Favorite>();
                        while (reader.Read())
                        {
                            favorites.Add(new Favorite()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                TriviaGameId = DbUtils.GetInt(reader, "TriviaGameId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                            });
                        }

                        return favorites;
                    }
                }
            }
        }

        public void AddFavorite(Favorite favorite)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Favorites (TriviaGameId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@TriviaGameId, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@TriviaGameId", favorite.TriviaGameId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", favorite.UserProfileId);

                    favorite.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteFavorite(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Favorites WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}