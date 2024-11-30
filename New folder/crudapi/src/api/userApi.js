import axiosTodo from './axios';

const END_POINT = {
    User: "User",
};

// Tạo người dùng mới (đăng ký)
export const registerUser = async (userData) => {
    try {
        const response = await axiosTodo.post(END_POINT.User, userData);
        return response.data; // Trả về dữ liệu của người dùng mới tạo
    } catch (error) {
        console.error("Error in registering user: ", error);
        throw error;
    }
};

// Đăng nhập người dùng
export const loginUser = async (email, password) => {
    try {
        const response = await axiosTodo.post(`${END_POINT.User}/login`, { email, password });
        
        console.log("Response from API:", response); // Xem toàn bộ dữ liệu phản hồi
        return response; // Trả về id người dùng nếu đăng nhập thành công
    } catch (error) {
        console.error("Error in login user: ", error);
        throw error;
    }
};

// Lấy tất cả người dùng
export const getAllUsers = async () => {
    try {
        const response = await axiosTodo.get(END_POINT.User);
        return response.data; // Trả về danh sách người dùng
    } catch (error) {
        console.error("Error in fetching all users: ", error);
        throw error;
    }
};

// Lấy người dùng theo ID
export const getUserById = async (id) => {
    try {
        const response = await axiosTodo.get(`${END_POINT.User}/${id}`);
        return response.data; // Trả về thông tin người dùng theo id
    } catch (error) {
        console.error("Error in fetching user by ID: ", error);
        throw error;
    }
};

// Cập nhật thông tin người dùng
export const updateUser = async (id, userData) => {
    try {
        const response = await axiosTodo.put(`${END_POINT.User}/${id}`, userData);
        return response.data; // Trả về thông tin người dùng đã được cập nhật
    } catch (error) {
        console.error("Error in updating user: ", error);
        throw error;
    }
};

// Xóa người dùng
export const deleteUser = async (id) => {
    try {
        const response = await axiosTodo.delete(`${END_POINT.User}/${id}`);
        return response.status === 204; // Nếu xóa thành công, trả về true
    } catch (error) {
        console.error("Error in deleting user: ", error);
        throw error;
    }
};
