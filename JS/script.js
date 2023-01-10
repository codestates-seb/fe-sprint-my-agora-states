// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

let newData = agoraStatesDiscussions;
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

  //아바타 사진을 담기!
  const avatar = document.createElement("img");
  avatar.className = "discussion__avatar--image";
  avatar.src = `${obj["avatarUrl"]}`;
  avatar.alt = `avatar of ${obj["author"]}`;
  avatarWrapper.appendChild(avatar);

  //title-hyperlink로 해결해야 한다!
  const title = document.createElement("h2");
  title.className = "discussion__title";
  const anchor = document.createElement("a");
  anchor.href = obj.url;
  anchor.textContent = obj.title;
  title.appendChild(anchor);
  discussionContent.appendChild(title);

  //아이디 및 시간 넣기
  const idAndDate = document.createElement("div");
  idAndDate.className = "discussion__information";
  idAndDate.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.appendChild(idAndDate);

  //체크박스 넣기
  const checkBox = document.createElement("p");
  checkBox.textContent = obj.answer ? "☑︎" : "☒";
  // if (checkBox.textContent === "☒") checkBox.textContent.style.color = "red";
  discussionAnswered.appendChild(checkBox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
//console.log(convertToDiscussion);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
//rendering 전에 localstorage확인하기!

if (localStorage.getItem("Data")) {
  newData = JSON.parse(localStorage.getItem("Data"));
}

console.log(newData);
const render = (element) => {
  for (let i = 0; i < newData.length; i += 1) {
    element.append(convertToDiscussion(newData[i]));
  }
  return;
};

const inputName = document.querySelector(".form__input--name input");
const inputTitle = document.querySelector(".form__input--title input");
const inputAnswer = document.querySelector(".form__textbox textarea");
const submitForm = document.querySelector(".form");

submitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const localTime = new Date();
  const obj = {
    answer: null,
    author: inputName.value,
    bodyHTML: null,
    avatarUrl:
      "https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__480.png",
    createdAt: localTime.toISOString(),
    id: "unique id+ " + Math.round(Math.random * 10000),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
  };

  // 밑과 같이 했을 때 왜 작동이 안 하는지 명확하게 파악해야 한다!
  agoraStatesDiscussions.unshift(obj);

  localStorage.setItem("Data", JSON.stringify(agoraStatesDiscussions));

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  render(ul);
});
// console.log(agoraStatesDiscussions);
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

const ul = document.querySelector("ul.discussions__container");

render(ul);
