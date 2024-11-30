import React, { useState, useContext } from "react";
import { loginUser } from "../api/userApi"; // Đảm bảo đường dẫn đúng với cấu trúc dự án của bạn
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { IdContext } from "../context/idContextProvider"; // Import IdContext để sử dụng setId

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setId } = useContext(IdContext); // Lấy setId từ context
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API đăng nhập
      const response = await loginUser(email, password);
      console.log(response);

      // Kiểm tra nếu có userId, tức là đăng nhập thành công
      if (response && response.userId) {
        alert(`Đăng nhập thành công! User ID: ${response.userId}`);
        
        // Cập nhật id trong context
        setId(response.userId); // Cập nhật id trong context sau khi đăng nhập thành công

        // Chuyển hướng đến trang HomePage
        navigate("/home");
      } else {
        alert("Đăng nhập sai");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      alert("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-start">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-start">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
