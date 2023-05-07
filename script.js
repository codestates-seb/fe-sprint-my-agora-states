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

  // img 넣기
  const createImg = document.createElement("img");
  createImg.src = obj.avatarUrl;
  createImg.alt = "avatar of " + obj.author;
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  avatarWrapper.append(createImg);

  // Text Box 넣기

  const createTitleText = document.createElement("span");
  const createLink = document.createElement("a");

  createLink.innerHTML = obj.title;
  createLink.href = obj.url;

  createTitleText.appendChild(createLink);
  discussionContent.appendChild(createTitleText);

  const createNameText = document.createElement("div");
  createNameText.innerText = `${obj.author} / ${obj.createdAt}`;

  discussionContent.appendChild(createNameText);

  // check box 넣기

  const createCheckBox = document.createElement("div");
  const createCheck = document.createElement("p");

  createCheck.innerHTML = "☑";
  createCheckBox.appendChild(createCheck);

  discussionAnswered.appendChild(createCheckBox);

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
