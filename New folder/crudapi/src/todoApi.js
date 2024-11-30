import axiostodo from './api/axios';

const END_POINT = {
    Data: "Values",
};

// Lấy danh sách công việc
export const getTodoAPI = () => {
    return axiostodo.get(`${END_POINT.Data}`);
};

// Thêm công việc mới
export const addTodoAPI = async (value) => {
    try {
        const response = await axiostodo.post(END_POINT.Data, { value });
        console.log("Full response:", response); // In toàn bộ response để kiểm tra
        return response.data; // Trả về dữ liệu từ response (response.data)
    } catch (error) {
        console.error("Error adding todo:", error); // Xử lý lỗi nếu có
        throw error;
    }
};

// Cập nhật công việc
export const updateTodoAPI = async (id, newValue) => {
    console.log(id, newValue);
    try {
        // Gửi đối tượng có key "value"
        const response = await axiostodo.put(`${END_POINT.Data}/${id}`, { value: newValue }, {
            headers: {
                'Content-Type': 'application/json' // Đảm bảo dữ liệu được gửi đúng kiểu JSON
            }
        });
        return response; // Trả về response, vì API trả về "No Content" (204)
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
    }
};

// Xóa công việc
export const deleteTodoAPI = async (id) => {
    try {
        // Gọi API xóa công việc
        await axiostodo.delete(`${END_POINT.Data}/${id}`);
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
};
