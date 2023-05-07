// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// 질문하기 버튼 클릭 시 질문창 열리게 하기
const showSectionBtn = document.querySelector('#ask');
const hiddenSection = document.querySelector('.form_container');

showSectionBtn.addEventListener('click', function() {
  if(hiddenSection.style.display === 'none')
  hiddenSection.style.display = 'block';
  else{
    hiddenSection.style.display = 'none';
  }
});


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //element를 생성한다.
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussioninfo = document.createElement("div");
  discussioninfo.className = "discussion__info";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // class와 객체의 정보를 넣어준다.
  const avatarImage = document.createElement('img');
	avatarImage.classList.add('discussion__avatar--image')
	avatarImage.src = obj.avatarUrl;
	avatarImage.alt = `avatar of ${obj.author}`
	discussioninfo.append(avatarImage)


  const information = document.createElement("div");
  information.className = "discussion__information";
  information.textContent =`${obj.author} / ${new Date(obj.createdAt)

    .toLocaleString()
    .slice(0, -3)}`;
  discussioninfo.append(information);

  const checked = document.createElement("p");
  checked.textContent = obj.answer !== null ? "🟢" : "🔴";
  discussioninfo.append(checked);
  
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);


  li.append(avatarWrapper, discussioninfo,discussionAnswered, discussionContent);
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

const form = document.querySelector('.form');
const author = form.querySelector ("#name");
const title = form.querySelector("#title");
const textbox = form.querySelector (".form_input_info > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault(); //서브밋 이벤트로 사용시 꼭 함께 사용해주어야함

  const obj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/55401378?s=64&u=9ef138579365bd13856792f624c418cf760453f3&v=4",
  };
  agoraStatesDiscussions.unshift(obj);  // 기존 데이터 맨앞으로 추가
  ul.prepend(convertToDiscussion(obj)); // 콘텐츠를 선택한 요소 내부의 시작 부분에 삽입
  // 제출 후 리셋
  title.value = "";
  author.value = "";
  textbox.value = "";
})

const paginationContainer = document.querySelector('.pagination--container');
const prevButton = document.getElementById('button-prev');
const nextButton = document.getElementById('button-next');
const pageNumberWrapper = document.getElementById('page-number--wrapper');
const DISCUSSIONS_PER_PAGE = 10;
let currentPage = 1;
let currentDiscussions = agoraStatesDiscussions

/**
 * 이전 페이지로 이동 버튼 클릭 시 발생할 이벤트
 */
prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    movePageHilighting(currentPage);
    changePage(currentPage);
  }
});

/**
 * 다음 페이지로 이동 버튼 클릭 시 발생할 이벤트
 */
nextButton.addEventListener('click', () => {
  console.log(currentPage, getPagesCount());
  if (currentPage < getPagesCount()) {
    currentPage += 1;
    movePageHilighting(currentPage);
    changePage(currentPage);
  }
});

/**
 * 페이지 번호 버튼 클릭 시 발생할 이벤트
 */
pageNumberWrapper.addEventListener('click', (e) => {
  currentPage = +e.target.textContent;
  movePageHilighting(currentPage);
  changePage(currentPage);
});

/**
 * @param {number} - 이동할 페이지 번호
 */
const movePageHilighting = (page) => {
  const pageNumberButtons = document.querySelectorAll('.page-number--button');

  pageNumberButtons.forEach((button) => {
    if (button.classList.contains('selected-page')) {
      button.classList.remove('selected-page');
    }
  });

  pageNumberButtons[page - 1].classList.add('selected-page');
};

/**
 * @returns {number} - 총 페이지 개수
 */
const getPagesCount = () => {
  return Math.ceil(currentDiscussions.length / DISCUSSIONS_PER_PAGE);
};

/**
 * 필요한 페이지 개수만큼 페이지 버튼 만들기
 */
const renderPageNumber = () => {
  pageNumberWrapper.innerHTML = '';

  for (let i = 1; i <= getPagesCount(); i++) {
    pageNumberWrapper.innerHTML += `<span class="page-number--button"> ${i} </span>`;
  }

  pageNumberWrapper.firstChild.classList.add('selected-page');
};

/**
 * @param {number} - 이동할 페이지 번호
 */
const changePage = (page) => {
  if (page < 1) {
    page = 1;
  }
  if (page > getPagesCount() - 1) {
    page = getPagesCount();
  }

  ul.innerHTML = '';

  for (
    let i = (page - 1) * DISCUSSIONS_PER_PAGE;
    i < page * DISCUSSIONS_PER_PAGE && i < currentDiscussions.length;
    i++
  ) {
    ul.append(convertToDiscussion(currentDiscussions[i]));
  }
};

// 초기화면 1번 page로 고정
movePageHilighting(currentPage);
changePage(currentPage);
