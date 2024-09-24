const wantRemove = {
    hairStyles: [
        "very short hair", "short hair", "medium hair", "long hair", "very long hair", "absurdly long hair", 
        "big hair", "bald", "bald girl", 
        // Hairstyles
        "bob cut", "inverted bob", "bowl cut", "buzz cut", "chonmage", "crew cut", "flattop", "okappa", "pixie cut", "undercut",
        // Medium hair
        "flipped hair", "wolf cut", 
        // Long hair
        "hime cut", "mullet", 
        // Tied hair
        "bow-shaped hair", "shuangyaji", "braid", "braided bangs", "front braid", "side braid", "french braid", "cornrows", 
        "crown braid", "dreadlocks", "single braid", "multiple braids", "twin braids", "low twin braids", "tri braids", "quad braids", 
        "flower-shaped hair", "hair bun", "braided bun", "single hair bun", "double bun", "cone hair bun", "doughnut hair bun", 
        "heart hair bun", "triple bun", "hair rings", "feixianji", "katsuyamamage", "single hair ring", "half updo", "half up braid", 
        "half up half down braid", "one side up", "two side up", "low-braided long hair", "low-tied long hair", "mizura", "multi-tied hair", 
        "nihongami", "ponytail", "folded ponytail", "front ponytail", "high ponytail", "short ponytail", "side ponytail", "split ponytail", 
        "star-shaped hair", "topknot", "twintails", "low twintails", "short twintails", "uneven twintails", "tri tails", "quad tails", 
        "quin tails", "twisted hair", 
        // Tall hair
        "afro", "huge afro", "beehive hairdo", "crested hair", "liangbatou", "pompadour", "quiff", "shouten pegasus mix mori",
        // Hair texture
        "curly hair", "drill hair", "twin drills", "tri drills", "hair flaps", "messy hair", "pointy hair", "ringlets", 
        "spiked hair", "straight hair", "wavy hair",
        // Front of the head
        "bangs", "arched bangs", "asymmetrical bangs", "bangs pinned back", "blunt bangs", "braided bangs", "crossed bangs", 
        "choppy bangs", "diagonal bangs", "dyed bangs", "fanged bangs", "hair over eyes", "hair over one eye", "long bangs", 
        "parted bangs", "curtained hair", "wispy bangs", "short bangs", "swept bangs", "hair between eyes", "hair intakes", 
        "single hair intake", "sidelocks", "asymmetrical sidelocks", "drill sidelocks", "low-tied sidelocks", "sidelocks tied back", 
        "single sidelock", "widow's peak",
        // Top of the head
        "ahoge", "heart ahoge", "huge ahoge", "antenna hair", "heart antenna hair", "comb over", "hair pulled back", 
        "hair slicked back", "mohawk", "oseledets",
        // Back of the head
        "lone nape hair",
        // Head hair over the body
        "hair bikini", "hair censor", "hair in own mouth", "hair over breasts", "hair over one breast", "hair over crotch", 
        "hair over shoulder", "hair scarf",
        // Misc
        "alternate hairstyle", "hair down", "hair up", "asymmetrical hair", "sidecut", "blunt ends"
    ],
    hairColors: [
        // Specific colors
        "aqua hair", "black hair", "blonde hair", "blue hair", "light blue hair", "dark blue hair", 
        "brown hair", "light brown hair", "green hair", "dark green hair", "light green hair", 
        "grey hair", "orange hair", "pink hair", "purple hair", "light purple hair", 
        "red hair", "white hair",
        // Multiple colors
        "multicolored hair", "colored inner hair", "colored tips", "roots", "gradient hair", 
        "patterned hair", "rainbow hair", "split-color hair", "spotted hair", "streaked hair", 
        "two-tone hair",
        // Misc
        "alternate hair color", "translucent hair"
    ],
    eyeStyles: [
        // Individual colors of the iris
        "aqua eyes", "black eyes", "blue eyes", "brown eyes", "green eyes", "grey eyes", 
        "orange eyes", "purple eyes", "pink eyes", "red eyes", "white eyes", "yellow eyes", 
        "amber eyes",
        // Multiple colors of the iris
        "heterochromia", "multicolored eyes",
        // Form of the iris
        "mismatched irises", "dashed eyes", "Pac-man eyes", "ringed eyes",
        // Pupils
        // Colors of the pupils
        "aqua pupils", "blue pupils", "brown pupils", "green pupils", "grey pupils", 
        "orange pupils", "pink pupils", "purple pupils", "red pupils", "white pupils", 
        "yellow pupils",
        // Form of the pupils
        "constricted pupils", "dilated pupils", "extra pupils", "horizontal pupils", 
        "no pupils", "slit pupils", "symbol-shaped pupils", "diamond-shaped pupils", 
        "flower-shaped pupils", "heart-shaped pupils", "star-shaped pupils", 
        "solid circle pupils", "cross-shaped pupils", "x-shaped pupils", "mismatched pupils",
        // Sclera
        "blue sclera", "black sclera", "blank eyes", "bloodshot eyes", "green sclera", 
        "mismatched sclera", "no sclera", "orange sclera", "red sclera", "yellow sclera",
        // Around the eyes
        "bags under eyes", "aegyo sal", "bruised eye", "flaming eyes", "glowing eyes", 
        "glowing eye",
        // More appearance
        "Animal or inhuman eyes", "button eyes", "cephalopod eyes", "compound eyes", 
        "horizontal pupils", "lens eye", "pixel eyes",
        // Stylistic eyes, for emotion or comedy
        "crazy eyes", "empty eyes", "dashed eyes", "heart-shaped eyes", "solid circle eyes", 
        "jitome", "tareme", "tsurime", "sanpaku", "sparkling eyes",
        // Series specific eyes
        "Geass", "Sharingan", "Mangekyou Sharingan", "Rinnegan", "Byakugan",
        // Other
        "eye reflection", "text in eyes",
        // Number of eyes
        "missing eye", "one-eyed", "third eye", "extra eyes", "no eyes",
        // Emotions and expressions
        "> <", "X3", "XD", "DX", "O o", "0 0", "3 3", "6 9", "@ @", "^ ^", "^o^", 
        "|_|", "= =", "+ +", ". .", "<o> <o>", "<|>_<|>", "blinking", "closed eyes", 
        "wince", "one eye closed", ";<", ";>", ";p",
        // Accessories for the eyes; Eyes covered
        "covering own eyes", "hair over eyes", "hair over one eye", "bandage over one eye", 
        "blindfold", "hat over eyes", "eyepatch", "eyelashes", "colored eyelashes", 
        "fake eyelashes", "eyes visible through hair", "glasses", "makeup", "eyeliner", 
        "eyeshadow", "mascara",
        // Gazes
        "eye contact", "looking afar", "looking around", "looking at another", 
        "looking at breasts", "looking at hand", "looking at hands", "looking at mirror", 
        "looking at phone", "looking at self", "looking at viewer", "looking at penis", 
        "looking at pussy", "looking at crotch", "looking away", "looking back", 
        "looking down", "looking outside", "looking over eyewear", 
        "looking through own legs", "looking to the side", "looking up",
        // Misc / Actions
        "akanbe", "artificial eye", "glass eye", "mechanical eye", "asymmetrical eyes", 
        "big eyes", "blind", "partially blind", "cross-eyed", "drawn on eyes", 
        "eyeball", "eye beam", "eye poke", "eye pop", "eye trail", "googly eyes", 
        "half-closed eyes", "lazy eye", "persona eyes", "pleading eyes", "rolling eyes", 
        "shading eyes", "squinting", "staring", "uneven eyes", "unusually open eyes", 
        "upturned eyes", "wall-eyed", "wide-eyed", "wince"
    ]
    
};
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("retrieveTextBtn").addEventListener("click", function() {
        var textareaContent = document.getElementById("exampleFormControlTextarea1").value;
        
        var newStr = textareaContent.replace(/\d+\?/g, ",");
        var finalStr = newStr.replace(/ ?(\? ?)|\? /g, "");
        var finalStr = finalStr.replace(/\b\d+\b/g, '');
        
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
 




    // let element = document.getElementById("texteraout");
    let string = finalStr;
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
   
        document.getElementById("out").style.visibility = "visible";
        document.getElementById("texteraout").textContent = "";
        document.getElementById("texteraout").textContent = string;
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




function removeTags(text, wantRemove, key) {
    const tags = wantRemove[key];
    const regex = new RegExp(tags.join('|'), 'gi');
    const withoutTags = text.replace(regex, '').replace(/\s\s+/g, ' ').trim();
    
    return withoutTags.replace(/,\s*,/g, ','); // Loại bỏ dấu phẩy cuối cùng (nếu có)
}

document.getElementById('warningButton').addEventListener('click', function() 
{
  
  




    
    

    
});

