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

        public List<Category> Category { get; set; }
    }
}