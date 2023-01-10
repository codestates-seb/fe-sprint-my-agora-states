// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions); // data.js script태그가 먼저 html에 있음

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// obj를 받아서 li엘리먼트로 변환하는 함수
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");
  // let imgsrc = '';
  // if (!obj.avatarUrl) {
  //   imgsrc = 'default image'
  // }
  avatarImg.src = obj.avatarUrl ? obj.avatarUrl : 'default image';
  // avatarImg.src = obj.avatarUrl || 'default image';
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a"); 
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} /
   ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionContent.append(discussionTitle, discussionInformation);

  const checked = document.createElement("span");
  checked.className = "material-icons";
  checked.textContent = obj.answer ? "check_circle_outline" : "highlight_off";
  discussionAnswered.append(checked);



  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // null 아니면 데이터...이렇게 정리가 되어있어야 좋은 데이터
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
