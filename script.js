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
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.style.width = "64px";
  avatarWrapper.append(avatarImg);

  //discussion__title
  const title = document.createElement("h2");
  title.className = "discussion__title";

  //discussion__title > a
  const aTag = document.createElement("a");
  aTag.href = obj.url;
  aTag.textContent = obj.title;
  title.append(aTag);

  //discussion__information
  const information = document.createElement("div");
  information.className = "discussion__information";
  information.textContent = `${obj.id} / ${obj.createdAt}`;

  //discussionContent 추가
  discussionContent.append(title);
  discussionContent.append(information);

  //discussion__answered
  const answered = document.createElement("div");
  answered.className = "discussion__answered";
  const pTag = document.createElement("p");
  const spanTag = document.createElement("span");
  spanTag.className = "material-symbols-outlined";
  if (obj.answer) {
    //답변 있을시 체크
    spanTag.textContent = "done";
  } else {
    //없으면 X
    spanTag.textContent = "close";
  }
  pTag.append(spanTag);
  answered.append(pTag);
  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
//로컬 스토리지 체크
let objArray = JSON.parse(window.localStorage.getItem("objArray"));
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //로컬스토리지 값이 있으면
  console.log(objArray);
  if (objArray) {
    const reverse = [...objArray].reverse();
    for (let i = 0; i < reverse.length; i += 1) {
      element.append(convertToDiscussion(reverse[i]));
    }
  }
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const form = document.querySelector(".form");

form.addEventListener("submit", () => {
  const name = document.querySelector("#name").value;
  const title = document.querySelector("#title").value;
  const question = document.querySelector("#story").value;

  const obj = {
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    author: name,
    url: "/",
    title: title,
    id: name,
    createdAt: new Date().toISOString(),
  };

  //최초 배열로 생성
  if (!objArray) {
    objArray = [];
  }
  //추가
  objArray.push(obj);
  //저장
  window.localStorage.setItem("objArray", JSON.stringify(objArray));
});
