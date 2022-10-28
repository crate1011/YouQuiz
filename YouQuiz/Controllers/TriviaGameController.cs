using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using YouQuiz.Models;
using YouQuiz.Repositories;
using YouQuiz.Utils;

namespace YouQuiz.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class TriviaGameController : ControllerBase
    {
        private readonly ITriviaGameRepository _trivRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public TriviaGameController(ITriviaGameRepository trivRepository, IUserProfileRepository userProfileRepository)
        {
            _trivRepository = trivRepository;
            _userProfileRepository = userProfileRepository;
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

        [HttpPost("AddTriviaGameCategory")]
        public IActionResult AddTriviaGameCategory(TriviaGameCategory triviaGameCategory)
        {
            _trivRepository.AddTriviaGameCategory(triviaGameCategory);
            return CreatedAtAction("Get", new { id = triviaGameCategory.Id }, triviaGameCategory);
        }

        [Authorize]
        [HttpGet("GetByUserId")]
        public IActionResult GetByUserId()
        {
            var currentUserProfile = GetCurrentUserProfile();
            var userId = currentUserProfile.Id;
            return Ok(_trivRepository.GetByUserId(userId));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}