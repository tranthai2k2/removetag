let currentSlide = 0;

function moveSlide(step) {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  
  // Hide current slide
  slides[currentSlide].style.display = 'none';
  
  // Update current slide index
  currentSlide = (currentSlide + step + totalSlides) % totalSlides;
  
  // Show new slide
  slides[currentSlide].style.display = 'block';
}

// Initialize the slider to show the first slide
window.onload = function() {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? 'block' : 'none';
  });
};


const news = [
    { id: 1, tieuDe: 'Tin tức số 1', nguoiThucHien: 'Người thực hiện 1', ngayUp: '2024-09-30' },
    { id: 2, tieuDe: 'Tin tức số 2', nguoiThucHien: 'Người thực hiện 2', ngayUp: '2024-09-29' },
    { id: 3, tieuDe: 'Tin tức số 3', nguoiThucHien: 'Người thực hiện 3', ngayUp: '2024-09-28' },
    { id: 4, tieuDe: 'Tin tức số 4', nguoiThucHien: 'Người thực hiện 4', ngayUp: '2024-09-27' },
    { id: 5, tieuDe: 'Tin tức số 5', nguoiThucHien: 'Người thực hiện 5', ngayUp: '2024-09-26' },
    { id: 6, tieuDe: 'Tin tức số 6', nguoiThucHien: 'Người thực hiện 6', ngayUp: '2024-09-25' },
    { id: 7, tieuDe: 'Tin tức số 7', nguoiThucHien: 'Người thực hiện 7', ngayUp: '2024-09-24' },
    { id: 8, tieuDe: 'Tin tức số 8', nguoiThucHien: 'Người thực hiện 8', ngayUp: '2024-09-23' },
    { id: 9, tieuDe: 'Tin tức số 9', nguoiThucHien: 'Người thực hiện 9', ngayUp: '2024-09-22' },
    { id: 10, tieuDe: 'Tin tức số 10', nguoiThucHien: 'Người thực hiện 10', ngayUp: '2024-09-21' }
];
var end = 2; // Số lượng tin tức trên mỗi trang
var page = 1; // Trang hiện tại
var start = (page - 1) * end + 1; // Tính toán start cho trang hiện tại
const countNews = news.length; // Số lượng tin tức
const maxPage = Math.ceil(countNews / end); // Số trang tối đa
console.log(maxPage); 

function clickhere() {
    document.querySelector(".clickhere").style.display = "none"; // Ẩn phần tử có class "clickhere"
    document.querySelector(".phantrang").style.display = "flex"; // Hiện phần tử có class "phantrang"
    
    // Hiển thị tin tức cho trang đầu tiên
    displayNews(start, end, page);
}

function displayNews(start, end, page) {
    const newsContainer = document.querySelector(".news-container");
    newsContainer.innerHTML = ''; // Xóa nội dung cũ

    // Tính toán start và end cho trang hiện tại
    start = (page - 1) * end; // Sửa lại start để phù hợp với chỉ số mảng
    const endIndex = Math.min(start + end, countNews); // Đảm bảo không vượt quá số lượng tin tức

    // Duyệt qua từng tin tức trong mảng news
    for (let i = start; i < endIndex; i++) { // Sửa lại điều kiện vòng lặp
        const item = news[i]; // Lấy tin tức từ mảng
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item-phantrang'); // Thêm class cho từng tin tức

        // Tạo nội dung cho mỗi tin tức
        newsItem.innerHTML = `
            <h3>${item.tieuDe}</h3>
            <p>Người thực hiện: ${item.nguoiThucHien}</p>
            <p>Ngày cập nhật: ${item.ngayUp}</p>
        `;

        // Thêm tin tức vào container
        newsContainer.appendChild(newsItem);
    }

    // Cập nhật số trang hiển thị
    document.querySelector(".current").innerHTML = page;
}

function movePage(num) {
    const newPage = page + num;

    // Kiểm tra xem trang mới có hợp lệ không
    if (newPage >= 1 && newPage <= maxPage) {
        page = newPage; // Cập nhật trang hiện tại
        displayNews(start, end, page); // Hiển thị tin tức cho trang mới
        document.querySelector(".current").innerHTML = page; // Cập nhật số trang hiển thị
    }
}


