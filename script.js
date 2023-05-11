// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
//data.js에 들어있는 객체들이 요소로 담겨있음

//추가된 데이터 받아서 배열에 넣어주는 함수
const form = document.querySelector('form.form');
const newPostAuthor = form.querySelector('#name');
const newPostTitle = form.querySelector('#title');
const newPostBody = document.querySelector('#story');
let now = new Date();

form.addEventListener('submit', function (event){
  event.preventDefault();
})

function addingDiscusstion() {
  let newPost = {
    id: "Unique ID",
    createdAt: `${now.getFullYear()}년 ${now.getMonth()+1}월 ${now.getDate()}일 ${now.getHours()}시 ${now.getMinutes()}분 ${now.getSeconds()}초에 작성`,
    title: newPostTitle.value,
    url: `https://github.com/codestates-seb/agora-states-fe/discussions/${(Number(agoraStatesDiscussions[0].url.slice(62))+1).toString()}`,
    author: newPostAuthor.value,
    answer: null,
    bodyHTML: newPostBody.value,
    avatarUrl:
    "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  };
  agoraStatesDiscussions.unshift(newPost);
  console.log(agoraStatesDiscussions)
}
//배열에 추가된 요소를 첫자식으로 추가해주는 함수
function reRender (){
  const ul = document.querySelector("ul.discussions__container");
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0])) //부모의 첫 자식앞에 첫 전달인자를 전달
  return;
}
//클릭시에 함수가 작동하게 이벤트 등록
const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', addingDiscusstion);
submitButton.addEventListener('click', reRender);
submitButton.addEventListener('click', hiding);
submitButton.addEventListener('click', function(){
  currentPage = 1;
  totalCount = agoraStatesDiscussions.length; 
  totalPage = Math.ceil(totalCount/limit);
  pageGroup = Math.ceil(currentPage/pagecount);
  lastPageNum = pageGroup * pagecount
  if(lastPageNum > totalPage){
    lastPageNum = totalPage;
  }
  firstPageNum = (lastPageNum - pagecount) + 1;
  next = lastPageNum + 1;
  prev = firstPageNum - 1;
})

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarimage = document.createElement("img");
  avatarimage.className = "discussion__avatar--image";
  avatarimage.src = obj.avatarUrl;
  avatarimage.alt = `avartar of ${obj.author}`;
  avatarWrapper.append(avatarimage);
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);
  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionTitle, discussionInfo);
  const answered = document.createElement('p');
  if(obj.answer!==null){
    answered.textContent = '☑';
    const answerLink = document.createElement('a');
    answerLink.href = obj.answer.url;
    answerLink.textContent = '답변'
    discussionContent.append(answerLink);
  }else {
    answered.textContent = '☒';
  }
  discussionAnswered.append(answered)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
