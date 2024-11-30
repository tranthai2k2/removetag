using System.Collections.Generic;
using System.Threading.Tasks;
using tesst.Models;

namespace tesst.Services
{
    public interface ILikePotsService
    {
        Task<IEnumerable<LikePots>> GetLikesByUserAsync(int userId); // Get all likes by a user
        Task<IEnumerable<LikePots>> GetLikesByPostAsync(int postId); // Get all likes for a specific post
        Task<bool> AddLikeAsync(int userId, int postId); // Add a like for a user on a post
        Task<bool> RemoveLikeAsync(int userId, int postId); // Remove a like for a user from a post
    }
}
