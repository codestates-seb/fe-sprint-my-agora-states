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
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.classList = "discussion__title";
  const discussionInfo = document.createElement('div');
  discussionInfo.classList = "discussion__information";
  discussionContent.append(discussionTitle, discussionInfo);
  discussionTitleAnker = document.createElement('a');
  discussionTitle.append(discussionTitleAnker);

  const discussionAnsweredIcon = document.createElement('p');
  discussionAnswered.append(discussionAnsweredIcon);
  
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  discussionTitleAnker.textContent = obj.title;
  discussionTitleAnker.href = obj.url;
  discussionInfo.textContent = obj.author + ` / ` + new Date(obj.createdAt).toISOString();
  discussionAnswered.textContent = '☑';


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// const form = document.querySelector('.form')
// form.addEventListener('submit', function(e) {
//   e.preventDefault();
//   const obj = {
//     author: 'javascript',
//     title: '',
//     bodyHTML: '',
//     createdAt: ''
//   };
//   obj[author].push(this.Name.value);
//   obj[title] = this.title.value;
//   obj[bodyHTML] = this.story.value;
//   obj[createdAt] = new Date().toLocaleString; //작성시간
//   console.log(obj);
// })
const form = document.querySelector('form.form');
const title = document.querySelector('div.form__input--title > input');
const nameInput = document.querySelector('div.form__input--name > input');
const textbox = document.querySelector('div.form__textbox > textarea');

form.addEventListener('submit', (e) => {
  //새로운 객체를 만들어야 한다.
  //인풋에 입력된 값(value)을 넣은 새로운 객체.
  //새로운 객체를 ul요소 아래로 넣어준다.
  //더미 데이터(agoryStatesDiscussions)에도 추가해준다.
  e.preventDefault();
  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/42",
    author: nameInput.value,
    bodyHTML: textbox.value,
    avatarUrl: 'https://techcrunch.com/wp-content/uploads/2015/09/mario-block-nes.png?w=1390&crop=1',
  }

  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    //ul.append와 같다.
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//pagination
const contents = document.querySelectorAll('.discussion__container');
const maxPage = 10;
const allPage = Math.ceil(contents.length / maxPage);

const prevBtn = document.querySelector('#prev__btn');

let current = 1;
let restPage = current % 10;
let firstPage = current - restPage + 1;
let lastPage = current - restPage + maxPage;

if(lastPage > allPage) {
  lastPage = allPage;
}

for(let i = current; i <= lastPage; i++) {
  const pageSpan = document.createElement('span');
  pageSpan.classList = 'btn';
  prevBtn.after(pageSpan);
}