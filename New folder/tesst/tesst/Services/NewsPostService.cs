using Npgsql;
using tesst.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace tesst.Services
{
    public class NewsPostService : INewsPostService
    {
        private readonly IConfiguration _configuration;

        public NewsPostService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Lấy tất cả bài viết
        public async Task<IEnumerable<NewsPost>> GetAllNewsPostsAsync()
        {
            var result = new List<NewsPost>();
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT id, title, url, time, content, author, tags FROM news_posts", conn))
                {
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var post = new NewsPost
                            {
                                Id = reader.GetInt32(0),
                                Title = reader.GetString(1),
                                Url = reader.GetString(2),
                                Time = reader.GetDateTime(3),
                                Content = reader.GetString(4),
                                Author = reader.GetString(5),
                                Tags = reader.GetString(6)
                            };
                            result.Add(post);
                        }
                    }
                }
            }
            return result;
        }

        // Lấy bài viết theo ID
        public async Task<NewsPost> GetNewsPostByIdAsync(int id)
        {
            NewsPost post = null;
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("SELECT id, title, url, time, content, author, tags FROM news_posts WHERE id = @Id", conn))
                {
                    cmd.Parameters.AddWithValue("Id", id);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            post = new NewsPost
                            {
                                Id = reader.GetInt32(0),
                                Title = reader.GetString(1),
                                Url = reader.GetString(2),
                                Time = reader.GetDateTime(3),
                                Content = reader.GetString(4),
                                Author = reader.GetString(5),
                                Tags = reader.GetString(6)
                            };
                        }
                    }
                }
            }
            return post;
        }

        // Tạo bài viết mới
        public async Task CreateNewsPostAsync(NewsPost newsPost)
        {
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("INSERT INTO news_posts (title, url, time, content, author, tags) VALUES (@Title, @Url, @Time, @Content, @Author, @Tags) RETURNING id", conn))
                {
                    cmd.Parameters.AddWithValue("Title", newsPost.Title);
                    cmd.Parameters.AddWithValue("Url", newsPost.Url);
                    cmd.Parameters.AddWithValue("Time", newsPost.Time);
                    cmd.Parameters.AddWithValue("Content", newsPost.Content);
                    cmd.Parameters.AddWithValue("Author", newsPost.Author);
                    cmd.Parameters.AddWithValue("Tags", newsPost.Tags);

                    newsPost.Id = (int)await cmd.ExecuteScalarAsync(); // Lấy ID của bài viết mới
                }
            }
        }

        // Cập nhật bài viết
        public async Task<NewsPost> UpdateNewsPostAsync(int id, NewsPost newsPost)
        {
            NewsPost updatedPost = null;
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("UPDATE news_posts SET title = @Title, url = @Url, time = @Time, content = @Content, author = @Author, tags = @Tags WHERE id = @Id", conn))
                {
                    cmd.Parameters.AddWithValue("Id", id);
                    cmd.Parameters.AddWithValue("Title", newsPost.Title);
                    cmd.Parameters.AddWithValue("Url", newsPost.Url);
                    cmd.Parameters.AddWithValue("Time", newsPost.Time);
                    cmd.Parameters.AddWithValue("Content", newsPost.Content);
                    cmd.Parameters.AddWithValue("Author", newsPost.Author);
                    cmd.Parameters.AddWithValue("Tags", newsPost.Tags);

                    var rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected > 0)
                    {
                        updatedPost = newsPost; // Cập nhật thành công
                    }
                }
            }
            return updatedPost;
        }
        // Lấy bài viết theo tag
        public async Task<IEnumerable<NewsPost>> GetNewsPostsByTagAsync(string tag)
        {
            var result = new List<NewsPost>();
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                var query = "SELECT id, title, url, time, content, author, tags FROM news_posts WHERE tags LIKE @Tag";
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("Tag", "%" + tag + "%");

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var post = new NewsPost
                            {
                                Id = reader.GetInt32(0),
                                Title = reader.GetString(1),
                                Url = reader.GetString(2),
                                Time = reader.GetDateTime(3),
                                Content = reader.GetString(4),
                                Author = reader.GetString(5),
                                Tags = reader.GetString(6)
                            };
                            result.Add(post);
                        }
                    }
                }
            }
            return result;
        }
        public async Task<IEnumerable<NewsPost>> SearchAsync(string value)
        {
            var result = new List<NewsPost>();
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                var query = @"
                SELECT id, title, url, time, content, author, tags 
                FROM news_posts 
                WHERE title ILIKE @Value OR content ILIKE @Value OR author ILIKE @Value";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("Value", "%" + value + "%");

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var post = new NewsPost
                            {
                                Id = reader.GetInt32(0),
                                Title = reader.GetString(1),
                                Url = reader.GetString(2),
                                Time = reader.GetDateTime(3),
                                Content = reader.GetString(4),
                                Author = reader.GetString(5),
                                Tags = reader.GetString(6)
                            };
                            result.Add(post);
                        }
                    }
                }
            }
            return result;
        }

        public async Task<IEnumerable<NewsPost>> GetNewsPostsByPageAsync(int pageNumber, int pageSize)
        {
            var result = new List<NewsPost>();
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                // Chỉnh sửa câu truy vấn SQL với LIMIT và OFFSET
                var query = "SELECT id, title, url, time, content, author, tags FROM news_posts LIMIT @pageSize OFFSET @offset";

                // Tính toán OFFSET: (pageNumber - 1) * pageSize
                var offset = (pageNumber - 1) * pageSize;

                // Thực thi câu truy vấn với tham số
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    // Thêm tham số vào câu truy vấn
                    cmd.Parameters.AddWithValue("@pageSize", pageSize);
                    cmd.Parameters.AddWithValue("@offset", offset);

                    // Đọc kết quả
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            // Tạo đối tượng NewsPost từ dữ liệu trả về
                            var newsPost = new NewsPost
                            {
                                Id = reader.GetInt32(0),       // id
                                Title = reader.GetString(1),    // title
                                Url = reader.GetString(2),      // url
                                Time = reader.GetDateTime(3),   // time
                                Content = reader.GetString(4),  // content
                                Author = reader.GetString(5),   // author
                                Tags = reader.GetString(6)      // tags
                            };

                            result.Add(newsPost);
                        }
                    }
                }
            }

            return result;
        }
        public async Task<IEnumerable<NewsPost>> GetlikeNewsPosts(int idUser)
        {
            var result = new List<NewsPost>();
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                // Câu truy vấn SQL lấy các bài viết mà người dùng thích
                var query = @"
            SELECT id, title, url, time, content, author, tags 
            FROM news_posts 
            WHERE id IN (
                SELECT unnest(string_to_array(STRING_AGG(l.id_post::text, ','), ','))::int
                FROM users u
                JOIN like_pots l ON u.id = l.id_user
                WHERE u.id = @idUser
                GROUP BY u.id
            )";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@idUser", idUser);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var post = new NewsPost
                            {
                                Id = reader.GetInt32(0),
                                Title = reader.GetString(1),
                                Url = reader.GetString(2),
                                Time = reader.GetDateTime(3),
                                Content = reader.GetString(4),
                                Author = reader.GetString(5),
                                Tags = reader.GetString(6)
                            };
                            result.Add(post);
                        }
                    }
                }
            }
            return result;
        }

        // Xóa bài viết
        public async Task<bool> DeleteNewsPostAsync(int id)
        {
            var isDeleted = false;
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                using (var cmd = new NpgsqlCommand("DELETE FROM news_posts WHERE id = @Id", conn))
                {
                    cmd.Parameters.AddWithValue("Id", id);

                    var rowsAffected = await cmd.ExecuteNonQueryAsync();
                    isDeleted = rowsAffected > 0;
                }
            }
            return isDeleted;
        }
    }
}
