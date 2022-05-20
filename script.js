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
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // title: 질문 제목
  const title = document.createElement("h3");
  title.className = "discussion__title";

  // title link: 질문 링크
  const titleA = document.createElement("a");
  titleA.href = obj.url;
  titleA.textContent = obj.title;
  title.append(titleA);

  // information: 닉네임, 시간
  const information = document.createElement("div");
  information.className = "discussion__information";
  information.textContent = obj.author 
    + ' / ' + new Date(obj.createdAt).toLocaleTimeString();
  discussionContent.append(title, information);

  // 답변유무
  const answerP = document.createElement("p");
  answerP.textContent = answerCheck(obj.answer);
  if (answerP.textContent === '☒'){
    answerP.className += 'redColor';
  }else{
    answerP.className += 'greenColor';
  }
  discussionAnswered.append(answerP);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

let localDiscussions = JSON.parse(localStorage.getItem("agoraStatesDiscussions"));
if (!localDiscussions){
  localDiscussions = agoraStatesDiscussions;
}

if (localStorage.length !== 0){
  agoraStatesDiscussions = localDiscussions;
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  console.log(element);
  for (let i = 0; i < localDiscussions.length; i += 1) {
    element.append(convertToDiscussion(localDiscussions[i]));
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// 답변의 유무를 판별하는 함수
function answerCheck(answer) {
  if(answer === null){
    return '☒';
  }else{
    return '☑';
  }
};

// form
const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__submit > input');

const formInputName = form.querySelector('.form__input--name > #name');
const formInputTitle = form.querySelector('.form__input--title > #name');
const formTextbox = form.querySelector('.form__textbox > #story'); 

// submit button
submitButton.onclick = function (event) {  

  event.preventDefault();
  let data = {
    'author': formInputName.value,
    'title': formInputTitle.value,
    'bodyHtml': formTextbox.value,
    'answer': null,
    'avatarUrl': 'https://avatars.githubusercontent.com/u/56163157?v=4',
    'createdAt': new Date()
  }

  agoraStatesDiscussions.push(data);
    
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(agoraStatesDiscussions));
  // localDiscussions = JSON.parse(localStorage.getItem("agoraStatesDiscussions"));

  ul.prepend(convertToDiscussion(localDiscussions[localDiscussions.length-1]));

}