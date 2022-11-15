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
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const titleContent = document.createElement('a');
  titleContent.href = obj.url;
  titleContent.textContent = obj.title;
  discussionTitle.append(titleContent);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information'
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInfo);

  const answered = document.createElement('img');
  answered.src = obj.answer ? "icons/check.png" : "icons/cross.png";
  discussionAnswered.append(answered);

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


// 디스커션 추가 기능
const inputForm = document.querySelector('.form')
const inputName = inputForm.querySelector("div.form__input--name > input");
const inputTitle = inputForm.querySelector("div.form__input--title > input");
const inputContent = inputForm.querySelector("div.form__textbox > textarea");

inputForm.addEventListener("submit" , (event) => {
  event.preventDefault();
  const obj = {
    id: "new" ,
    createdAt: new Date() ,
    title: inputTitle.value ,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/" ,
    author: inputName.value ,
    answer: null,
    bodyHTML: inputContent.value ,
    avatarUrl:
      "https://www.sirarchibald.dev/unnamed.jpg",
  }
  agoraStatesDiscussions.unshift(obj);
  const convertObj = convertToDiscussion(obj);
  ul.prepend(convertObj);

  DisplayList(agoraStatesDiscussions, ul, rows, current_page);
setupPagination(agoraStatesDiscussions, pagination_element, rows);

  // 제출 완료 후 다시 input 비우기
  inputForm.value = '';
  inputName.value = '';
  inputTitle.value = '';
  inputContent.value = '';

});


const pagination_element = document.querySelector('#pagination');

let current_page = 1;
const rows = 10;

const DisplayList = (items, wrapper, rows_per_page, page)=>{
    wrapper.innerHTML = "";
    page--;

    const start = rows_per_page * page;
    const end = start + rows_per_page;
    const paginatedItems = items.slice(start, end);

    for(let i=0; i < paginatedItems.length; i++){
        const item = paginatedItems[i];
        const item_element = convertToDiscussion(item);
        wrapper.appendChild(item_element);

    }
}

const setupPagination = (items, wrapper, rows_per_page) => {
    wrapper.innerHTML = "";
    const page_count = Math.ceil(items.length / rows_per_page);

    for(let i=1; i < page_count +1; i++){
        const btn = paginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

const paginationButton = (page, items) => {
    const button = document.createElement('button');
    button.textContent = page;

    if(current_page === page) button.classList.add('active');

    button.addEventListener('click', function(){
        current_page = page;
        DisplayList(items, ul, rows, current_page);

        const current_btn = document.querySelector('#pagination button.active');
        current_btn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}

const leftBtn = document.querySelector('#left__btn');
const rightBtn = document.querySelector('#right__btn');

leftBtn.addEventListener('click', () => {
    current_page--;
    if(current_page < 1){
        current_page = 1;
    }
    DisplayList(agoraStatesDiscussions, ul, rows, current_page);


    const current_btn = document.querySelectorAll('#pagination button');
    for(let i=0; i<current_btn.length; i++){
        current_btn[i].classList.remove('active');
      }

    current_btn[current_page-1].classList.add('active');


})

rightBtn.addEventListener('click', () => {
    const current_btn = document.querySelectorAll('#pagination button');

    current_page++;
    if(current_page > current_btn.length){
        current_page = current_btn.length;
    }
    DisplayList(agoraStatesDiscussions, ul, rows, current_page);


    for(let i=0; i<current_btn.length; i++){
        current_btn[i].classList.remove('active');
      }

    current_btn[current_page-1].classList.add('active');
})

DisplayList(agoraStatesDiscussions, ul, rows, current_page);
setupPagination(agoraStatesDiscussions, pagination_element, rows);

// 다크모드

function darkmodeGo () {
  const darkModeToggle = document.getElementById('dn'); // 체크박스 정의
  if (!darkModeToggle) {return !1} // 체크 박스 없을 시 작동 종료
  const Realbody = document.querySelector('body');
  darkModeToggle.addEventListener('change', function(event) {//체크박스의 변화 감지 리스너
    if (!Realbody.classList.contains('darkmode')) { // 바디에 다크모드 클래스가 없으면
      Realbody.classList.add('darkmode'); // 다크모드 추가
 }
    else { // 바디에 다크모드 클래스가 있으면
      Realbody.classList.remove('darkmode'); // 다크모드 클래스를 제거
    }
  })
}
darkmodeGo ()


// 토글 메뉴 구현

const toggleBtn1 = document.querySelector('.toggle__menu__btn1');
const toggleBtn2 = document.querySelector('.toggle__menu__btn2');


const formInputWrpper = document.querySelector('.form__input--wrapper');
const formSubmit = document.querySelector('.form__submit');

const discussionsContainer = document.querySelector('.discussions__container');
const pageBtn = document.querySelector('.btn__container');

const toggleMenuForm = (function () {
  let isShow = false;

  return function () {
    formInputWrpper.style.display = isShow ? 'none' : 'flex';
    formSubmit.style.display = isShow ? 'none' : 'flex';

    isShow = !isShow;
  };
})();
toggleBtn1.onclick = toggleMenuForm;

const toggleMenuDisscussion = (function () {
  let isShow = false;

  return function () {
    discussionsContainer.style.display = isShow ? 'none' : 'flex';
    pageBtn.style.display = isShow ? 'none' : 'flex';

    isShow = !isShow;
  };
})();
toggleBtn2.onclick = toggleMenuDisscussion;