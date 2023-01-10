// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

//질문하러가기 버튼을 클릭하면 질문을 입력할 수 있는 폼이 나타납니다.
const askQuestionButton = document.querySelector('#askQuestionButton');
const display1 = document.querySelector('.display1');
const display2 = document.querySelector('.display2');

askQuestionButton.addEventListener('click', e => {
  display1.classList.add('hide');
  askQuestionButton.classList.add('hide');
  display2.classList.remove('hide');

})

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
    avatarImg.className = 'discussion__avatar--image'; 
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg); 

  const contentTitle = document.createElement('h2');
  const title = document.createElement('a');
    title.href = obj.url; 
    title.textContent = obj.title; 
    contentTitle.append(title); 

  const information = document.createElement('div');
    information.classList.add('discussion__information');
    information.textContent = `${obj.author}. ${new Date(obj.createdAt).toLocaleString()}`
    
    
    discussionContent.append(contentTitle, information); 
  
  const checkmark = document.createElement('p');
  if (obj.answer === null) {
    checkmark.textContent = '❎'; 
  } else {
    checkmark.textContent = '✅'; 
  }

  discussionAnswered.append(checkmark); 


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//데이터수에따라 페이지 갯수를 만드는 함수 입니다.
const totalData = agoraStatesDiscussions.length
const dataPerPage = 10;
const totalPage = Math.ceil(totalData / dataPerPage);


//pagelist를 만들어주는 함수입니다.
function page() {
  const pageList = document.querySelector('#pageList');
  for (let i=1; i<=totalPage; i++) {
    let pageNum = document.createElement('li');
    pageNum.className = `page${i}`;
    pageNum.textContent = i; 
    pageList.append(pageNum);

    pageNum.addEventListener('click', e => {
      let currentPage = e.target.textContent;
      ul.innerHTML = ""; 
      render(ul, currentPage);
    })
  }; 
};

page(); 


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, currentPage) => {
  for (let i = (currentPage-1)*10; i <= currentPage*10-1; i++) {
    if (i === agoraStatesDiscussions.length) {
      break;
    } else {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
  };
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul, 1);

//폼을 제출하면 질문이 추가되는 기능입니다. 
const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name > input')
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('#question')

form.addEventListener('submit', e => {
  //페이지 새로고침 막기
  e.preventDefault(); 
  
  const obj = {
    id: "",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/61141988?s=64&u=92c71910d9f6409d38d40d7d5a0a094d8ec647ed&v=4"
 }

 //기존 데이터 가장 앞에 추가 
 agoraStatesDiscussions.unshift(obj);
 ul.prepend(convertToDiscussion(obj)); 

 //폼 제출하면 초기화
 inputName.value = '';
 inputTitle.value = '';
 inputQuestion.value = '';

})


//agoraStatesDiscussions의 Length를 재서 총 데이터수를 확인한다. 
//dataPerPage 는 10이다. 
//총 데이터수를 dataPerPage로 나누고, 그것을 totalPages 에 할당한다. 
//
