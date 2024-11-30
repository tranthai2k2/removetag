import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo Bootstrap được import
import { getTodoAPI, addTodoAPI, deleteTodoAPI, updateTodoAPI } from "./todoApi"; // Chỉ import những hàm cần thiết

function ToDo() {
  const [todos, setTodos] = useState([]); // Lưu danh sách công việc
  const [newTodo, setNewTodo] = useState(""); // Lưu công việc mới
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [editingTodo, setEditingTodo] = useState(null); // Công việc đang chỉnh sửa
  const [editedValue, setEditedValue] = useState(""); // Lưu giá trị đang chỉnh sửa

  // Lấy danh sách todo khi component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Lấy danh sách todos từ API
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await getTodoAPI();
      // Sắp xếp danh sách công việc theo id trước khi lưu vào state
      setTodos(data.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Thêm công việc mới
  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodoAPI(newTodo);
        setNewTodo(""); // Xóa input sau khi thêm
        fetchTodos(); // Cập nhật lại danh sách todos
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  // Bắt đầu chỉnh sửa công việc
  const startEditing = (todo) => {
    setEditingTodo(todo.id); // Đặt công việc hiện tại là đang chỉnh sửa
    setEditedValue(todo.value); // Lưu giá trị công việc cần chỉnh sửa
  };

  // Hủy bỏ chỉnh sửa
  const cancelEditing = () => {
    setEditingTodo(null); // Hủy chế độ chỉnh sửa
    setEditedValue(""); // Xóa giá trị đang chỉnh sửa
  };

  // Lưu công việc đã chỉnh sửa
  const saveTodo = async (id) => {
    if (editedValue.trim()) {
      try {
        await updateTodoAPI(id, editedValue);
        setEditingTodo(null); // Dừng chế độ chỉnh sửa
        setEditedValue(""); // Xóa giá trị đang chỉnh sửa
        fetchTodos(); // Cập nhật lại danh sách todos
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  // Xóa công việc
  const deleteTodo = async (id) => {
    try {
      await deleteTodoAPI(id);
      fetchTodos(); // Cập nhật lại danh sách todos
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="App container">
      <h1>Todo App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editingTodo === todo.id ? (
                <div className="d-flex w-100">
                  <input
                    type="text"
                    className="form-control"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                  <button className="btn btn-success btn-sm mx-1" onClick={() => saveTodo(todo.id)}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              ) : (
                <span className="text-truncate" style={{ maxWidth: '200px' }}>
                  {todo.value}
                </span>
              )}
              <div>
                {editingTodo !== todo.id && (
                  <>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => startEditing(todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ToDo;
