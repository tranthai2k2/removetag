document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Lấy tệp được chọn
    if (file) {
      const reader = new FileReader();
      
      // Đọc tệp dưới dạng văn bản
      reader.onload = function(e) {
        const fileContent = e.target.result;
        // Hiển thị nội dung tệp trong textarea
        document.getElementById('fileContent').value = fileContent;
      };
      
      // Đọc nội dung tệp
      reader.readAsText(file);
    }
  });
  