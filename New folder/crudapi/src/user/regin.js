import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Đảm bảo import useNavigate
import { registerUser } from '../api/userApi'; // Đảm bảo import đúng hàm registerUser

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Hook để điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(''); // Reset lỗi trước khi gửi yêu cầu mới

    const userData = { email, name, password };

    try {
      const user = await registerUser(userData);
      console.log('User registered successfully:', user);
      // Chuyển hướng sang trang HomePage sau khi đăng ký thành công
      alert('Registration successful! Please log in.');
      navigate('/home'); // Điều hướng đến trang HomePage

    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error('Error during registration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={handleSubmit}>
                {/* Gmail */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-start">Gmail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your Gmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-start">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-start">Password</label>
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

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
