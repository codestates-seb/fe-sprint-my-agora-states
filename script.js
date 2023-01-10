// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
document.querySelector('.wantRemove').remove();

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
  const avatar = document.createElement("img");
  avatar.setAttribute('src', obj.avatarUrl);
  avatar.className = "discussion__avatar--image";
  avatarWrapper.append(avatar);
  const title = document.createElement("h2");
  const link = document.createElement("a");
  const info = document.createElement("div");
  link.textContent = obj.title;
  link.setAttribute('href', obj.url);
  info.textContent = `${obj.author} ( ${new Date(obj.createdAt).toLocaleTimeString()} )`;
  title.className = "discussion__title";
  info.className = "discussion__information";
  discussionContent.append(title);
  title.append(link);
  discussionContent.append(info);
  const answered = document.createElement('img');
  answered.className = 'styled-answer';
  answered.setAttribute('src', obj.answer !== null ? './check-filled.svg' : './check-lined.svg' );
  discussionAnswered.append(answered);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//페이지네이션=================================================================
const main = document.querySelector('main');
const buttonList = document.createElement('div');
buttonList.className = 'paginator';
main.append(buttonList);

// function page(count,current){
//   console.log(count);
//   let currentPage = 2;
//   let totalPageCount = Math.ceil(count/10);
//   let pageGroup = Math.ceil(currentPage/5);
//   let groupLastPage = pageGroup * totalPageCount;
//   let groupFirstPage = groupLastPage - (totalPageCount - 1);
//   console.log('총 페이지 수: ',totalPageCount);
//   console.log('페이지 그룹: ',pageGroup);
//   console.log('그룹 첫 페이지: ',groupFirstPage);
//   console.log('그룹 마지막 페이지: ',groupLastPage);

//   for (let i = groupFirstPage; i <= groupLastPage; i++) {
//     addButtons(i);
//   }
// }

// //페이지네이션 버튼 생성 및 추가
// const addButtons =(p)=>{
//   const buttons = document.createElement('button');
//   buttons.className = 'page-button';
//   buttons.textContent = p;
//   buttons.addEventListener('click', ()=>{
//     buttons.classList.add('page-clicked');
//   });
//   buttonList.append(buttons);
// }

//=============================================================================

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  if(localStorage.getItem('agora') === null){
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
  }else{
    const local = [...JSON.parse(localStorage.getItem('agora'))].reverse();
    const newDiscussions = local.concat(agoraStatesDiscussions);
    for (let i = 0; i < newDiscussions.length; i += 1) {
      element.append(convertToDiscussion(newDiscussions[i]));
    }
    return;
  }
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


//CSS를 위한 html 태그 추가 및 선택자 부여============================
const formContainer = document.querySelector('.form__container');
const nameBox = document.querySelector('.form__input--name');
const titleBox = document.querySelector('.form__input--title');
const questionBox = document.querySelector('.form__textbox');
formContainer.classList.add('hide');
nameBox.classList.add('styled-input-box');
titleBox.classList.add('styled-input-box');
questionBox.classList.add('styled-input-box');

const askBtn = document.querySelector('.question__button');
const closeBtn = document.querySelector('.close__button');
const toggle = (function (){
  let status = false;
  return function(){
    status = !status;
    if(status){
      formContainer.classList.remove('hide');
      formContainer.classList.remove('close');
      formContainer.classList.add('show');
    }else{
      formContainer.classList.add('close');
      formContainer.classList.remove('show');
    }
  }
})();

askBtn.addEventListener('click', toggle);
closeBtn.addEventListener('click', toggle);

const submitBtn = document.querySelector('.submit__button');
//submit버튼 클릭 시
const addToStorage =()=>{
  // event.preventDefault();
  const author = document.querySelector('#name');
  const title = document.querySelector('#title');
  const story = document.querySelector('#story');
  const date = new Date(); //여기서 현지화 해버리면 invalid date를 마주치게 된다
  let submitted = {
      createdAt: date,
      title: title.value,
      author: author.value,
      bodyHTML: story.value,
      avatarUrl: "./blank-profile.png",
      answer: null,
  };
  agoraStatesDiscussions.unshift(submitted);
  const converted = convertToDiscussion(submitted);
  ul.prepend(converted);
  // 로컬스토리지에 질문 객체를 저장
  if(localStorage.getItem('agora') === null) {
    const agora = [];
    agora.push(submitted);
    localStorage.setItem('agora', JSON.stringify(agora));
  }else{
    const agora = JSON.parse(localStorage.getItem('agora'));
    agora.push(submitted);
    localStorage.setItem('agora', JSON.stringify(agora));
  }
  author.value = "";
  title.value = "";
  story.value = "";
  formContainer.classList.add('close');
  formContainer.classList.remove('show');
}
submitBtn.addEventListener('click', addToStorage);



