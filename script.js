// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);


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

  // avatarWrapper 아바타 이미지 요소 추가
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // discussionContent 요소 추가 -> title, information
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = obj.author + ' ㆍ ' + new Date(obj.createdAt).toLocaleString();

  // discussionTitle 요소 추가 -> url, title text
  const discussionTitleDetail = document.createElement('a');
  discussionTitleDetail.href = obj.url;
  discussionTitleDetail.textContent = obj.title;
  discussionTitle.append(discussionTitleDetail)

  const infoAndCheck = document.createElement('div');
  infoAndCheck.className = "infoAndCheck";
  discussionContent.append(discussionTitle, infoAndCheck);

  // discussionAnswered 요소 추가
  const discussionAnsweredCheck = document.createElement('p');
  discussionAnsweredCheck.textContent = obj.answer ? '☑' : '☐';
  discussionAnswered.append(discussionAnsweredCheck);
  infoAndCheck.append(discussionInfo, discussionAnswered);

  li.append(avatarWrapper, discussionContent);
  return li;
};

const form = document.querySelector('.form');
const formName = document.querySelector('#name');
const formTitle = document.querySelector('#title');
const formStory = document.querySelector('#story');

const addDiscussion = function(event) {
  event.preventDefault();

  // 객체를 하나 만들고
  // 그 객체를 conver~ 함수에 넣어 DOM으로 변환
  // render 함수에 넣어 브라우저에 렌더링
  
  const newObj = {
      id: 'unique number',
      createdAt: new Date(),
      title: formTitle.value,
      url: '',
      author: formName.value,
      answer: null,
      bodyHTML: formStory.value,
      avatarUrl: 'https://api.lorem.space/image/face?w=150&h=150'
  };

  agoraStatesDiscussions.unshift(newObj);
  // ul.prepend(convertToDiscussion(newObj));
  const newDiscussion = convertToDiscussion(newObj);
  ul.prepend(newDiscussion);
  
  formName.value = '';
  formTitle.value = '';
  formStory.value = '';
};

form.addEventListener('submit',addDiscussion);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // i번째 요소를 convert~ 함수 돌려서 ul에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// 페이지네이션 구현
const paginationNumbers = document.querySelector('#pagination-numbers');
// paginatedList ==> ul
// const paginatedList = document.querySelector('.discussion__container')
const listItems = ul.querySelectorAll("li");
console.log(listItems);
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage;

// 페이지 넘버 버튼 생성
const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
 
  paginationNumbers.appendChild(pageNumber);
};
 
const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

// paginationLimit 개수만큼 display
// 만약 현재 1페이지에 있다면 1~10까지의 item을 나타냄
// 2페이지에 있다면 11~20까지의 item을 나타냄
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;
   
  // 새로운 페이지가 set 될때마다 active page number가 업데이트됨
  handleActivePageNumber();
  // prev, next disable/enable
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  // 배열을 반복문으로 돌려서 전부다 hide 했다가 range에 속하는 부분만 unhide
  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    // 배열은 인덱스 0부터 시작 -> range 설정 유의
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

// 웹페이지가 load 될 때 getPaginationNumbers 함수 호출해서 페이지 넘버 표시
window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  // prev, next 버튼 처리
  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });
 
  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
 
    if (pageIndex) {
      // 페이지 버튼 클릭했을 때 setCurrentPage 함수 실행
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});

// 현재 active한 페이지의 버튼에 class="active" 추가
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
     
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex === currentPage) {
      button.classList.add("active");
    }
  });
};

// prev, next 버튼 disable 기능
const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

// prev, next 버튼 enable 기능
const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};
 
// 현재 첫페이지면 prev disable, 현재 마지막 페이지면 next disable
const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }
 
  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};