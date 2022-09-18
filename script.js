// 로컬 스토리지 값이나 객체를 JSON 문자열로 변환
const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};
// discussionList라는 배열을 만들건데
// discussionList는 로컬 스토리지에서 'discussion'의 값을 받아와
// 로컬 스토리지에 "discussion"이 없으면 agoraStatesDiscussions를 받아와

const discussionList =
  jsonLocalStorage.getItem("discussion") || agoraStatesDiscussions;
// console.log(discussionList);
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  li.dataset = "";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // avatar--wrapper 안에 요소들
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // 날짜 포맷 변경하기 YYYY-MM-DD
  const today = new Date(obj.createdAt);

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  // discussion__content 안에 요소들
  const discussionTitleLink = document.createElement("a");
  discussionTitle.append(discussionTitleLink);
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionInformation.textContent = `${obj.author} / ${dateString}`;
  discussionContent.append(discussionTitle, discussionInformation);

  // discussion__answered 안에 요소들
  const discussionCheck = document.createElement("p");
  const discordappDelete = document.createElement("button");
  discordappDelete.className = "discussion__delete";
  discordappDelete.textContent = "❌";
  // 해당 게물 삭제기능
  discordappDelete.addEventListener("click", (e) => {
    const liList = document.querySelector(".discussion__container");
    li.remove();
    discussionList.removeItem();
  });
  if (obj.answer !== null) {
    discussionCheck.textContent = "✅";
  } else {
    discussionCheck.textContent = "❎";
  }
  discussionAnswered.append(discussionCheck, discordappDelete);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < discussionList.length; i += 1) {
    element.append(convertToDiscussion(discussionList[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const agoForm = document.querySelector(".form");
const agoName = document.querySelector("#name");
const agoTitle = document.querySelector("#title");
const agoStory = document.querySelector("#story");
const agoInformation = document.querySelector(".discussion__information");
const agoDelete = document.querySelector(".discussion__delete");

// 이벤트 리스너
agoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const objItem = {
    id: ``,
    createdAt: new Date(),
    title: agoTitle.value,
    url: ``,
    author: agoName.value,
    answer: null,
    bodyHTML: `<div>${story.value}</div>`,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/77476348?s=64&u=64243db62117de5c254c9a76184753b76d7303ff&v=4",
  };
  ul.prepend(convertToDiscussion(objItem));
  discussionList.unshift(objItem);

  jsonLocalStorage.setItem("discussion", discussionList);

  agoName.value = "";
  agoTitle.value = "";
  agoStory.value = "";
});
