// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 댭변 상태에 따라 아이콘 사용
const ANSWERED_MARK = "☑︎";
const UNANSERED_MARK = "◻︎";

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");

  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "discussion__avatar--image";

  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  const discussionUrl = document.createElement("a");

  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title;

  discussionTitle.append(discussionUrl);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  discussionInformation.textContent = obj.createdAt;

  discussionContent.append(discussionTitle, discussionInformation);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionIcon = document.createElement("p");

  if (obj.answer === null) {
    discussionIcon.textContent = UNANSERED_MARK;
  } else {
    discussionIcon.textContent = ANSWERED_MARK;
  }

  discussionAnswered.append(discussionIcon);

  const discussionAnswerButton = document.createElement("button");
  discussionAnswerButton.className = "discussion__answer__button";
  discussionAnswerButton.textContent = "자세히 보기";

  const discussionAnswerContent = document.createElement("div");
  discussionAnswerContent.className = "discussion__answer__content";

  const discussionAnswerTitle = document.createElement("h2");
  discussionAnswerTitle.className = "discussion__anwer__title";

  const discussionDescription = document.createElement("p");
  discussionDescription.className = "discussion__anwer__description";

  if (obj.answer != null) {
    discussionAnswerContent.innerHTML = obj.answer.bodyHTML;
  } else {
    discussionAnswerContent.textContent = "답변이 없네요 😢";
  }

  discussionAnswerContent.append(discussionAnswerTitle, discussionDescription);

  li.append(avatarWrapper, discussionContent, discussionAnswered, discussionAnswerButton, discussionAnswerContent);

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
