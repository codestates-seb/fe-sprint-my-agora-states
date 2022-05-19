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
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  // 질문과 하이퍼링크 추가
  const title = document.createElement("h3");
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);
  discussionContent.append(title);

  // 작성자 닉네임과 작성 시간 추가
  const information = document.createElement("div");
  information.classList.add("discussion__information");
  information.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(information);

  // 답변 유무 추가
  if (obj.answer === null) {
    // ☑
    discussionAnswered.textContent = "❌";
  } else {
    discussionAnswered.textContent = "⭕️";
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
