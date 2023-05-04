// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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
  avatarWrapper.append(avatarImg);

  const titleEl = document.createElement("h2");
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleEl.textContent = obj.title;
  titleLink.append(titleEl);
  discussionContent.append(titleLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionInfo);

  const discussionChecked = document.createElement("p");
  discussionChecked.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(discussionChecked);

  li.append(avatarWrapper, discussionContent, discussionAnswered); // 단일 요소 하나를 생성하는 애
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

// 일단 초기 스타일링 전 모습 완료

// 폼에 입력하면 그 정보를 받아와야 함: 버튼 클릭에서도 사용해야함. 폼 가지고 오기
// 사용자가 인풋에 입력을 하고 제출 버튼을 누르면 -> 일단 작성자, 제목만 수집, 아바타는 기본 아바타 이미지 주기
// li 항목으로 생성해서
// 가장 첫번째 항목으로 추가하고 / HTML에 렌더링하기
// 리스트를 전부 다 계속 새로고침해서 렌더링하게 하는 건 좀 문제가 있음.

// 랜덤한 id생성하는 방법(이건 나중에 직접 작성해보기: 지금은 gpt)
// function generateRandomId() {
//   const chars =
//     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let randomId = "";
//   for (let i = 0; i < 10; i++) {
//     randomId += chars[Math.floor(Math.random() * chars.length)];
//   }
// }

const form = document.querySelector('.form');

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("form > #title").value;
  const author = document.querySelector("form > #name").value;
  const discussionText = document.querySelector("form > #story").value;

  const obj = {
    id: 'test',
    createdAt: new Date().toLocaleString('ko-KR'),
    title: title,
    url: "images/quesiton.png",
    author: author,
    answer: {},
    bodyHTML: discussionText,
    avatarUrl: "images/question.png",
  };
  
  agoraStatesDiscussions.unshift(obj);

  const itemLi = convertToDiscussion(obj);
  ul.prepend(itemLi);
});

