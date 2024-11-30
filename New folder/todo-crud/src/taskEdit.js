import React, { useState } from "react";

export default function TaskEdit(props) {
//   const { placeholder, noneEditTask} = props; 
const { placeholder, noneEditTask, editTodo } = props; 

  console.log(placeholder)
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    if (task.length !== 0) {
      editTodo(task); // Gọi hàm editTodo với giá trị mới
      noneEditTask(); // Quay lại chế độ xem
    } else {
      alert("Vui lòng nhập !");
    }
  };

  
  const cancelSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    noneEditTask(); // Gọi hàm noneEditTask từ props
  };
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      style={{ margin: "10px" }}
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder={placeholder}
      />
      <button onClick={handleSubmit} type="submit">
        edit task
      </button>
      <button  onClick={cancelSubmit} type="submit">cancel</button>
    </form>
  );
}
