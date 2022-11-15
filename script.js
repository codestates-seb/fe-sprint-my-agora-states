// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//스크롤
const scrollTit = document.querySelector('h1')
scrollTit.addEventListener('click', (event) => {
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
})

// 모달창
const queBtn = document.querySelector('.form__btn');
const modal = document.querySelector('.form__container');
const modalBack = document.querySelector('.modal');
const modalClose = document.querySelector('.modal_close');
function modalOpen(){
  modal.classList.toggle('open');
  modalBack.classList.toggle('open');  
}
queBtn.addEventListener('click', function(event){
  modalOpen()
})
modalClose.addEventListener('click', function(event){
  modalOpen()
})

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
  avatarImg.alt = "avater of " + obj.author;
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  contentTitle.append(titleAnchor);
  
  const contentInfo = document.createElement('div')
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  
  discussionContent.append(contentTitle, contentInfo);

  const checked = document.createElement('p');
  checked.textContent = obj.answer ? '☑' : 'x'; // 3항연산자
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input')
const inputQuestion = document.querySelector('.form__textbox > textarea');

// 추가용
form.addEventListener('submit', (event) => {
  event.preventDefault(); // 제출 시의 새로고침 막음
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
  ul.prepend(convertToDiscussion(obj));
  console.log(obj)

  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
  modalOpen()
})


//페이징 시도
const pageContent = document.querySelector('ul.discussions__container > li')
const paginationUl = document.querySelector('ul.pagination')


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
