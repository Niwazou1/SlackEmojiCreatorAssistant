function createImgElement (size, url){
    let element = document.createElement("img");
        element.className = "images";
        element.style.backgroundImage = `url(${url})`;    
        element.style.backgroundRepeat = "no-repeat";
        element.style.backgroundPosition = "50% 50%";
        element.style.backgroundSize = "contain";
        element.style.width =  size + "px";
        element.style.height = size + "px";

    return element;
}

//画像のリストを挿入する位置を取得
let div = document.querySelector("div.col.span_1_of_2"); 

//ステータスを表示するエリアを整備
let textBlock1 = document.createElement("div");
    textBlock1.id = "textBlock1";
let text32 = document.createTextNode("単体で使う場合：");

let textBlock2 = document.createElement("div");   
    textBlock2.id = "textBlock2";
let text22 = document.createTextNode("文字列と同時に使う場合：");

let textBlock3 = document.createElement("div");
    textBlock3.id = "textBlock3";
let text16 = document.createTextNode("リアクション：");

let textBlock4 = document.createElement("div");
    textBlock4.id = "textBlock4";
let textFileSize = document.createTextNode("ファイルのサイズ：");

let textBlockFileSize = document.createElement("p");
    textBlockFileSize.id = "fileSize";
let fileSizeUnit = document.createTextNode("KB");
//この機能はいずれ実装しまーす
let textBlock5 = document.createElement("div");
    textBlock5.id = "textBlock5";
let sizeAlert = document.createElement("p");
    sizeAlert.id = "sizeAlert";
let fileSizeSuccess = document.createTextNode("この画像は追加可能です");
let fileSizeAlert = document.createTextNode("ファイルサイズが大きすぎます！64KB以下にリサイズしてください");

div.appendChild(textBlock1);
div.appendChild(textBlock2);
div.appendChild(textBlock3);
div.appendChild(textBlock4);
div.appendChild(textBlock5);

textBlock1.appendChild(text32);
textBlock2.appendChild(text22);
textBlock3.appendChild(text16);
textBlock4.appendChild(textFileSize);
textBlock5.appendChild(sizeAlert);


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
            //挿入した画像たちとファイルのサイズを取得
            let images = document.getElementsByClassName("images"); 
            let targetElement = document.getElementById("fileSize");
            let targetNode = document.getElementById("sizeAlert");

            //2回目以降のために結果を削除
            if(images[0]){
                targetElement.removeChild(targetElement.childNodes.item(0));
            }  

            if(targetNode.childNodes.item(0)){
                targetNode.removeChild(targetNode.childNodes.item(0));
            }

            while(images[0]){
                images[0].parentNode.removeChild(images[0]);
            }

            //ファイルの大きさが64KBを超える場合、注意する
            if(file.size > 64000){
                targetNode.appendChild(fileSizeAlert);
            } else {   
                targetNode.appendChild(fileSizeSuccess);
            }

            let img32 = createImgElement(32, e.target.result);
            let img22 = createImgElement(22, e.target.result);
            let img16 = createImgElement(16, e.target.result);
            let fileSize = document.createTextNode((file.size / 1000).toString());

            textBlock1.appendChild(img32);
            textBlock2.appendChild(img22);
            textBlock3.appendChild(img16);
            textBlock4.appendChild(textBlockFileSize);
            textBlockFileSize.appendChild(fileSize);
            textBlockFileSize.appendChild(fileSizeUnit);           
        }
    }
});