//배열에 담긴 객체들을 하나하나 등록 
for(let i=0; i<agoraStatesDiscussions.length; i++){
  let eachDiscussions = agoraStatesDiscussions[i];
  convertToDiscussion(eachDiscussions);
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//li에 hide클래스 추가 후 보여야 할 포스트만큼만 remove hide 
function hiding () {
  const li = document.querySelectorAll("li.discussion__container")
  for(let i=0; i<li.length; i++){
    li[i].classList.add('hide');
  }
  for (let j = 0; j < li.length; j += 1) {
    if(0 <= j && j < 10){
      li[j].classList.remove('hide');
    }else {
      li[j].classList.add('hide');
    }
  }
}
hiding();

//페이지네이션
//currentPage(현재페이지), totalcount(총 데이터 갯수), pagecount(화면에 나타날 페이지 갯수), limit(페이지당 데이터 갯수)
let totalCount = agoraStatesDiscussions.length; 
const limit = 10;
let totalPage = Math.ceil(totalCount/limit);
let currentPage = 1;
const pagecount = 3;
let pageGroup = Math.ceil(currentPage/pagecount);

let lastPageNum = pageGroup * pagecount
if(lastPageNum > totalPage){
  lastPageNum = totalPage;
}
let firstPageNum = (lastPageNum - pagecount) + 1;
let next = lastPageNum + 1;
let prev = firstPageNum - 1;

const main = document.querySelector('#main');
const pageWraper = document.createElement('div');
pageWraper.className = 'page__wraper';
main.append(pageWraper);

//한 페이지 묶음을 보여주는 함수 
function renderingPrevbutton(){
  const prevPage = document.createElement('bottun');
  prevPage.className = 'move__page';
  prevPage.value = prev;
  prevPage.id = 'prev';
  prevPage.textContent = '<';
  pageWraper.append(prevPage);
}
renderingPrevbutton();
//pagenumbering 작업
const pageNumWraper = document.createElement('span');
pageWraper.append(pageNumWraper);
function pageNumbering(){
  for(let i=firstPageNum; i<=lastPageNum; i++){
    let pageNum = document.createElement('button');
    pageNum.className = 'pageNum';
    pageNum.id = `page_${i}`;
    pageNum.value = i;
    pageNum.textContent = i;
    pageNumWraper.append(pageNum);
  }
}
pageNumbering();

function renderingNextbutton(){
  const NextPage = document.createElement('button');
  NextPage.className = 'move__page';
  NextPage.id = 'next';
  NextPage.value = next;
  NextPage.textContent = '>';
  pageWraper.append(NextPage);
}
renderingNextbutton();

//다음 페이지 넘어가는 버튼 함수
const NextPage = document.querySelector('#next');
function nextPage(){
  if(currentPage >= 1 && currentPage < totalPage){
    currentPage++;
    console.log(currentPage);
  }
}
function nextList(){
  if(currentPage > Number(pageNum[pagecount-1].textContent)&&pageNum[pagecount-1].textContent!==''){
    for(let i=0; i<pageNum.length; i++){
      if(currentPage + i > totalPage){
        pageNum[i].textContent = '';
      }else{
        pageNum[i].textContent = currentPage + i;
      }
      makePostList();
    } 
  }
}

NextPage.addEventListener('click', nextPage);
NextPage.addEventListener('click', nextList);
NextPage.addEventListener('click', renderingPage);



//이전 페이지 넘어가는 버튼 함수
const PrevPage = document.querySelector('#prev');
function prevPage(){
  if(currentPage > 1 && currentPage <= totalPage){
    currentPage--;
    console.log(currentPage);
  }
}
function prevList(){
  if(currentPage < Number(pageNum[0].textContent)){
    for(let i=0; i<pageNum.length; i++){
      pageNum[i].textContent = currentPage - pagecount +1 + i;
    }
    makePostList();
  }
}
PrevPage.addEventListener('click', prevPage);
PrevPage.addEventListener('click', renderingPage);
PrevPage.addEventListener('click', prevList);

const pageNum = document.querySelectorAll('.pageNum');
//페이지 번호를 누르면 해당 페이지의 포스트를 보여주는 함수
function makePostList(){
  for(let i=0; i<pageNum.length; i++){
    pageNum[i].addEventListener('click', function(){
      currentPage = pageNum[i].textContent;
    });
    pageNum[i].addEventListener('click', renderingPage)
    pageNum[i].addEventListener('click', numColoring);
  }
}

function renderingPage(){
  if(currentPage > 0 && currentPage <= totalPage){
    const li = document.querySelectorAll("li.discussion__container")
    for (let i = 0; i < li.length; i++) {
      if((currentPage*limit)-limit <= i && i < currentPage*limit){
        li[i].classList.remove('hide');
      }else {
        li[i].classList.add('hide');
      }
    }  
  }
}
function numColoring(){
  for(let j=0; j<pageNum.length; j++){
    if(currentPage === Number(pageNum[j].textContent)){
      pageNum[j].classList.add('current');
    }else {
      pageNum[j].classList.remove('current');
    }
  }
};

renderingPage();
makePostList();


