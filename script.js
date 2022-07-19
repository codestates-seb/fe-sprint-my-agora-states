// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
// agoraStatesDiscussions = JSON.parse(localStorage.getItem('new agora'));

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
  /* 1. 아바타 이미지 구현 */
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  /* 2. discussionContent 정보 구현 */

  // 2-1. discussionTitle 구현
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionAtag = document.createElement('a')
  discussionAtag.href = obj.url;
  discussionAtag.textContent = obj.title;
  discussionTitle.append(discussionAtag);

  // 2-2. discussionInformation 구현
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  //new Date(obj.createdAt).toLocaleString()

  // 2-3. discussionContent에 하위 요소들 append
  discussionContent.append(discussionTitle, discussionInformation);

  /* 3. discussionAnswerd 정보 구현 */
  const disAnsChecking = document.createElement('p');
  // disAnsChecking.textContent = '☑'
  if (obj.answer === null){
    disAnsChecking.textContent = '☒';
  }
  else{
    disAnsChecking.textContent = '☑';
  }
  discussionAnswered.append(disAnsChecking);

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


//TODO: form에 작성된 요소를 display에 추가
// form 안에 submit버튼이 같이 있음
const form = document.querySelector('form.form');
const title = document.querySelector('div.form__input--title > input');
const nameInput = document.querySelector('div.form__input--name > input');
const textbox = document.querySelector('div.form__textbox > textarea')

form.addEventListener("submit", (event) => {
  // 새로운 객체를 만들어야 한다
  // input에  입력된 값(value)를 넣은 새로운 객체
  // 새로운 객체 ul 요소 아래로 넣어준다
  // 더미 데이터(agoraStatesDiscussions)여기에도 추가해준다.
  event.preventDefault();
  const obj = {
    id: "unique id",
    createdAt: new Date(),
    title: title.value,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/2',
    author: nameInput.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl: 'https://avatars.githubusercontent.com/u/12145019?s=64u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4',
  }
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj)
  localStorage.setItem('new agora', JSON.stringify(agoraStatesDiscussions));
  ul.prepend(newDiscussion)
  agoraStatesDiscussions = JSON.parse(localStorage.getItem('new agora'));
})

//TODO: 페이지네이션
const contents = document.querySelector(".contents");
const buttons = document.querySelector(".buttons");

const numOfContent = agoraStatesDiscussions.length;
const maxContent = 10;
const maxButton = 5;
const maxPage = Math.ceil(numOfContent / maxContent);
let page = 1;

const makeContent = (id) => {
  const content = document.createElement("li");
  content.classList.add("content");
  content.innerHTML = `
    <span class="content__id">${id}</span>
    <span class="content__title">게시물 제목</span>
    <span class="content__author">작성자</span>
    <span class="content__date">2022.01.01</span>
  `;
  return content;
};

const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
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

// Prev, Next Button
const goPrevPage = () => {
  page -= maxButton;
  renderpagination(page);
};

const goNextPage = () => {
  page += maxButton;
  renderpagination(page);
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
next.addEventListener("click", goNextPage);

const renderContent = (page) => {
  while (contents.hasChildNodes()) {
    contents.removeChild(contents.lastChild);
  }
  for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
    contents.appendChild(makeContent(id));
  }
};

const renderButton = (page) => {
  while (buttons.hasChildNodes()) {
    buttons.removeChild(buttons.lastChild);
  }
  for (let id = page; id < page + maxButton && id <= maxPage; id++) {
    buttons.appendChild(makeButton(id));
  }
  buttons.children[0].classList.add("active");

  buttons.prepend(prev);
  buttons.append(next);

  if (page - maxButton < 1) buttons.removeChild(prev);
  if (page + maxButton > maxPage) buttons.removeChild(next);
};

const renderpagination = (page) => {
  renderContent(page);
  renderButton(page);
};
renderpagination(page);


// Local Storage를 이용하면 새로고침해도 업어지지 않음

