// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  //객체를 매개변수로 받는다
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  //콘텐츠 영역
  const h_title = document.createElement("h2");
  h_title.className = "discussion__title";
  discussionContent.append(h_title);
  const anchor = document.createElement("a");
  anchor.href = obj.url;
  h_title.append(anchor);
  anchor.textContent = obj.title;
  //인포메이션 영역
  const information = document.createElement("div");
  information.className = "discussion__information";
  discussionContent.append(information);
  information.textContent = `${obj.author} 💕${obj.createdAt}`;
  //아바타영역
  const avatarImg = document.createElement("img");
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl; //obj.avatarUrl
  avatarImg.alt = "avatar of " + agoraStatesDiscussions[0].author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);
  //체크박스영역
  const checked = document.createElement("p");
  discussionAnswered.append(checked);
  checked.textContent = obj.answer === null ? "❎" : "✅";
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
function setLocal() {
  localStorage.setItem("KEY", JSON.stringify(agoraStatesDiscussions));
}
//
let saveGetLocal = localStorage.getItem("KEY");
const parsedLocal = JSON.parse(saveGetLocal);
const submitHandler = document.querySelector(".form");
const setName = document.querySelector(".form__input--name >input");
const setTitle = document.querySelector(".form__input--title > input");
const setDiscussion = document.querySelector("#story");
//이벤트 발생
submitHandler.addEventListener("submit", function (event) {
  event.preventDefault();
  const newSetName = setName.value;
  const newSetTitle = setTitle.value;
  const newSetDiscussion = setDiscussion.value;
  const newObj = {
    id: "D_kwDOHOApLM4APjIj",
    createdAt: new Date(),
    title: newSetTitle,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: newSetName,
    answer: null,
    bodyHTML: "",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
  };
  agoraStatesDiscussions.unshift(newObj);
  setLocal();
  ul.prepend(convertToDiscussion(newObj));
});

//
const ul = document.querySelector("ul.discussions__container");

//ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 랜더링합니다
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //i 번째 요소룰 convertToDiscussion 전달후 ul 에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
render(ul);
