// DEFAULT CODE ////////////////////////
const BASE_URL = "https://api.lyrics.ovh/v1/";

//選取 id 為 song-list 的 ul element做固定參數命名，方便接下dom操作
const songList = document.querySelector("#song-list");

//選取 id 為 lyrics-panel 的 div element做固定參數命名，方便接下dom操作
const lyricsPanel = document.querySelector("#lyrics-panel");

const album = {
  artist: "Adele",
  album: "25",
  tracks: [
    "Hello",
    "Send My Love (To Your New Lover)",
    "I Miss You",
    "When We Were Young",
    "Remedy",
    "Water Under the Bridge",
    "River Lea",
    "Love in the Dark",
    "Million Years Ago",
    "All I Ask",
    "Sweetest Devotion"
  ]
};


//1A.寫 呼叫曲目功能的函式
function showSongList(album) {
  //1B.用 for 圈列印出物件内歌曲的名字
  Object.values(album.tracks).forEach((val) => {
    //1C. 用Inner html+pills方式置入歌曲曲目
    
    /*1D.在 li 中植入 songList
         在 a 的 class 植入 lyrics-box,方便
    */
    songList.innerHTML += `
      <li class=" songList">
    <a class="nav-link lyrics-box" data-toggle="pill" href='#'>${val}</a>
     </li>
    `;
  });
}

//1B.呼叫曲目，這樣會一直出現所有曲目
showSongList(album);


//2A.撰寫顯示歌詞功能的函式
function showLyrics(song, lyrics) {
  /*2B.把函數接受到的 曲目以及其歌詞資料
      用 innerHTML 對id 為 lyrics-panel
      的 div element做嵌入*/
  lyricsPanel.innerHTML = `
     <h1>${song}</h1>
     <pre>${lyrics}</pre>
     `;
}

//3A.當有按鍵出發在 id 為 song-list 的 ul element範圍時，觸發時，就執行以下動作
songList.addEventListener("click", (event) => {
  
  //3B.在此ul 範圍點擊到 class為 .nav-link 範圍話，就執行以下動作
  if (event.target.matches(".nav-link")) {
  
    /*3C.針對已點擊到 class為 .nav-link 範圍,抽取其后代的“渲染”文本内容
    */
    let song = event.target.innerText;
    
    //3D.console 文本做確認
    console.log(song)

    /*3E.把截取曲目放到axios url 做整合
         原本給予url+ 歌手名字字串+ template literal 嵌入曲目的文本
    */
    axios.get(BASE_URL + `adele/${song}`).then(function (response) {
       /*3F.對已取得的歌詞宣告為固定變數*/
        let lyrics = response.data.lyrics;
      
      /*3G.呼叫顯示歌詞的函式，把曲目以及歌詞資料帶入
          就完成顯示歌詞當點擊相關曲目的功能
      */
        showLyrics(song, lyrics);
      })
  }
});
