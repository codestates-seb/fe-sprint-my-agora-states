// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // 프로필 사진
  avatarWrapper.className = "discussion__avatar--wrapper";
  const img = document.createElement("img"); // 이미지 태그 만들기
  img.src = obj.avatarUrl;
  avatarWrapper.append(img);

  const discussionContent = document.createElement("div"); // 질문 내용
  discussionContent.className = "discussion__content";

  const discussionContentDiv = document.createElement("div"); // 질문 내용 컨텐츠

  const author = document.createElement("span");
  author.textContent = obj.author;
  author.classList.add("discussion__author");

  const title = document.createElement("h2"); // 질문 내용 타이틀
  const a = document.createElement("a");
  a.href = obj.url;
  a.textContent = obj.title;
  title.append(a);
  title.classList.add("discussion__title");

  const date = document.createElement("span");
  date.textContent = obj.createdAt;
  date.classList.add("discussion__date");

  discussionContentDiv.append(author, title, date);
  discussionContentDiv.classList.add("discussion__information");
  discussionContent.append(discussionContentDiv);

  const discussionAnswered = document.createElement("div"); // 답변 유무 체크박스
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

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

// 새로운 정보 입력 시, 배열에 추가

const submitBtn = document.querySelector(".submit-icon");

submitBtn.addEventListener("click", function () {
  console.log("hi");
});
