// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
if (localStorage.discussions === undefined) localStorage.setItem("discussions", JSON.stringify(agoraStatesDiscussions));

let discussions = [];

function saveDiscussion() {
  localStorage.setItem("discussions", JSON.stringify(discussions));
}

// form으로 제출된 정보를 저장합니다.
const form = document.querySelector(".form");
const author = document.querySelector("#name");
const title = document.querySelector("#title");
const story = document.querySelector("#story");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newDiscussion = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: title.value,
    author: author.value,
    bodyHTML: story.value,
    avatarUrl: "./rocket-boy.png",
    answer: null,
  };
  ul.prepend(convertToDiscussion(newDiscussion));
  discussions.unshift(newDiscussion);
  saveDiscussion();
});

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
  const discussionMarked = document.createElement("div");

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const image = document.createElement("img");
  image.classList.add("discussion__avatar--image");
  image.src = obj.avatarUrl;
  image.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(image);
  const content = document.createElement("a");
  content.href = obj.url ? obj.url : "#";
  if (!obj.url) content.classList.add("not-clickable");
  content.target = "_blank";
  const title = document.createElement("h2");
  title.classList.add("discussion__title");
  title.textContent = obj.url ? `${obj.title} 🔗` : obj.title;
  const story = document.createElement("p");
  story.classList.add("discussion__story");
  story.innerHTML = obj.url ? "클릭하여 본문 가기" : obj.bodyHTML;
  const information = document.createElement("div");
  information.classList.add("discussion__information");
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  content.append(title, story, information);
  discussionContent.append(content);

  const answer = document.createElement("p");
  answer.textContent = obj.answer === null ? "🌝" : "✅";
  discussionAnswered.append(answer);

  const mark = document.createElement("input");
  mark.type = "checkbox";
  mark.addEventListener("click", () => {});
  discussionMarked.append(mark);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < discussions.length; i += 1) {
    element.append(convertToDiscussion(discussions[i]));
  }
  return;
};

discussions = JSON.parse(localStorage.getItem("discussions"));
console.log("discussion", discussions);
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
