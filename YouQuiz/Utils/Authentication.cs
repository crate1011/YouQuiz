﻿using System.Security.Claims;
using YouQuiz.Models;
using YouQuiz.Repositories;

namespace YouQuiz.Utils
{
    public class Authentication
    {
        public static UserProfile GetCurrentUserProfile(ClaimsPrincipal User, IUserProfileRepository upr)
        {
            if (User == null) //CheckA
                return null;

            var first = User.FindFirst(ClaimTypes.NameIdentifier);

            if (first == null)  //CheckB
                return null;

            var firebaseUserId = first.Value ?? null;

            if (firebaseUserId == null) //CheckC
                return null;

            return upr.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
