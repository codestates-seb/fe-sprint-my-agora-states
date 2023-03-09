// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions); // (41) [{...},{...},{...},{...} ~]

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

  // 프로필 사진
  const avatarImg = document.createElement("img"); // img 요소 할당
  avatarImg.classList.add("discussion__avatar--image"); // class 추가
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);

  
  //타이틀
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  discussionTitle.classList.add("discussion__title")
  titleAnchor.textContent = obj.title; // 제목표시
  titleAnchor.href = obj.url; //링크 
  discussionTitle.append(titleAnchor);

  //날짜 시간
  const discussionInformation = document.createElement("div");
  discussionInformation.classList.add("discussion__information")
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`; //이름 / 
  discussionContent.append(discussionTitle,discussionInformation);

  //체크박스
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "💜" : "🤍";
  discussionAnswered.append(checked);


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

