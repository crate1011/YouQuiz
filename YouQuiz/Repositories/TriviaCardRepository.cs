using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using YouQuiz.Models;
using YouQuiz.Utils;

namespace YouQuiz.Repositories
{

    public class TriviaCardRepository : BaseRepository, ITriviaCardRepository
    {
        public TriviaCardRepository(IConfiguration configuration) : base(configuration) { }

        public List<TriviaCard> GetByTriviaGameId(int triviaGameId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT tc.Id AS TcId, tc.Question, tc.WrongAnswerOne, tc.WrongAnswerTwo, tc.WrongAnswerThree, tc.Answer, tc.TriviaGameId, tg.Id AS TriviaGameId
                        FROM TriviaCard tc
                        LEFT JOIN TriviaGame tg ON tc.TriviaGameId = tg.Id
                        WHERE tc.TriviaGameId = @TriviaGameId";

                    DbUtils.AddParameter(cmd, "@TriviaGameId", triviaGameId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var triviaCards = new List<TriviaCard>();
                        while (reader.Read())
                        {
                            var triviaId = DbUtils.GetInt(reader, "TcId");

                            var existingTriviaCard = triviaCards.FirstOrDefault(p => p.Id == triviaId);
                            if (existingTriviaCard == null)
                            {
                                existingTriviaCard = new TriviaCard()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("TcId")),
                                    Question = reader.GetString(reader.GetOrdinal("Question")),
                                    WrongAnswerOne = reader.GetString(reader.GetOrdinal("WrongAnswerOne")),
                                    WrongAnswerTwo = reader.GetString(reader.GetOrdinal("WrongAnswerTwo")),
                                    WrongAnswerThree = reader.GetString(reader.GetOrdinal("WrongAnswerThree")),
                                    Answer = reader.GetString(reader.GetOrdinal("Answer")),
                                    TriviaGameId = reader.GetInt32(reader.GetOrdinal("TriviaGameId")),
                                };

                                triviaCards.Add(existingTriviaCard);
                            }

                        }

                        return triviaCards;
                    }
                }
            }
        }

        public void AddTriviaCard(TriviaCard triviaCard)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO TriviaCard (Question, WrongAnswerOne, WrongAnswerTwo, WrongAnswerThree, Answer, TriviaGameId)
                        OUTPUT INSERTED.ID
                        VALUES (@Question, @WrongAnswerOne, @WrongAnswerTwo, @WrongAnswerThree, @Answer, @TriviaGameId)";

                    DbUtils.AddParameter(cmd, "@Question", triviaCard.Question);
                    DbUtils.AddParameter(cmd, "@WrongAnswerOne", triviaCard.WrongAnswerOne);
                    DbUtils.AddParameter(cmd, "@WrongAnswerTwo", triviaCard.WrongAnswerTwo);
                    DbUtils.AddParameter(cmd, "@WrongAnswerThree", triviaCard.WrongAnswerThree);
                    DbUtils.AddParameter(cmd, "@Answer", triviaCard.Answer);
                    DbUtils.AddParameter(cmd, "@TriviaGameId", triviaCard.TriviaGameId);

                    triviaCard.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateTriviaCard(TriviaCard triviaCard)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE TriviaCard
                           SET Question = @Question,
                               WrongAnswerOne = @WrongAnswerOne,
                               WrongAnswerTwo = @WrongAnswerTwo,
                               WrongAnswerThree = @WrongAnswerThree,
                               Answer = @Answer,
                               TriviaGameId = @TriviaGameId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Question", triviaCard.Question);
                    DbUtils.AddParameter(cmd, "@WrongAnswerOne", triviaCard.WrongAnswerOne);
                    DbUtils.AddParameter(cmd, "@WrongAnswerTwo", triviaCard.WrongAnswerTwo);
                    DbUtils.AddParameter(cmd, "@WrongAnswerThree", triviaCard.WrongAnswerThree);
                    DbUtils.AddParameter(cmd, "@Id", triviaCard.Id);
                    DbUtils.AddParameter(cmd, "@Answer", triviaCard.Answer);
                    DbUtils.AddParameter(cmd, "@TriviaGameId", triviaCard.TriviaGameId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public TriviaCard GetCardById(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Question, WrongAnswerOne, WrongAnswerTwo, WrongAnswerThree, Answer, TriviaGameId
                          FROM TriviaCard
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", Id);

                    TriviaCard triviaCard = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        triviaCard = new TriviaCard()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Question = DbUtils.GetString(reader, "Question"),
                            WrongAnswerOne = DbUtils.GetString(reader, "WrongAnswerOne"),
                            WrongAnswerTwo = DbUtils.GetString(reader, "WrongAnswerTwo"),
                            WrongAnswerThree = DbUtils.GetString(reader, "WrongAnswerThree"),
                            Answer = DbUtils.GetString(reader, "Answer"),
                            TriviaGameId = DbUtils.GetInt(reader, "TriviaGameId"),
                        };
                    }
                    reader.Close();

                    return triviaCard;
                }
            }
        }

        public void DeleteTriviaCard(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM TriviaCard WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}