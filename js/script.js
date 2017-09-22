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

//プレビューを表示するエリアを整備
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

//Input type:fileが変更された(ファイルが選択された)とき
document.getElementById("emojiimg").addEventListener("change", function () {
    //ファイルが入ってるかをチェック
    if (this.files.length > 0) {
        //選択されたファイル情報を取得
        let file = this.files[0];

        // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
        let reader = new FileReader();
        reader.readAsDataURL(file);

        //ファイルが読み込み終わったタイミングで発動
        reader.onload = function (e) {
            //挿入した画像たちを取得
            let images = document.getElementsByClassName("images");

            //最初に画像が入ってたら子ノードを削除
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