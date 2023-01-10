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

  // 이미지 안
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  // 콘텐츠 안
  const title = document.createElement("h2");
  const titleLink = document.createElement("a");
  title.className = "discussion__title";
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);

  const information = document.createElement("div");
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString("ko-kr")}`;
  discussionContent.append(title, information);

  //답변 체크
  const checkAnswer = document.createElement("p");
  checkAnswer.textContent = obj.answer ? "☑" : "X";
  discussionAnswered.append(checkAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  if (localStorage.getItem("cdtData") !== null) {
    //로컬 스토리지 이미 차있다면
    const parseCdtSaveData = JSON.parse(localStorage.getItem("cdtData"));
    agoraStatesDiscussions = [...parseCdtSaveData, ...agoraStatesDiscussions];
    console.log(agoraStatesDiscussions);
  }

  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
