using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YouQuiz.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        public int TriviaGameId { get; set; }
        public int UserProfileId { get; set; }
    }
}