using System.Collections.Generic;
using YouQuiz.Models;

namespace YouQuiz.Repositories
{
    public interface ITriviaGameRepository
    {
        void AddTriviaGame(TriviaGame triviaGame);
        void DeleteTriviaGame(int triviaGameId);
        List<TriviaGame> GetAllTriviaGames();
        void UpdateTriviaGame(TriviaGame triviaGame);
        TriviaGame GetTriviaGameById(int Id);
        List<TriviaGame> GetByCategoryId(int categoryId);
        void AddTriviaGameCategory(TriviaGameCategory triviaGameCategory);
        List<TriviaGame> GetByUserId(int userId);
    }
}