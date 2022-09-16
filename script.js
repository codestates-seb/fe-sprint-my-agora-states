// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// 이함수의 목적은 값을 추출해서 새로운 li 뭉치를 만들기 위함
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
  // 1. 아바타 영역
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`
  avatarWrapper.append(avatarImg);
  // 2. 콘텐츠 영역
  // 2-1. 제목
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);
  // contentTitle.className = "discussion__title";

  // 2-2. 정보
  const discussionInformation = document.createElement("div");
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInformation);
  // contentInformation.className = "discussion__information";

  // 3. 체크박스 영역
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //더미데이터 길이만큼, 더미데이터 안에 있는 모든 요소를 탐색
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // i번째 요소를 convertToDiscussion에 전달해서 결과를 ul에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//적은 내용을 자바스크립트로 가져온다
//submit 누르면 맨위에 저장한다
const form = document.querySelector("form.form");
form.addEventListener('submit', createAgoraDiscussion)
// 객체를 하나 만든다
// 그 객체를 converToDiscussion에 넣어서 DOM으로 변환
// 그걸 또 render함수에 넣어서 브라우저에 렌더링
function createAgoraDiscussion(event) {
	event.preventDefault()

  const author = form.querySelector("div.form__input--name > input");
  const title = form.querySelector("div.form__input--title > input");
  const textbox = form.querySelector("div.form__textbox > textarea");

  const obj = {
    id: "unique number",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    bodyHTML: textbox.value,
    avatarUrl: "https://robohash.org/fa903efdfb124e9a7b5b55cffe7a8dd2?set=set4&bgset=&size=400x400"
  }
// 맨 앞으로 넣어줘야 함
agoraStatesDiscussions.unshift(obj);
ul.prepend(convertToDiscussion(obj));
author.value = "";
title.value = "";
textbox.value = "";
}


// localStorage.setItem('test', 1);
// localStorage.getItem('test')
