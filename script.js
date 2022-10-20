// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {  // 더미데이터의 객체를 매개변수로 받음
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; 

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 아바타 영역
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;  
  avatarImg.className = 'discussion__avatar--image';
  avatarWrapper.append(avatarImg);

  // 콘텐츠 영역
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title'; // a에다가?
  discussionContent.append(discussionTitle);

  const discussionTitleA = document.createElement('a');
  discussionTitleA.href = obj.url;
  discussionTitleA.textContent = obj.title;
  discussionTitleA.target = '_blank';
  discussionContent.append(discussionTitleA);

  const discussionInfo = document.createElement('div');
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionInfo.className = 'discussion__information';  // css 적용하기위해 class 넣기
  discussionContent.append(discussionInfo);

// 체크박스 영역
  const Answered = document.createElement('p');
    Answered.textContent = obj.answer ? "☑" : "☒";  // 삼항 연산자
  discussionAnswered.append(Answered);

  // if(obj.answer === null) {
  //   Answered.textContent ='☒';
  // } else {
  //   Answered.textContent = '☑';
  // }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


const form = document.querySelector('form');
const author = document.querySelector('.form__input--name > input');
const title = document.querySelector('.form__input--title > input');
const textArea = document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (event) =>  {
  event.preventDefault(); 
  const obj = {
    id: "unique number",  
    createdAt: new Date(),
    title: title.value,
    url: "",
    author: author.value,
    answer: null,
    bodyHTML: textArea.value,
    avatarUrl:"https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  agoraStatesDiscussions.unshift(obj); // 배열 앞 삽입

  ul.prepend(convertToDiscussion(obj));
  title.value='';
  author.value='';
  textArea.value='';
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // i번째 요소를 convertToDiscussion에 전달해서 결과를 ul에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

let discussions = [];  // 서버에서 받은 데이터를 담을 변수를 준비
fetch('http://localhost:4000/discussions/')
.then(res => res.json())
.then(json => {
  discussions = json;  // 받아온 데이터를 담아주기
  const ul = document.querySelector("ul.discussions__container");
  render(ul);
})


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);
