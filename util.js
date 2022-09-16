//===========================================================//
//================= parameter를 불러오는 함수 ==================//
//===========================================================//

function getParameter(name) {
    return location.href.split(`${name}=`)[1];
  }
  

//===========================================================//
//======================= paging 함수 ========================//
//===========================================================//

function paging() {
    // 주소의 parameter에서 현재 페이지와 조회 게시물을 불러온다.
    let curPage = getParameter('page');
    console.log(":" + curPage + ":");
    if(curPage === undefined) curPage = 1;
    const range = agoraStatesDiscussions.length - curPage * 10;
    const startContents = (curPage - 1 ) * 10;
    const countContents = range < 0 ? curPage * 10 + range : curPage * 10;
    
    const result = [curPage, range, startContents, countContents];

    console.log(`게시물 시작 : ${startContents + 1} | 게시물 종료 : ${countContents}`)
    return result;
}

function pageBtn() {
    const paging = document.querySelector("#paging_area");
    const length = agoraStatesDiscussions.length;
    const page = length % 10 === 0 ? length / 10 : length / 10 + 1;
  
    for(let i = 1; i < page; i++) {
      const btn = document.createElement('a');
      btn.href = `?page=${i}`;
      btn.textContent = i;
      paging.append(btn);
    }
    return;   
}

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

    return `${year}-${month}-${date}T${hour}:${minute}${second}Z`;
}


  