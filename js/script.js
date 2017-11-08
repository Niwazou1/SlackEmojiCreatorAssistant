// 繰り返す処理を関数化
function makeImageElement (size, url){
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

function makeTextBlock(tagName, id){
  let textBlock = document.createElement(tagName);
      textBlock.id = id;
  return textBlock;
}

function getImageSize(url){
  let image = document.createElement("img");
      image.src = url;
      image.id = "getImageSize";
      
  return image;
}


// ステータスに表示するテキストと表示する場所を用意
const LABEL_EMOJI_ONLY = "単体で使う場合：";
const LABEL_WITH_TEXT = "文字列と同時に使う場合：";
const LABEL_REACTION = "リアクション：";
const LABEL_FILE_SIZE = "ファイルのサイズ：";
let labels = [
  document.createTextNode(LABEL_EMOJI_ONLY),
  document.createTextNode(LABEL_WITH_TEXT),
  document.createTextNode(LABEL_REACTION),
  document.createTextNode(LABEL_FILE_SIZE)
];
let  messages = {
  registerable: "この画像は登録可能です",
  exceedCapacity: "画像の容量が64KBを超えています",
  beyondTheSizeLimit: "画像のサイズが128pxを超えています",
  nonCompliantFileFormat: "このファイル形式は非対応です"
};

// Slackが提示した要件を定義
const FILE_SIZE_LIMIT = 64 * 1024; // 64KB
const IMAGE_SIZE_LIMIT = 128; // 128px

//画像のリストを挿入する位置を取得
let div = document.querySelector("div.col.span_1_of_2");


// 画像のステータスを表示するエリアを整備
// labelやtextを挿入する場所を作る
let emojiOnly = makeTextBlock("div", "emojiOnly");
let withText = makeTextBlock("div", "withText");
let reaction = makeTextBlock("div", "reaction");
let fileSizeText = makeTextBlock("div", "fileSizeText");
let messageArea = makeTextBlock("p", "messageArea");
let textBlocks = [
  emojiOnly,
  withText,
  reaction,
  fileSizeText,
  messageArea
];
let fileSizeArea = makeTextBlock("p", "fileSizeArea"); // これはdivにくっつける訳ではないので順番にappendChildしない



// ターゲットとなる親ノードにlabelを表示する場所をくっつける
for(let elem of textBlocks){
  div.appendChild(elem);
}

// 上で追加した場所にlabelsの中身を入れる
for(let i = 0; i < labels.length; i++){
  textBlocks[i].appendChild(labels[i]);
}

// Input type:fileが変更された(ファイルが選択された)とき
document.getElementById("emojiimg").addEventListener("change", function(){
  // 　ファイルが入っているかチェック
  if(this.files.length > 0){
    // 選択されたファイル情報を取得
    let file = this.files[0];

    // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
    let reader = new FileReader();
    reader.readAsDataURL(file);

    //ファイルが読み込み終わったタイミングで発動
    reader.onload = function(e){
      // 挿入した画像たちを取得
      let images = document.getElementsByClassName("images");
      let fileSize = file.size;
      let imageSize = getImageSize(e.target.result);

      // 複数回使用する場合のために前回の結果を削除する
      while(images[0]){
        images[0].parentNode.removeChild(images[0]);
      }
      if(fileSizeArea.firstChild){ // fileSizeAreaにファイルのサイズが入っていた場合削除
        fileSizeArea.removeChild(fileSizeArea.firstChild);
      }

      // 表示する画像のステータスをノードにする
      let image32 = makeImageElement(32, e.target.result);  
      let image22 = makeImageElement(22, e.target.result);
      let image16 = makeImageElement(16, e.target.result);
      let previewImages = [image32, image22, image16];

      // そして入れる
      for(let i = 0; i < previewImages.length; i++){
        textBlocks[i].appendChild(previewImages[i]);
      }
      textBlocks[3].appendChild(fileSizeArea);
      fileSizeArea.appendChild(document.createTextNode((fileSize / 1024).toFixed(2).toString() + "KB"));// ファイルのサイズの単位をKBにした後四捨五入で綺麗にする
      

      //エラーをキャッチ
      if(fileSize > FILE_SIZE_LIMIT){ // ファイルのサイズが64KBを超える時
        messageArea.appendChild(document.createTextNode(messages.exceedCapacity));
      } else if(file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/gif"){ // ファイル形式が対応していない時
        messageArea.appendChild(document.createTextNode(messages.nonCompliantFileFormat));
      }/* else if(imageSize.width > IMAGE_SIZE_LIMIT || imageSize.height > IMAGE_SIZE_LIMIT){ // 画像の大きさが128pxを超える時
        messageArea.appendChild(document.createTextNode(messages.beyondTheSizeLimit));        // この部分は未完成
      }*/ else {
        messageArea.appendChild(document.createTextNode(messages.registerable));
      }
    }
  }
})