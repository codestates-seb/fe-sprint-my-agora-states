import { convertToDiscussion } from './convertDiscussion.js';

function createPaginationBtn(liPerPage,startIndex,endIndex,currentPage){
    //페이지네이션 버튼 엘레먼트 만들기
    const ul = document.querySelector("ul.discussions__container");
    const paginationBtn = document.createElement("button");
    paginationBtn.className = 'pagination__btn';
    paginationBtn.dataset.start = startIndex;
    paginationBtn.dataset.end = endIndex;
    paginationBtn.textContent = currentPage;
  
    paginationBtn.addEventListener('click',()=>{
      ul.innerHTML =''
      for (let i = startIndex; i <= endIndex ; i += 1) {
        ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
      }
      window.scrollTo({top: ul.offsetTop , behavior: 'smooth'});
  
      //현재 활성화된 페이지 버튼에 now클래스 추가
      let previousPageBtn = document.querySelector('.pagination__btn.now');
      if(previousPageBtn){
        previousPageBtn.classList.remove('now')
      }
      paginationBtn.classList.add('now')
    })
  
    return paginationBtn
}
  
function setPagination(datas,liPerPage){
    //페이지네이션 이벤트 리스너에 들어갈 정보 전달해서
    //createPaginationBtn으로 페이지네이션 버튼 만들고
    //페이지네이션 버튼 DOM에 넣어주기
    const paginationContainer = document.querySelector('.pagination__container');
    let totalData = datas.length; 
    let totalPage = Math.ceil(totalData / liPerPage)
    let startIndex = 0;
    let endIndex = 9;
    let currentPage = 1;
    let maxBtn = 5
  
    for(let i = 1; i <= totalPage ; i += 1){ 
      const paginationBtn = createPaginationBtn(liPerPage,startIndex,endIndex,currentPage)
      paginationContainer.append(paginationBtn)
      startIndex += liPerPage 
      endIndex += liPerPage 
      if(endIndex > totalData){
        endIndex = totalData - 1
      }
      currentPage += 1;
    }
  
    let resultBtns = document.querySelectorAll('.pagination__btn');
    //기본으로 첫번째 페이지네이션 버튼에 now더해주기
    resultBtns[0].classList.add('now')
}

export {setPagination}