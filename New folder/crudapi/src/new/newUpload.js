import React, { useState } from "react";
import { createNewsPost } from "../api/newPostApi";
import AllNewsPosts from "./allNewsPots";

export default function NewUpload() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    content: "",
    author: "",
    tags: "",
  });

  const handleTagSelect = (e) => {
    const value = e.target.value;
    if (value && !selectedTags.includes(value)) {
      setSelectedTags([...selectedTags, value]);
    }
  };

  const handleTagRemove = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem đã có tag nào được chọn chưa
    if (selectedTags.length === 0) {
      alert("Vui lòng chọn ít nhất một tag.");
      return;
    }

    // Sắp xếp và chuyển đổi mảng selectedTags thành chuỗi
    const tagsString = selectedTags.sort().join(", ");

    // Đặt các giá trị mặc định nếu không có dữ liệu đầu vào
    const newFormData = {
      ...formData,
      title: formData.title || "Ẩn danh đã đăng",
      imageUrl: formData.imageUrl || "https://s.net.vn/ItFv",
      content: formData.content || "Nội dung mới được ẩn danh đăng",
      author: formData.author || "Ẩn danh",
      tags: tagsString,
    };

    // Lấy thời gian hiện tại ở định dạng ISO 8601
    const currentTime = new Date().toISOString();

    // Tạo cấu trúc dữ liệu theo yêu cầu của API
    const dataToSend = {
      id: 0,
      title: newFormData.title,
      url: newFormData.imageUrl,
      time: currentTime,
      content: newFormData.content,
      author: newFormData.author,
      tags: newFormData.tags,
    };

    try {
      const response = await createNewsPost(dataToSend);
      console.log("Bài viết đã được tạo thành công:", response);
      // Reset form sau khi lưu
      setFormData({
        title: "",
        imageUrl: "",
        content: "",
        author: "",
        tags: "",
      });
      setSelectedTags([]);
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
    }
  };

  return (
    <div className="container">
      <h2>Viết Tin Tức</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tiêu đề</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề"
          />
        </div>

        <div className="form-group">
          <label>Địa chỉ hình ảnh</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Nhập địa chỉ URL của hình ảnh"
          />
        </div>

        <div className="form-group">
          <label>Nội dung</label>
          <textarea
            className="form-control"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Nhập nội dung"
          />
        </div>

        <div className="form-group">
          <label>Người viết</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Nhập tên người viết"
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <select className="form-control" onChange={handleTagSelect}>
            <option value="">Chọn tag</option>
            <option value="Chính trị">Chính trị</option>
            <option value="Kinh tế">Kinh tế</option>
            <option value="Giáo dục">Giáo dục</option>
          </select>

          <div className="tags-container m-4">
            {selectedTags.map((tag, index) => (
              <div
                key={index}
                className="badge-container d-flex align-items-center justify-content-between p-2 mb-2 border rounded bg-light"
              >
                <div
                  className="tag-text mb-0 text-truncate"
                  style={{ maxWidth: "150px" }}
                >
                  {tag}
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-danger p-1 "
                  onClick={() => handleTagRemove(tag)}
                  title="Remove Tag"
                >
                  <span className="font-weight-bold">×</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Lưu Tin
        </button>
      </form>
      <AllNewsPosts></AllNewsPosts>
    </div>
  );
}
