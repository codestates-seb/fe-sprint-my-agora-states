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

  // data.img
  const img = document.createElement("img");
  img.src = obj.avatarUrl;
  avatarWrapper.append(img);

  // data.link
  const aLink = document.createElement("a");
  aLink.setAttribute("href", obj.url);
  aLink.textContent = obj.title;

  const title = document.createElement("h2");
  title.append(aLink);
  discussionContent.append(title);

  // data.information
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInformation);

  // checkBox
  const checkBox = document.createElement("p");
  checkBox.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(checkBox);

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

// input에서 데이터 가져오기
const form = document.querySelector("form.form");
const elInputName = document.querySelector(".form__input--name");
const elInputTitle = document.querySelector(".form__input--title");
const elInputQuestion = document.querySelector(".form__textbox");

// 실제 배열 추가
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = new Date();

  // input value
  let author = elInputName.children[1].value;
  let title = elInputTitle.children[1].value;
  let text = elInputQuestion.children[1].value;

  if (!validName(author)) {
    alert("Your name must be longer more than 2 characters");
    return;
  }
  if (!validTitle(title)) {
    alert("Your title must be longer more than 5 characters");
    return;
  }
  if (!validText(text)) {
    alert("Your Question must be longer more than 10 characters");
    return;
  }

  let newQuestion = {
    answer: null,
    author,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    bodyHTML: text,
    createdAt: date.toISOString(),
    id: date.getTime(),
    title,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
  };
  agoraStatesDiscussions.unshift(newQuestion);
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  render(ul);
});

// validation
const validName = function (author) {
  if (author.length >= 2) {
    return true;
  } else {
    return false;
  }
};
const validTitle = function (title) {
  if (title.length >= 5) {
    return true;
  } else {
    return false;
  }
};
const validText = function (text) {
  if (text.length >= 10) {
    return true;
  } else {
    return false;
  }
};
