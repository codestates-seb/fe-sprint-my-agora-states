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
  const image = document.createElement("img");
  image.className = "discussion__avatar--image";
  image.setAttribute(
    "src",
    obj.avatarUrl
      ? obj.avatarUrl
      : "https://cdn-icons-png.flaticon.com/512/25/25231.png"
  );
  image.setAttribute("alt", `avatar of ${obj.author}`);

  avatarWrapper.appendChild(image);

  const title = document.createElement("h2");
  title.className = "discussion__title";
  const url = document.createElement("a");
  url.setAttribute("href", obj.url);
  url.textContent = obj.title;
  title.appendChild(url);
  const info = document.createElement("div");
  info.classNamm = "discussion__information";
  info.textContent = `${obj.author} / ${getDate(obj.createdAt)}`;
  const content = discussionContent.append(title, info);

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

// TODO : 폼 입력하여 리스트에 추가
const form = document.querySelector(".form");
const inputTitle = document.getElementById("title");
const inputName = document.getElementById("name");
const inputContent = document.getElementById("story");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newStory = {};
  newStory.title = inputTitle.value;
  newStory.author = inputName.value;
  newStory.content = inputContent.value;
  newStory.createdAt = new Date().toISOString();
  ul.prepend(convertToDiscussion(newStory));
});

// TODO : 현재 시간 표시
function getDate(date) {
  const d = new Date(date).toLocaleString();
  const convertDate = d.split(". ");
  return convertDate[3];
}
