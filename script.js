// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// localStorage.setItem("data",'');

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = 'avatar of ' + obj.author;

  avatarWrapper.append(avatarImage);
  
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h4");
  discussionTitle.className = "discussion__title";

  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;

  discussionTitle.append(titleLink);
 
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  
  discussionInformation.textContent = obj.author + " / " + new Date(obj.createdAt).toLocaleString();

  discussionContent.append(discussionTitle,discussionInformation);
  
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionAnsweredPtag = document.createElement("p");
  discussionAnsweredPtag.textContent = obj.answer === null ? '☒' : '☑';

  discussionAnswered.append(discussionAnsweredPtag);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

if(localStorage.data === undefined){
  localStorage.data = JSON.stringify(agoraStatesDiscussions);
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const renderData = (element) => {
  for (let i = 0; i < JSON.parse(localStorage.data).length; i += 1) {
    element.append(convertToDiscussion(JSON.parse(localStorage.data)[i]));
  }
  return;
};

const ul = document.querySelector("ul.discussions__container");
renderData(ul);
// if(localStorage.data === undefined){
//   // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
//   render(ul);
// }else{
//   renderData(ul);
// }


const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
  let title = document.querySelector("#title");
  let name = document.querySelector("#name");
  let story = document.querySelector("#story");

  if(title.value.length === 0 || name.value.length === 0 || story.value.length === 0){
    return;
  }

  const obj = {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: new Date(),
    title: document.querySelector("#title").value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: document.querySelector("#name").value,
    answer: null,
    bodyHTML: document.querySelector("#story").value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));

  title.value = '';
  name.value = '';
  story.value = '';

  if(localStorage.data === undefined){
    localStorage.setItem('data', JSON.stringify(agoraStatesDiscussions));
  }else{
    let tempArr = JSON.parse(localStorage.data);
    tempArr.unshift(obj);
    localStorage.setItem('data', JSON.stringify(tempArr));
  }


  //window.location.reload()를 사용하지 않을 때 페이지 초기화
  if(page !== 1){
    page = 1;
  }

  console.log(JSON.parse(localStorage.data).length);
  renderPaginaton(page);
  // renderPaginaton(1);
  window.location.reload();
})

// const contents = document.querySelector(".discussion__container");
const buttons = document.querySelector(".buttons");

const numOfContent = JSON.parse(localStorage.data).length;
const showContent = 10;
const showButton = 5;
const maxPage = Math.ceil(numOfContent / showContent);
let page = 1;


const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button__pagination");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    Array.prototype.forEach.call(buttons.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num));
  });
  return button;
};

const renderContent = (page) => {
  // 목록 리스트 초기화
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
  }

  for (let id = (page - 1) * showContent; id < page * showContent && id < numOfContent; id++) {
    ul.appendChild(convertToDiscussion(JSON.parse(localStorage.data)[id]));
  }
};


const renderButton = (page) => {
  // 버튼 리스트 초기화
  while (buttons.hasChildNodes()) {
    buttons.removeChild(buttons.lastChild);
  }
  // 화면에 최대 5개의 페이지 버튼 생성
  for (let id = page; id < page + showButton && id <= maxPage; id++) {
    buttons.appendChild(makeButton(id));
  }
  // 첫 버튼 활성화(class="active")
  buttons.children[0].classList.add("active");

  const prev = document.createElement("button");
  prev.classList.add("button__pagination", "prev");
  prev.innerHTML = '<';
  prev.addEventListener("click", goPrevPage);

  const next = document.createElement("button");
  next.classList.add("button__pagination", "next");
  next.innerHTML = '>';
  next.addEventListener("click", goNextPage);

  buttons.prepend(prev);
  buttons.append(next);

  // 이전, 다음 페이지 버튼이 필요한지 체크
  if (page - showButton < 1) buttons.removeChild(prev);
  if (page + showButton > maxPage) buttons.removeChild(next);
};

const goPrevPage = () => {
  page -= showButton;
  renderPaginaton(page);
};

const goNextPage = () => {
  page += showButton;
  renderPaginaton(page);
};

const renderPaginaton = (page) => {
  renderContent(page);
  renderButton(page);
};

renderPaginaton(page);





