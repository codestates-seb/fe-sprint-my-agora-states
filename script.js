// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionBox = document.createElement("div");
  discussionBox.className = "discussion__box";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // avatarWrapper 하위 요소
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";

  // discussionContent 하위 요소
  const title = document.createElement("div");
  title.className = "discussion__title__container";
  const information = document.createElement("div");
  information.className = "discussion__information";

  // title 하위 요소
  const titleH3 = document.createElement("h3");
  titleH3.className = "discussion__title__h3";
  const titleA = document.createElement("a");

  // discussionAnswerd 하위 요소
  const answered = document.createElement("p");

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // avatarImg 데이터 입력
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;

  // avatarWrapper 자식요소 추가
  avatarWrapper.append(avatarImg);

  // titleA 데이터 입력
  titleA.href = obj.url;
  titleA.innerText = obj.title;

  // titleH3 자식요소 추가
  titleH3.append(titleA);

  // information 데이터 입력
  information.innerText = `${obj.author} / ${obj.createdAt}`;

  // title 자식요소 추가
  title.append(titleH3);

  // discussionContetn 자식요소 추가
  discussionContent.append(title);
  discussionContent.append(information);

  // answerd 데이터 입력
  if (answered !== null) {
    answered.innerText = "☑";
  } else {
    answered.innerText = "☒";
  }

  // discussionAnswered 자식요소 추가
  discussionAnswered.append(answered);

  // discussionBox 자식요소 추가
  discussionBox.append(avatarWrapper);
  discussionBox.append(discussionContent);
  discussionBox.append(discussionAnswered);

  // li 자식요소 추가
  li.append(discussionBox);

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
