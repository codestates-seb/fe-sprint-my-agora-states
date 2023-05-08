// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log('45기 안녕하세요', agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// DOM으로 바꿔주고, <li> APPEND까지 한다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.classList.add("discussion__container");

  const avatarWrapper = document.createElement("div");
  avatarWrapper.classList.add("discussion__avatar--wrapper");

  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.classList.add("discussion__content");

  const discussionTitle = document.createElement("h2");
  discussionTitle.classList.add("discussion__title");

  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const discussionInformation = document.createElement("div");
  discussionInformation.classList.add("discussion__information");
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt || Date.now()
  ).toISOString()}`;

  const discussionAnswered = document.createElement("div");
  discussionAnswered.classList.add("discussion__answered");

  const checked = document.createElement("img");
  // checked.textContent = obj.answer ? "☑" : "☒";
  checked.src = obj.answer
  ? "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fo9Vdj%2FbtsemCrFJKq%2FPfhiR8IqhRyANgYKBMlA5k%2Fimg.png"
  : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcz6O77%2Fbtsd9eym4JB%2FNIk7voYbhHuM2keoPJBqD0%2Fimg.png";
  discussionAnswered.append(checked);

  discussionContent.append(discussionTitle, discussionInformation);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// input을 불러와야 한다.
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

// submit 이벤트 리스너를 등록합니다.
form.addEventListener("submit", (event) => {
event.preventDefault(); // 기본 동작을 막습니다.

// 객체를 생성합니다.
const obj = {
id: "unique id",
createdAt: new Date().toISOString(),
title: title.value,
url: "https://github.com/codestates-seb/agora-states-fe/discussions",
author: author.value,
answer: null,
bodyHTML: textbox.value,
avatarUrl:
"https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
};

// 새로운 요소를 생성하고 DOM에 추가합니다.
const newDiscussion = convertToDiscussion(obj);
const discussionsContainer = document.querySelector("ul.discussions__container");
discussionsContainer.prepend(newDiscussion);

// 입력 폼을 초기화합니다.
author.value = "";
title.value = "";
textbox.value = "";
});

// 검색 폼을 위한 이벤트 리스너를 등록합니다.
const searchForm = document.querySelector("form.form--search");
searchForm.addEventListener("submit", (event) => {
event.preventDefault(); // 기본 동작을 막습니다.

// 검색어를 가져와서 대소문자 구분 없이 일치하는 요소를 찾습니다.
const searchInput = searchForm.querySelector("input");
const keyword = searchInput.value.toLowerCase().trim();

const discussions = document.querySelectorAll("ul.discussions__container > li");
discussions.forEach((discussion) => {
const title = discussion.querySelector(".discussion__title > a").textContent.toLowerCase();
const author = discussion.querySelector(".discussion__information").textContent.toLowerCase();
if (title.includes(keyword) || author.includes(keyword)) {
  discussion.style.display = "flex";
} else {
  discussion.style.display = "none";
}
});
});