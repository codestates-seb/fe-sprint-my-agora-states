// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
console.log(agoraStatesDiscussions[0].answer);

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
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = 'discussion__title';
  const a = document.createElement('a');
  a.href = obj.url;
  a.textContent = obj.title;
  discussionTitle.append(a);
  const discussionInfo = document.createElement("div");
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionTitle, discussionInfo);


  const checked = document.createElement('p');
  checked.textContent = obj.answer ? '☑' : '☒'
  discussionAnswered.appendChild(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const obj = {
    id: "999",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  agoraStatesDiscussions.unshift(obj);
  // prepend 맨 앞으로 추가
  ul.prepend(convertToDiscussion(obj));

  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
})

const numOfContent = agoraStatesDiscussions.length;
const showContent = 10;
const showPage = 5;
const maxPage = Math.ceil(numOfContent / showContent);
let page = 1;

const makePaging = (i) => {
  const paging = document.createElement('button');
  paging.className = 'discussion__paging';
  paging.dataset.num = i;
  paging.textContent = i;
  paging.addEventListener("click", (e) => {
    Array.prototype.forEach.call(paging.children, (paging) => {
      if (paging.dataset.num) paging.classList.remove("active");
    });
    e.target.classList.add("active");
    render(ul, parseInt(e.target.dataset.num));
  });
  return paging;
}


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, page) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }

  for (let i = (page - 1) * showContent + 1; i <= page * showContent && i <= numOfContent; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const renderPaging = (element, page) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }

  for (let i = page; i < page + showPage && i <= maxPage; i++) {
    element.append(makePaging(i));
  }
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, page);

const paging = document.querySelector('.discussion__paging');
renderPaging(paging, page);
