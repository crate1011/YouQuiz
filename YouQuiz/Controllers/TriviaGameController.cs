using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using YouQuiz.Models;
using YouQuiz.Repositories;

namespace YouQuiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TriviaGameController : ControllerBase
    {
        private readonly ITriviaGameRepository _trivRepository;
        public TriviaGameController(ITriviaGameRepository trivRepository)
        {
            _trivRepository = trivRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_trivRepository.GetAllTriviaGames());
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _trivRepository.DeleteTriviaGame(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(TriviaGame triviaGame)
        {
            _trivRepository.AddTriviaGame(triviaGame);
            return CreatedAtAction("Get", new { id = triviaGame.Id }, triviaGame);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, TriviaGame triviaGame)
        {
            if (id != triviaGame.Id)
            {
                return BadRequest();
            }

            _trivRepository.UpdateTriviaGame(triviaGame);
            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var trivGame = _trivRepository.GetTriviaGameById(id);
            if (trivGame == null)
            {
                return NotFound();
            }
            return Ok(trivGame);
        }

        [HttpGet("GetByCategory/{categoryId}")]
        public IActionResult GetByCategory(int categoryId)
        {
            return Ok(_trivRepository.GetByCategoryId(categoryId));
        }
    }
}