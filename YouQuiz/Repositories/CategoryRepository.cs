using System;
using System.Collections.Generic;
using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using YouQuiz.Models;
using YouQuiz.Utils;
using YouQuiz.Repositories;

namespace YouQuiz.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        private readonly string _connectionString;
        public CategoryRepository(IConfiguration configuration) : base(configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name, ImageUrl FROM Category ORDER BY Name ASC";
                    var reader = cmd.ExecuteReader();
                    List<Category> cat = new List<Category>();

                    while (reader.Read())
                    {
                        cat.Add(new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),

                        });
                    }

                    reader.Close();

                    return cat;
                }
            }
        }
    }
}