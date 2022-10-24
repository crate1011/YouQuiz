using System.Collections.Generic;
using YouQuiz.Models;

namespace YouQuiz.Repositories
{
    public interface IFavoriteRepository
    {
        void AddFavorite(Favorite favorite);
        void DeleteFavorite(int id);
        List<Favorite> GetAllFavorites();
    }
}