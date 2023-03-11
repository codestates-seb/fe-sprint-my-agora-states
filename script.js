// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// TODO: 페이지 네이션

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  //질문 리트스 >> 생성
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  //아바타 프로필 >> 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  //아바타 프로필_사진 >> 생성
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  avatarImg.alt = "avatar of " + agoraStatesDiscussions[0].author;
  //아바타 프로필>> 추가
  avatarWrapper.append(avatarImg);

  //게시글 >> 생성
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  //게시글_제목 >> 생성
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionAnchor = document.createElement("a");
  discussionAnchor.href = obj.url;
  discussionAnchor.textContent = obj.title;
  //게시글_작성자/날짜 >> 생성
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  // //게시글 >> 추가
  discussionContent.append(discussionTitle, discussionInfo);
  discussionTitle.appendChild(discussionAnchor);

  //답변 여부 >> 생성
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "🌸" : "🌱";
  // 답변 여부 >> 추가
  discussionAnswered.appendChild(checked);

  //객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

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
