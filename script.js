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
  const avatar = document.createElement("img");
  avatar.className = 'discussion__avatar--image';
  avatar.src = obj.avatarUrl;
  avatar.alt = 'avatar of' + obj.author;  

  const content_box = document.createElement("h2")
  content_box.className = "discussion__title";
  const content_title = document.createElement("a");
  content_title.href = obj.url;
  content_title.textContent = obj.title;

  content_box.append(content_title);

  const content_info = document.createElement("div");
  content_info.className = "discussion__information"
  content_info.textContent = obj.author + ' / ' + new Date(obj.createdAt).toLocaleString();

  const answered = document.createElement("p");
  // answered.textContent = '☑';

  avatarWrapper.append(avatar);
  discussionAnswered.append(answered);
  discussionContent.append(content_box, content_info);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form')
const title = document.querySelector('#newName')
const nameInput = document.querySelector('#newTitle')
const textbox = document.querySelector('#story')
form.addEventListener("submit", (event) => {
  event.preventDefault()
  console.log('asdasd')
  const obj = {
    id: "uniqueId",
    createdAt: new Date().toLocaleString(),
    title: title.value,
    author: nameInput.value,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }
  const newDiscussion = convertToDiscussion(obj);
  agoraStatesDiscussions.unshift(newDiscussion);
  ul.prepend(newDiscussion);
})

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
  