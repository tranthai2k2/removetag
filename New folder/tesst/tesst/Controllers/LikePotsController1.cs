using Microsoft.AspNetCore.Mvc;
using tesst.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using tesst.Models;

namespace tesst.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikePotsController : ControllerBase
    {
        private readonly ILikePotsService _likePotsService;

        public LikePotsController(ILikePotsService likePotsService)
        {
            _likePotsService = likePotsService;
        }

        // GET: api/LikePots/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<LikePots>>> GetLikesByUser(int userId)
        {
            var likes = await _likePotsService.GetLikesByUserAsync(userId);
            return Ok(likes);
        }

        // GET: api/LikePots/ByPost/5
        [HttpGet("ByPost/{postId}")]
        public async Task<ActionResult<IEnumerable<LikePots>>> GetLikesByPost(int postId)
        {
            var likes = await _likePotsService.GetLikesByPostAsync(postId);
            return Ok(likes);
        }

        // POST: api/LikePots
        [HttpPost]
        public async Task<ActionResult> AddLike([FromBody] LikePots like)
        {
            var success = await _likePotsService.AddLikeAsync(like.IdUser, like.IdPost);
            if (success)
                return CreatedAtAction(nameof(GetLikesByUser), new { userId = like.IdUser }, like);
            return BadRequest("Failed to add like.");
        }

        // DELETE: api/LikePots/5/10
        [HttpDelete("{userId}/{postId}")]
        public async Task<ActionResult> RemoveLike(int userId, int postId)
        {
            var success = await _likePotsService.RemoveLikeAsync(userId, postId);
            if (success)
                return NoContent();
            return NotFound("Like not found.");
        }
    }
}
