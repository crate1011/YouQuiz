using YouQuiz.Models;
using System.Collections.Generic;

namespace YouQuiz.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Delete(int id);
        List<UserProfile> GetAll();
        void Update(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string fireBaseUserId);

        UserProfile GetById(int Id);
    }
}