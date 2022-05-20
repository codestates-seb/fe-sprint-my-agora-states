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

  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarWrapper.appendChild(avatarImage);

  const contentTitle = document.createElement("div");
  contentTitle.className = "discussion__title";
  const contentTitleLink = document.createElement("a");
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;
  contentTitle.appendChild(contentTitleLink);

  const contentInformation = document.createElement("div");
  contentInformation.className = "discussion__information";
  contentInformation.textContent = `${obj.author} / ${obj.createdAt}`;

  discussionContent.append(contentTitle, contentInformation);

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

const inputName = document.querySelector(".form__input--name > input");
const inputTitle = document.querySelector(".form__input--title > input");
const inputStory = document.querySelector(".form__textbox > textarea");
const form = document.querySelector(".form");
const currentTime = new Date();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  pushData();
});

function pushData() {
  agoraStatesDiscussions.unshift({
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    author: inputName.value,
    title: inputTitle.value,
    createdAt: `${
      currentTime.getHours() >= 13
        ? `오후 ${currentTime.getHours() - 12}`
        : `${currentTime.getHours === 0 ? `00` : `${currentTime.getMinutes()}`}`
    }:${currentTime.getMinutes()}:${
      currentTime.getSeconds() === 0 ? `00` : `${currentTime.getSeconds()}`
    }`,
  });
  newDataRender(ul);
  // render(ul);
}
function newDataRender(element) {
  element.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  // element.insertBefore()
}
