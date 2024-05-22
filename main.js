document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("retrieveTextBtn").addEventListener("click", function() {
        var textareaContent = document.getElementById("exampleFormControlTextarea1").value;
        
        var newStr = textareaContent.replace(/\d+\?/g, ",");
        var finalStr = newStr.replace(/ ?(\? ?)|\? /g, "");
        var finalStr = finalStr.replace(/\b\d+\b/g, '');

        document.getElementById("out").style.visibility = "visible";
        document.getElementById("texteraout").textContent = "";
        document.getElementById("texteraout").textContent = finalStr;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var textarea = document.getElementById("exampleFormControlTextarea1");
    textarea.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });
});
document.getElementById('tag-select').addEventListener('change', function() {
    const selectedValue = this.value;
    toggleTag(selectedValue);
});

function toggleTag(value) {
    const selectedTagsContainer = document.getElementById('selected-tags');
    const existingTag = document.querySelector(`.tag[data-value="${value}"]`);
    
    if (existingTag) {
        // Nếu tag đã tồn tại, xóa tag đó
        existingTag.remove();
    } else {
        // Nếu tag chưa tồn tại, thêm tag mới
        const tagDiv = document.createElement('div');
        tagDiv.className = 'tag';
        tagDiv.setAttribute('data-value', value);
        tagDiv.innerHTML = `${value} <button class="remove-tag" onclick="removeTag('${value}')">x</button>`;
        
        selectedTagsContainer.appendChild(tagDiv);
    }
}

function removeTag(value) {
    const tagToRemove = document.querySelector(`.tag[data-value="${value}"]`);
    if (tagToRemove) {
        tagToRemove.remove();
    }
}


const wantRemove = {
    hairStyle: [
        "Hair Style", "Long Hair", "Short Hair", "Ponytail", 
        "Braided Hair", "Twin Tails", "Bangs", "Messy Hair", 
        "Bob Cut", "Curly Hair", "Hair Between Eyes", "Hime Cut", 
        "Side Bangs", "Fringe", "Pixie Cut", "Mohawk", "Undercut", 
        "Bald", "Ombre Hair", "ponytail", "braid"
    ],
    hairColor: [
        "hair color", "blonde hair", "black hair", "brown hair", 
        "red hair", "blue hair", "green hair", "purple hair", 
        "pink hair", "white hair", "silver hair", "gray hair", 
        "multicolored hair", "two tone hair", "ombre hair", 
        "dyed hair", "pastel hair", "rainbow hair", "gradient hair", 
        "neon hair", "metallic hair", "vibrant hair"
    ],
    eyesColor: [
        "Black Eyes", "Blue Eyes", "Brown Eyes", "Gray Eyes", 
        "Green Eyes", "Orange Eyes", "Pink Eyes", "Purple Eyes", 
        "Red Eyes", "White Eyes", "Yellow Eyes"
    ]
};

function removeTags(text, wantRemove, key) {
    const tags = wantRemove[key];
    const regex = new RegExp(tags.join('|'), 'gi');
    const withoutTags = text.replace(regex, '').replace(/\s\s+/g, ' ').trim();
    
    return withoutTags.replace(/,\s*,/g, ','); // Loại bỏ dấu phẩy cuối cùng (nếu có)
}

document.getElementById('warningButton').addEventListener('click', function() {
    // Lấy tất cả các thẻ có class "tag"
    const tags = document.querySelectorAll('.tags-container .tag');
    // Tạo một mảng để lưu giá trị của các thẻ
    const tagValues = [];

    // Lặp qua từng thẻ và lấy giá trị từ thuộc tính "data-value"
    tags.forEach(function(tag) {
        tagValues.push(tag.getAttribute('data-value'));
    });
   
    const textAreaValueWantRemove = document.getElementById('texteraWantRemove').value;
    
    // Chuyển đổi giá trị từ textarea thành mảng
 




    let element = document.getElementById("texteraout");
    let string = element.value;
    for (let i = 0; i < tagValues.length; i++) {
        // console.log(tagValues[i]);
        string = removeTags(string,wantRemove,tagValues[i])
        document.getElementById("out").style.visibility = "visible";
        document.getElementById("texteraout").textContent = "";
        document.getElementById("texteraout").textContent= string ;
    }
    let textAreaArray =  textAreaValueWantRemove.split(" , ")
    .map(item => item.trim().replace(/,/g, ''))
    .filter(item => item.length > 0);
    if (textAreaArray.length > 0) {
      if (textAreaArray.some(item => string.includes(item))) {
          // Nếu chuỗi string chứa ít nhất một phần tử thuộc textAreaArray
          // Xóa các phần tử thuộc textAreaArray khỏi chuỗi string
          textAreaArray.forEach(item => {
              string = string.replace(item, '');
          });
         let cleanedString = string.split(/,\s*/).filter(item => item.trim() !== "").join(", ");
         document.getElementById("out").style.visibility = "visible";
        document.getElementById("texteraout").textContent = "";
        document.getElementById("texteraout").textContent= cleanedString;
      } else {
          console.log("Chuỗi không chứa phần tử thuộc textAreaArray");
      }

  }
  




    
    

    
});

