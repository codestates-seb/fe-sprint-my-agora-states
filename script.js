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
  //이미지 추가
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`
  avatarWrapper.append(avatarImg)

  //content부분
  const contentTitle = document.createElement('h2'); //질문 제목 태그 h2 생성
  contentTitle.className = "discussion__title";

  const titleAnchor = document.createElement('a'); //질문 내용을 담는 태그 a 생성
  titleAnchor.href = obj.url; //a태그에 href 정보 담기
  titleAnchor.textContent = obj.title; //a태그에 데이터 문자열 
  contentTitle.append(titleAnchor); //제목 박스에 내용 담기

  const contentInfo = document.createElement('div')
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  discussionContent.append(contentTitle, contentInfo);

  const checked = document.createElement('p');
  checked.textContent = obj.answer ? '🌸' : ''; //삼항연산자 사용 
  discussionAnswered.append(checked)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const title = document.querySelector('input#title');
const author = document.querySelector('input#name');
const story = document.querySelector('textarea#story');
form.addEventListener('submit', (event) => {
  event.preventDefault(); //preventDefault로 form 요소에 새로고침을 막는다 
  //하나의 객체를 만들어서 convertToDiscussion함수에 넣어서 li로 만든 다음 ul 요소에 append
  const newDiscussion = {
    id: "unique value",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/37",
    author: author.value,
    answer: {check:1},
  bodyHTML:story.value,
avatarUrl: "https://avatars.githubusercontent.com/u/73211553?s=64&v=4",
};
ul.prepend(convertToDiscussion(newDiscussion)) //prepend 하면 맨앞에 붙는다. append는 맨 뒤에 붙는다. 
title.value = "";
author.value = "";
story.value = "";
})

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
