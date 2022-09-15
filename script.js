// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleUrl = document.createElement("a");
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";

  // 아바타: 이미지 소스, alt 지정
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // 콘텐츠 제목, info에 객체의 값 할당
  discussionTitleUrl.textContent = obj.title;
  discussionTitleUrl.href = obj.url;
  // 새 창에서 열리도록 속성 부여
  discussionTitleUrl.setAttribute("target", "_blank");
  discussionTitle.append(discussionTitleUrl);
  discussionInfo.textContent = obj.author + " | " + obj.createdAt;

  // 부모 요소 content에 append
  discussionContent.append(discussionTitle, discussionInfo);

  // 체크표시
  discussionAnswered.textContent = "☑";

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

// submit 버튼을 눌렀을 때 디스커션이 agora 데이터 배열에 추가되어야 함
// 그럼 자동으로 convertDiscussion 함수에서 DOM으로 추가됨.
// 배열에 추가하는 것이 관건!
// 새 객체를 만들어 배열에 unshift하는 함수 생성
// 버튼 클릭 시 함수 실행되도록 이벤트 핸들러 작성
const questionForm = document.querySelector(".form");

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputName = event.target["name"];
  const inputTitle = event.target["title"];

  const newObj = {};

  newObj.author = inputName.value;
  newObj.title = inputTitle.value;
  // 이미지 랜덤 링크 받아오기
  // 현재 시각 받아오기

  agoraStatesDiscussions.unshift(newObj);
  ul.prepend(convertToDiscussion(newObj));
});
