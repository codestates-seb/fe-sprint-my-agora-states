// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  // discussion 아바타 설정
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // discussion 콘텐츠 설정
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionContentTitle = document.createElement("h2");
  discussionContentTitle.className = "discussion__title";
  discussionContent.append(discussionContentTitle);

  const discussionContentTitleAnchor = document.createElement("a");
  discussionContentTitleAnchor.href = obj.url;
  discussionContentTitleAnchor.target = "_blank";
  discussionContentTitleAnchor.textContent = obj.title;
  discussionContentTitle.append(discussionContentTitleAnchor);

  const discussionContentInfo = document.createElement("div");
  discussionContentInfo.className = "discussion__information";
  discussionContentInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(discussionContentInfo);

  // discussion 체크박스 설정
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionAnsweredBtn = document.createElement("button");
  discussionAnsweredBtn.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(discussionAnsweredBtn);

  // discussion 답변 부분

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 디스커션 추가
// form 요소를 가져옴
const form = document.querySelector(".form");
const formAuthor = document.querySelector(".form__input--name > input");
const formTitle = document.querySelector(".form__input--title > input");
const formTextArea = document.querySelector(".form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // 객체를 하나 만든다
  const obj = {
    id: "unique number",
    createdAt: new Date(),
    title: formTitle.value,
    url: "",
    author: formAuthor.value,
    answer: null,
    bodyHTML: formTextArea.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  // agoraStatesDiscussions에 obj를 추가
  agoraStatesDiscussions.unshift(obj);

  // 객체를 convertToDicussion에 넣어서 DOM으로 변환
  // 그걸 또 render 함수에 넣어서 브라우저에 렌더링 -> 맨 앞으로
  ul.prepend(convertToDiscussion(obj));

  // submit을 하면 초기화되게
  formAuthor.value = "";
  formTitle.value = "";
  formTextArea.value = "";
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 더미데이터의 길이만큼, 더미데이터 안에 있는 모든 요소 탐색
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // i번째 요소를 convertTODisscussion에 전달해서 결과를 ul에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);

// server를 통해 렌더
let serverData = []; // 서버에서 받은 데이터를 담을 변수
fetch("http://localhost:4000/discussions")
  .then((res) => res.json())
  .then((json) => {
    serverData = json; //받아온 데이터를 받음
    const ul = document.querySelector("ul.discussions__container");
    render(ul);
  });
