using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YouQuiz.Models
{
	public class Category
	{
		public int Id { get; set; }

		public string Name { get; set; }

        public string ImageUrl { get; set; }

    }
}