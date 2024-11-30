using tesst.Models;

public interface INewsPostService
{
    Task<IEnumerable<NewsPost>> GetAllNewsPostsAsync();
    Task<NewsPost> GetNewsPostByIdAsync(int id);
    Task CreateNewsPostAsync(NewsPost newsPost);
    Task<NewsPost> UpdateNewsPostAsync(int id, NewsPost newsPost);
    Task<bool> DeleteNewsPostAsync(int id);
    Task<IEnumerable<NewsPost>> GetNewsPostsByTagAsync(string tag);

    // test all search
    Task<IEnumerable<NewsPost>> SearchAsync(string value);
    // phan trang so tep va bỏ qua
    Task<IEnumerable<NewsPost>> GetNewsPostsByPageAsync(int pageNumber, int pageSize);
    Task<IEnumerable<NewsPost>> GetlikeNewsPosts(int idUser);

}
