import React, { useEffect, useState } from "react";
import { getNewsPostsByTag } from "../api/newPostApi"; // Đảm bảo đường dẫn tới file API là chính xác

export default function NewsPostList() {
  const [newsPosts, setNewsPosts] = useState([]); // State lưu bài viết
  const [tags, setTags] = useState([]); // Lưu các tag đã chọn

  useEffect(() => {
    const fetchNewsPosts = async () => {
      if (tags.length === 0) return;

      try {
        const tagsString = tags.sort().toString();
        const data = await getNewsPostsByTag(tagsString);
        setNewsPosts(data);
      } catch (error) {
        console.error("Error fetching news posts by tags:", error);
      }
    };

    fetchNewsPosts();
  }, [tags]);

  const handleTagClick = (tag) => {
    setTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mt-4">News Posts</h1>
      <div className="d-flex justify-content-center mt-3">
        <button
          onClick={() => handleTagClick("Chính trị")}
          className={`btn ${tags.includes("Chính trị") ? "btn-info" : "btn-outline-secondary"} me-2`}
        >
          Chính trị
        </button>
        <button
          onClick={() => handleTagClick("Kinh tế")}
          className={`btn ${tags.includes("Kinh tế") ? "btn-info" : "btn-outline-secondary"} me-2`}
        >
          Kinh tế
        </button>
        <button
          onClick={() => handleTagClick("Giáo dục")}
          className={`btn ${tags.includes("Giáo dục") ? "btn-info" : "btn-outline-secondary"}`}
        >
          Giáo dục
        </button>
      </div>
      <h2 className="text-center mt-4">Selected Tags: {tags.sort().join(", ")}</h2>

      <div
        className="d-flex justify-content-center align-items-center flex-wrap mt-5"
        style={{ minHeight: "60vh", width: "100%" }}
      >
        {newsPosts.length > 0 ? (
          newsPosts.map((post) => (
            <div key={post.id} className="card m-3" style={{ width: "18rem" }}>
              <img
                src={post.url}
                alt="News Thumbnail"
                className="card-img-top"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                }
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.substring(0, 100)}...</p>
                <p className="card-text">
                  <small className="text-muted">
                    Ngày đăng: {new Date(post.time).toLocaleString()}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-muted">Tác giả: {post.author}</small>
                </p>
                <div className="tags">
                  {post.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark border rounded-pill p-2 me-2"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No posts found for the selected tags.</p>
        )}
      </div>
    </div>
  );
}
