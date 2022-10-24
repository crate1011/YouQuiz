using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YouQuiz.Models
{
    public class TriviaCard
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string WrongAnswerOne { get; set; }
        public string WrongAnswerTwo { get; set; }
        public string WrongAnswerThree { get; set; }
        public string Answer { get; set; }
        public int TriviaGameId { get; set; }
    }
}