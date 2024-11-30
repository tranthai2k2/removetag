import React, { useEffect, useState, useContext } from 'react';
import { IdContext } from '../context/idContextProvider'; // Import IdContext từ context
import { likedNewsPots } from '../api/newPostApi'; // Import hàm từ file API

export default function LikedNewspots() {
  const { id } = useContext(IdContext); // Lấy id từ IdContext
  console.log("có id bên trong:", id);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const response = await likedNewsPots(id); // Sử dụng id từ context
        setLikedPosts(response); // Giả sử dữ liệu trả về có dạng { data: [...] }
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    };

    if (id !== -1) { // Kiểm tra nếu id hợp lệ
      fetchLikedPosts();
    }
  }, [id]); // Thêm id vào dependency để fetch lại dữ liệu khi id thay đổi

  return (
    <div>
      <h1>Liked News Posts</h1>
      <div className='container' >
      {likedPosts.length > 0 ? (
        <div className="row">
          {likedPosts.map((post) => (
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
        <p>No liked posts found.</p>
      )}
      </div>
     
    </div>
  );
}
