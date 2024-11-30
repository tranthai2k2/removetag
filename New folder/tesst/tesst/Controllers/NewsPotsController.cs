using Microsoft.AspNetCore.Mvc;
using tesst.Models;
using tesst.Services;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace tesst.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class NewsPotsController : ControllerBase
    {
        private readonly INewsPostService _newsPostService;

        public NewsPotsController(INewsPostService newsPostService)
        {
            _newsPostService = newsPostService;
        }

        // GET: api/NewsPost
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsPost>>> GetNewsPosts()
        {
            var newsPosts = await _newsPostService.GetAllNewsPostsAsync();
            return Ok(newsPosts);
        }

        // GET: api/NewsPost/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NewsPost>> GetNewsPost(int id)
        {
            var newsPost = await _newsPostService.GetNewsPostByIdAsync(id);

            if (newsPost == null)
            {
                return NotFound();
            }

            return Ok(newsPost);
        }


        // GET: api/NewsPost/tag/{tag}
        [HttpGet("tag/{tag}")]
        public async Task<ActionResult<IEnumerable<NewsPost>>> GetNewsPostsByTag(string tag)
        {
            var newsPosts = await _newsPostService.GetNewsPostsByTagAsync(tag);

            if (newsPosts == null || !newsPosts.Any())
            {
                return NotFound("Không tìm thấy bài viết với tag này.");
            }

            return Ok(newsPosts);
        }

        // GET: api/NewsPost/search/{value}
        [HttpGet("search/{value}")]
        public async Task<ActionResult<IEnumerable<NewsPost>>> Search(string value)
        {
            var newsPosts = await _newsPostService.SearchAsync(value);

            if (newsPosts == null || !newsPosts.Any())
            {
                return NotFound("Không tìm thấy bài viết nào khớp với giá trị tìm kiếm.");
            }

            return Ok(newsPosts);
        }


        // POST: api/NewsPost
        [HttpPost]
        public async Task<ActionResult<NewsPost>> CreateNewsPost(NewsPost newsPost)
        {
            await _newsPostService.CreateNewsPostAsync(newsPost);
            return CreatedAtAction(nameof(GetNewsPost), new { id = newsPost.Id }, newsPost);
        }

        // PUT: api/NewsPost/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNewsPost(int id, NewsPost newsPost)
        {
            var updatedPost = await _newsPostService.UpdateNewsPostAsync(id, newsPost);

            if (updatedPost == null)
            {
                return NotFound();
            }

            return NoContent();
        }


        // GET: api/NewsPost/page/{pageNumber}/{pageSize}
        [HttpGet("page/{pageNumber}/{pageSize}")]
        public async Task<ActionResult<IEnumerable<NewsPost>>> GetNewsPostsByPage(int pageNumber, int pageSize)
        {
            // Kiểm tra các tham số đầu vào hợp lệ
            if (pageNumber <= 0 || pageSize <= 0)
            {
                return BadRequest("Số trang và kích thước trang phải lớn hơn 0.");
            }

            var newsPosts = await _newsPostService.GetNewsPostsByPageAsync(pageNumber, pageSize);

            // Nếu không có bài viết nào, trả về NotFound
            if (newsPosts == null || !newsPosts.Any())
            {
                return NotFound("Không tìm thấy bài viết nào.");
            }

            return Ok(newsPosts);
        }

        // GET: api/NewsPost/liked/{idUser}
        [HttpGet("liked/{idUser}")]
        public async Task<ActionResult<IEnumerable<NewsPost>>> GetLikedPostsByUser(int idUser)
        {
            if (idUser <= 0)
            {
                return BadRequest("ID người dùng không hợp lệ.");
            }

            var likedPosts = await _newsPostService.GetlikeNewsPosts(idUser);

            if (likedPosts == null || !likedPosts.Any())
            {
                return NotFound("Không tìm thấy bài viết nào mà người dùng này đã thích.");
            }

            return Ok(likedPosts);
        }

        // DELETE: api/NewsPost/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNewsPost(int id)
        {
            var result = await _newsPostService.DeleteNewsPostAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
