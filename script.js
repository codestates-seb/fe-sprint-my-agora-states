'use strict'
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다. 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.art = `avator of ${obj.author}`
  avatarWrapper.append(avatarImg);

  // 컨텐츠
  const contentTitle = document.createElement('h3');
  contentTitle.className = 'discussion__title';
  const contentTitleLink = document.createElement('a');
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;
  contentTitle.append(contentTitleLink);
  discussionContent.append(contentTitle);
  const contentInfo = document.createElement('div');
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
  return;//  질문) return이 없어도 실행이 잘되던데 return을 써준 이유                    --------------------------------
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//  submit 버튼 클릭할 때
const submitBtn = document.querySelector(".form__submit");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");

submitBtn.addEventListener('click', function(event){

  if( inputName.value === '' || inputTitle.value === '' || inputStory.value === '' ) {
    alert('값을 입력하세요');
    return
  }
  event.preventDefault();
  
  elRemove(ul);
  
  // 추가할 데이터
  const addDiscussion = {
    id: Date.now(),
    createdAt: new Date().toLocaleString(),
    title: inputTitle.value,
    url: "#",
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  }
  // 데이터 추가
  agoraStatesDiscussions.unshift(addDiscussion);
  saveLocalStorage(agoraStatesDiscussions);
  formReset();
  render(ul);
})

// 폼 리셋
const formReset = function() {
  inputTitle.value = '';
  inputName.value = '';
  inputStory.value = '';
}

// ul 초기화
// 참고) ul.innerHTML = ''; [innerHTML은 사용을 지양하므로 ul.firstChild 사용] 
const elRemove = function(el) {
  while(el.firstChild) { 
    el.firstChild.remove(); 
  }
}

// Local Storage
const saveLocalStorage = function(data) {
  localStorage.setItem('savedData', JSON.stringify(data));
}
const localData = JSON.parse(localStorage.getItem('savedData'));










// 페이지만들기

// 한 화면에 데이터 7개까지 출력
// 만약에 데이터가 7개가 넘어간다면 다음 페이지 생성
// 
// 로컬스토리지에 있는 데이터와 data.js에 있는 데이터를 합쳐서 렌더링

// 페이지 버튼은 4개씩화면에 보임
// 데이터가 7개가 넘어갈 때마다 1페이지씩 늘어남

// const createPageNum = function(num) {
  //   const pageNum = document.createElement('li');
  //   const pageNumBtn = document.createElement('button');
  //   pageNumBtn.textContent = num;
  //   pageNum.append(pageNumBtn);  
//   return pageNum;
// }

// let pageLength = Math.ceil(agoraStatesDiscussions.length / 7);
// const pageNumRender = function(element) {
//   for(let i = 1; i < pageLength + 1; i++) {
//     element.append(createPageNum(i));
//   }
//   return;
// }

// const ul_btn = document.querySelector(".pagingBtns__num");
// pageNumRender(ul_btn)

// 처음에는 페이지 버튼 1,2,3,4 렌더링
// 다음버튼을 누르면 5,6,7,8
// 이전버튼을 다시 누르면 1,2,3,4



// 아바타 랜덤으로 바뀌게 구현





// 시간을 출력할 때 아래와 같은 방법이 아닌 new Date().toLocaleString()를 쓰면 간단
// let today = new Date();
// let year = today.getFullYear();
// let month = String(today.getMonth() + 1).padStart(2,'0');
// let date = String(today.getDate()).padStart(2,'0');
// let day = today.getDay();
// let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
// let hour = String(today.getHours()).padStart(2,'0');
// let minutes = String(today.getMinutes()).padStart(2,'0');
// let seconds = String(today.getSeconds()).padStart(2,'0');
// let current = `${year}-${month}-${date} ${week[day]} ${hour}:${minutes}:${seconds}`;