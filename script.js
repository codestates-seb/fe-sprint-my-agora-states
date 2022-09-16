// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 1. avatarWrapper
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avartar of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  // 2. discussionContent
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  const discussionAuthor = document.createElement("div");
  discussionAuthor.className = "discussion__author";
  discussionAuthor.textContent = obj.author;
  const discussionDate = document.createElement("div");
  discussionDate.className = "discussion__date";
  discussionDate.textContent = new Date(obj.createdAt).toLocaleString();
  discussionInfo.append(discussionAuthor, discussionDate);
  discussionContent.append(discussionTitle, discussionInfo);

  // 3. discussionAnswered
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const checkbox = document.createElement("i");
  checkbox.className = obj.answer ? "fa-solid fa-circle-check" : "fa-regular fa-circle";
  discussionAnswered.append(checkbox);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
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
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name");
  const title = document.querySelector("#title");
  const story = document.querySelector("#story");
  const obj = {
    id: "",
    createdAt: new Date(),
    title: title.value,
    url: "#",
    author: name.value,
    answer: null,
    bodyHTML: story.value,
    avatarUrl: "avatar-img.png",
  };
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
  render(ul);
  name.value = "";
  title.value = "";
  story.value = "";
});

// 질문 창 접기 & 펼치기
const questionBtn = document.querySelector(".question");
questionBtn.addEventListener("click", () => {
  const form = document.querySelector(".form__container");
  const formIcon = document.querySelector(".question > i");
  if (form.style.display === "") {
    form.style.display = "flex";
    formIcon.className = "fa-solid fa-chevron-up";
  } else {
    form.style.display = "";
    formIcon.className = "fa-solid fa-chevron-down";
  }
});
