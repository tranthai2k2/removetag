import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavScroll from "./navScoll";

export default function TopHeader() {
  return (
    <div>
      <div
        className="d-flex justify-content-between align-items-center p-3 bg-light shadow-sm"
        style={{ width: "100%" }}
      >
        {/* Region 1 - Menu and Search */}
        <div className="d-flex align-items-center" style={{ flex: 0.2 }}>
          <button className="btn btn-link p-0 me-3">
            <i className="fas fa-bars fa-lg"></i>
          </button>
          <div className="search-form d-flex align-items-center bg-white rounded-pill px-2">
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Tìm kiếm..."
            />
            <button className="btn p-0">
              <i className="fas fa-search text-muted"></i>
            </button>
          </div>
        </div>

        {/* Region 2 - Language Links */}
        <div
          className="d-flex align-items-center"
          style={{ flex: 0.6, justifyContent: "center" }}
        >
          <ul className="list-unstyled d-flex mb-0">
            <li className="px-2">EN</li>
            <li className="px-2">-</li>
            <li className="px-2">中文</li>
            <li className="px-2">-</li>
            <li className="px-2">FR</li>
            <li className="px-2">-</li>
            <li className="px-2">RU</li>
            <li className="px-2">-</li>
            <li className="px-2">ES</li>
          </ul>
        </div>

        {/* Region 3 - Additional Links */}
        <div className="d-flex align-items-center" style={{ flex: 0.2 }}>
          <ul
            className="list-unstyled d-flex mb-0"
            style={{ whiteSpace: "nowrap" }}
          >
            <li className="px-3">Mua báo</li>
            <li className="px-3">Tin mới</li>
            <li className="px-3">Địa phương</li>
            <li className="px-3">Nhận tin</li>
            <li className="px-3 d-flex align-items-center">
              <i className="fas fa-user-circle me-2"></i>
              <span>Đăng nhập</span>
            </li>
          </ul>
        </div>
      </div>
      <NavScroll></NavScroll>
    </div>
  );
}
