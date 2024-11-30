import React, { useState, useEffect } from "react";
import {
  getAllNewsPosts,
  deleteNewsPost,
  updateNewsPost,
} from "../api/newPostApi";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AllNewsPosts() {
  const [newsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedFields, setEditedFields] = useState({
    title: "",
    content: "",
    url: "",
    author: "",
    tags: [],
  });

  // Fetch the news posts from the API
  useEffect(() => {
    const fetchNewsPosts = async () => {
      try {
        const data = await getAllNewsPosts();
        setNewsPosts(data);
      } catch (err) {
        setError("Có lỗi khi tải dữ liệu bài viết.");
        console.error("Error fetching news posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsPosts();
  }, []);

  // Delete a news post
  const handleDelete = async (postId) => {
    try {
      await deleteNewsPost(postId);
      setNewsPosts(newsPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Edit an existing post
  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setEditedFields({
      title: post.title,
      content: post.content,
      url: post.url,
      author: post.author,
      tags: post.tags.split(",").map((tag) => tag.trim()),
    });
  };

  // Handle changes to the edited fields
  const handleFieldChange = (field, value) => {
    setEditedFields({ ...editedFields, [field]: value });
  };

  // Handle adding a new tag
  const handleTagSelect = (e) => {
    const value = e.target.value;
    if (value && !editedFields.tags.includes(value)) {
      setEditedFields({ ...editedFields, tags: [...editedFields.tags, value] });
    }
  };

  // Handle removing a tag
  const handleTagRemove = (tag) => {
    setEditedFields({
      ...editedFields,
      tags: editedFields.tags.filter((t) => t !== tag),
    });
  };

  // Save the edited post
  const handleSaveEdit = async () => {
    try {
      const updatedPost = {
        title: editedFields.title,
        content: editedFields.content,
        url: editedFields.url,
        author: editedFields.author,
        tags: editedFields.tags.join(", "),
      };
      await updateNewsPost(editingPostId, updatedPost);
      setNewsPosts(
        newsPosts.map((post) =>
          post.id === editingPostId ? { ...post, ...updatedPost } : post
        )
      );
      setEditingPostId(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!Array.isArray(newsPosts) || newsPosts.length === 0) {
    return <div className="text-center">Không có bài viết nào.</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Tất cả bài viết</h1>
      <div className="row">
        {newsPosts
          .sort((a, b) => a.id - b.id) // Sắp xếp bài viết theo id tại đây
          .map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={post.url}
                  alt="News Thumbnail"
                  className="card-img-top"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
                <div className="card-body">
                  {editingPostId === post.id ? (
                    <div>
                      <div className="form-group row mb-3">
                        <label
                          htmlFor="title"
                          className="col-sm-2 col-form-label"
                        >
                          Tiêu đề
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={editedFields.title}
                            onChange={(e) =>
                              handleFieldChange("title", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-3">
                        <label
                          htmlFor="content"
                          className="col-sm-2 col-form-label"
                        >
                          Nội dung
                        </label>
                        <div className="col-sm-10">
                          <textarea
                            className="form-control"
                            id="content"
                            value={editedFields.content}
                            onChange={(e) =>
                              handleFieldChange("content", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-3">
                        <label
                          htmlFor="url"
                          className="col-sm-2 col-form-label"
                        >
                          URL
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="url"
                            value={editedFields.url}
                            onChange={(e) =>
                              handleFieldChange("url", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-3">
                        <label
                          htmlFor="author"
                          className="col-sm-2 col-form-label"
                        >
                          Tác giả
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="author"
                            value={editedFields.author}
                            onChange={(e) =>
                              handleFieldChange("author", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-3">
                        <label
                          htmlFor="tags"
                          className="col-sm-2 col-form-label"
                        >
                          Tags
                        </label>
                        <div className="col-sm-10">
                          <select
                            className="form-control"
                            onChange={handleTagSelect}
                            id="tags"
                          >
                            <option value="">Chọn tag</option>
                            <option value="Chính trị">Chính trị</option>
                            <option value="Kinh tế">Kinh tế</option>
                            <option value="Giáo dục">Giáo dục</option>
                          </select>
                          <div className="tags-container mt-2">
                            {editedFields.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="badge bg-primary text-light border rounded p-2 me-2 m-1"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => handleTagRemove(tag)}
                                  className="btn btn-sm btn-danger ms-2 rounded-pill"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-success btn-lg"
                          onClick={handleSaveEdit}
                        >
                          Lưu
                        </button>
                        <button
                          className="btn btn-secondary btn-lg"
                          onClick={() => setEditingPostId(null)}
                        >
                          Hủy bỏ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h5 className="card-title">{post.title}</h5>
                      <div
                        className="card-text"
                        style={{
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                        }}
                      >
                        {post.content.length > 250
                          ? post.content.substring(0, 250) + "..."
                          : post.content}
                      </div>
                      <p className="card-text">
                        <small className="text-muted">
                          Ngày đăng: {new Date(post.time).toLocaleString()}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Tác giả: {post.author}
                        </small>
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
                      <button
                        className="btn btn-primary btn-sm me-2 mt-2"
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
