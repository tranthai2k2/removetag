using System.Collections.Generic;
using System.Threading.Tasks;
using Npgsql;
using tesst.Models;
using Microsoft.Extensions.Configuration;

namespace tesst.Services
{
    public class LikePotsService : ILikePotsService
    {
        private readonly string _connectionString;

        public LikePotsService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("PostgreSqlConnection");
        }

        // Get all likes by a user
        public async Task<IEnumerable<LikePots>> GetLikesByUserAsync(int userId)
        {
            var result = new List<LikePots>();

            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                var query = "SELECT id_user, id_post FROM like_pots WHERE id_user = @userId";
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@userId", userId);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var like = new LikePots
                            {
                                IdUser = reader.GetInt32(0),
                                IdPost = reader.GetInt32(1)
                            };
                            result.Add(like);
                        }
                    }
                }
            }

            return result;
        }

        // Get all likes for a specific post
        public async Task<IEnumerable<LikePots>> GetLikesByPostAsync(int postId)
        {
            var result = new List<LikePots>();

            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                var query = "SELECT id_user, id_post FROM like_pots WHERE id_post = @postId";
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@postId", postId);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var like = new LikePots
                            {
                                IdUser = reader.GetInt32(0),
                                IdPost = reader.GetInt32(1)
                            };
                            result.Add(like);
                        }
                    }
                }
            }

            return result;
        }
        // Add a like for a user on a post
        public async Task<bool> AddLikeAsync(int userId, int postId)
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                var query = @"INSERT INTO like_pots (id_user, id_post) 
                      VALUES (@userId, @postId)";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@postId", postId);

                    var result = await cmd.ExecuteNonQueryAsync();
                    return result > 0; // Trả về true nếu có ít nhất một dòng được thêm vào
                }
            }
        }

        // Remove a like for a user from a post
        public async Task<bool> RemoveLikeAsync(int userId, int postId)
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                var query = @"DELETE FROM like_pots WHERE id_user = @userId AND id_post = @postId";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.Parameters.AddWithValue("@postId", postId);

                    var result = await cmd.ExecuteNonQueryAsync();
                    return result > 0; // Trả về true nếu có ít nhất một dòng bị xóa
                }
            }
        }

    }
}
