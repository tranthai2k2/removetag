import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo Bootstrap được import
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Collapse } from 'react-bootstrap'; // Import Collapse từ react-bootstrap

export default function NavScroll() {
  const [openPolitic, setOpenPolitic] = React.useState(false);
  const [openEconomy, setOpenEconomy] = React.useState(false);
  const [openSociety, setOpenSociety] = React.useState(false);
  const [openWorld, setOpenWorld] = React.useState(false);
  const [openHealth, setOpenHealth] = React.useState(false);
  const [openReader, setOpenReader] = React.useState(false);
  const [openMedia, setOpenMedia] = React.useState(false);
  const [openLocalNews, setOpenLocalNews] = React.useState(false);

  return (
    <div className="nav-wrapper scroll">
      <ul className="menu-1" style={{ listStyleType: 'none', backgroundColor: '#f8f9fa', padding: 0, margin: 0 }}>
        <li className="is-active" onClick={() => setOpenPolitic(!openPolitic)} style={{ backgroundColor: '#e9ecef', cursor: 'pointer' }}>
          Chính trị 
          <i className={`fas ${openPolitic ? 'fa-chevron-down' : 'fa-chevron-right'} float-right`} />
        </li>
        <Collapse in={openPolitic}>
          <ul className="sub-menu" style={{ listStyleType: 'none', backgroundColor: '#f1f3f5', padding: 0, margin: 0 }}>
            <li>Xã luận</li>
            <li>Bình luận - Phê phán</li>
            <li>Xây dựng Đảng</li>
          </ul>
        </Collapse>

        <li onClick={() => setOpenEconomy(!openEconomy)} style={{ backgroundColor: '#e9ecef', cursor: 'pointer' }}>
          Kinh tế
          <i className={`fas ${openEconomy ? 'fa-chevron-down' : 'fa-chevron-right'} float-right`} />
        </li>
        <Collapse in={openEconomy}>
          <ul className="sub-menu" style={{ listStyleType: 'none', backgroundColor: '#f1f3f5', padding: 0, margin: 0 }}>
            <li>Tài chính – Chứng khoán</li>
            <li>Thông tin hàng hóa</li>
          </ul>
        </Collapse>

        <li style={{ backgroundColor: '#e9ecef' }}>Văn hóa</li>

        <li onClick={() => setOpenSociety(!openSociety)} style={{ backgroundColor: '#e9ecef', cursor: 'pointer' }}>
          Xã hội
          <i className={`fas ${openSociety ? 'fa-chevron-down' : 'fa-chevron-right'} float-right`} />
        </li>
        <Collapse in={openSociety}>
          <ul className="sub-menu" style={{ listStyleType: 'none', backgroundColor: '#f1f3f5', padding: 0, margin: 0 }}>
            <li>BHXH và cuộc sống</li>
            <li>Người tốt việc tốt</li>
          </ul>
        </Collapse>

        <li style={{ backgroundColor: '#e9ecef' }}>Pháp luật</li>
        <li style={{ backgroundColor: '#e9ecef' }}>Du lịch</li>

        <li onClick={() => setOpenWorld(!openWorld)} style={{ backgroundColor: '#e9ecef', cursor: 'pointer' }}>
          Thế giới
          <i className={`fas ${openWorld ? 'fa-chevron-down' : 'fa-chevron-right'} float-right`} />
        </li>
        <Collapse in={openWorld}>
          <ul className="sub-menu" style={{ listStyleType: 'none', backgroundColor: '#f1f3f5', padding: 0, margin: 0 }}>
            <li>Bình luận quốc tế</li>
            <li>ASEAN</li>
            <li>Châu Phi</li>
            <li>Châu Mỹ</li>
            <li>Châu Âu</li>
            <li>Trung Đông</li>
            <li>Châu Á-TBD</li>
          </ul>
        </Collapse>

        <li style={{ backgroundColor: '#e9ecef' }}>Thể thao</li>
        <li style={{ backgroundColor: '#e9ecef' }}>Giáo dục</li>

        <li onClick={() => setOpenHealth(!openHealth)} style={{ backgroundColor: '#e9ecef', cursor: 'pointer' }}>
          Y tế
          <i className={`fas ${openHealth ? 'fa-chevron-down' : 'fa-chevron-right'} float-right`} />
        </li>
        <Collapse in={openHealth}>
          <ul className="sub-menu" style={{ listStyleType: 'none', backgroundColor: '#f1f3f5', padding: 0, margin: 0 }}>
            <li>Góc tư vấn</li>
          </ul>
        </Collapse>

        <li style={{ backgroundColor: '#e9ecef' }}>Khoa học - Công nghệ</li>
        <li style={{ backgroundColor: '#e9ecef' }}>Môi trường</li>

        <li onClick={() => setOpenReader(!openReader)} style={{ backgroundColor: '#e9ecef', cursor: 'pointer' }}>
          Bạn đọc
          <i className={`fas ${openReader ? 'fa-chevron-down' : 'fa-chevron-right'} float-right`} />
        </li>
        <Collapse in={openReader}>
          <ul className="sub-menu" style={{ listStyleType: 'none', backgroundColor: '#f1f3f5', padding: 0, margin: 0 }}>
            <li>Đường dây nóng</li>
            <li>Điều tra qua thư bạn đọc</li>
          </ul>
        </Collapse>

        <li style={{ backgroundColor: '#e9ecef' }}>Kiểm chứng thông tin</li>
        <li style={{ backgroundColor: '#e9ecef' }}>Tri thức chuyên sâu</li>
        <li style={{ backgroundColor: '#e9ecef' }}>54 dân tộc Việt Nam</li>
        <li style={{ backgroundColor: '#e9ecef' }}>Chương trình OCOP - Mỗi xã một sản phẩm</li>
      </ul>

      <ul className="menu-2" style={{ listStyleType: 'none', backgroundColor: '#f8f9fa', padding: 0, margin: 0 }}>
        <li style={{ backgroundColor: '#e9ecef' }}>Radio</li>

        <li onClick={() => setOpenMedia(!openMedia)} style={{ backgroundColor: '#e9ecef', cursor: 'pointer' }}>
          Media center
          <i className={`fas ${openMedia ? 'fa-chevron-down' : 'fa-chevron-right'} float-right`} />
        </li>
        <Collapse in={openMedia}>
          <ul className="sub-menu" style={{ listStyleType: 'none', backgroundColor: '#f1f3f5', padding: 0, margin: 0 }}>
            <li>E-Magazine</li>
            <li>Video</li>
            <li>Ảnh</li>
            <li>Infographic</li>
          </ul>
        </Collapse>
      </ul>

      <ul className="menu-3" style={{ listStyleType: 'none', backgroundColor: '#f8f9fa', padding: 0, margin: 0 }}>
        <li style={{ backgroundColor: '#e9ecef' }}>Tin mới</li>

        <li onClick={() => setOpenLocalNews(!openLocalNews)} style={{ backgroundColor: '#e9ecef', cursor: 'pointer' }}>
          Tin địa phương
          <i className={`fas ${openLocalNews ? 'fa-chevron-down' : 'fa-chevron-right'} float-right`} />
        </li>
        <Collapse in={openLocalNews}>
          <ul className="sub-menu" style={{ listStyleType: 'none', backgroundColor: '#f1f3f5', padding: 0, margin: 0 }}>
            <li>Trung du và miền núi Bắc Bộ</li>
            <li>Đồng bằng sông Hồng</li>
            <li>Trung bộ</li>
            <li>Đông Nam Bộ</li>
            <li>Tây Nguyên</li>
            <li>Nam Bộ</li>
          </ul>
        </Collapse>
      </ul>
    </div>
  );
}
