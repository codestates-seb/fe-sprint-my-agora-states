// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const date = new Date();
let submitBtn = document.querySelector('.form__submit');
let elName =  document.querySelector('#name');
let elTitle =  document.querySelector('#title');
let elStory =  document.querySelector('#story');

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
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const titleName = document.createElement('h2');
  titleName.className = "discussion__title";
  const titleLink = document.createElement('a');
  titleLink.setAttribute("href",obj.url);
  titleLink.textContent = obj.title;
  titleName.append(titleLink);
  const information = document.createElement('div');
  information.className = "discussion__information";
  information.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(titleName, information);

  const answered_emoji = document.createElement('p');
  answered_emoji.className = "discussion__answered";
  if (obj.answer !== null){
    answered_emoji.textContent = '☑';
  }
  else{
    answered_emoji.textContent = '☒';
  }
  discussionAnswered.append(answered_emoji);

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

submitBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  let newDisscussion = new Object();
  newDisscussion.author = elName.value;
  newDisscussion.title = elTitle.value;
  newDisscussion.createdAt = date.toLocaleString('ko-kr');
  newDisscussion.answer = null;
  newDisscussion.avatarUrl = 'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4';
  agoraStatesDiscussions.unshift(newDisscussion);
  ul.prepend(convertToDiscussion(newDisscussion));
})
