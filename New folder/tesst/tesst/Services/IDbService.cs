using System.Collections.Generic;
using System.Threading.Tasks;
using tesst.Models; // Thêm namespace chứa model Data

public interface IDbService
{
    Task<List<Data>> GetData(); // Sử dụng List<Data> thay vì List<string>
    Task AddData(Data data); // Thay đổi kiểu tham số để thêm đối tượng Data
    Task UpdateData(int id, string newValue); // Giữ nguyên
    Task DeleteData(int id); // Giữ nguyên
}
