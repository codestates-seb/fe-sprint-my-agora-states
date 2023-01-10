// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussionavatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussioncontent";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussionanswered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img"); // 이미지 생성후 정보 저장
  avatarImg.src = obj.avatarUrl; // 이미지 태그에 더미 데이터 src 속성 부여
  avatarImg.alt = "avatar of " + obj.author; // avatar of 더미 데이터 alt 속성 부여
  avatarWrapper.append(avatarImg); // wrapper 부모에 이미지 태그 추가

  const title = document.createElement("h2"); // 질문 제목 테그 h2로 생성
  const a = document.createElement("a"); // 질문 내용을 담을 a 태그 생성

  a.textContent = obj.title; // a 태그에 더미 데이터 문자열 정보 담기
  a.href = obj.url; //a 태그에 href 정보 담기

  title.append(a); // 제목 박스에 내용 담기
  //discussionContent.append(title);
  const information = document.createElement("div"); //위의 과정과 비슷한 과정 한번씩 생각해 보기 (생성 -> 속성 추가 -> append)
  information.className = "discussioninformation";

  information.textContent = `${obj.author} /${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(title, information);

  const check = document.createElement("div");
  check.classList.add("discussionanswered");

  check.textContent = obj.answer !== null ? "해결" : ""; // 백준 질문게시판 참고

  li.append(avatarWrapper, discussionContent, discussionAnswered, check); // 생성한 내용 li에 담기
  return li;
};

// const obje = {
//   id: "temporaryId",
//   title: title.value,
//   author: elementname.value,
//   createdAt: new Date().toLocaleDateString(),
//   url: "https://velog.io/@skd/javascript-%EB%A7%88%EC%9A%B0%EC%8A%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8",
//   avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
// };

// 배열에 넣은 객체를 함수에 인자로 전달해 화면에 추가한다.

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const elementname = document.querySelector("#name");
  const title = document.querySelector("#text");

  const obje = {
    id: "temporaryId",
    title: title.value,
    author: elementname.value,
    createdAt: new Date().toLocaleDateString(),
    url: "https://velog.io/@skd/javascript-%EB%A7%88%EC%9A%B0%EC%8A%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8",
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  };

  const discussionnew = convertToDiscussion(obje);
  ul.prepend(discussionnew);
});
render(ul);
