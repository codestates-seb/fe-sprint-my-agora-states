// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 아바타 이미지 넣기
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.classList.add('discussion__avatar--image'); // 기존의 클래스 추가
  avatarWrapper.append(avatarImg);

  li.append(avatarWrapper, discussionContent, discussionAnswered);



  // * TODO 1 디스커션 나열 기능 : 


  // [1]. 제목(title) 넣기, url 연결하기(클릭 시 새창으로 연결)

  // 1-1. dom 에 h2 > a 생성하고 넣어주기.
  // html : <h2 class='discussion__title'><a class='title__link'></a></h2>

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  discussionContent.append(discussionTitle);
  const discussionA = document.createElement('a');
  discussionA.className = 'title__link';
  discussionTitle.append(discussionA);

  // 1-2. title, url 넣어주기
  // html : <a class='title__link' href='~[i].url'>~[i].title</a>
  
  discussionA.textContent = obj.title;
  discussionA.href = obj.url;
  // (에러 1 : 타이틀 링크 a 태그에 새로 생성한 클래스(.title__link) 추가 ---> 에러! ===> 해결/ discussionTitle 로 h2 를 불러와서 그 안의 a 태그가 덮어씌워졌던 거였음
  // 에러 2 : 변수에 담아서 내용을 할당했더니 에러남. 왜지?)
  // const discussionTitleText = discussionA.textContent;
  // const discussionTitleLink = discussionA.href; 


  // 1-3. +) 타이틀에 마우스 올렸을 때 내용 + 답변 보이기 기능-----------------> 에러: 적용이 안됨!!! 왜냐!!!  popup_box가 돔에 안들어가나? 첫번째것 이후로 안들어가고 있음!
  const titleBox = document.querySelector('.discussion__title');
  const showBodyHTML = document.createElement('div');
  showBodyHTML.className = 'popup_box';
  titleBox.append(showBodyHTML);

  const bodyHTMLBox = document.querySelector('.popup_box');

  titleBox.addEventListener('mouseover', function() { // 이벤트 리스너 작동 확인 완료
    console.log(obj.author);
    console.log(bodyHTMLBox);

    const bodyHTML = obj.bodyHTML;
    const bodyHTMLAnswer = obj.answer.bodyHTML;
    
    
    if(obj.answer !== null){ // 에러 : Uncaught TypeError: Cannot read properties of null (reading 'bodyHTML')
      bodyHTMLBox.innerText = bodyHTMLAnswer;
    } else {
      bodyHTMLBox.innerText = bodyHTML;
    }
  })
  

  // [2]. id, 작성 시간(createdAt) 넣기

  // 2-1. div 생성
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionContent.append(discussionInfo);
  const writtenDate = obj.createdAt;
     
  // 2-2. Advanced Challenge - 현지 시간 적용
  // writtenDate.date.toLocaleString('ko-kr') ----> 왜 안먹히지?! .toLocalTimeString() 함수로 만들어놓기?
  // createdAt: '2022-05-15T23:57:43Z' // 날짜 형식 변환은 어려워 보이는데, 슬라이스로 잘라서 변환할까? 
  // ============> Date 안에 writtenDate를 그냥 넣으면 되는데 삽질했네...
  
  let date = new Date(writtenDate);

  // 2-3. text 변경
  discussionInfo.textContent = `${obj.author} / ${date.toLocaleString('ko-kr')}`
  

  // [3]. 답변 완료 여부(answer, .discussion__answered) 넣기

  // 3-1. div 생성
  // const discussionAnswer = document.createElement('div');
  // discussionAnswer.className = 'discussion__answered';
  // discussionContent.appendChild(discussionAnswer); // 위에서 선언해준 줄 모르고 다시 불러왔다가 지웠다. 기존 파일 잘 읽을 것!!
  const discussionAnswerCheck = document.createElement('p');
  discussionAnswerCheck.className = 'check__answer'; // p 태그에 새로 클래스 네임 생성해줌
  discussionAnswered.append(discussionAnswerCheck);

  // 3-2. p 안의 체크표시 바꾸기
  (obj.answer === null) ? 
  discussionAnswerCheck.textContent = '❎' : discussionAnswerCheck.textContent = '✅';
  
  return li;

};
//----------convertToDiscussion 함수 끝----------------//






// * TODO 2 디스커션 추가 기능 :
/* 구현할 내용 : 
- section.form__container 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작합니다. 형식은 자유입니다.
- 아이디, 본문을 입력하고 버튼을 누르면 실제 화면에 디스커션이 추가되어야 합니다.
- agoraStatesDiscussions 배열에 추가한 데이터가 실제 쌓여야 합니다.

/* 상세 구현 내용 구상 :
2-1. submit 버튼 누르면 배열의 첫번째에 객체를 추가하는 함수를 트리거하기(이벤트 리스너-submit)
2-2. 새 질문을 객체로 받아와서 data.js 의 배열끝에 추가하기 -> agoraStatesDiscussions.push(newQuestion);
2-3. name, title 받아와서 author, title 에 넣기 + story (질문 내용)받아와서 bodyHTML 에 넣기
2-4. submit 클릭 시 이 내용으로 질문을 제출하시겠습니까? 확인창(confirm) 띄워주기
*/

// 2-2, 2-3 작동 확인 완료
let randomId = Math.random().toString(36).substring(2, 12); // 랜덤넘버, 36진수 사용
const date = new Date();// Date 함수 사용
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');

// const newQuestion = {
//   id : randomId,
//   createdAt: date.toLocaleString('ko-kr'),
//   title: inputTitle,
//   url: "/",
//   author: inputName,
//   answer: null,
//   bodyHTML:inputStory,
//   avatarUrl:"http://source.unsplash.com/featured/?{animal}" // unsplash 랜덤 animal 이미지
// };
// console.log(newQuestion);
// agoraStatesDiscussions.push(newQuestion);


// Advanced : 새 질문을 로컬스토리지에 저장 ---> 추가 확인 필요
// const Questions_KEY = "Questions";
// let lists = [];

// function saveAtLocalStrg() {
//   localStorage.setItem(Questions_KEY, JSON.stringify(lists));
// }


//
const submittedQuestion = document.querySelector('#submitted--form');

function onSubmitEvent(event) {
  event.preventDefault(); // -----> submit 시 새로고침 방지!!

  const newQuestion = {
    id : randomId,
    createdAt: date.toLocaleString('ko-kr'),
    title: inputTitle,
    url: "/",
    author: inputName,
    answer: null,
    bodyHTML:inputStory,
    avatarUrl:"http://source.unsplash.com/featured/?{animal}" // unsplash 랜덤 animal 이미지
  };

  confirm('이 내용으로 질문을 제출하시겠습니까?'); 
  agoraStatesDiscussions.push(newQuestion);
  console.log(agoraStatesDiscussions[agoraStatesDiscussions.length-1]);
  console.log('질문 제출 완료');

  return agoraStatesDiscussions;
  };
  
submittedQuestion.addEventListener('click', onSubmitEvent); // 2-1.


console.log(agoraStatesDiscussions[agoraStatesDiscussions.length-1]);





// ----------------------------------- data.js의 배열 렌더링---------------------------------------//

  // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
  const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    console.log('render');
    return;
  };
  
  // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
  const ul = document.querySelector('ul.discussions__container');
  render(ul);