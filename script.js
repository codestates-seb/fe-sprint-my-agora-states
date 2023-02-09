let agoraStatesDiscussions;
// 서버에서 데이터를받받아오려면 localStorag를 꺼야함.. -> 새로 입력된 아이템을 추가하고 싶다면..?
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
let data;
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // 디스커션 박스
  const discussionBox = document.createElement('div');
  discussionBox.className = 'discussion__box';
  // 아바타 이미지 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // 디스커션 콘텐츠 생성
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // 답변 확인 박스 생성
  const checkAnswered = document.createElement('div');
  checkAnswered.className = "check__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 이미지 넣기
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 디스커션 콘텐츠 넣기
  // 타이틀 -> title, url
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement('a');
  discussionLink.href = obj.url;
  discussionLink.textContent = `${obj.title}`
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);
  // 작성자 정보 -> author , createdAt
  const discussionInform = document.createElement('div');
  discussionInform.className = "discussion__information";
  discussionInform.textContent =  `${obj.author} / ${obj.createdAt}`
  discussionContent.append(discussionInform)
  // 답변 확인하기
  // 왜 여기만 적용안돼...
  // 답변완료 표시
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = "discussion__answered";
  const discussionCheck = document.createElement('p');
  discussionCheck.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(discussionCheck);
  checkAnswered.append(discussionAnswered);

  // 삭제 버튼
  const removeItem = document.createElement('div');
  removeItem.classList = "remove-item";
  const removeBtn = document.createElement("i");
  removeBtn.classList = "bi bi-trash3-fill";
  removeItem.append(removeBtn);
  discussionContent.append(removeItem);

  // 답변 확인하기 버튼
  const btnCheck = document.createElement('button');
  btnCheck.className = "btn__check--answered";
  btnCheck.textContent = '확인하기'
  checkAnswered.append(btnCheck);

  // 답변 폼

  // 답변 박스
  const answeredContainer = document.createElement('div');
  answeredContainer.className = "answered__container";
  answeredContainer.classList.add('hide');
  const answeredBox = document.createElement('div');
  answeredBox.className = "answered__box";
  // 답변 작성자
  const answeredInfo = document.createElement('div');
  answeredInfo.className = "answered__info";
  const answeredAuthor = document.createElement('p')
  answeredAuthor.className = "answered_author"
  answeredAuthor.textContent = obj.answer ? `${obj.answer['author']}`:"답변이 없습니다.";
  answeredInfo.append(answeredAuthor);

  // 답변 시간
  const answeredDate = document.createElement('p');
  answeredDate.className = "answered_date";
  answeredDate.textContent = obj.answer ? obj.answer['createdAt']: "";
  answeredInfo.append(answeredDate);
  //답변 내용
  const answeredContent = document.createElement('div');
  answeredContent.className = "answerd__content";
  // answeredContent.bodyHTML = obj.answer['bodyHTML'];
  // 닫기 버튼
  const closeButton = document.createElement('button');
  closeButton.className = "btn__close--answered";
  closeButton.textContent = "닫기"

  answeredBox.append(answeredInfo,answeredContent,closeButton);
  answeredContainer.append(answeredBox);
  // 
  discussionBox.append(avatarWrapper, discussionContent,checkAnswered);
  li.append(discussionBox,answeredContainer);
  const ul = document.querySelector('ul.discussions__container');
  ul.append(li);
  return li;
};
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   // console.log(element)
//   return;
// };
// localstorage 사용시 렌더링
const render = (element, from, to) => {
  // console.log(from, to);
  if (!from && !to) {
    from = 0;
    to = data.length - 1;
  }
  // 다 지우고 배열에 있는 내용 다 보여주기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);
fetch("http://localhost:4000/discussions/")
  // 본문 가져오기
  .then((res) => res.json())
  .then((json) => {
    // data.js 대신 사용
    agoraStatesDiscussions = json; 	
    const ul = document.querySelector("ul.discussions__container"); 
    render(ul);
    // console.log(json)
    // console.log(agoraStatesDiscussions);
  })

// 질문 남기기 버튼을 누르면 폼박스 나오기
// 닫기 버튼 누르면 폼박스 닫기
const btnOpenForm = document.querySelector('.btn__ask');
const openFormBox = document.querySelector('.ask__form');
const closeFormBox = document.querySelector('.form__delete');
btnOpenForm.onclick = function() {
  openFormBox.classList.remove('hide');
}
closeFormBox.onclick = function(){
  openFormBox.classList.add('hide');
}
// 답변 확인하기 열고 닫기
const btnCheckAnswered = document.querySelector('.btn__check--answered');
const answeredForm = document.querySelector('.answered__container');
const btnCloseAnswered = document.querySelector('.btn__close--answered');

btnCheckAnswered.onclick = function() {
  answeredForm.classList.remove('hide');
}
btnCloseAnswered.onclick = function() {
  answeredForm.classList.add('hide');
}

// 삭제 버튼 구현
// const btnRemoveItem = document.querySelector('bi bi-trash3-fill');
// console.log(data)
// btnRemoveItem.onclick = function(e){
//   const item = e.target.id;
//   return data.fliter(el=>el.id===item)
// }
// 답변 렌더링 하기

// 새로 입력된 값 저장하기
const newForm = document.querySelector('.form');
const author = newForm.querySelector('.form__input--name>input');
const title = newForm.querySelector('.form__input--title');
const content = newForm.querySelector('.form__textbox');

// 제출하기 누르면 입력값 가져오기
const newDiscussion = document.querySelector('.form');
const newAuthor = document.querySelector('#name');
const newTitle = document.querySelector('#title');
const newStory = document.querySelector('#story');

// 버튼을 누르면 동작 
const submitBtn = document.querySelector('#submit_btn');
newDiscussion.addEventListener('sunmit',(event)=>{
  event.defaultPrevented();
});

// 입력값 추가하기
newDiscussion.addEventListener('submit',(event)=>{
  event.preventDefault();
  const obj = {
    id : '',
    createdAt : new Date().toISOString(),
    title : newTitle.value,
    url : "",
    author : newAuthor.value,
    answer : {}  ,
    bodyHTML : newStory.value,
    avatarUrl : 'https://avatars.githubusercontent.com/u/79903256?s=64&v=4'
  };
  data.unshift(obj);
  localStorage.setItem('agoraStatesDiscussions',JSON.stringify(data));
  render(ul);
});

// 페이지네이션을 위한 변수
let limit = 10,
  page = 1;

// ul 요소에 data 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, limit);

const getPageStartEnd = (limit, page) => {
  const len = data.length - 1;
  let pageStart = Number(page - 1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if (page <= 0) {
    pageStart = 0;
  }
  if (pageEnd >= len) {
    pageEnd = len;
  }
  return { pageStart, pageEnd };
};

const buttons = document.querySelector(".buttons");
buttons.children[0].addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[1].addEventListener("click", () => {
  if (limit * page < data.length - 1) {
    page = page + 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[2].addEventListener("click", () => {
  localStorage.removeItem("agoraStatesDiscussions");
  data = agoraStatesDiscussions.slice();
  limit = 10;
  page = 1;
  render(ul, 0, limit);
});