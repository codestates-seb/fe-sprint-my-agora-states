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
  const avatarImg = document.createElement('img');
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);

  const checked = document.createElement('p');
  checked.textContent = '☑';
  discussionAnswered.append(checked);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};  // 함수의 목적 => li요소들을 뭉쳐 놓은 것

const form = document.querySelector('form.form')
form.addEventListener("submit", (event) =>{
//새로운 객체를 만들어야 함
// Input에 입력된 값(value)를 넣은 새로운 객체
// 새로운 객체를 ul요소 아래로 넣어준다
// 더미데이터(agoraStatesDiscussion)에도 추가



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다. //element에는 뭐가 들어올까? ul
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
// length가 10으로 바꾸면 10 개만 나오지만 우리는 10개 하고 끝낼게 아니기 때문에 값을 줌.




const obj = {
  id: "unique id",
  createdAt: new Date().toISOString(),
  title: inputTitle.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions",
  author: inputName.value,
  avatarUrl: "https://avatars.githubusercontent.com/u/73211553?s=64&v=4",
  bodyHTML: textbox.value,    
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
// render함수 호출