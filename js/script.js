function createImgElement (size, url){
    let element = document.createElement("img");
        element.className = "images";
        element.src = url;
        element.width = size;
        element.height = size;
    
    return element;
}

//画像のリストを挿入する位置を取得
let div = document.querySelector("div.col.span_1_of_2"); 

let textBlock1 = document.createElement("div");
    textBlock1.id = "textBlock1";
let text32 = document.createTextNode("単体で使う場合：");

let textBlock2 = document.createElement("div");   
    textBlock2.id = "textBlock2";
let text22 = document.createTextNode("文字列と同時に使う場合：");

let textBlock3 = document.createElement("div");
    textBlock3.id = "textBlock3";
let text16 = document.createTextNode("リアクション：");

div.appendChild(textBlock1);
div.appendChild(textBlock2);
div.appendChild(textBlock3);

textBlock1.appendChild(text32);
textBlock2.appendChild(text22);
textBlock3.appendChild(text16);

document.getElementById("emojiimg").addEventListener("change", function () {
    if (this.files.length > 0) {
        //選択されたファイル情報を取得
        let file = this.files[0];

        // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (e) {
            let images = document.getElementsByClassName("images");

            while(images[0]){
                images[0].parentNode.removeChild(images[0]);
            }

            let img32 = createImgElement(32, e.target.result);
            let img22 = createImgElement(22, e.target.result);
            let img16 = createImgElement(16, e.target.result);

            textBlock1.appendChild(img32);
            textBlock2.appendChild(img22);
            textBlock3.appendChild(img16);
        }
    }
});