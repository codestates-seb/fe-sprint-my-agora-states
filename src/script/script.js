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

  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);

  const contentTitleLink = document.createElement("a");
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;
  contentTitle.append(contentTitleLink);

  const contentInformation = document.createElement("div");
  contentInformation.className = "discussion__information";
  discussionContent.append(contentInformation);

  contentInformation.textContent = `${obj.author} ${obj.createdAt}`;

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  obj.answer
    ? (discussionAnswered.textContent = "☑")
    : (discussionAnswered.textContent = "☒");

  if (discussionAnswered.textContent === "☒") {
    discussionAnswered.className = "discussion__not-answered";
  }

  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.className = "avatar--image";
  avatarWrapper.append(avatarImg);

  const discussionCard = document.createElement("div");
  discussionCard.className = "discussion__card";
  discussionCard.append(avatarWrapper, discussionContent, discussionAnswered);

  li.append(discussionCard);
  const ul = document.querySelector("ul.discussions__container");
  ul.append(li);

  if (obj.answer) {
    const answerContainer = document.createElement("div");
    answerContainer.className = "answer__container";

    const answerAvatarWrapper = document.createElement("div");
    answerAvatarWrapper.className = "answer__avatar--wrapper";
    const answerAvatarImage = document.createElement("img");
    answerAvatarImage.className = "answer__avatar--image";
    answerAvatarImage.src = obj.answer.avatarUrl;
    answerAvatarImage.alt = "avatar of " + obj.answer.author;
    answerAvatarWrapper.append(answerAvatarImage);

    const answerContentFolding = document.createElement("details");
    answerContentFolding.className = "answer__content--folding";
    const answerContentFoldingSummary = document.createElement("summary");
    answerContentFoldingSummary.className = "answer__content--folding-summary";
    answerContentFoldingSummary.textContent = `이 이슈에 대해 ${obj.answer.author}님의 답변이 있습니다.`;
    answerContentFolding.append(answerContentFoldingSummary);

    const answerContent = document.createElement("div");
    answerContent.className = "answer__content";
    answerContent.innerHTML = obj.answer.bodyHTML;

    const answerInformation = document.createElement("div");
    answerInformation.className = "answer__information";
    answerInformation.textContent = `${obj.answer.author} ${obj.answer.createdAt}`;

    answerContentFolding.append(answerInformation, answerContent);
    answerContainer.append(answerAvatarWrapper, answerContentFolding);
    li.append(answerContainer);
  }
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
