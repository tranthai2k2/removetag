import axios from "axios";

// Khởi tạo instance axios với cấu hình baseURL và timeout
const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    timeout: 10000,
});

// Thêm interceptor cho request để có thể gắn thêm token vào header nếu cần thiết
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Thêm interceptor cho response để xử lý các phản hồi
instance.interceptors.response.use(
    response => {
        // Xử lý phản hồi thành công
        return response.data; // Trả về dữ liệu từ response
    },
    error => {
        if (error.response) {
            // Xử lý lỗi phản hồi từ server
            console.error("Server responded with an error:", error.response.status);
            if (error.response.status === 401) {
                // Nếu lỗi là 401 (Unauthorized), có thể logout hoặc làm mới token tại đây
                console.warn("Token hết hạn hoặc không hợp lệ.");
                // Ví dụ: gọi hàm logout hoặc refresh token
            }
        } else if (error.request) {
            // Xử lý lỗi từ phía client khi không nhận được phản hồi
            console.error("No response received:", error.request);
        } else {
            // Xử lý lỗi khác
            console.error("Error setting up the request:", error.message);
        }
        return Promise.reject(error);
    }
);

// Các phương thức API mẫu
export const getData = (endpoint) => {
    return instance.get(endpoint);
};

export const postData = (endpoint, data) => {
    return instance.post(endpoint, data);
};

export default instance;
