import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { searchValue } from "../api/newPostApi";  // Đảm bảo bạn import đúng hàm searchValue

export default function SearchPots() {
  const [searchQuery, setSearchQuery] = useState(''); // Lưu trữ truy vấn tìm kiếm
  const [searchResults, setSearchResults] = useState([]); // Lưu trữ kết quả tìm kiếm
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [newsPosts, setNewsPosts] = useState([]); // Lưu trữ tất cả bài viết
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Lưu trạng thái timeout để thực hiện debounce

  // Giả lập lấy dữ liệu bài viết (thay thế bằng API thực tế nếu có)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await searchValue(''); // Lấy tất cả bài viết nếu không có tìm kiếm
        setNewsPosts(data);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
      }
    };

    fetchPosts();
  }, []);

  // Hàm xử lý thay đổi giá trị trong ô tìm kiếm
  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query); // Cập nhật giá trị tìm kiếm

    // Nếu có timeout trước đó, hủy bỏ nó
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    if (query.trim()) {
      setLoading(true); // Bắt đầu loading khi tìm kiếm

      // Thiết lập lại timeout để thực hiện tìm kiếm sau 500ms khi người dùng ngừng nhập
      const timeout = setTimeout(async () => {
        try {
          const results = await searchValue(query); // Gọi hàm searchValue từ API
          if (results.status === 404) {
            // Nếu nhận được lỗi 404, xóa tất cả bài viết và hiển thị thông báo không có kết quả
            setNewsPosts([]);
            setSearchResults([]);
          } else {
            setSearchResults(results); // Cập nhật kết quả tìm kiếm
          }
        } catch (error) {
          console.error("Lỗi khi tìm kiếm:", error);
          setNewsPosts([]); // Xóa tất cả bài viết đã lưu trữ khi có lỗi
          setSearchResults([]); // Xóa kết quả tìm kiếm
        } finally {
          setLoading(false); // Dừng trạng thái loading sau khi có kết quả
        }
      }, 500);

      // Lưu lại timeout để có thể hủy nếu người dùng tiếp tục gõ
      setDebounceTimeout(timeout);
    } else {
      setSearchResults([]); // Nếu không có truy vấn, xóa kết quả tìm kiếm
    }
  };

  // Hàm để hiển thị bài viết tìm được
  const displayResults = searchResults.length > 0 ? searchResults : newsPosts;

  return (
    <div className="container mt-4">
      <h1>Search Pots</h1>
      <Form>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Nhập từ khóa tìm kiếm..."
            value={searchQuery}
            onChange={handleSearchChange} // Sự kiện onChange thay vì submit
          />
        </InputGroup>
      </Form>

      {/* Hiển thị kết quả tìm kiếm */}
      <div>
        {loading && <p>Đang tải kết quả...</p>}
        {displayResults.length > 0 ? (
          <div className="row">
            {displayResults.map((post) => (
              <div key={post.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={post.url}
                    alt="News Thumbnail"
                    className="card-img-top"
                    onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content.substring(0, 100)}...</p>
                    <p className="card-text">
                      <small className="text-muted">Ngày đăng: {new Date(post.time).toLocaleString()}</small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Tác giả: {post.author}</small>
                    </p>

                    <div className="tags">
                      {post.tags.split(',').map((tag, index) => (
                        <span key={index} className="badge bg-light text-dark border rounded-pill p-2 me-2">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Không có kết quả tìm kiếm nào.</p>
        )}
      </div>
    </div>
  );
}
