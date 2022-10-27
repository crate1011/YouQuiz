using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YouQuiz.Models
{
    public class TriviaGameCategory
    {
        public int Id { get; set; }

        public int TriviaGameId { get; set; }

        public int CategoryId { get; set; }
    }
}