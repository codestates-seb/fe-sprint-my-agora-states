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

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const iconImg = document.createElement("img");
  iconImg.className = "discussion__avatar--image";

  const discussionTitle = document.createElement("h2");
  const discussionLink = document.createElement("a");

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";

  const discussionAnsweredCheck = document.createElement("i");
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //discussionWrapper
  iconImg.setAttribute("src", `${obj.avatarUrl}`);
  avatarWrapper.append(iconImg);

  //discussionContent
  discussionLink.setAttribute("href", `${obj.url}`);
  discussionLink.textContent = `${obj.title}`;
  discussionInfo.textContent = `${obj.author}/${obj.createdAt}`;
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle, discussionInfo);

  //discussionAnswered
  discussionAnsweredCheck.className = obj.answer
    ? "fa-solid fa-circle-check"
    : "fa-solid fa-circle-xmark";
  discussionAnswered.append(discussionAnsweredCheck);

  li.append(
    avatarWrapper,
    discussionContent,
    discussionInformation,
    discussionAnswered
  );
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
