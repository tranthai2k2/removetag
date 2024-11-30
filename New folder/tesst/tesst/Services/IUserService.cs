using tesst.Models;
using System.Threading.Tasks;

namespace tesst.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();                // Lấy tất cả người dùng
        Task<User> GetUserByIdAsync(int id);                        // Lấy người dùng theo ID
        Task CreateUserAsync(User user);                            // Tạo người dùng mới
        Task<User> UpdateUserAsync(int id, User user);              // Cập nhật người dùng
        Task<bool> DeleteUserAsync(int id);                         // Xóa người dùng
        Task<int> AuthenticateUserAsync(string email, string password); // Đăng nhập và trả về ID người dùng
    }
}
