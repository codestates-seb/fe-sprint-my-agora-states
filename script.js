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
  // 왜 새롭게 만들어주어야하는가?
  // convertToDiscussion 이 함수의 목적은 값을 추출해서 새로운 il뭉치를 만들기 위해

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const face = document.createElement("img"); // 프로필 사진
  face.src = obj.avatarUrl;
  face.alt = "avatar of" + obj.author;
  avatarWrapper.append(face);

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${new Date( //현지시간 적용
    obj.createAt
  ).toLocaleTimeString()}`; // 날짜 표현 형식이 여러개가 있는데 이걸 제일 많이  쓴다
  discussionContent.append(discussionTitle, discussionInfo);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li; // il요소를 위의 함수를 통해 가공해서 append
};

// form 은 데이터를 깔끔하게 받기 위해서 받는것
//

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 여기 엘리먼트는 ul.discussions__container 이게 들어옴
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const ul = document.querySelector("ul.discussions__container");
render(ul);
