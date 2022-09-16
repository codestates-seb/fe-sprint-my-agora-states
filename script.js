// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
//이미지 영역

const convertToDiscussion = (obj) => {
  // 객체를 매개변수로 받는다.
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  //이미지 영역(아바타)
  const face = document.createElement("img"); // 프로필 사진
  face.src = obj.avatarUrl;
  face.alt = "avatar of" + obj.author;
  avatarWrapper.append(face);

  //콘텐츠 영역
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  discussionTitle.className = "discussion__title";
  titleAnchor.textContent = obj.title;
  titleAnchor.href = obj.url;

  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;

  discussionInfo.className = "discussion__information";
  discussionContent.append(discussionInfo);

  // 3.체크박스
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒"; //삼항연산자 문법
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //더미데이터의 길이만큼, 더미데이터 안에 있는 모든 요소를 탐색
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //i번째 요소를 coverToDiscussion에 전달해서 결과를 ul append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// 이벤트 리스너
const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
  console.log("제출");
  event.preventDefault(); //새로고침 발생 방지
  //객체를 하나 만든다.
  //그 객체를 convertToDis 에 넣어서 Dom으로 변환
  //그걸 또 reder함수에 넣어 브라우저에 랜더링
  const author = form.querySelector("div.form__input--name > input").value;
  const title = form.querySelector("div.form__input--title > input").value;
  const textarea = form.querySelector("div.form__textbox > textarea").value;

  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",

    author: author,
    bodyHTML: textbox,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(newObj);

  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);

  // submit 후 입력란 빈칸으로 리셋하는 기능 추가
  form.querySelector("div.form__input--name > input").value = "";
  form.querySelector("div.form__input--title > input").value = "";
  form.querySelector("div.form__textbox > textarea").value = "";
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
