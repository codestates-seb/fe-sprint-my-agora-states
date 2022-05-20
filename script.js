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
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";

  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionInformation);

  const discussionAnswer = document.createElement("p");
  if (obj.answer !== null) {
    discussionAnswer.innerText = "☑";
  } else {
    discussionAnswer.innerText = "☒";
  }
  discussionAnswered.append(discussionAnswer);

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

//form에서 적은 내용 ul에 추가하기
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
    "https://imagescdn.gettyimagesbank.com/171/201607/a10519973.jpg";
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
