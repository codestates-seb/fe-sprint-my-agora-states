// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다. 멋진것같애!!
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


  /* avatar */
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  /* title & author & timestamp */
  const title = document.createElement('h2');
  const content = document.createElement('a');
  content.href = obj.url;
  title.appendChild(content);
  content.textContent = obj.title;
  const info = document.createElement('div');
  info.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(title, info);

  /* answered */
  const checkbox = document.createElement('p');
  if (obj.answer !== null) {
    checkbox.classList.add('solved');
    checkbox.textContent = '☑';
  }
  else {
    checkbox.classList.remove('solved');
    checkbox.textContent = '☒';
  }
  discussionAnswered.append(checkbox);


  /* append all datas */
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


const renderContent = (element, currPage) => {
  //초기화
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  //10개 render
  for (let i = currPage * 10; i < currPage * 10 + 10; i += 1) {
    console.log('불러올 content 번호' + i);
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const renderPage = (element, pageNum) => {
  //초기화
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  /* page button */
  const pageWrapper = document.createElement("div");
  pageWrapper.className = "pagination__wrapper";

  for (let i = 0; i < pageNum; i += 1) {
    const pagebtn = document.createElement('button'); // div 요소 생성
    pagebtn.className = "page__btn"; // 클래스 이름 지정
    pagebtn.textContent = i + 1;

    console.log('currpage:', currPage);
    console.log('i', i);
    if (i === currPage) pagebtn.classList.add('curr__page');
    else pagebtn.classList.remove('curr__page');
    element.append(pagebtn);
  }

};

const pageNum = parseInt((agoraStatesDiscussions.length - 1) / 10) + 1;
const render = (ulContent, ulPage, currPage) => {
  renderContent(ulContent, currPage);
  renderPage(ulPage, pageNum);

};


// // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ulContent = document.querySelector("ul.discussions__container");
const ulPage = document.querySelector("div.pagination__container");
let currPage = 0;
render(ulContent, ulPage, currPage);


// form 제출
const form = document.querySelector('form.form');
const newTitle = document.querySelector('div.form__input--title > input');
const newName = document.querySelector('div.form__input--name > input');
const newStory = document.querySelector('div.form__textbox > textarea');
const ul = document.querySelector('ul.discussions__container');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
    id: "Unique id",
    createdAt: new Date().toLocaleDateString(),
    title: newTitle.value,
    url: null,
    author: newName.value,
    answer: null,
    bodyHTML: newTitle.value,
    avatarUrl:
      "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg",
  };

  render(ulContent, ulPage, 0);
  convertToDiscussion(obj);
  agoraStatesDiscussions.unshift(obj);
  // ul.prepend(newDiscussion);
})

// page 버튼 클릭
for (let i = 0; i < pageNum; i++) {
  let page = document.querySelectorAll('button.page__btn')[i];
  console.log(page);
  page.addEventListener('click', () => {
    let clikedPage = page.textContent - 1;
    console.log(clikedPage);
    console.log(currPage);
    if (clikedPage !== currPage) {
      currPage = clikedPage;
      render(ulContent, ulPage, clikedPage); // 현재페이지가 아니라면 다시 render
    }
  });

}


