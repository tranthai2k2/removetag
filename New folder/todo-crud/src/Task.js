import React, { useState } from "react";

function Task({ onAdd }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    if (task.length !== 0) {
      e.preventDefault(); // Ngăn chặn reload trang
      onAdd(task); // Gọi hàm onAdd để cập nhật state trong component cha
      setTask(""); // Reset input
    } else {
      alert("vui lòng nhập !");
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Task;
