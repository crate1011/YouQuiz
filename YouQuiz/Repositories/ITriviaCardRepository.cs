using System.Collections.Generic;
using YouQuiz.Models;

namespace YouQuiz.Repositories
{
    public interface ITriviaCardRepository
    {
        void AddTriviaCard(TriviaCard triviaCard);
        void DeleteTriviaCard(int id);
        List<TriviaCard> GetByTriviaGameId(int trivaGameId);
        void UpdateTriviaCard(TriviaCard triviaCard);
        TriviaCard GetCardById(int Id);
    }
}