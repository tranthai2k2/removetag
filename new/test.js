console.log("hello world");

const attributes = {
    sizebreasts: [
        "flat chest",
        "small breasts",
        "medium breasts",
        "large breasts",
        "huge breasts",
        "gigantic breasts",
        "alternate breast size",
    ],
    haistyle: [
        "long hair",
        "short hair",
        "blonde hair",
    ],
};

var text = "1boy, 1girl, alternate breast size, artist name, bare shoulders, bedroom, blonde hair, breasts, collarbone, completely nude, cum, cum in pussy, ejaculating while penetrated, ejaculation, hair ornament, huge breasts, large breasts, long hair, nipples, nude, on bed, riding crop, sex, shiny clothes, spread legs, thick thighs, thighs, vaginal";
var allselected = [
    "haistyle",
    "sizebreasts"
];

// Chuyển đổi chuỗi thành mảng
var array = text.split(', ');
console.log(array);

// Lọc các phần tử không có trong attributes
var filteredArray = array.filter(item => {
    // Kiểm tra xem phần tử có thuộc bất kỳ thuộc tính nào trong newAttributes hay không
    return !newAttributes.some(attr => {
        // Kiểm tra xem thuộc tính có tồn tại và là mảng không
        return Array.isArray(attributes[attr]) && attributes[attr].includes(item.trim());
    });
});

// In ra mảng đã lọc
console.log(filteredArray);
// Chuyển đổi mảng đã lọc thành chuỗi
var filteredString = filteredArray.join(', ');

// In ra chuỗi đã lọc
console.log(filteredString);
