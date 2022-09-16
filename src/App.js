//Modules
import agoraStatesDiscussions from './data.js';
import dataLoader from './dataLoader.js';
import convertToDiscussion from './converToDiscussion.js';
import { makingPageButtons, pageRender, calculateMaxPage } from './pagination.js';
import { renderNextPage, renderPreviousPage } from './movingPageButtons.js';
import addNewDiscussion from './addNewDiscussion.js';

// 페이지 새로고침 확인
console.log(agoraStatesDiscussions);
console.log('refreshed');

// 로컬 데이터 저장소 선언
const initialData = agoraStatesDiscussions;
const dataStorage = window.localStorage;

// 새로고침을 할 때마다 로컬데이터 저장소 데이터와, 자바스크립트 내 데이터를 합쳐서 갱신
const data = [...dataLoader(dataStorage), ...initialData];

// DOM 요소들 모두 불러오기
const ul = document.querySelector("ul.discussions__container");
// buttons
const nextBtn = document.querySelector('#nextbtn');
const previousBtn = document.querySelector('#previousbtn');
// form
const submitForm = document.querySelector('form');
// pages
const pagesContainer = document.querySelector('#pages_container');

// Variables
const pageInfo = {
  pagemax : 1,
  currentPage : 1
}

// Functions
// 이니셜 렌더링 (초기 10개만)
const render = function(element) {
  for (let i = 0; i < 10; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// Eventchecker
function checker(e) {
  console.log('Working', e);
}

// EventListener
nextBtn.addEventListener('click', () =>{ pageInfo.currentPage = renderNextPage(ul, pageInfo, data)} );
previousBtn.addEventListener('click', () => {pageInfo.currentPage = renderPreviousPage(ul, pageInfo, data)});
submitForm.addEventListener('submit', (e) => { 
  e.preventDefault();
  addNewDiscussion(dataStorage); 
});


// Execution
render(ul);
calculateMaxPage(data.length, pageInfo);
makingPageButtons(pagesContainer, pageInfo, data);
