// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

for (let i = 0; i < localStorage.length; i++) {
  // 초기값 0 , 로컬스토리지에 길이에 값, 증감식
  agoraStatesDiscussions.unshift(JSON.parse(localStorage.getItem(`${i}`)));
}

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

  // 객체를 파라미터로 받아서 요소의 속성값을 채워주기
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");

  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionTitle.classList.add("discussion__title"); // 클래스 네임 상속
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`; // 날짜 표현 형식이 여러개가 있는데 이걸 제일 많이  쓴다

  discussionInfo.classList.add("discussion__information"); // 클래스 네임 상속
  discussionContent.append(discussionTitle, discussionInfo);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "👍" : "🫶";
  discussionAnswered.append(checked);

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

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// submit을 클릭하면 자료를 가져온다

// 화면에 그리는 작업을 렌더링이라고 하는데 지금 이 함수는 렌더링함수 이렇게 호출하면서 끝난다.

// 디스커션 추가 구현
// 문서 내용 가져오기.
const form = document.querySelector("form.form");
const author = form.querySelector("input#name");
const title = form.querySelector("input#title");
const textbox = form.querySelector("textarea#story");

// submit을 클릭하면 자료를 가져온다
form.addEventListener("submit", (event) => {
  event.preventDefault(); //서브밋 이벤트가 될때 새로고침이 안되게 막는다.
  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(newObj);
  const discussion = convertToDiscussion(newObj);
  ul.prepend(discussion);

  const objString = JSON.stringify(newObj);
  window.localStorage.setItem(`${window.localStorage.length}`, objString);

  //제출 후 리셋
  title.value = "";
  author.value = "";
  textbox.value = "";
});
