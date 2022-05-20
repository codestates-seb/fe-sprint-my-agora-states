// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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
  
  // avatar
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
  // title
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  const contentTitleA = document.createElement('a');
  contentTitleA.href = obj.url;
  contentTitleA.innerHTML = obj.title;
  
  discussionContent.append(contentTitle);
  contentTitle.append(contentTitleA);
  
  //info
  const contentInfo = document.createElement('div');
  contentInfo.className = "discussion__information";

  contentInfo.innerHTML = obj.author + ' / ' + (obj.createdAt).slice(11,19);
  contentTitle.append(contentInfo);

  //answered
  const answer = document.createElement('div');
  const answerP = document.createElement('div');
  answer.className = "discussion__answered";
  answerP.innerHTML = '☑';
  discussionAnswered.append(answer);
  answer.append(answerP);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {

  // agoraStatesDiscussions = paging(agoraStatesDiscussions, listElement, rows, currentPage);

  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


//입력폼 데이터 추가
const formSubmit = document.querySelector('#submit');
const elInputName = document.querySelector('#name');
const elInputTitle = document.querySelector('#title');
const elInputStory = document.querySelector('#story');
const elTime = new Date().toISOString();
elTime;
let formArr = {};
formSubmit.addEventListener("click",clickE);

function clickE(){
  formArr.name = elInputName.value;
  formArr.title = elInputTitle.value;
  formArr.story = elInputStory.value;
  formArr.createdAt = elTime;

  formArr.answer = {};
  formArr.avatarUrl = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
  
  
  if(formArr.name === ""){
    alert('이름을 입력하세요');
  }else if(formArr.title === ""){
    alert('제목을 입력하세요');
  }else{
    // agoraStatesDiscussions.unshift(formArr);
    agoraStatesDiscussions.push(formArr);
    ul.append(convertToDiscussion(agoraStatesDiscussions[agoraStatesDiscussions.length-1]));
    alert('제출 완료');
  }
  
}


//페이지네이션
const listElement = document.querySelector('.discussion__container');
const paginationButton = document.querySelector('.page__buttons');

//currentPage : 현재 페이지
const currentPage = 2;
//화면에 보이는 글 개수
let rows = 6;

function paging(items, wrapper, rows_per_page, page ){
  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginationItems = items.slice(start, end);

  for(let i = 0; i < paginationItems.length; i++){
    console.log(paginationItems[i]);
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
}
paging(agoraStatesDiscussions, listElement, rows, currentPage);

// function setupPagination(items, wrapper, rows_per_page){
//   wrapper.innerHTML = "";

//   let page_count = Math.ceil(items.length / rows_per_page);
//   for(let i = 1; i < page_count + 1; i++){
//     let btn = paginationButton(i);
//     wrapper.append(btn);
//   }
// }

// function pageButton(page){
//   let button = document.createElement('button');
//   button.innerText = page;

//   if(currentPage === page){
//     button.classList.add('active');
    
//     return button;
//   }
// }
// paging(agoraStatesDiscussions, listElement, rows, currentPage);
// setupPagination(agoraStatesDiscussions, paginationButton);