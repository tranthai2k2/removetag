import axiosTodo from './axios';

const END_POINT = {
    NewsPost: "NewsPots",
};
//https://localhost:7078/api/NewsPots

// Tạo bài viết tin tức mới
export const createNewsPost = async (newsPostData) => {
    try {
        const response = await axiosTodo.post(END_POINT.NewsPost, newsPostData);
        return response.data; // Trả về dữ liệu bài viết tin tức mới tạo
    } catch (error) {
        console.error("Error in creating news post: ", error);
        throw error;
    }
};

// Lấy tất cả bài viết tin tức
export const getAllNewsPosts = async () => {
    try {
        const response = await axiosTodo.get(END_POINT.NewsPost);
        console.log(response);
        return response; // Trả về danh sách bài viết tin tức
        
    } catch (error) {
        console.error("Error in fetching all news posts: ", error);
        throw error;
    }
};

// Lấy bài viết tin tức theo ID
export const getNewsPostById = async (id) => {
    try {
        const response = await axiosTodo.get(`${END_POINT.NewsPost}/${id}`);
        return response.data; // Trả về thông tin bài viết tin tức theo id
    } catch (error) {
        console.error("Error in fetching news post by ID: ", error);
        throw error;
    }
};

// Cập nhật bài viết tin tức
export const updateNewsPost = async (id, newsPostData) => {
    try {
        const response = await axiosTodo.put(`${END_POINT.NewsPost}/${id}`, newsPostData);
        return response.data; // Trả về thông tin bài viết tin tức đã được cập nhật
    } catch (error) {
        console.error("Error in updating news post: ", error);
        throw error;
    }
};

// Xóa bài viết tin tức
export const deleteNewsPost = async (id) => {
    try {
        const response = await axiosTodo.delete(`${END_POINT.NewsPost}/${id}`);
        return response.status === 204; // Nếu xóa thành công, trả về true
    } catch (error) {
        console.error("Error in deleting news post: ", error);
        throw error;
    }
};
// tìm theo tag 
export const getNewsPostsByTag = async (tags) => {
    // Format tags: Thêm dấu cách sau mỗi dấu phẩy
    const formattedTags = formatTagsWithSpace(tags);
    const encodedTags = encodeURIComponent(formattedTags);  // Mã hóa chuỗi tags đã có dấu cách
    const apiUrl = `${END_POINT.NewsPost}/tag/${encodedTags}`;
    
    console.log("API URL:", apiUrl); // Log URL để kiểm tra nếu mã hóa đúng

    try {
        const response = await axiosTodo.get(apiUrl);
        console.log("API Response:", response); // Log để kiểm tra dữ liệu trả về từ API
        return response; // Trả về dữ liệu từ API mà không cần thêm .data
    } catch (error) {
        console.error("Error in fetching news posts by tag:", error);
        throw error;
    }
};



export const formatTagsWithSpace = (tags) => {
    return tags.replace(/,/g, ', '); // Thêm dấu cách sau mỗi dấu phẩy
};

// Tìm kiếm bài viết tin tức theo giá trị nhập vào
export const searchValue = async (value) => {
    // const formattedTags = formatTagsWithSpace(value); // Đảm bảo value đã có dấu cách sau mỗi dấu phẩy
    const encodedTags = encodeURIComponent(value); // Mã hóa chuỗi tags đã có dấu cách
    const apiUrl = `${END_POINT.NewsPost}/search/${encodedTags}`;
    
    console.log("API URL:", apiUrl); // Log URL để kiểm tra nếu mã hóa đúng

    try {
        const response = await axiosTodo.get(apiUrl);
        console.log("API Response:", response); // Log để kiểm tra dữ liệu trả về từ API
        return response; // Trả về dữ liệu từ API
    } catch (error) {
        console.error("Error in fetching news posts by search value:", error);
        throw error;
    }
};

export const paginationNewsPots = async(pageNumber, pageSize) => {
    const apiUrl = `${END_POINT.NewsPost}/page/${pageNumber}/${pageSize}`;
    console.log(apiUrl);
    try{ 
         const response = await axiosTodo.get(apiUrl);
         console.log(response);
         return response;
    } catch(error){
        console.error(error);
        throw error;    
    }

}


export const likedNewsPots = async(idUser) => {
    const apiUrl = `${END_POINT.NewsPost}/liked/${idUser}`;
    console.log(apiUrl);
    try{ 
         const response = await axiosTodo.get(apiUrl);
         console.log(response);
         return response;
    } catch(error){
        console.error(error);
        throw error;    
    }

}