// 노드 가져오기
const ul = document.querySelector("ul.discussions__container");
const eventForm = document.querySelector(".form");
const nameInput = document.querySelector(".form__input--name input");
const titleInput = document.querySelector(".form__input--title input");
const questionTextarea = document.getElementById("story");
const buttonSection = document.querySelector(".button-section");

//상수 설정하기
const USER = "user";
const CONTENTS = 5;

//초기 렌더링 설정
let paresdUsers;
const savedUsers = localStorage.getItem(USER);
if (savedUsers !== null) {
  paresdUsers = JSON.parse(savedUsers);
} else {
  paresdUsers = agoraStatesDiscussions.slice();
}

//요소 생성 함수
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container";
  li.id = obj.id; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.appendChild(avatarImg);

  const titleContent = document.createElement("h2");
  titleContent.className = "discussion__title";
  const titleHyper = document.createElement("a");
  titleHyper.href = obj.url;
  titleHyper.textContent = obj.title;

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;

  const discussionCheckBox = document.createElement("p");
  discussionCheckBox.textContent = "☑";
  const discussionDelete = document.createElement("button");
  discussionDelete.textContent = "X";
  discussionDelete.addEventListener("click", deleteUser); //삭제 버튼 함수 호출하기
  //자식 요소 넣기
  discussionAnswered.append(discussionCheckBox, discussionDelete);
  discussionContent.append(titleContent, discussionInformation);
  titleContent.appendChild(titleHyper);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
//초기 렌더링 화면 글 갯수
let first = 0;
let last = CONTENTS;
const render = (element, first, last) => {
  if (ul.hasChildNodes()) {
    ul.replaceChildren();
  }
  const fragment = document.createDocumentFragment();
  for (let i = first; i < last; i += 1) {
    if (paresdUsers[i] === undefined) {
      //요소가 없으면 종료
      break;
    } else {
      fragment.append(convertToDiscussion(paresdUsers[i])); //렌더링
    }
  }
  element.appendChild(fragment);
  return;
};
render(ul, first, last);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ//

function saveUser() {
  localStorage.setItem(USER, JSON.stringify(paresdUsers)); // 로컬스토리지 저장
}
function toZero() {
  nameInput.value = "";
  titleInput.value = "";
  questionTextarea.value = ""; // 작성 창 초기화
}
const images = [
  //이미지 배열
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.jpeg",
  "9.jpeg",
  "10.jpeg",
];
function onHandleSubmit(event) {
  //새로운 콘텐츠 입력 이벤트 핸들러
  event.preventDefault(); //새로고침 무시하기
  const chosenImage = images[Math.floor(Math.random() * images.length)];
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth()).padStart(2, "0");
  const day = String(date.getDay()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  const newObj = {
    author: nameInput.value,
    id: String(Date.now()),
    title: titleInput.value,
    createdAt: `${year}-${month}-${day}T${hour}:${minute}:${second}Z`,
    avatarUrl: `img/${chosenImage}`,
  };
  paresdUsers.unshift(newObj);
  saveUser();
  render(ul, first, last);
  if (paresdUsers.length / CONTENTS > buttonSection.childElementCount) {
    makePages();
  }
  toZero();
}

eventForm.addEventListener("submit", onHandleSubmit);

function makePages() {
  const fragment = document.createDocumentFragment();
  const pages = Math.ceil(paresdUsers.length / CONTENTS);
  if (buttonSection.hasChildNodes()) {
    buttonSection.replaceChildren();
  }
  for (let i = 1; i <= pages; i++) {
    let button = document.createElement("button");
    button.id = i;
    button.textContent = i;
    fragment.appendChild(button);
  }
  buttonSection.appendChild(fragment);
  return;
}
makePages();

function onButtonHandle(event) {
  const idNumber = event.target.id;
  if (!idNumber) {
    return;
  }
  render(ul, (idNumber - 1) * CONTENTS, CONTENTS * idNumber);
}
buttonSection.addEventListener("click", onButtonHandle, true);

function deleteUser(event) {
  const li = event.target.parentElement.parentElement;
  li.remove();
  paresdUsers = paresdUsers.filter((user) => user.id !== li.id);
  saveUser();
  render(ul, first, last);
}
