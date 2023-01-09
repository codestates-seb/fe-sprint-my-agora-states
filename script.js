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
  
  // 아바타 사진
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl; // data.js 에 있는 avatarUrl의 Object 주소값
  avatarImg.alt = 'avatar of ' + obj.author; // 이미지를 대체할 텍스트를 명시 , 이미지가 없을 시 'avatar of xxx' 출력
  avatarWrapper.append(avatarImg);

  // 제목
  const questionTitle = document.createElement("h2"); // index.html 에 제목에 h2 값으 주었으니 여기서도 h2 값을 줬습니다.
  const titlelink = document.createElement("a"); // 링크를 안넣어주니 클릭 효과가 사라져 넣어주었습니다.
  titlelink.href = obj.url;
  titlelink.textContent = obj.title; // data.js에 있는 title 를 출력 해줍니다.
  questionTitle.append(titlelink);
  discussionContent.append(questionTitle);

  // 닉네임 , 날짜
  const avatarinfo = document.createElement("div");
  avatarinfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionAnswered.append(avatarinfo);

  //체크 박스
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "" : "☒";
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


