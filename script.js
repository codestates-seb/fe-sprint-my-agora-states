// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const ul = document.querySelector("ul.discussions__container");

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

  const avatarsImg = document.createElement('img');
  avatarsImg.classList.add("discussion__avatar--image");
  avatarsImg.src = obj.avatarUrl;
  avatarsImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarsImg);

  const discussionTitle = document.createElement('h1');
  discussionTitle.className = 'discussion__title';
  const discussionUrl = document.createElement('a');
  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title;
  discussionTitle.append(discussionUrl);
  discussionContent.append(discussionTitle);

  let at = '오전';
  let date = obj.createdAt.slice(0, 10);
  let hour = obj.createdAt.slice(11, 13);
  let minute = obj.createdAt.slice(14, 16);
  let second = obj.createdAt.slice(17, 19);
  if(hour>12) {
    hour = hour-12;
    at = '오후';
  }

  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${date} ${at} ${hour}:${minute}:${second}`;
  discussionContent.append(discussionInformation);

  const discussionP = document.createElement('p');
  const discussionValue = document.querySelector('p');
  discussionP.textContent = obj.answer ? '☑' : '☐';
  discussionAnswered.append(discussionP);



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

// local storage에 값이 있으면 아래 실행
if(window.localStorage.length) {
  const discussionString = window.localStorage.getItem('discussion');
  const discussionObj = JSON.parse(discussionString);
  ul.prepend(convertToDiscussion(discussionObj));
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

render(ul);

const formSubmit = document.querySelector('form');
const input = document.querySelectorAll('#name');
const textarea = document.querySelector('#story');

//submit을 누르면 질문에 등록이 되고 새로고침해도 내용이 없어지면 안됨

formSubmit.addEventListener('submit', (ev)=>{
  ev.preventDefault()
  let submit = {};
  let time = new Date();
  let year = time.getFullYear();
  let month = ('0'+(time.getMonth()+1)).slice(-2);
  let day = ('0' + (time.getDay())).slice(-2);
  let hour = time.getHours();
  let minute = ('0' + time.getMinutes()).slice(-2);
  let second = ('0' + time.getSeconds()).slice(-2);
  
  submit.createdAt = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
  submit.title = input[1].value;
  submit.author = input[0].value;
  submit.bodyHTML = textarea.value;
  submit.avatarUrl =
  "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  agoraStatesDiscussions.unshift(submit);
  ul.prepend(convertToDiscussion(submit));

  input[0].value = '';
  input[1].value = '';
  textarea.value = '';
  
  //submit 하면 객체 submit을 localstorage에 저장
  const objString = JSON.stringify(submit);
  window.localStorage.setItem('discussion', objString); 
})

// 페이지네이션 
// 1. html로 목업부터 만들기
// 2. 몇 개를 표시할건지 페이지는 어떻게 나눌건지
// 3. 위의 내용 토대로 버튼을 만든다
// 4. 버튼에 누르면 페이지 바뀌게....되나?

const pageNum = document.querySelector('#pagenation__numbers');
const listItem = document.querySelectorAll('li');
const nextB = document.querySelector('#next__button');
const preB = document.querySelector("#pre__button");

const pageLimit = 10; //페이지에 나타낼 디스커션의 갯수
const pageCount = Math.ceil(listItem.length/pageLimit) //페이지 갯수
let currentPage; //page 값 저장

// 페이지 버튼 생성 
const appendPagrNumber = (index) => {
  const pageNumber = document.createElement('button');
  pageNumber.className = 'pagenation__number';
  pageNumber.textContent = index;
  pageNumber.setAttribute('page__index', index);
  pageNumber.setAttribute('aria-label', 'page'+index);

  pageNum.append(pageNumber);
}

// 페이지 버튼 index
const getPageNum = () => {
  for(let i = 1; i<=pageCount; i++) {
    appendPagrNumber(i);
  }
}

//웹페이지가 로드될 때 함수 호출
window.addEventListener('load', ()=>{

  getPageNum();
  setCurrentPage(1);

  preB.addEventListener('click', () => {
    setCurrentPage(currentPage - 1);
  })

  nextB.addEventListener('click', () => {
    setCurrentPage(currentPage + 1);
  })

  document.querySelectorAll('.pagenation__number').forEach((button) => {
    const pageIndex = Number(button.getAttribute('page__index'));

    if(pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex);
      })
    }
  })
})

// 페이지에 디스커션 표시 
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const preRange = (pageNum-1)*pageLimit;
  const currRange = pageNum*pageLimit;

  listItem.forEach((item, index) => {
    item.classList.add('hide');
    if(index>=preRange && index<currRange) {
      item.classList.remove('hide');
    }
  })
}

const handleActivePageNumber = () => {
  document.querySelectorAll('.pagenation__number').forEach((button) => {
    button.classList.remove('active');

    const pageIndex = Number(button.getAttribute('page__index'));
    if(pageIndex == currentPage) {
      button.classList.add('active');
    }
  })
}

const disable = (button) => {
  button.classList.add('disabled');
  button.setAttribute('disabled', true);
}
const able = (button) => {
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
}

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disable(preB);
  } else {
    able(preB);
  }
 
  if (pageCount === currentPage) {
    disable(nextB);
  } else {
    able(nextB);
  }
};