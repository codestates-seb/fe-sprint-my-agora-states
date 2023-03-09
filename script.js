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

  // <img> 요소를 생성하고 src, alt 속성의 정보를 넣는다.
  // avatarWrapper의 자식요소로 추가한다.
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of'+obj.author;
  avatarWrapper.append(avatarImg);
  
  // <h2> , <div> 생성하고 className을 준다. 
  // <a> 요소를 생성한 후 href 속성의 정보를 넣고
  // <a> 요소의 textContent에 obj.title을 할당
  // <h2> 요소의 자식요소로 <a>를 추가 (append)
  // <div> 요소의 textContent에 'obj.author+' / '+obj.createdAt'
  // discussionContent의 자식요소로 <h2>와 <div>를 추가
  const elTitle = document.createElement("h4");
  elTitle.className = "discussion__title";
  const elInfo = document.createElement("div");
  elInfo.className = "discussion__information";
  
  const elUrl = document.createElement("a");
  elUrl.href = obj.url;
  elUrl.textContent = obj.title;
  elTitle.append(elUrl);

  elInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(elTitle, elInfo);
  
  // <div>생성 후 className 준다.
  // <p> 생성하고 textContent를 넣는다.
  // <p> 요소를 <div> 요소 안에 추가한다.
  // discussionAnswered의 자식요소로 <div>추가
  const elCheck = document.createElement("p");
  if (obj.answer === null) { 
  elCheck.textContent = "✖️";
  discussionAnswered.append(elCheck);
} else {
  elCheck.textContent = "✔️";
  discussionAnswered.append(elCheck);
}
  // elCheck.textContent = obj.answer? "✔️":"✖️";
  // discussionAnswered.append(elCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// if (obj.answer === null) { 
//   elCheck.textContent = "✔️";
//   discussionAnswered.append(elCheck);
// } else {
//   elCheck.textContent = "✖️";
//   discussionAnswered.append(elCheck);
// }

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
