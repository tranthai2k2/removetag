using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using tesst.Models; // Thêm namespace chứa model Data

namespace tesst.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IDbService _dbService;

        // Khởi tạo DbService thông qua DI
        public ValuesController(IDbService dbService)
        {
            _dbService = dbService;
        }

        // GET: api/Values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Data>>> Get()
        {
            var values = await _dbService.GetData();
            if (values == null || values.Count == 0)
            {
                return NotFound("No values found"); // Trả về lỗi nếu không có dữ liệu
            }

            return Ok(values); // Trả về danh sách các giá trị từ cơ sở dữ liệu
        }

        // GET api/Values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Data>> Get(int id)
        {
            var values = await _dbService.GetData();
            var value = values.FirstOrDefault(v => v.Id == id); // Tìm giá trị theo Id

            if (value == null)
            {
                return NotFound("Value not found"); // Trả về lỗi nếu không tìm thấy giá trị
            }

            return Ok(value); // Trả về giá trị tại chỉ mục tương ứng
        }

        // POST api/Values
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Data data)
        {
            if (data == null || string.IsNullOrEmpty(data.Value))
            {
                return BadRequest("Value cannot be empty"); // Trả về lỗi nếu giá trị rỗng
            }

            await _dbService.AddData(data); // Thêm dữ liệu vào cơ sở dữ liệu

            return CreatedAtAction(nameof(Get), new { id = data.Id }, data); // Trả về mã trạng thái 201 với dữ liệu đã thêm
        }

        // PUT api/Values/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Data data)
        {
            if (id <= 0 || data == null || string.IsNullOrEmpty(data.Value))
            {
                return BadRequest("Invalid data or value"); // Trả về lỗi nếu dữ liệu không hợp lệ
            }

            var existingData = await _dbService.GetData();
            var value = existingData.FirstOrDefault(v => v.Id == id);
            if (value == null)
            {
                return NotFound("Value not found"); // Trả về lỗi nếu không tìm thấy giá trị
            }

            await _dbService.UpdateData(id, data.Value); // Cập nhật dữ liệu trong cơ sở dữ liệu
            return NoContent(); // Trả về mã trạng thái 204 (No Content)
        }

        // DELETE api/Values/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var values = await _dbService.GetData();
            var value = values.FirstOrDefault(v => v.Id == id);
            if (value == null)
            {
                return NotFound("Value not found"); // Trả về lỗi nếu không tìm thấy giá trị
            }

            await _dbService.DeleteData(id); // Xóa dữ liệu khỏi cơ sở dữ liệu
            return NoContent(); // Trả về mã trạng thái 204 (No Content)
        }
    }
}
