using System.Collections.Generic;
using YouQuiz.Models;

namespace YouQuiz.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
    }
}