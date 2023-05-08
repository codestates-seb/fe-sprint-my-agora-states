// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 초기화: localStorage에 데이터가 없으면 agoraStatesDiscussions 배열을 초기화하고, 있으면 localStorage에서 agoraStatesDiscussions 배열을 가져옵니다.
if (!localStorage.getItem('agoraStatesDiscussions')) {
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(agoraStatesDiscussions));
} else {
  agoraStatesDiscussions = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionWrapper = document.createElement("div");
  discussionWrapper.className = "discussion__userbox";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  discussionWrapper.append(avatarWrapper, discussionContent, discussionAnswered);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 프로필 이미지 생성
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 제목 링크 생성
  const titleTxt = document.createElement('strong');
  titleTxt.className = "discussion__title";
  titleTxt.textContent = obj.title;

  // 답변여부 아이콘 생성
  discussionAnswered.textContent = '답변';
  if(obj.answer === null){
    discussionAnswered.classList.add('null')
  }

  // 만든 이, 만든 날짜 생성
  const createDate = document.createElement('div');
  createDate.className = "discussion__information";
  createDate.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;

  discussionContent.append(titleTxt, createDate);

  // 답변내용 생성
  const answerContainer = document.createElement('div');
  answerContainer.className = "discussion__answeredBox";

  const elAnswer = document.createElement('div');
  elAnswer.className = "discussion__answerTxt";
  const elAnswerTit = document.createElement('div');
  elAnswerTit.className = "answerTit";
  elAnswerTit.textContent = '답변 내용'

  const elQuestion = document.createElement('div');
  elQuestion.className = "discussion__questionTxt";
  elQuestion.innerHTML = obj.bodyHTML;

  if(obj.answer !== null){
    elAnswer.innerHTML = obj.answer.bodyHTML;
  }else{
    elAnswer.innerHTML = '<p>등록된 답변이 없습니다 &#128546;</p>'
  }

  // 답변내용 슬라이드
  let btn = document.querySelectorAll('.discussion__userbox');
  discussionWrapper.addEventListener('click',function(){
    let tarGet = this.nextElementSibling;
    tarGet.style.height = 'auto';
    let _He = tarGet.clientHeight;
    tarGet.style.height = '0';

    if(discussionWrapper.classList.contains('active')){
        tarGet.style.height = _He +'px';
        setTimeout(function() {
            tarGet.style.height = '0';
        }, 0);
    } else {
        setTimeout(function() {
            tarGet.style.height = _He +'px';
        }, 0);
    }

    btn.forEach(sEl => {
        if(sEl !== discussionWrapper){
            if(sEl.classList.contains('active')){
                sEl.click();
            }
        }
    });

    discussionWrapper.classList.toggle("active");
  })

  answerContainer.append(elQuestion, elAnswer);
  elAnswer.prepend(elAnswerTit);

  li.append(discussionWrapper, answerContainer);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

let elInpName = document.querySelector('#name');
let elInpTitle = document.querySelector('#title');
let elInpQuestion = document.querySelector('#story');
let elInpSubmit = document.querySelector('.form__submit').querySelector('input')
let form = document.querySelector("form.form");

// // 초기화: localStorage에 데이터가 없으면 agoraStatesDiscussions 배열을 초기화하고, 있으면 localStorage에서 agoraStatesDiscussions 배열을 가져옵니다.
// if (!localStorage.getItem('agoraStatesDiscussions')) {
//   localStorage.setItem('agoraStatesDiscussions', JSON.stringify(agoraStatesDiscussions));
// } else {
//   agoraStatesDiscussions = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));
// }

// form submit 이벤트 핸들러
form.addEventListener("submit", (event) => {
  event.preventDefault(); // 서브밋 이벤트로 사용시 꼭 함께 사용해주어야 함, 새로고침 막아줍니다.
  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: elInpTitle.value,
    answer: null,
    author: elInpName.value,
    bodyHTML: elInpQuestion.value,
    avatarUrl: "profile.jpg"
  };

  const discussion = convertToDiscussion(newObj);
  ul.prepend(discussion);

  agoraStatesDiscussions.unshift(newObj);
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(agoraStatesDiscussions)); // agoraStatesDiscussions 배열을 localStorage에 저장합니다.

  // 폼 입력값 초기화
  elInpName.value = "";
  elInpTitle.value = "";
  elInpQuestion.value = "";
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 답변 내용 슬라이드
// let btn = document.querySelectorAll('.discussion__userbox');
// let tarGetAll = document.querySelectorAll('.discussion__answeredBox');

// btn.forEach(el => {
//     el.addEventListener('click',function(){
//         let tarGet = this.nextElementSibling;
//         tarGet.style.height = 'auto';
//         let _He = tarGet.clientHeight;
//         tarGet.style.height = '0';

//         if(el.classList.contains('active')){
//             tarGet.style.height = _He +'px';
//             setTimeout(function() {
//                 tarGet.style.height = '0';
//             }, 0);
//         } else {
//             setTimeout(function() {
//                 tarGet.style.height = _He +'px';
//             }, 0);
//         }

//         btn.forEach(sEl => {
//             if(sEl !== el){
//                 if(sEl.classList.contains('active')){
//                     sEl.click();
//                 }
//             }
//         });

//         el.classList.toggle("active");
//     })
// });

// 페이지네이션
// const pageLength = document.querySelectorAll('.discussion__container').length;
// const showPage = 5;
// const maxPage = Math.ceil(pageLength / showPage);

