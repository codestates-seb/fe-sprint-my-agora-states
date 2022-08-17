// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // image
  const avatarImg = document.createElement('img');
  avatarImg.setAttribute('src', obj.avatarUrl);
  avatarImg.setAttribute('alt', obj.author);
  avatarWrapper.appendChild(avatarImg);

  // contents
  const newTitle = document.createElement('h2');
  const newA = document.createElement('a');
  newA.setAttribute('href', obj.url);
  newA.textContent = obj.title;
  newTitle.appendChild(newA);
  discussionContent.appendChild(newTitle);

  const newInformation = document.createElement('div');
  newInformation.className = "discussion__information";
  newInformation.textContent = obj.author + ` / ` + obj.createdAt.slice(0, 10);
  discussionContent.appendChild(newInformation);

  // Answered
  const newAnswer = document.createElement('p');
  if (obj.answer) {
    discussionAnswered.innerHTML = `<input type="checkbox" class="active" checked />`;
  } else {
    discussionAnswered.innerHTML = `<input type="checkbox" class="active"  />`;
  }
  discussionAnswered.appendChild(newAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// data 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, from, to) => {
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

// 페이지네이션을 위한 변수
let limit = 10,
  page = 1;

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
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

//discussion add

const newDiscussion = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputQuestion = document.querySelector("#story");
const inputImage = document.querySelector(".image")

//정보 추가
newDiscussion.addEventListener('submit', (event) =>{
  event.preventDefault(); 
  const newQuestion = {};
  newQuestion.createdAt = addNowTime();
  newQuestion.title = inputTitle.value;
  newQuestion.author = inputName.value;
  newQuestion.bodyHTML = inputQuestion.value;
  
  //랜덤 아이콘
  const iconNumber = 6;

  function getRandomIcon() {
    const number = Math.floor(Math.random() *iconNumber);
    return `icon/${number + 1}.png`;
  }

  newQuestion.avatarUrl = getRandomIcon();

  //방법1
  // ul.prepend(newDisc);

  //방법2
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  data.unshift(newQuestion);

  // 로컬스토리지에 저장
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));

  render(ul, 0, limit);

  inputName.value = "";
  inputTitle.value = "";
  inputQuestion.value = "";
});

//현지 시간 적용
const addNowTime = () => {
  const date = new Date();
  let hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  if(hour >= 12){
    hour = hour - 12;
    return `오후${hour}:${minute}:${second}`;
  }else{
    return `오전${hour}:${minute}:${second}`;
  }
}

//랜덤 백그라운드//
// const body = document.querySelector('body');
// const IMG_NUMBER = 10;

// /* 이미지를 가져오는 함수 */
// function paintImage(imgNumber) {
//     const image = new Image();      /* 1. new 를 사용하여 object 만들기 */
//     image.src = `images/${imgNumber + 1}.jpg`;      /* 2. object에 이미지 주소(레퍼런스) 연결하기 */
//     image.classList.add('bgImage');     /* + 1를 하는 이유는 Math.random() 함수가 0을 줄 수 있기 때문이다.*/
//     body.prepend(image);      /* body 안에 image 넣기 */
// }

// function genRandom() {
//     const number = Math.floor(Math.random() *IMG_NUMBER);
//     return number;
// }

// function init() {
//     const randomNumber = genRandom();   /* 이미지(갯수) 함수와 randeomNumber변수(랜덤숫자생성함수)를 인자로 설정 */
//     paintImage(randomNumber);
// }

// init();