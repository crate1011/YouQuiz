using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YouQuiz.Models;
using YouQuiz.Repositories;

namespace YouQuiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TriviaCardController : ControllerBase
    {
        private readonly ITriviaCardRepository _triviaCardRepository;
        public TriviaCardController(ITriviaCardRepository triviaCardRepository)
        {
            _triviaCardRepository = triviaCardRepository;
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            _triviaCardRepository.DeleteTriviaCard(id);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(TriviaCard triviaCard)
        {
            _triviaCardRepository.AddTriviaCard(triviaCard);
            return CreatedAtAction("Get", new { id = triviaCard.Id }, triviaCard);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, TriviaCard triviaCard)
        {
            if (id != triviaCard.Id)
            {
                return BadRequest();
            }

            _triviaCardRepository.UpdateTriviaCard(triviaCard);
            return NoContent();
        }

        [HttpGet("GetByTriviaGame/{triviaGameId}")]
        public IActionResult GetByTriviaGame(int triviaGameId)
        {
            return Ok(_triviaCardRepository.GetByTriviaGameId(triviaGameId));
        }
    }
}
