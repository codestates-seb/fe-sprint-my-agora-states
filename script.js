// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // avatarWrapper 수정
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);


  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // content 수정 
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  const discussionInfomation = document.createElement("div");
  discussionInfomation.className = "discussion__information";
  discussionInfomation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionTitle, discussionInfomation);


  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // answered 수정
  const isAnswer = document.createElement("p");
  if (obj.answer !== null) {
    isAnswer.innerText = "☑";
  } else {
    isAnswer.innerText = "☒";
  }
  discussionAnswered.append(isAnswer);

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


// ---------------- 데이터 쌓이게
const questionForm = document.querySelector(".form");

const formToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src =
    "https://picsum.photos/250/250";
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";

  const discussionLink = document.createElement("a");
  discussionLink.href = "";
  discussionLink.textContent = obj[1].value;
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj[0].value;
  discussionContent.append(discussionInformation);

  const discussionAnswer = document.createElement("p");
  discussionAnswer.innerText = "☒";
  discussionAnswered.append(discussionAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

function onSubmit(event) {
  event.preventDefault();
  ul.prepend(formToDiscussion(questionForm));
}

questionForm.addEventListener("submit", onSubmit);
