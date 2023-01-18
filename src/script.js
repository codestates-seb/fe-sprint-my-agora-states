require('./style.css');
const agoraStatesDiscussions = require('./data.js')

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

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
  
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
  const discusstionTitle = document.createElement("h2");
  discusstionTitle.className = 'discussion__title'
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discusstionTitle.append(titleLink);
  
  const discusstionInfo = document.createElement("div");
  discusstionInfo.className = 'discussion__information';
  discusstionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString() }`;
  
  discussionContent.append(discusstionTitle,discusstionInfo);
  
  const ptag = document.createElement("p");  
  if(obj.answer){ ptag.textContent = '☑'
}else{ ptag.textContent = '☒' }

discussionAnswered.append(ptag);


li.append(avatarWrapper, discussionContent ,discussionAnswered);
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

const formEliment = document.querySelector('form.form')
const inputTitle = document.querySelector('.form__input--title > input')
const inputName = document.querySelector('#name')
const inputQuestion = document.querySelector('#story')

formEliment.addEventListener('submit',function(event){
  event.preventDefault();
  const obj = {
    id: "999",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl:
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
})

//페이지네이션

//총배열의 개수에서 10을 나누고 +1만큼의 페이지를 만듭니다. div로 페이지를 담을 공간을 만들고 createEliment를 페이지 개수만큼 button을 만듭니다.
//처음에 agoraStatesDiscussions 1~9까지 나타나게 만들어야합니다.

// const contents = document.createElement("div");
// const buttons = document.createElement("div");

// const numOfContent = agoraStatesDiscussions.length;
// const showContent = 10;
// const showButton = 5;
// const maxPage = Math.ceil(numOfContent / showContent );
// let page = 1;
