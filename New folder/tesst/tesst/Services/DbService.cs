using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Collections.Generic;
using System.Threading.Tasks;
using tesst.Models; // Thêm namespace chứa model Data

public class DbService : IDbService
{
    private readonly IConfiguration _configuration;

    public DbService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<Data>> GetData()
    {
        var result = new List<Data>();
        var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");

        using (var conn = new NpgsqlConnection(connectionString))
        {
            await conn.OpenAsync();
            // Lấy cả Id và Value từ bảng
            using (var cmd = new NpgsqlCommand("SELECT id, column_name FROM mytable", conn))
            using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    // Tạo đối tượng Data và thêm vào danh sách
                    var dataItem = new Data
                    {
                        Id = reader.GetInt32(0), // Lấy dữ liệu từ cột Id
                        Value = reader.GetString(1) // Lấy dữ liệu từ cột Value
                    };
                    result.Add(dataItem);
                }
            }
        }

        return result;
    }

    public async Task AddData(Data data)
    {
        var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");
        using (var conn = new NpgsqlConnection(connectionString))
        {
            await conn.OpenAsync();
            // Thêm đối tượng Data vào cơ sở dữ liệu
            using (var cmd = new NpgsqlCommand("INSERT INTO mytable (column_name) VALUES (@value)", conn))
            {
                cmd.Parameters.AddWithValue("value", data.Value);
                await cmd.ExecuteNonQueryAsync();
            }
        }
    }

    public async Task UpdateData(int id, string newValue)
    {
        var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");
        using (var conn = new NpgsqlConnection(connectionString))
        {
            await conn.OpenAsync();
            using (var cmd = new NpgsqlCommand("UPDATE mytable SET column_name = @value WHERE id = @id", conn))
            {
                cmd.Parameters.AddWithValue("value", newValue);
                cmd.Parameters.AddWithValue("id", id);
                await cmd.ExecuteNonQueryAsync();
            }
        }
    }

    public async Task DeleteData(int id)
    {
        var connectionString = _configuration.GetConnectionString("PostgreSqlConnection");
        using (var conn = new NpgsqlConnection(connectionString))
        {
            await conn.OpenAsync();
            using (var cmd = new NpgsqlCommand("DELETE FROM mytable WHERE id = @id", conn))
            {
                cmd.Parameters.AddWithValue("id", id);
                await cmd.ExecuteNonQueryAsync();
            }
        }
    }
}
