// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions[1].author);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // <avatarWrapper> 부분
  const avatarWrapper = document.createElement("div"); // div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper";  // 클래스 이름 지정

  const avatarImg = document.createElement('img'); // img 요소 생성
  avatarImg.className = "discussion__avatar--image"; // img 요소의 클래스 이름 지정 (빼먹어서 문제 발생!)
  avatarImg.src = obj.avatarUrl; // img 요소의 속성 추가  ?? setAttribute 안쓰고?
  avatarImg.alt = 'avatar of' + obj.author;

  avatarWrapper.append(avatarImg);      // 한번에 여러개의 자식 요소를 추가할 때는 appendChild 대신 append

  // console.log(avatarWrapper); // 확인용 [문제해결] 위에서 클래스 이름 생성을 안해줘서 css 적용이 계속 안됐음 ㅠ

  // <discussionContent> 부분
  const discussionContent = document.createElement("div"); // div 요소 생성
    discussionContent.className = "discussion__content";  // 클래스 이름 지정

  const discussionContentTitle = document.createElement("h2"); // h2 요소 생성
    discussionContentTitle.className = "discussion__title" // 클래스 이름 지정

  const discussionContentTitleAnchor = document.createElement("a"); // a 요소 생성
    discussionContentTitleAnchor.href = obj.url; // a 요소 속성 href 추가
    discussionContentTitleAnchor.textContent = obj.title;  // a 요소 내용 추가

  discussionContentTitle.appendChild(discussionContentTitleAnchor); // h2 태그 안에 생성한 a 요소 넣기

  const dicussionContentInformation = document.createElement("div"); // div 요소 생성
    dicussionContentInformation.className = "discussion__information";  // 클래스 이름 지정
    dicussionContentInformation.textContent = obj.author + " / " + obj.createdAt; // div 요소 내용 작성자, 작성시간 추가

  discussionContent.appendChild(discussionContentTitle, dicussionContentInformation);

  // console.log(discussionContent);  // 확인용

  // <discussionAnswered> 부분
  const discussionAnswered = document.createElement("div");  // div 요소 생성
  discussionAnswered.className = "discussion__answered" // 클래스 이름 지정

  const discussionAnsweredContent = document.createElement("p"); // p 요소 생성

    discussionAnswered.append(discussionAnsweredContent); // div 안에 생성한 p 요소 삽입

    const isAnswerNull = (answer) => answer === null ? "☒" : "☑"; // answer 가 null인 경우와 아닌 경우 판별 함수
    discussionAnsweredContent.textContent = isAnswerNull(obj.answer); // answer 데이터 판별 결과를 내용에 넣기

    // console.log(discussionAnswered); // 확인용

  // 작성한 div 요소 3부분 append
    discussionContent.append(discussionContentTitle, dicussionContentInformation, discussionAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;

};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// for of 를 이용한 방식 적용 해보기
// 배열 요소의 각각인 el 에 convertToDiscussion 함수를 적용해서 append 해줘
const render = (element) => {
  for (let el of agoraStatesDiscussions) {
    element.append(convertToDiscussion(el));
  }
  return;
};


// ===== 폼 작성하면 추가되는 작업 ======

const toAskForm = document.querySelector(".form");   // 작성폼
// console.log(toAskForm);
const toAskInputName = toAskForm.querySelector("#name");  //
const toAskInputTitle = toAskForm.querySelector("#title");  //
const toAskInputQuestion = toAskForm.querySelector("#story") //

function paintToAsk(newInputName, newInputTitle) {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // <discussionContent> 부분
  const discussionContent = document.createElement("div"); // div 요소 생성
    discussionContent.className = "discussion__content";  // 클래스 이름 지정

  const discussionContentTitle = document.createElement("h2"); // h2 요소 생성
    discussionContentTitle.className = "discussion__title" // 클래스 이름 지정

  const discussionContentTitleAnchor = document.createElement("a"); // a 요소 생성
    // discussionContentTitleAnchor.href = obj.url; // a 요소 속성 href 추가
    discussionContentTitleAnchor.textContent = newInputTitle;  // a 요소 내용 추가

  discussionContentTitle.appendChild(discussionContentTitleAnchor); // h2 태그 안에 생성한 a 요소 넣기

  // let TimeOfWriting = document.write(new Date().toLocaleString());
  const dicussionContentInformation = document.createElement("div"); // div 요소 생성
    dicussionContentInformation.className = "discussion__information";  // 클래스 이름 지정
    dicussionContentInformation.textContent = newInputName + " / " + new Date().toLocaleString(); // div 요소 내용 작성자, 작성시간 추가

  discussionContent.appendChild(discussionContentTitle, dicussionContentInformation);

  // <discussionAnswered> 부분
  const discussionAnswered = document.createElement("div");  // div 요소 생성
  discussionAnswered.className = "discussion__answered" // 클래스 이름 지정

  const discussionAnsweredContent = document.createElement("p"); // p 요소 생성

    discussionAnswered.append(discussionAnsweredContent); // div 안에 생성한 p 요소 삽입

    discussionAnsweredContent.textContent = "☒"; // 일단 초기에 만들어지는 질문이므로 그냥 답변 안되있는 표시로 내용 작성

    discussionContent.append(discussionContentTitle, dicussionContentInformation, discussionAnswered);

    li.append(discussionContent, discussionAnswered);
  
    console.log(li);
    return li;

}

function handleToDoSubmit(e) {  // 이벤트 발생시 작동할 리스너의 함수 [텍스트 입력하면 저장하고, 초기화하는 기능, ]
  e.preventDefault();           // submit 시 디폴트로 발생하는 내장 기능이 멈춰지도록 실행하는 메서드 
  // console.log(toAskInputName.value);
  // console.log(toAskInputTitle.value);

  const newInputName = toAskInputName.value;  // 압력한 이름을 저장
  const newInputTitle = toAskInputTitle.value;  // 입력한 제목을 저장

  toAskInputName.value = "";  // 입력한 후 창이 빈상태로 만들기
  toAskInputTitle.value = "";  // 입력한 후 창이 빈상태로 만들기
  toAskInputQuestion.value = "";  // 입력한 후 창이 빈상태로 만들기


  paintToAsk(newInputName, newInputTitle);
}

toAskForm.addEventListener("submit", handleToDoSubmit);    // submit 이벤트시 handleToDoSubmit 함수가 작동하는 이벤트리스너



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
