document.getElementById('textarea1').addEventListener('input', function() {
    const inputText = this.value; // Lấy giá trị từ textarea
    const regex = /<lora:[^:]+:(\d+(\.\d+)?)>/; // Biểu thức chính quy để tìm phần số

    const match = inputText.match(regex); // Tìm kiếm giá trị số trong chuỗi
    if (match) {
        const startValue = parseFloat(match[1]); // Lấy giá trị số và chuyển thành kiểu số
        document.getElementById('startValue').value = startValue; // Cập nhật startValue

        // Tính toán giá trị cho endValue
        const endValue = (startValue - 0.4).toFixed(1); // Trừ 0.2 và giữ lại 1 chữ số thập phân
        document.getElementById('endValue').value = endValue; // Cập nhật endValue
    } else {
        // Nếu không có giá trị hợp lệ, xóa các input
        document.getElementById('startValue').value = '';
        document.getElementById('endValue').value = '';
    }
});

document.getElementById('textarea1').addEventListener('input', function() {
    const inputText = this.value; // Lấy giá trị từ textarea
    const regex = /<lora:[^:]+:(\d+(\.\d+)?)>/; // Biểu thức chính quy để tìm phần số

    const match = inputText.match(regex); // Tìm kiếm giá trị số trong chuỗi
    if (match) {
        const startValue = parseFloat(match[1]); // Lấy giá trị số và chuyển thành kiểu số
        document.getElementById('startValue').value = startValue; // Cập nhật startValue

        // Tính toán giá trị cho endValue
        const endValue = (startValue - 0.4).toFixed(1); // Trừ 0.4 và giữ lại 1 chữ số thập phân
        document.getElementById('endValue').value = endValue; // Cập nhật endValue
    } else {
        // Nếu không có giá trị hợp lệ, xóa các input
        document.getElementById('startValue').value = '';
        document.getElementById('endValue').value = '';
    }
});

// Lắng nghe sự kiện click của nút submit
document.getElementById('testvalue').addEventListener('click', function() {
    const inputText = document.getElementById('textarea1').value;
    const startValue = parseFloat(document.getElementById('startValue').value);
    const endValue = parseFloat(document.getElementById('endValue').value);
    
    // Kiểm tra xem giá trị hợp lệ hay không
    if (isNaN(startValue) || isNaN(endValue) || startValue < endValue) {
        alert("Giá trị bắt đầu và kết thúc không hợp lệ!");
        return;
    }

    let output = '';
    // Sử dụng regex để tìm phần số trong inputText
    const regex = /:(\d+(\.\d+)?)>/;
    const match = inputText.match(regex);

    if (match) {
        // Lấy phần đầu vào không thay đổi
        const baseText = inputText.substring(0, match.index + 1); // phần trước số
        const afterText = inputText.substring(match.index + match[0].length - 1); // phần sau số

        // Tạo ra các giá trị từ startValue đến endValue
        for (let value = startValue; value >= endValue; value -= 0.2) {
            // Kiểm tra và định dạng giá trị
            if (value === 1) {
                output += `${baseText}1${afterText},`;
            } else {
                output += `${baseText}${value.toFixed(1)}${afterText},`;
            }
        }

        // Xóa dấu phẩy thừa ở cuối chuỗi
        output = output.slice(0, -1); 
    } else {
        alert("Đầu vào không hợp lệ!");
    }

    document.getElementById('textarea2').value = output; // Cập nhật giá trị vào textarea2
});

