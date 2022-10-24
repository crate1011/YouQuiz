using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YouQuiz.Models;
using YouQuiz.Repositories;

namespace YouQuiz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoriteRepository _favRepository;
        public FavoritesController(IFavoriteRepository favRepository)
        {
            _favRepository = favRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_favRepository.GetAllFavorites());
        }

        [HttpPost]
        public IActionResult Post(Favorite favorite)
        {
            _favRepository.AddFavorite(favorite);
            return CreatedAtAction("Get", new { id = favorite.Id }, favorite);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _favRepository.DeleteFavorite(id);
            return NoContent();
        }
    }
}
