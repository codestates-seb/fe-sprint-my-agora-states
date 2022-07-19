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
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  const title = document.createElement("h2");
  title.className = "discussion__title";
  const link = document.createElement("a");
  link.href = obj.url;
  link.innerText = obj.title;
  title.append(link);

  const information = document.createElement("div");
  information.className = "discussion__information";
  information.innerText = obj.author + " / " + new Date(obj.createdAt).toLocaleDateString();
  discussionContent.append(title, information);

  const check = document.createElement("p");

  if(obj.answer){
    check.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>'
  }

  discussionAnswered.append(check);

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

function write(event) {
  event.preventDefault();

  const name = document.querySelector("#name");
  const title = document.querySelector("#title");
  const story = document.querySelector("#story");

  const obj = {
    id: "temporaryId",
    createdAt: new Date().toLocaleDateString(),
    title: title.value,
    url: "#",
    author: name.value,
    answer: null,
    bodyHTML: story.value,
    avatarUrl:"https://velog.velcdn.com/images/3hee_11/post/5ce914bd-1f26-426a-8dbb-fecc5dd50cfc/image.jpg"
  }

  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(agoraStatesDiscussions[0]);
  ul.prepend(newDiscussion);

  name.value = "";
  title.value = "";
  story.value = "";
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const form = document.querySelector("form");
form.addEventListener("submit", write);

