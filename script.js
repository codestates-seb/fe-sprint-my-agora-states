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

  // 프로필 사진 img 태그 생성 후 avatarWrapper에 넣기
  const discussionAvatarImage = new Image();
  discussionAvatarImage.src = `${obj.avatarUrl}`;
  discussionAvatarImage.className = "discussion__avatar--image";
  avatarWrapper.appendChild(discussionAvatarImage);

  // h2태그와 a태그 생성
  const discussionTitle = document.createElement("h2");
  const titleA = document.createElement("a");
  //a태그의 href & textContent를 설정하고 h2태그의 자식으로 append
  titleA.href = `${obj.url}`;
  titleA.textContent = `${obj.title}`;
  discussionTitle.appendChild(titleA);
  discussionTitle.className = "discussion__title";

  // 작성자 정보와 작성 시간 정보 넣을 div 생성
  const discussionInformation = document.createElement("div");
  // 작성자와 시간 정보 textContent로 넣어줌 (innerText는 개행까지 반영)
  discussionInformation.innerText = `${obj.author} 
  ${obj.createdAt}`;
  discussionInformation.className = "discussion__information";
  // discussionContent에 append 해 주기
  discussionContent.appendChild(discussionTitle);
  discussionContent.appendChild(discussionInformation);

  if (obj.answer) {
    const answeredBtn = document.createElement("button");
    answeredBtn.textContent = "답변 완료";
    answeredBtn.className = "answered-btn";
    discussionAnswered.append(answeredBtn);
  }

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

const modalForm = document.querySelector(".form__container");
const btnOpenPopup = document.querySelector(".create-btn");
const body = document.querySelector("body");

btnOpenPopup.addEventListener("click", () => {
  modalForm.style.display = "block";
  body.style.overflow = "hidden";
});

modalForm.addEventListener("click", (e) => {
  const evTarget = e.target;
  if (evTarget.classList.contains("form__container")) {
    modalForm.style.display = "none";
    body.style.overflow = "scroll";
  }
});

// 내 질문 남기기

const submitForm = document.querySelector(".form");

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const createdDiscussion = {};
  let today = new Date();
  let createdAt = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const author = document.querySelector("#name").value;
  const title = document.querySelector("#title").value;
  const story = document.querySelector("#story").value;

  createdDiscussion.author = author;
  createdDiscussion.title = title;
  createdDiscussion.avatarUrl =
    "https://pixabay.com/get/g11738ef7570b499a0d470655f857a9dd5cccf78862b6b49f2510977d9fada7218a8b35445f14cb9419eb9c808c66a6c3c950acc7dcf99b6eb16c85f332f157e67b79a99ff44daa4a34f4c89229fb0f4f_640.jpg";
  createdDiscussion.createdAt = createdAt;
  createdDiscussion.answer = null;

  agoraStatesDiscussions.unshift(createdDiscussion);
  const discussion = convertToDiscussion(createdDiscussion);

  ul.prepend(discussion);

  document.querySelector("#name").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#story").value = "";

  modalForm.style.display = "none";
  body.style.overflow = "scroll";
});
