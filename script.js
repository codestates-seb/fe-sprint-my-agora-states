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
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const title = document.createElement("a");
  title.href = obj.url;
  title.textContent = obj.title;
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj.author + " | " + new Date(obj.createdAt).toLocaleString();
  discussionTitle.append(title);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);

  const answer = document.createElement("p");
  const checked = document.createElement("img");
  checked.className = "check__icon";
  if(obj.answer !== null) {
    checked.src = "./img/check.png";
    // answer.textContent = "☑";
  }else {
    checked.src = "./img/uncheck.png";
    // answer.textContent = "◻️";
  }
  answer.append(checked);
  discussionAnswered.append(answer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
  for (let i = 0; i < 5; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const renderLocalStorage = (element) => {
  for(let i = 0; i < localStorage.length; i++) {
    element.prepend(convertToDiscussion(JSON.parse(localStorage.getItem(i+1))));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
renderLocalStorage(ul);

const submit = document.querySelector("input[type=submit]");
let author = document.querySelector("#name");
let title = document.querySelector("#title");
let story = document.querySelector("#story");

submit.onclick = (event) => {
  event.preventDefault();

  let agoraStatesDiscussion = {};
  agoraStatesDiscussion.id = self.crypto.randomUUID().substring(0, 8);
  agoraStatesDiscussion.author = author.textContent;
  agoraStatesDiscussion.title = title.value;
  agoraStatesDiscussion.bodyHTML = story.value;
  agoraStatesDiscussion.createdAt = new Date().toString();
  agoraStatesDiscussion.avatarUrl = "https://avatars.githubusercontent.com/u/99889721?v=4";
  agoraStatesDiscussion.answer = null;

  console.log(agoraStatesDiscussion);
  ul.prepend(convertToDiscussion(agoraStatesDiscussion));

  // 로컬 스토리지에 저장
  let index = localStorage.length;
  localStorage.setItem(++index, JSON.stringify(agoraStatesDiscussion));

  // 입력창 초기화
  author.value = "";
  title.value = "";
  story.value = "";
}