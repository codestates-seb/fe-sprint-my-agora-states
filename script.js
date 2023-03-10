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

  const ul = document.querySelector("ul.discussions__container");
  ul.append(li);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  //title
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);
  //href링크
  const contentLink = document.createElement("a");
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  discussionTitle.append(contentLink);
  //정보 주기
  const contentInformation = document.createElement("div");
  contentInformation.className = "discussion__information";
  contentInformation.textContent = obj.author;
  discussionContent.append(contentInformation);
  //체크박스
  const contentAnswered = document.createElement("p");
  contentAnswered.className = "discussion__answered";
  discussionAnswered.append(contentAnswered);
  //answer 가 null이면 체크 안보임, answer이 null이 아니면
  if (obj.answer === null) {
    contentAnswered.textContent = "🔲";
  } else {
    contentAnswered.textContent = "💊";
    discussionTitle.className += " answered";
    //답한 질문은 다른 클래스를 주기
  }

  //작성자 이름이 땡땡땡이면 contentAnswered를 보이지 않게 해야 할듯?
  if (obj.author === "kimploo") {
    contentAnswered.textContent = "";
    li.className = "discussion__container kimploo";
  }

  contentInformation.textContent = `${obj.author} / ${obj.createdAt}`;

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector("form.form");
const title = document.querySelector("input#title");
const author = document.querySelector("input#name");
const story = document.querySelector("textarea#story");
const formSubmit = document.querySelector("#submit");
const answerAlert = document.querySelector(".answer-alert");
console.log(author);
console.log(story);
form.addEventListener("submit", (e) => {
  //하나의 객체를 만들어 convertToDiscussion함수에 넣어 li로 만든 뒤 ul 요소에 어펜드
  e.preventDefault();
  const newDiscussion = {
    id: "unique value",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: author.value,
    answer: null,
    bodyHTML: story.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  ul.prepend(convertToDiscussion(newDiscussion));
  //맨 뒤로 안 붙게 앞으로 붙임.
  //등록이 눌리면 class hide-alert인 div에 클래스가 떨어진다.
  //그 div가 클릭되면 다시 hide-alert가 붙는다.
  formSubmit.addEventListener("click", function () {
    answerAlert.classList.remove("hide-alert");
  });
  answerAlert.addEventListener("click", function () {
    answerAlert.classList.add("hide-alert");
  });
  title.value = "";
  author.value = "";
  story.value = "";
});
//탑버튼 만들기
const scrollButton = document.querySelector(".scroll");
scrollButton.addEventListener("click", function () {
  let body = document.getElementsByTagName("body")[0];
  window.scroll({
    behavior: "smooth",
    top: body.offsetTop,
  });
});
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
