// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
const ul = document.querySelector("ul.discussions__container");

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // avatar
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // content
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // answered
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement("h3");
  contentTitle.className = "discussion__title";
  const contentUrl = document.createElement("a");
  contentUrl.href = obj.url;
  contentUrl.textContent = obj.title;
  contentTitle.append(contentUrl);

  const contentInfo = document.createElement("div");
  contentInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  contentInfo.className = "discussion__information";

  discussionContent.append(contentTitle, contentInfo);

  const answered = document.createElement("div");
  answered.className = "discussion__answered";
  const answeredCheck = document.createElement("p");
  answeredCheck.textContent = obj.answer ? "☑" : "❏";

  answered.append(answeredCheck);
  discussionAnswered.append(answered);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  discussionAnswered.appendChild(removeBtn);

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

if (window.localStorage) {
  const discussionString = window.localStorage.getItem("discussion");
  const discussionObj = JSON.parse(discussionString);
  // agoraStatesDiscussions.unshift(discussionObj);
  ul.prepend(convertToDiscussion(discussionObj));
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
render(ul);

// 아이디, 제목, 본문을 입력하고 누르면 실제 화면에 디스커션이 추가
// agoraStatesDiscussions 배열에 들어가 있는 요소는 객체형태로 들어가 있다 { title, author, createdAt, avatarUrl, url }
// agoraStatesDiscussions 배열에 추가한 데이터가 실제 쌓여야 한다(concat()을 사용해서 불변성을 지키고 새로운 요소 넣기)
// 등록한 시간까지 같이 나올 수 있게(advanced)
const form = document.querySelector(".form");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputText = document.querySelector("#story");

// input 태그 id를 가져와야 value를 사용할 수 있다
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newDiscussion = {
    createdAt: new Date().toISOString(),
    title: inputText.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/4",
    author: inputName.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };

  agoraStatesDiscussions.unshift(newDiscussion);
  ul.prepend(convertToDiscussion(newDiscussion));

  inputName.value = "";
  inputTitle.value = "";
  inputText.value = "";

  // submit 하면 객체 newDiscussion을 localStorage에 저장
  const objString = JSON.stringify(newDiscussion);
  window.localStorage.setItem("discussion", objString);
});
