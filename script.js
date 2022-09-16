// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleLink = document.createElement("a");
  discussionTitleLink.href = obj.url;
  discussionTitleLink.innerText = obj.title;

  discussionTitle.appendChild(discussionTitleLink);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${convertDate(
    new Date(obj.createdAt)
  )}`;

  discussionContent.append(discussionTitle, discussionInformation);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionAnsweredCheckbox = document.createElement("p");
  discussionAnsweredCheckbox.className = "discussion__answered--checked";

  if (obj.answer !== null) {
    discussionAnsweredCheckbox.textContent = "☑";
  } else {
    discussionAnsweredCheckbox.textContent = "☒";
  }

  discussionAnswered.appendChild(discussionAnsweredCheckbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

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

const form = document.querySelector(".form");
const author = document.querySelector(".form__input--name > input");
const title = document.querySelector(".form__input--title > input");
const textArea = document.querySelector(".form__textbox >  textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
    id: new Date().getTime(),
    createdAt: new Date(),
    title: title.value,
    url: "https://www.google.co.kr/",
    author: author.value,
    answer: "대답대답대답대답대답",
    avatarUrl: "https://i.ibb.co/dQCSBDY/fsfdsfsdf.jpg",
  };
  agoraStatesDiscussions.unshift(obj);
  console.log(agoraStatesDiscussions);

  ul.prepend(convertToDiscussion(obj));
  author.value = "";
  title.value = "";
  textArea.value = "";
});

function convertDate(fullDate) {
  const year = String(fullDate.getFullYear()).padStart(4, "0");
  const month = String(fullDate.getMonth() + 1).padStart(2, "0");
  const date = String(fullDate.getDate()).padStart(2, "0");
  const min = String(fullDate.getMinutes()).padStart(2, "0");
  const sec = String(fullDate.getSeconds()).padStart(2, "0");
  let hour = String(fullDate.getHours()).padStart(2, "0");
  let amPm;
  if (hour > 12) {
    amPm = "PM";
  } else {
    amPm = "AM ";
  }

  return `${year}-${month}-${date} ${amPm} ${hour}:${min}:${sec}`;
}
