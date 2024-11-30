import React, { useState, useEffect } from 'react';
import { paginationNewsPots } from "../api/newPostApi";

export default function PaginationNewsPosts() {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(6); 
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchPosts = async (page, size) => {
    setLoading(true);
    try {
      const response = await paginationNewsPots(page, size);
      if (Array.isArray(response)) {
        setPosts(response);
        setHasNextPage(response.length === size);
      } else {
        console.warn("API response is not an array:", response.data);
        setPosts([]);
        setHasNextPage(false);
      }
    } catch (error) {
      console.error("Error fetching paginated posts:", error);
      setPosts([]);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setPageNumber(prevPage => prevPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prevPage => prevPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Bài viết</h2>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        posts && posts.length > 0 ? (
          <div className="row">
            {posts.map(post => (
              <div key={post.id} className="col-md-4 mb-4">
                <div className="card">
                  <img src={post.url} className="card-img-top" alt={post.title} />
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <p className="card-text"><small className="text-muted">Tác giả: {post.author}</small></p>
                    <p className="card-text"><small className="text-muted">Tags:</small></p>
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
          <p>Không có bài viết nào để hiển thị.</p>
        )
      )}

      <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePreviousPage} disabled={pageNumber === 1}>Trang trước</button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">Trang {pageNumber}</span>
            </li>
            <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handleNextPage} disabled={!hasNextPage}>Trang sau</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
