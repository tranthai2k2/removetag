import React, { useState } from 'react';
import NewUpload from './new/newUpload';
import NewsPostList from './new/newsPostList';
import SearchPots from './new/searchPots';
import PaginationNewsPots from './new/paginationNewsPots';
import LikedNewspots from './new/likedNewspots';

export default function HomePage() {
  const [activeComponent, setActiveComponent] = useState('newUpload'); // Mặc định hiển thị NewUpload

  const handleShowComponent = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      {/* Các nút với nền trắng khi không sử dụng và nền màu khi được chọn */}
      <div className="mb-3">
        <button
          className={`btn mx-2 ${activeComponent === 'newUpload' ? 'btn-primary' : 'btn-outline-dark'}`}
          onClick={() => handleShowComponent('newUpload')}
        >
          New Upload
        </button>
        <button
          className={`btn mx-2 ${activeComponent === 'newsPostList' ? 'btn-primary' : 'btn-outline-dark'}`}
          onClick={() => handleShowComponent('newsPostList')}
        >
          Tìm theo tag
        </button>
        <button
          className={`btn mx-2 ${activeComponent === 'searchPots' ? 'btn-primary' : 'btn-outline-dark'}`}
          onClick={() => handleShowComponent('searchPots')}
        >
          Search Pots
        </button>
        <button
          className={`btn mx-2 ${activeComponent === 'paginationNewsPots' ? 'btn-primary' : 'btn-outline-dark'}`}
          onClick={() => handleShowComponent('paginationNewsPots')}
        >
          Pagination News Pots
        </button>
        <button
          className={`btn mx-2 ${activeComponent === 'likedNewspots' ? 'btn-primary' : 'btn-outline-dark'}`}
          onClick={() => handleShowComponent('likedNewspots')}
        >
          Liked News Pots
        </button>
      </div>

      {/* Dựa trên giá trị của activeComponent để hiển thị phần tử tương ứng */}
      {activeComponent === 'newUpload' && <NewUpload />}
      {activeComponent === 'newsPostList' && <NewsPostList />}
      {activeComponent === 'searchPots' && <SearchPots />}
      {activeComponent === 'paginationNewsPots' && <PaginationNewsPots />}
      {activeComponent === 'likedNewspots' && <LikedNewspots />}
    </div>
  );
}
