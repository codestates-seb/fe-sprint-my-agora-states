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
  // 아바타
  const avatarsImg = document.createElement("img");
  avatarsImg.src = obj.avatarUrl;
  avatarsImg.alt = "avatar of " + obj.author;
  avatarsImg.classList.add("discussion__avatar--image");
  // avatarsImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarsImg);
  // 제목
  const agoraStatesh2 = document.createElement("h2");
  agoraStatesh2.className = "discussion__title";
  discussionContent.append(agoraStatesh2);
  const agoraStatesAtag = document.createElement("a");
  agoraStatesh2.append(agoraStatesAtag);
  agoraStatesAtag.href = obj.url;
  agoraStatesAtag.textContent = obj.title;
  // 작성 시간
  const writeTime = document.createElement("div");
  writeTime.className = "discussion__information";
  discussionContent.append(writeTime);
  writeTime.textContent = `${obj.author} / ${obj.createdAt}`;

  // 체크박스
  const checkBox = document.createElement("p");
  discussionAnswered.append(checkBox);
  checkBox.textContent = obj.answer ? "☑" : "☐";

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
