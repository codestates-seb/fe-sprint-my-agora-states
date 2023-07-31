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
  // 프로필 사진 넣기
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImg);


  // 컴포던트_중앙상단_질문제목
  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";

  const titleAnchor = document.createElement("a");
  titleAnchor.textContent = obj.title;
  titleAnchor.href = obj.url;

  contentTitle.append(titleAnchor);
  discussionContent.append(contentTitle);


  // 컴포던트_중앙하단_저자/생성일
  const contentInfo = document.createElement("div");
  contentInfo.className = "discussion__information";

  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(contentInfo);
  
  // 컴포던트_우측_답변여부
  const checked = document.createElement("img"); // img
  checked.className = "discussion__answered";
  checked.textContent = obj.answer ? `${checked.src = "img/버튼_O.png"}` : `${checked.src = "img/버튼_X.png"}`; // 삼항연산자 // src 이미지 링크를 넣어준다.

  
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 질문 추가 기능
const nameInput = document.querySelector("#name"); // name 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const titleInput = document.querySelector("#title"); // title 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const questionInput = document.querySelector("#story"); // story 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const formInput = document.querySelector(".form");

// 실시간 생성일

formInput.addEventListener("submit", function(event) {
  event.preventDefault(); // 창이 새로고침 되는 것을 막아줌.
  const obj = {
    id: "unique value",
    createdAt: new Date(),
    title: titleInput.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/",
    author: nameInput.value,
    answer: null,
    bodyHTML: questionInput.value,
    avatarUrl:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  }

  // agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj)); // prepend: 콘텐츠를 선택한 요소 내부의 시작 부분에서 삽입

  nameInput.value = "";
  titleInput.value = "";
  questionInput.value = "";

});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
