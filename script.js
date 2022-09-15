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

  // AvatarImg 생성
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = obj.author + '의 이미지';
  avatarWrapper.append(avatarImg);
  // Content 내용 생성  (title, information)
  const discussionTitle = document.createElement('h2');
  discussionTitle.classList = "discussion__title";
  const ahref = document.createElement('a');
  ahref.textContent = obj.title;
  ahref.href = obj.url;
  discussionTitle.append(ahref);
  const discussionInformation = document.createElement('div');
  discussionInformation.classList = "discussion__information";
  discussionInformation.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(discussionTitle, discussionInformation);
  // answered 생성
  const isAnswered = document.createElement('p');
  isAnswered.textContent = '☑';
  discussionAnswered.append(isAnswered)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
let page = 1;
let pageTo = 1;
let pageStart = (pageTo - 1) * 10;
let pageEnd = pageStart + 10;
let newData = [];
let renderData = [];
const render = (element) => {
  // ul.innerHTML = '';

  //데이터 가져오기
  const serverUrl = 'http://localhost:4000/discussions';
  fetch(serverUrl)
    .then((data) => data.json())
    .then((data) => {
      renderData = data;

      for (let i = pageStart; i < pageEnd; i += 1) {
        element.append(convertToDiscussion(renderData[i]));
      }

      // 페이지 생성 및 변경
      createPagination();
    })


  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const pageContainer = document.querySelector(".pagenation__container");
render(ul);

// pagenation 생성
function createPagination() {
  pageContainer.innerHTML = '';
  page = Math.floor(renderData.length / 10);

  for (let i = 0; i < page; i++) {
    const pageNav = document.createElement('li');
    pageNav.textContent = i + 1;
    pageContainer.append(pageNav);
    pageNav.addEventListener('click', changePage);
  }
  return;
}

// page 변경
function changePage() {
  let pageTo = event.target.textContent;
  pageStart = (pageTo - 1) * 10;
  pageEnd = pageStart + 10;
  ul.innerHTML = '';
  render(ul);
}

// submit
const submitForm = document.querySelector('.form');

submitForm.addEventListener('submit', addToDiscussions);

function addToDiscussions(event) {
  event.preventDefault();
  const inputName = document.querySelector('#name').value;
  const inputTitle = document.querySelector('#title').value;
  const inputQuestion = document.querySelector('#story').value;
  newData;

  const addObj = {
    id: "id",
    createdAt: new Date().toLocaleString(),
    title: inputTitle,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName,
    bodyHTML: inputQuestion,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  ul.innerHTML = '';
  render(ul, addObj);

}
