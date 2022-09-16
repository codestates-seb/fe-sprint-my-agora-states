//===========================================================//
//================= parameter를 불러오는 함수 ==================//
//===========================================================//

function getParameter(name) {
    return location.href.split(`${name}=`)[1];
  }
  

//===========================================================//
//======================= paging 함수 ========================//
//===========================================================//
const preBtn = document.querySelector('#preBtn');
const nextBtn = document.querySelector('#nextBtn');
const length = agoraStatesDiscussions.length;
let curPage = getParameter('page');
const endPage = parseInt(length % 5 === 0 ? length / 5 : length / 5 + 1);
const pageArea = document.querySelector("#pageBtn");

function paging() {
    // 주소의 parameter에서 현재 페이지와 조회 게시물을 불러온다.
    console.log(":" + curPage + ":");
    if(curPage === undefined) curPage = 1;
    const range = agoraStatesDiscussions.length - curPage * 5;
    const startContents = (curPage - 1 ) * 5;
    const countContents = range < 0 ? curPage * 5 + range : curPage * 5;
    
    const result = [curPage, range, startContents, countContents];

    console.log(`게시물 시작 : ${startContents + 1} | 게시물 종료 : ${countContents}`)
    return result;
}

function pageBtn() {
    for(let i = 1; i <= endPage; i++) {
      const btn = document.createElement('a');
      btn.href = `?page=${i}`;
      btn.textContent = i;
      if(i === Number(curPage)) btn.id = "current";
      pageArea.append(btn);
    }
    return;   
}


function prePage() {
  if(Number(curPage) > 1) location.href= `?page=${Number(curPage) - 1}`
}

function nextPage() {
  console.log(endPage);
  if(curPage < endPage) location.href= `?page=${Number(curPage) + 1}`
}

preBtn.onclick = prePage;
nextBtn.onclick = nextPage;

//===========================================================//
//================== 현재 시간을 호출하는 함수 ===================//
//===========================================================//

function curTime() {
    const today = new Date();

    //날짜 불러오기
    const year  = today.getFullYear();
    const month = today.getMonth() + 1;  
    const date  = today.getDate(); 

    //시간 불러오기
    let hour = today.getHours();
    let minute = today.getMinutes(); 
    let second = today.getSeconds(); 

    return `${year}-${month < 10 ? "0" + month : month}-${date}T${hour}:${minute}:${second}Z`;
}

//===========================================================//
//====================== popup 제어 함수 ======================//
//===========================================================//
const quitBtn = document.querySelector("#quit")
const popContent = document.querySelector("#popup_content")

quitBtn.addEventListener('click', popOnOff);

function popOnOff(event) {
  popup.style.display = popup.style.display === "block" ? "none" : "block";
  console.log(event.target.id);
}

function popRender(id) {
  console.log(id);
}