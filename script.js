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
  //div.discussion__avatar--wrapper 의 자식 요소 채우기
  const avatarImg = document.createElement("img");
  avatarImg.classList = "discussion__avatar--image";
  avatarImg.setAttribute("src", obj.avatarUrl);
  avatarImg.setAttribute("alt", `avartar of ${obj.author}`);

  avatarWrapper.append(avatarImg);

  //div.discussion__content 의 자식 요소 채우기
  const contentTitle = document.createElement("h2");
  contentTitle.classList = "discussion__title";
  const contentTitleLink = document.createElement("a");
  contentTitleLink.setAttribute("href", obj.url);
  contentTitleLink.textContent = obj.title;
  contentTitle.append(contentTitleLink);

  const contentInfo = document.createElement("div")
  contentInfo.classList = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${obj.createdAt}`;

  discussionContent.append(contentTitle, contentInfo);

  //div.discussion__answered 의 자식 요소 채우기
  const answerCheck = document.createElement("p");
  answerCheck.textContent = obj.answer !== null ? "☑" : "☒";

  discussionAnswered.append(answerCheck);

  //li에 각 div 노드 추가
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

