// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let newAgoraStatesDiscussions =
  JSON.parse(window.localStorage.getItem("agoraStatesDiscussions")) ||
  agoraStatesDiscussions;
console.log(newAgoraStatesDiscussions);

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
  const bodyContent = document.createElement("p");
  bodyContent.className = "discussion__contents";
  const bodyHTML = document.createElement("p");
  bodyHTML.innerHTML = obj.bodyHTML;
  bodyContent.textContent = `${bodyHTML.textContent
    .replace(/\n/g, "")
    .substring(0, 50)}`;
  let extra = "";
  if (bodyContent.textContent.length >= 50) extra = "...";
  bodyContent.textContent += extra;
  const info = document.createElement("div");
  info.className = "discussion__information";
  const answered = document.createElement("span");
  answered.className = "discussion__information--answered";
  answered.textContent = "answered";
  info.textContent = `${obj.author} / ${getDate(obj.createdAt)}`;
  if (obj.answer) {
    info.append(" / ", answered);
  }
  discussionContent.append(title, bodyContent, info);

  const checked = document.createElement("p");
  checked.className = "discussion__answered--status";
  const answeredURL = document.createElement("a");
  answeredURL.setAttribute(
    "href",
    "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236"
  );
  const icon = new DOMParser().parseFromString(
    `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px"
	 y="0px" viewBox="0 0 283.46 283.46" style="enable-background:new 0 0 283.46 283.46;" xml:space="preserve">
<g>
	<path class="st0" d="M148.17,38.82c-61.53,0-111.41,41.39-111.41,92.45c0,19.84,7.56,38.21,20.38,53.27
		c-0.49,2.33-6.07,27.78-18.91,39.93c-4.02,3.81-6.86,9.92,0.63,11.58c5.55,1.23,11.6,0.36,17.18-0.34
		c5.62-0.71,11.16-1.98,16.57-3.68c10.7-3.37,20.8-8.36,30.7-13.56c0.46-0.24,2.5-1.68,2.93-1.54c12.94,4.37,27.09,6.79,41.92,6.79
		c61.53,0,111.41-41.39,111.41-92.45C259.57,80.21,209.69,38.82,148.17,38.82z"/>
</g>
<g>
	<path class="st1" d="M135.37,168.52c-2.46,0-4.83-0.98-6.57-2.72l-30.7-30.7c-3.63-3.63-3.63-9.52,0-13.15
		c3.63-3.63,9.52-3.63,13.15,0l23.98,23.98l47.15-49.22c3.55-3.71,9.44-3.83,13.15-0.28c3.71,3.55,3.83,9.44,0.28,13.15
		l-53.72,56.08c-1.73,1.81-4.11,2.84-6.61,2.87C135.44,168.52,135.41,168.52,135.37,168.52z"/>
</g>
</svg>`,
    "application/xml"
  );

  answeredURL.appendChild(
    checked.ownerDocument.importNode(icon.documentElement, true)
  );
  checked.appendChild(answeredURL);

  if (obj.answer) {
    discussionAnswered.appendChild(checked);
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < newAgoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(newAgoraStatesDiscussions[i]));
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
  newStory.id = "D_kwDOHOApLM4AP" + makeId(3);
  newStory.title = inputTitle.value;
  newStory.author = inputName.value;
  newStory.bodyHTML = inputContent.value;
  newStory.createdAt = new Date().toISOString();
  ul.prepend(convertToDiscussion(newStory));

  const newDiscussion = [{ ...newStory }, ...newAgoraStatesDiscussions];
  window.localStorage.setItem(
    "agoraStatesDiscussions",
    JSON.stringify(newDiscussion)
  );
});

// TODO : 아이디 생성
function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// TODO : 현재 시간 표시
function getDate(date) {
  const d = new Date(date).toLocaleString();
  const convertDate = d.split(". ");
  return convertDate[3];
}
