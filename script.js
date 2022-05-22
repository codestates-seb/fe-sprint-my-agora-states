'use strict'
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

  // 이미지
  const avatarIge = document.createElement('img');
  avatarIge.className = 'discussion__avatar--image';
  avatarIge.src = obj.avatarUrl;
  avatarIge.art = `avator of ${obj.author}`
  avatarWrapper.append(avatarIge);

  // 컨텐츠
  const contentTitle = document.createElement('h3');
  contentTitle.className = 'discussion__title';
  const contentTitleLink = document.createElement('a');
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;
  const contentInfo = document.createElement('div');
  contentTitle.append(contentTitleLink);
  discussionContent.append(contentTitle);

  contentInfo.className = 'discussion__information';
  contentInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(contentInfo);
  
  // 답변 확인 체크박스
  const chkbox = document.createElement('input');
  chkbox.setAttribute('type', 'checkbox')
  chkbox.setAttribute('disabled', 'disabled')
  discussionAnswered.append(chkbox);

  // 답변 유무에 따라 체크표시
  if( obj.answer !== null ) {
    chkbox.setAttribute('checked', 'checked');
  }

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



// 입력한 데이터 출력
// submit 버튼을 클릭했을 때
const submitBtn = document.querySelector(".form__submit");
submitBtn.addEventListener('click', function(event){
  
  // 입력 받은 값
  const inputName = document.querySelector(".form__input--name input");
  const inputTitle = document.querySelector(".form__input--title input");
  const inputQuestion = document.querySelector(".form__textbox textarea");

  // 입력값이 하나라도 없으면 알림 
  if( inputName.value === '' || inputTitle.value === '' || inputQuestion.value === '' ) {
    alert('값을 입력하세요');
    return
  }
  event.preventDefault();

  // ul 초기화
  while(ul.firstChild) {
    ul.firstChild.remove();
  }
  // 참고) ul.innerHTML = '';
  // innerHTML은 사용을 지양하므로 ul.firstChild 사용 

  // 시간
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2,'0');
  let date = String(today.getDate()).padStart(2,'0');
  let day = today.getDay();
  let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  let hour = String(today.getHours()).padStart(2,'0');
  let minutes = String(today.getMinutes()).padStart(2,'0');
  let seconds = String(today.getSeconds()).padStart(2,'0');
  let current = `${year}-${month}-${date} ${week[day]} ${hour}:${minutes}:${seconds}`;

  const addDiscussion = {
    id: Date.now(),
    createdAt: current,
    title: inputTitle.value,
    url: "#",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  }

  // 데이터 추가
  agoraStatesDiscussions.unshift(addDiscussion);

  // 로컬 스토리지에 저장
  localStorage.setItem('addDiscussion', JSON.stringify(addDiscussion));
  
  
  // form 초기화
  inputTitle.value = '';
  inputName.value = '';
  inputQuestion.value = '';

  render(ul);
})

// 페이지만들기
// 한 화면에 데이터 7개까지 출력
// 만약에 데이터가 7개가 넘어간다면 다음 페이지 생성
// 
// 로컬스토리지에 있는 데이터와 data.js에 있는 데이터를 합쳐서 렌더링

// 페이지 버튼은 4개씩화면에 보임
// 데이터가 7개가 넘어갈 때마다 1페이지씩 늘어남
