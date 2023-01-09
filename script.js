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
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
  const discussionTitle = document.createElement("h2")
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const discussionTitleUrl = document.createElement("a")
  discussionTitleUrl.href = obj.url;
  discussionTitleUrl.textContent = obj.title;
  discussionTitle.append(discussionTitleUrl);
  
  const discussionInformation = document.createElement("div")
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionInformation);

  const discussionCheck = document.createElement("p")
  if(obj.answer === null) {
    discussionCheck.textContent = '☒';
  } else {
    discussionCheck.textContent = '☑';
  }
  discussionAnswered.append(discussionCheck);


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


//name, title, question 입력 후 submit 을 누르면 댓글이 작성됨
//name, title, question을 배열로 만들어서 
let form = document.querySelector('.form')

form.addEventListener("submit", (event) => {
  event.preventDefault();
 
const userName = document.querySelector('#user-name')
const title = document.querySelector('#title')
const qusetionText= document.querySelector('#question-text')

const obj = {
    createdAt: new Date().toISOString(),
    author: userName.value,
    title: title.value,
    avatarUrl:"https://avatars.githubusercontent.com/u/98820643?s=64&v=4",
  }

agoraStatesDiscussions.unshift(obj);
const addDiscussion = convertToDiscussion(obj);
ul.prepend(addDiscussion);
})
