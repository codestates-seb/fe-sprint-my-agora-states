// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions[0]);

const fillAvatarWrapper = (obj) => {
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // child
  const avatar = document.createElement("img");
  avatar.src = obj.avatarUrl;
  avatarWrapper.appendChild(avatar);
  return avatarWrapper;
};

const fillDiscussionContent = (obj) => {
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // children
  // h2 - discussion__title obj.title
  const h2Title = document.createElement("h2");
  // h2 > a - link and obj.title
  const aLink = document.createElement("a");
  aLink.href = obj.url;
  aLink.textContent = obj.title;
  // div - discussion__information obj.author, obj.createdAt
  const divInfo = document.createElement("div");
  divInfo.textContent = `${obj.author} / ${obj.createdAt}`;

  h2Title.appendChild(aLink);
  discussionContent.appendChild(h2Title);
  discussionContent.appendChild(divInfo);
  return discussionContent;
};
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = fillAvatarWrapper(obj);
  const discussionContent = fillDiscussionContent(obj);
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // answer discussionAnswered
  // object.answer 가져와서 위의 과정을 반복한 후 parent만 discussionAnswered로 넣기

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
