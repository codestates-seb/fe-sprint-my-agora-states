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
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionInfo.className = "discussion__information";

  discussionContent.append(discussionTitle, discussionInfo);

  const answered = document.createElement("div");
  const checked = document.createElement("p");
  checked.textContent = '☑';
  answered.append(checked);
  discussionAnswered.append(answered);

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

//디스커션 추가 기능
const form = document.querySelector('.form');
// const submitBtn = document.querySelector('.submit__btn');
const textbox = document.querySelector('.txt__story');
const inputName = document.querySelector('.input__name');
const inputTitle = document.querySelector('.input__title');

form.addEventListener('submit', (evt) => {
  //submit 버튼을 눌러도 새로고침이 되지않고, 
  evt.preventDefault();
  
  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: inputName.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/73211553?s=64&v=4",
    bodyHTML: textbox.value,    
  };

  agoraStatesDiscussions.unshift(obj);
  console.log(agoraStatesDiscussions);
  const newObj = convertToDiscussion(obj);
  // prepend는 선택한 요소 내부 맨앞에 추가
  ul.prepend(newObj);

})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
