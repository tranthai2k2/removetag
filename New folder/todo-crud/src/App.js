import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import Task from "./Task";
import TaskEdit from "./taskEdit";

const styles = {
  // border: '1px solid blue',
};

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : []; // Lấy dữ liệu từ localStorage nếu có
  });

  const [edit, setEdit] = useState("-1");

  // Đồng bộ dữ liệu todos với localStorage khi todos thay đổi
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTask) => {
    setTodos([...todos, newTask]);
  };

  const noneEditTask = () => {
    setEdit("-1");
  };

  const editTodo = (index, task) => {
    setTodos(
      todos.map((todo, todoIndex) => {
        return todoIndex === index ? task : todo;
      })
    );
  };

  function deleteTask(id) {
    setTodos(todos.filter((todo, index) => index !== id));
  }

  function editTask(index) {
    setEdit(index);
  }

  return (
    <div className="App">
      <h1 className="text-center">ToDo CRUD</h1>
      <div style={styles} className="container">
        <Task onAdd={addTodo} />
        <ul style={{ padding: 0 }}>
          {todos.map((todo, index) =>
            index !== edit ? (
              <li
                style={{
                  listStyle: "none",
                  margin: "10px",
                  display: "flex",
                  alignItems: "center",
                  border: "5px solid black",
                  padding: "10px",
                }}
                key={index}
              >
                {todo} {/* Hiển thị thuộc tính task của todo */}
                <button
                  onClick={() => editTask(index)}
                  style={{
                    marginLeft: "10px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-pencil-square"></i> {/* Icon Edit */}
                </button>
                <button
                  onClick={() => deleteTask(index)} // Sử dụng arrow function để truyền id
                  style={{
                    marginLeft: "10px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-trash"></i> {/* Icon Delete */}
                </button>
              </li>
            ) : (
              <TaskEdit
                placeholder={todo}
                editTodo={(task) => editTodo(index, task)}
                noneEditTask={noneEditTask}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
