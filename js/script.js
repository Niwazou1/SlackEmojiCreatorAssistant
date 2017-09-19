function createImgElement (size, url){
    let element = document.createElement("img");
        element.className = "images";
        element.src = url;
        element.width = size;
        element.height = size;
    
    return element;
}

document.getElementById("emojiimg").addEventListener("change", function () {
    if (this.files.length > 0) {
        //選択されたファイル情報を取得
        let file = this.files[0];

        // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (e) {
            let div = document.querySelector("div.col.span_1_of_2"); 
            let elements = document.getElementsByClassName("images");

            while(elements[0]){
                div.removeChild(elements[0]);
            }

            let img32 = createImgElement(32, e.target.result);
            let img22 = createImgElement(22, e.target.result);
            let img16 = createImgElement(16, e.target.result);

            div.appendChild(img32);
            div.appendChild(img22);
            div.appendChild(img16);
        }
    }
});