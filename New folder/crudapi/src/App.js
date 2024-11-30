// D:\react-1\TTDN\crudapi\src\App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo Bootstrap được import

import TopHeader from "./header/topHeader";
import ToDo from "./toDo";
import Login from "./user/login";
import Register from "./user/regin";
import HomePage from "./homePage"; // Import HomePage
import { IdProvider } from "./context/idContextProvider"; // Import IdProvider từ context

function App() {
  // Sử dụng state để lưu trạng thái nút hiện tại (đăng nhập hoặc đăng ký)
  const [isLogin, setIsLogin] = useState(true);

  return (
    <IdProvider> {/* Bọc toàn bộ ứng dụng với IdProvider */}
      <Router>
        <div className="App">
          {/* Các nút để chuyển đổi giữa Đăng nhập và Đăng ký */}
          <div className="d-flex justify-content-center my-4">
            <button
              className={`btn btn-primary mx-2 ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)} // Chuyển sang trang đăng nhập
            >
              Đăng nhập
            </button>
            <button
              className={`btn btn-secondary mx-2 ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)} // Chuyển sang trang đăng ký
            >
              Đăng ký
            </button>
          </div>

          {/* Hiển thị component tương ứng dựa trên state */}
          <Routes>
            <Route path="/" element={isLogin ? <Login /> : <Register />} />
            <Route path="/home" element={<HomePage />} /> {/* Định nghĩa route cho HomePage */}
            {/* Bạn có thể thêm các route khác ở đây */}
          </Routes>
        </div>
      </Router>
    </IdProvider>
  );
}

export default App;
