document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form
});
// Handle the dropdown selection

var allselected = [];

// Handle the dropdown selection and add the selected option to the display area
document.getElementById('tag-select').addEventListener('change', function() {
    const selectedValue = this.value; // Lấy giá trị của mục đã chọn
    const displayArea = document.getElementById('selected-content');

    // Chỉ thêm vào nếu lựa chọn không phải là mục mặc định
    if (selectedValue !== "default_value") { // Thay đổi "default_value" thành giá trị mặc định thực tế của bạn
        // Kiểm tra xem mục đã được thêm chưa
        const existingItems = displayArea.querySelectorAll('.selected-item');
        let itemExists = false;

        existingItems.forEach(item => {
            // So sánh nội dung văn bản (text content) của phần tử với selectedValue
            if (item.childNodes[0].textContent.trim() === selectedValue) {
                itemExists = true; // Mục đã tồn tại
            }
        });

        // Nếu mục chưa tồn tại thì thêm vào
        if (!itemExists) {
            // Tạo một phần tử mới để hiển thị lựa chọn
            const selectedItem = document.createElement('div');
            selectedItem.classList.add('selected-item');

            // Tạo nội dung cho phần tử với nút xóa
            selectedItem.innerHTML = `
                ${selectedValue} <!-- In ra giá trị thay vì text -->
                <button class="remove-btn">&times;</button>
            `;

            // Cập nhật allselected
            allselected.push(selectedValue);
            console.log('All selected:', allselected); // In ra allselected sau khi thêm

            // Thêm sự kiện cho nút xóa để loại bỏ phần tử khỏi danh sách
            selectedItem.querySelector('.remove-btn').addEventListener('click', function() {
                displayArea.removeChild(selectedItem);
                console.log('Item removed:', selectedValue);

                // Xóa giá trị khỏi allselected khi nút xóa được nhấn
                allselected = allselected.filter(item => item !== selectedValue);
                console.log('All selected after removal:', allselected); // In ra allselected sau khi xóa
            });

            // Thêm phần tử vào vùng hiển thị
            displayArea.appendChild(selectedItem);
        } 
    }

    // Reset dropdown về giá trị mặc định sau khi chọn
    this.value = "";
});





// Xử lý sự kiện khi nút Submit được nhấn
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn việc reload trang

    const siteSelect = document.getElementById('site-select');
    const selectedValue = siteSelect.value;
    const textArea = document.getElementById('exampleTextarea');
    const outputArea = document.getElementById('outera');
    var output
    // Kiểm tra giá trị được chọn
    if (selectedValue === "danbooru") {
        const textContent = textArea.value;

        // Bước 1: Chuyển dấu hỏi thành dấu phẩy và xóa các số với ký tự M/K
        const modifiedText = textContent
        .split('\n') // Tách các dòng
        .filter(line => line && !line.includes('?')) // Lọc các dòng không trống và không chứa '?'
        .map(line => line.split(' ')[0]) // Lấy phần đầu tiên của mỗi dòng (tag)
        .join(', '); // Kết hợp các tag lại thành chuỗi, phân cách bởi dấu phẩy

        // Hiển thị kết quả trong output textarea
        output = modifiedText;
    } 

    else {
        

        
        const input = textArea.value; // Lấy giá trị từ textArea
        const result = input.replace(/^\? /, '')  // Xóa dấu ? đầu tiên
                    .replace(/ \d+\? /g, ', ')  // Thay "số + ?" bằng dấu phẩy và khoảng trắng
                    .replace(/ \d+$/, '');  // Xóa số ở cuối chuỗi (nếu có)

    
    
    
                    output = result; // Gán giá trị cho outputArea
    }

   
   
    let text = output; // Hoặc bất kỳ văn bản nào bạn muốn xử lý

    // Duyệt qua allselected và loại bỏ các tag
    allselected.forEach(selectedTag => {
        text = removeTags(text, attributes, selectedTag);
    });

    console.log('Processed text:', text);
    outputArea.value = text; // Cập nhật giá trị của outputArea

});


// Hàm để loại bỏ các tag từ văn bản
function removeTags(text, wantRemove, key) {
    const tags = wantRemove[key];
    if (!tags) return text; // Nếu không có tags cho key, trả về văn bản gốc
    const regex = new RegExp(tags.join("|"), "gi");
    const withoutTags = text.replace(regex, "").replace(/\s\s+/g, " ").trim();
  
    return withoutTags.replace(/,\s*,/g, ","); // Loại bỏ dấu phẩy cuối cùng (nếu có)
}
























