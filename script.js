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

  const avatarImg = document.createElement('img'); // 사진 요소 생성
  avatarImg.src = obj.avatarUrl; // img태그의 src속성 초기화
  avatarImg.alt = 'avatar of ' + obj.author; // img태그의 alt속성 초기화
  avatarWrapper.append(avatarImg); // avatarWrapper요소안에 img요소 추가
  
  const discussionTitle = document.createElement('h2'); // 질문내용 h2 요소 생성
  discussionTitle.className = 'discussion__title'; //h2요소 class 이름 초기화
  const titleUrl = document.createElement('a'); // titleUrl요소 a태그로 생성
  titleUrl.href = obj.url; // agoraStatesDiscussions의 객체 url속성값 초기화
  titleUrl.textContent = obj.title; // titleUrl에 텍스트 초기화
  discussionTitle.append(titleUrl); //discussionTitle안에 titleUrl 요소 추가
  
  const discussionInformation = document.createElement('div'); //정보 div 요소 생성
  discussionInformation.className = 'discussion__information'; //discussionInformation요소 class 이름 초기화
  discussionInformation.textContent =  obj.author +' / '+ obj.createdAt; // discussionInformation요소 값 초기화
  discussionContent.append( discussionTitle, discussionInformation); // discussion_content 요소안에 h2, div요소 추가
  
  const answeredCheckBox = document.createElement('p'); // answered 여부 확인 표시 요소 생성
  
  answeredCheckBox.textContent = isAnswered(obj);

  discussionAnswered.append(answeredCheckBox);// discussionAnswered div요소안에 answeredCheckBox p요소 추가


  li.append(avatarWrapper, discussionContent, discussionAnswered); //li에 div요소 붙임
  return li;
};




const isAnswered = function(obj){ // 객체 answer 속성에 따른 체크 표시 리턴하는 함수.
  if(!obj.answer){ //
    return '☒';
  }
  else{
    return '☑';
  }
};



// submit 버튼을 누를때 디스커션 추가하는 함수입니다.
//submit을 누를때 값 읽어오기
const formInputName = document.querySelector('.form__input--name > input');
const formInputTitle = document.querySelector('.form__input--title > input');
const formInputTextbox = document.querySelector('.form__textbox > textarea');
const formSubmit = document.querySelector('.form');

const readSubmit = () =>{ // submit 이벤트 발생하면 각각의 value 출력하는 함수.
  console.log(formInputName.value);
  console.log(formInputTitle.value);
  console.log(formInputTextbox.value);
};


const addSubmittedDiscussion = function(){ //submit 이벤트 발생시 agoraStatesDiscussions에 객체타입으로 데이터 넣는 함수.
  agoraStatesDiscussions.push({ // 배열에 데이터 추가
    id: null,
    createdAt: '2022-04-22T14:08:33Z',
    title: formInputTitle.value,
    url: null,
    author: formInputName.value,
    answer: null,
    bodyHTML: null,
    avatarUrl: 'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4',
  }
  )
  render(ul);
  console.log(agoraStatesDiscussions);
};

// const moveToFirstChild = function(){ //제일 끝 요소를 제일 앞으로 이동시키는 함수

// };




formSubmit.addEventListener('submit', addSubmittedDiscussion); //submit 이벤트는 form 요소에서만 잡힌다.










// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
