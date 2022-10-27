using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YouQuiz.Models
{
    public class TriviaGame
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int UserProfileId { get; set; }

        public List<Category> Categories { get; set; }
        public int CategoryId { get; set; }
    }
}