const attributes = {
    sizebreasts: [
        "flat chest",
        "small breasts",
        "medium breasts",
        "large breasts",
        "huge breasts",
        "gigantic breasts",
    ],
    abs: [
        "biceps",
        "muscular",
        "toned",
        "abs",
    ],
    // Horns
    horns: [
        "horned headwear",
        "horned helmet",
        "horned hood",
        "horned mask",
        "black horns",
        "blue horns",
        "brown horns",
        "purple horns",
        "red horns",
        "white horns",
        "single horn",
        "multiple horns",
        "asymmetrical horns",
        "mismatched horns",
        "uneven horns",
        "broken horns",
        "cone horns",
        "cow horns",
        "curled horns",
        "demon horns",
        "dragon horns",
        "fake horns",
        "fiery horns",
        "glowing horns",
        "giraffe horns",
        "goat horns",
        "gradient horns",
        "hair horns",
        "huge horns",
        "low horns",
        "mechanical horns",
        "sheep horns",
        "tree horns",
        "skin-covered horns",
        "horn bow",
        "horn ornament",
        "horn ribbon",
        "horn ring",
        "horns",
        "broken horn",
    ],
    // Ears
    ears: [
        "animal ears",
        "animal ear fluff",
        "bat ears",
        "bear ears",
        "rabbit ears",
        "cat ears",
        "cow ears",
        "deer ears",
        "dog ears",
        "ferret ears",
        "fox ears",
        "goat ears",
        "horse ears",
        "kemonomimi mode",
        "lion ears",
        "monkey ears",
        "mouse ears",
        "panda ears",
        "pikachu ears",
        "pig ears",
        "raccoon ears",
        "sheep ears",
        "squirrel ears",
        "tiger ears",
        "wolf ears",
        "fake animal ears",
        "animal ear headphones",
        "bear ear headphones",
        "cat ear headphones",
        "rabbit ear headphones",
        "floppy ears",
        "hair ears",
        "other ears",
        "pointy ears",
        "long pointy ears",
        "robot ears",
        "number of ears",
        "extra ears",
    ],
    tails: [
        "main",
        "tail",
        "number of tails",
        "multiple tails",
        "no tail",
        "types of tail",
        "supernatural or fictional tails",
        "demon tail",
        "dragon tail",
        "ghost tail",
        "pikachu tail",
        "snake head tail",
        "elemental tails",
        "fiery tail",
        "tails of mammals",
        "bear tail",
        "rabbit tail",
        "cat tail",
        "cow tail",
        "deer tail",
        "dog tail",
        "ermine tail",
        "fox tail",
        "horse tail",
        "leopard tail",
        "lion tail",
        "monkey tail",
        "mouse tail",
        "pig tail",
        "sheep tail",
        "squirrel tail",
        "tiger tail",
        "wolf tail",
        "tails of other animals",
        "crocodilian tail",
        "fish tail",
        "scorpion tail",
        "snake tail",
        "tadpole tail",
        "tails and objects",
        "tail bell",
        "tail bow",
        "tail ornament",
        "tail piercing",
        "tail ribbon",
        "tail ring",
    ],
    eyesColor: [
        "aqua eyes",
        "black eyes",
        "blue eyes",
        "brown eyes",
        "green eyes",
        "grey eyes",
        "orange eyes",
        "purple eyes",
        "pink eyes",
        "red eyes",
        "white eyes",
        "yellow eyes",
        "amber eyes",
        "multiple colors of the iris",
        "heterochromia",
        "multicolored eyes",
    ],
    hairStyle: [
        "very short hair",
        "short hair",
        "medium hair",
        "long hair",
        "very long hair",
        "absurdly long hair",
        
        "big hair",
        "bald",
        "bald girl",
    
        // Short Hair
        "bob cut",
        "inverted bob",
        "bowl cut",
        "buzz cut",
        "chonmage",
        "crew cut",
        "flattop",
        "okappa",
        "pixie cut",
        "undercut",
    
        // Medium Hair
        "flipped hair",
        "wolf cut",
    
        // Long Hair
        "hime cut",
        "mullet",
    
        // Tied Hair
        "bantu knots",
        "bow-shaped hair",
        "shuangyaji",
        "braid",
        "braided bangs",
        "front braid",
        "side braid",
        "french braid",
        "cornrows",
        "crown braid",
        "dreadlocks",
        "single braid",
        "multiple braids",
        "twin braids",
        "low twin braids",
        "tri braids",
        "quad braids",
        "flower-shaped hair",
        "hair bun",
        "braided bun",
        "single hair bun",
        "double bun",
        "cone hair bun",
        "doughnut hair bun",
        "heart hair bun",
        "triple bun",
        "cone hair bun",
        "hair rings",
        "feixianji",
        "katsuyamamage",
        "single hair ring",
        "half updo",
        "half up braid",
        "half up half down braid",
        "one side up",
        "two side up",
        "low-braided long hair",
        "low-tied long hair",
        "mizura",
        "multi-tied hair",
        "nihongami",
        "ponytail",
        "folded ponytail",
        "front ponytail",
        "high ponytail",
        "short ponytail",
        "side ponytail",
        "split ponytail",
        "star-shaped hair",
        "topknot",
        "twintails",
        "low twintails",
        "short twintails",
        "uneven twintails",
        "tri tails",
        "quad tails",
        "quin tails",
        "twisted hair",
    
        // Tall Hair
        "afro",
        "huge afro",
        "beehive hairdo",
        "crested hair",
        "liangbatou",
        "pompadour",
        "quiff",
        "shouten pegasus mix mori",
    
        // Hair Texture
        "curly hair",
        "drill hair",
        "twin drills",
        "tri drills",
        "hair flaps",
        "messy hair",
        "pointy hair",
        "ringlets",
        "spiked hair",
        "straight hair",
        "wavy hair",
    
        // Front of the Head
        "bangs",
        "arched bangs",
        "asymmetrical bangs",
        "bangs pinned back",
        "blunt bangs",
        "braided bangs",
        "crossed bangs",
        "choppy bangs",
        "diagonal bangs",
        "dyed bangs",
        "fanged bangs",
        "hair over eyes",
        "hair over one eye",
        "long bangs",
        "parted bangs",
        "curtained hair",
        "wispy bangs",
        "short bangs",
        "swept bangs",
        "hair between eyes",
        "hair intakes",
        "single hair intake",
        "sidelocks",
        "asymmetrical sidelocks",
        "drill sidelocks",
        "low-tied sidelocks",
        "sidelocks tied back",
        "single sidelock",
        "widow's peak",
    
        // Top of the Head
        "ahoge",
        "heart ahoge",
        "huge ahoge",
        "antenna hair",
        "heart antenna hair",
        "comb over",
        "hair pulled back",
        "hair slicked back",
        "mohawk",
        "oseledets",
    
        // Back of the Head
        "lone nape hair",
        
        // Braided
        "braided bangs",
        "braided bun",
        "braided hair rings",
        "braided ponytail",
        "braided sidelock",
        "crown braid",
        "folded braid",
        "front braid",
        "french braided ponytail",
        "french braided twintails",
        "half up braid",
        "half up half down braid",
        "low-braided long hair",
        "bun with braided base",
        "ponytail with braided base",
        "twintails with braided base",
        "short braid",
        "single braid",
        "twin braids",
        "tri braids",
        "quad braids",
        "braiding hair",
        "flower braid",
        "ribbon braid",
        "braided beard",
        "braided mustache",
        "multi-tied hair",
        "ringlets",
        "twin braids",
        "tri braids",
        "quad braids"
    ],
    hairColor: [
        "aqua hair", // may overlap with blue and green
        "black hair", // may overlap with brown, blue and grey
        "blonde hair", // may overlap with orange and brown
        "blue hair", // may overlap with aqua and purple
        "light blue hair", // may overlap with aqua
        "dark blue hair", // may overlap with black
        "brown hair", // may overlap with black, orange and red
        "light brown hair", // may overlap with blonde and brown
        "green hair", // may overlap with aqua
        "dark green hair",
        "light green hair",
        "grey hair", // may overlap with white and black
        "orange hair", // may overlap with brown and red
        "pink hair", // may overlap with purple and red
        "purple hair", // may overlap with blue and pink
        "light purple hair", // may overlap with pink and purple
        "red hair", // may overlap with orange and brown
        "white hair", // may overlap with grey
    
        // Multiple colors
        "multicolored hair",
        "colored inner hair",
        "colored tips",
        "roots",
        "gradient hair",
        "patterned hair",
        "rainbow hair",
        "split-color hair",
        "spotted hair",
        "streaked hair",
        "striped hair",
        "raccoon tails",
        "two-tone hair",
    
        // Misc
        "alternate hair color",
        "translucent hair"
    ],
    eyewear: [
        "bespectacled", // for characters who don't normally wear glasses
        "coke-bottle glasses",
        "eyewear on head",
        "eyewear view",
        "eyewear strap",
        "groucho glasses",
        "glass lens",
        "glasses case",
        "jimiko",
        "lensless glasses",
        "looking for glasses",
        "looking over eyewear",
        "nose pads",
        "opaque glasses",
        "rimless eyewear",
        "semi-rimless eyewear",
        "unworn eyewear",
        "eyewear hang",
        "glasses",
        "goggles",
        "monocle",
        "sunglasses",
        "Eyewear",
        
        // Frame colors
        "aqua-framed eyewear",
        "black-framed eyewear",
        "blue-framed eyewear",
        "brown-framed eyewear",
        "green-framed eyewear",
        "grey-framed eyewear",
        "orange-framed eyewear",
        "pink-framed eyewear",
        "purple-framed eyewear",
        "red-framed eyewear",
        "white-framed eyewear",
        "two-tone eyewear",
        "yellow-framed eyewear",
      
        // Lens colors
        "aqua-tinted eyewear",
        "blue-tinted eyewear",
        "brown-tinted eyewear",
        "gradient-tinted eyewear",
        "green-tinted eyewear",
        "grey-tinted eyewear",
        "multicolor-tinted eyewear",
        "rainbow-tinted eyewear",
        "orange-tinted eyewear",
        "pink-tinted eyewear",
        "purple-tinted eyewear",
        "red-tinted eyewear",
        "yellow-tinted eyewear",
      
        // Types
        "animal-themed eyewear",
        "cat eye-framed eyewear",
        "food-themed eyewear",
        "heart-shaped eyewear",
        "rectangular eyewear",
        "rimless eyewear",
        "round eyewear",
        "semi-circular eyewear",
        "semi-rimless eyewear",
        "over-rim eyewear",
        "under-rim eyewear",
        "teardrop-framed glasses",
        "triangular eyewear",
        "tortoiseshell-framed eyewear",
      
        // Actions
        "alternate eyewear",
        "adjusting eyewear",
        "bespectacled",
        "cleaning glasses",
        "crooked eyewear",
        "cum on eyewear",
        "eyewear on head",
        "eyewear on headwear",
        "eyewear strap",
        "eyewear switch",
        "eyewear view",
        "fogged glasses",
        "hand on eyewear",
        "looking over eyewear",
        "no eyewear",
        "removing eyewear",
        "unworn eyewear",
        "eyewear hang",
        "eyewear in mouth",
        "holding removed eyewear",
        "looking for glasses",
      
        // Accessories
        "eyewear strap",
        "glasses case",
        "nose pads",
        
        // Glasses Types
        "3D glasses",
        "aviator glasses",
        "coke-bottle glasses",
        "diving mask",
        "novelty glasses",
        "heart-shaped eyewear",
        "star-shaped eyewear",
        "teardrop-framed glasses",
        "flight goggles",
        "groucho glasses",
        "lorgnette",
        "opaque glasses",
        "opera glasses",
        "pince-nez",
        "safety glasses",
        "scouter",
        "ski goggles",
        "X-ray glasses",
      
        // Sunglasses
        "aviator sunglasses",
        "Kamina shades",
        "shutter shades",
        "Simon shades",
        "deal with it (meme) (pixelated glasses)",
        
        // See also
      ],
      backgrounds: [
        // Background Colors
        "aqua background",
        "beige background (deprecated)",
        "black background",
        "blue background",
        "brown background",
        "green background",
        "grey background",
        "light brown background",
        "orange background",
        "pink background",
        "purple background",
        "red background",
        "tan background (deprecated)",
        "white background",
        "yellow background",
    
        // Multiple Colors
        "gradient background",
        "greyscale with colored background",
        "monochrome background",
        "multicolored background",
        "rainbow background",
        "heaven condition",
        "two-tone background",
    
        // Patterns
        "argyle background",
        "checkered background",
        "cross background",
        "dotted background",
        "food-themed background",
        "grid background",
        "halftone background",
        "honeycomb background",
        "marble background",
        "paw print background",
        "plaid background",
        "polka dot background",
        "simple background",
        "snowflake background",
        "spiral background",
        "strawberry background",
        "striped background",
        "sunburst background",
    
        // Other
        "AI-generated background",
        "abstract background",
        "animal background",
        "text background",
        "backlighting",
        "blending",
        "blurry background",
        "card background",
        "chibi inset",
        "drama layer",
        "fiery background",
        "flag background",
        "floral background",
        "fruit background",
        "game screenshot background",
        "heart background",
        "imageboard colors",
        "lace background",
        "mosaic background",
        "paneled background",
        "photo background",
        "projected inset",
        "Sofmap background",
        "sparkle background",
        "starry background",
        "transparent background",
        "zoom layer"
    ],
    censored: [
        // Censor types
        "bar censor",
        "blank censor",
        "blur censor",
        "glitch censor",
        "heart censor",
        "light censor",
        "mosaic censoring",
        "scribble censor",
        "novelty censor",
        "character censor",
        "censored by text",
        "flower censor",
        "interface censor",
        "emoji censor",
    
        // Non-sexual censorship
        "identity censor",
        "fake censor",
        "censored food",
        "censored text",
        "censored gesture",
        "censored violence",
    
        // See also
        "convenient censoring",
        "hair censor",
        "tail censor",
        "out-of-frame censoring",
        "pointless censoring",
        "uncensored",
        "censored",
        "censored background",
    
        // Explicit body parts
        "censored anus",
        "censored nipples",
        "censored clitoris",
        "censored testicles",
        "censored urethra",
    
        // Non-sexual censorship (continued)
        "censored gesture",
        "censored poop",
        "censored profanity",
        "censored symbol",
        "censored text",
        "redaction",
        "censored violence",
        "fake censor",
        "bubble filter",
        "censored eyebrows",
        "censored feet",
        "censored food",
        "censored hands",
        "censored insect",
        "identity censor",
        "uncensored",
        "decensored",
    
        // Visual forms of censorship
        "diegetic censorship",
        "blood censor",
        "censored with cum",
        "convenient censoring",
        "convenient arm",
        "convenient head",
        "convenient leg",
        "soap censor",
        "steam censor",
        "feather censor",
        "fire censor",
        "flower censor",
        "petal censor",
        "food censor",
        "hair censor",
        "light censor",
        "necklace censor",
        "one finger selfie challenge",
        "ribbon censor",
        "smoke censor",
        "tail censor",
        "tentacle censor",
        "water censor",
        "wing censor",
    
        // Non-diegetic censorship
        "fake scrollbar",
        "out-of-frame censoring",
        "superimposed censorship",
        
        // Censor shape
        "bar censor",
        "blank censor",
        "blur censor",
        "censored by text",
        "emoji censor",
        "flower censor",
        "glitch censor",
        "heart censor",
        "light censor",
        "novelty censor",
        "can't show this",
        "character censor",
        "interface censor",
        "laughing man",
        "Patreon logo censor",
        "rabbit censor",
        "tape censor",
        "treasure mark censor",
        "scribble censor",
        "shadow censor",
        "silhouette censor",
        "sparkle censor",
        "speech bubble censor",
        "star censor",
    
        // Censor style
        "blur censor",
        "checkered censor",
        "inconsistent censoring",
        "mosaic censoring",
        "pointless censoring",
        "removable censorship",
        "invert color censor",
        "transparent censoring",
    
        // Auditory forms of censorship
        "bleep censor"
    ],
    
    skins: [
        // Skin tones
        "dark skin",
        "very dark skin",
        "dark-skinned female",
        "dark-skinned male",
        "dark-skinned other",
        "pale skin",
        "tan",
        "tanlines",
        "sun tattoo",
    
        // Abnormal colors
        "black skin",
        "blue skin",
        "green skin",
        "grey skin",
        "orange skin",
        "pink skin",
        "purple skin",
        "red skin",
        "white skin",
        "yellow skin",
    
        // Colors by material
        "metal skin",
        "plastic skin"
    ],
    

    
    
    
};