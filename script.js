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
  discussionAnswered.append(answerP);

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

// 답변의 유무를 판별하는 함수
function answerCheck(answer) {
  if(answer === null){
    return '☒';
  }else{
    return '☑';
  }
};

// from DOM 요소
const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__submit > input');

const formInputName = form.querySelector('.form__input--name > #name');
const formInputTitle = form.querySelector('.form__input--title > #name');
const formTextbox = form.querySelector('.form__textbox > #story'); 

// submit button 이벤트 핸들러
submitButton.onclick = function () {  

  event.preventDefault();
  let data = {
    'author': formInputName.value,
    'title': formInputTitle.value,
    'bodyHtml': formTextbox.value,
    'answer': null,
    'avatarUrl': 'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4',
    'createdAt': new Date()
  }

  // agoraStatesDiscussions에 순서대로 넣음
  // 만약에 게시물에 번호를 달아야 할 경우를 대비
  agoraStatesDiscussions.push(data);
  // ul의 앞에 새로 추가된 객체를 할당
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[agoraStatesDiscussions.length-1]));

  //Local Storage: https://hianna.tistory.com/697
}


// // 오전 오후로 시간 변경
// function timeChange(at){
//   if (at){
//     let time = at.split('T');
//     // console.log(`오후 ${Number(time[1].slice(0,2))-12}${time[1].slice(2,time[1].length-1)}`);
//     if (Number(time[1].slice(0,2)) > 12){
//       return `오후 ${Number(time[1].slice(0,2))-12}${time[1].slice(2,time[1].length-1)}`
//     }else{
//       return `오전 ${time[1].slice(0,time[1].length-1)}`
//     }
//   }
// }