using Npgsql;
using tesst.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace tesst.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;

        // Khởi tạo với IConfiguration để lấy connection string
        public UserService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Lấy tất cả người dùng từ bảng "users"
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            var result = new List<User>(); // Danh sách chứa người dùng
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                // Truy vấn lấy tất cả người dùng từ bảng "users"
                using (var cmd = new NpgsqlCommand("SELECT id, email, name, password FROM users", conn))
                {
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new User
                            {
                                Id = reader.GetInt32(0),       // Lấy Id
                                Email = reader.GetString(1),    // Lấy Email
                                Name = reader.GetString(2),     // Lấy Name
                                Password = reader.GetString(3)  // Lấy Password
                            };
                            result.Add(user); // Thêm vào danh sách người dùng
                        }
                    }
                }
            }
            return result;
        }

        // Lấy người dùng theo ID
        public async Task<User> GetUserByIdAsync(int id)
        {
            User user = null;
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                // Truy vấn lấy người dùng theo ID
                using (var cmd = new NpgsqlCommand("SELECT id, email, name, password FROM users WHERE id = @Id", conn))
                {
                    cmd.Parameters.AddWithValue("Id", id);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            user = new User
                            {
                                Id = reader.GetInt32(0),        // Lấy Id
                                Email = reader.GetString(1),     // Lấy Email
                                Name = reader.GetString(2),      // Lấy Name
                                Password = reader.GetString(3)   // Lấy Password
                            };
                        }
                    }
                }
            }
            return user;
        }

        // Tạo người dùng mới
        public async Task CreateUserAsync(User user)
        {
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                // Thêm người dùng vào bảng "users"
                using (var cmd = new NpgsqlCommand("INSERT INTO users (email, name, password) VALUES (@Email, @Name, @Password) RETURNING id", conn))
                {
                    cmd.Parameters.AddWithValue("Email", user.Email);
                    cmd.Parameters.AddWithValue("Name", user.Name);
                    cmd.Parameters.AddWithValue("Password", user.Password); // Lưu mật khẩu thô (nên mã hóa mật khẩu trước khi lưu)

                    // Trả về ID của người dùng mới
                    user.Id = (int)await cmd.ExecuteScalarAsync();  // Lấy ID trả về sau khi tạo
                }
            }
        }

        // Cập nhật người dùng
        public async Task<User> UpdateUserAsync(int id, User user)
        {
            User updatedUser = null;
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                // Cập nhật thông tin người dùng
                using (var cmd = new NpgsqlCommand("UPDATE users SET email = @Email, name = @Name, password = @Password WHERE id = @Id", conn))
                {
                    cmd.Parameters.AddWithValue("Id", id);
                    cmd.Parameters.AddWithValue("Email", user.Email);
                    cmd.Parameters.AddWithValue("Name", user.Name);
                    cmd.Parameters.AddWithValue("Password", user.Password);

                    var rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected > 0)
                    {
                        updatedUser = user; // Cập nhật thành công
                    }
                }
            }
            return updatedUser;
        }

        // Xóa người dùng
        public async Task<bool> DeleteUserAsync(int id)
        {
            var isDeleted = false;
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                // Xóa người dùng theo ID
                using (var cmd = new NpgsqlCommand("DELETE FROM users WHERE id = @Id", conn))
                {
                    cmd.Parameters.AddWithValue("Id", id);

                    var rowsAffected = await cmd.ExecuteNonQueryAsync();
                    isDeleted = rowsAffected > 0;
                }
            }
            return isDeleted;
        }

        // Đăng nhập và trả về ID người dùng
        public async Task<int> AuthenticateUserAsync(string email, string password)
        {
            int userId = -1;
            var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

            using (var conn = new NpgsqlConnection(connectionString))
            {
                await conn.OpenAsync();

                // Kiểm tra đăng nhập
                using (var cmd = new NpgsqlCommand("SELECT id FROM users WHERE email = @Email AND password = @Password", conn))
                {
                    cmd.Parameters.AddWithValue("Email", email);
                    cmd.Parameters.AddWithValue("Password", password);  // Mật khẩu cần được mã hóa

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            userId = reader.GetInt32(0); // Trả về ID người dùng
                        }
                    }
                }
            }
            return userId;
        }
    }
}
