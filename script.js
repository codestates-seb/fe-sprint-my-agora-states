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
    avatarImg.className = "discussion__avatar--image"
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

  const content = document.createElement("h2");
  content.className = "discussion__title";
    const conturl = document.createElement("a");
    conturl.href = obj.url;
    conturl.textContent = obj.title;
    content.append(conturl);
  discussionContent.append(content);

  const continfo = document.createElement('div');
  continfo.textContent = obj.author + ' / ' + (new Date(obj.createdAt)).toLocaleString();
  continfo.className = "discussion__information"
  discussionContent.append(continfo);

  const checkboxline = document.createElement('p')
    if(obj.answer === null) {
      checkboxline.textContent = '☒'
    } else {
      checkboxline.textContent = '☑'
    }
  discussionAnswered.append(checkboxline);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const title = document.querySelector('div.form__input--title > input');
const nameInput = document.querySelector('div.form__input--name > input');
const textbox = document.querySelector('div.form__textbox > textarea')
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
    id: "unique id",
    createdAt: new Date().toLocaleString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);

  title.value = null;
  nameInput.value = null;
  textbox.value = null;
});

// const el = document.getElementsByClassName("form__submit");
// el.addEventlistener("click", addquestion);



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
// agoraStatesDiscussions.unshift({});


// function saveinput() {
//   let overwrite = agoraStatesDiscussions[0];
//   overwrite.author = document.getElementById('name').value;
//   overwrite.title = document.getElementById('title').value;
//   overwrite.url = document.getElementById('story').value;
//   console.log(overwrite.author, overwrite.title, overwrite.url);
//   console.log(agoraStatesDiscussions[0])
//   // console.log(agoraStatesDiscussions[1]);
// }


// function addquestion() {
//   console.log('함수작동잘하나...')
//   let overwrite = agoraStatesDiscussions[0];
//   overwrite.id= "";
//   overwrite.createdAt = (new Date(Date.now())).toISOString();
//   // overwrite.title = inputTitle;
//   // overwrite.url="";
//   // overwrite.author = inputName;
//   overwrite.answer = null;
//   overwrite.bodyHTML = "";
//   overwrite.avatarUrl = 'https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4';

//   console.log('함수 잘 돌아갔니')
// }

const numberOfContent = agoraStatesDiscussions.length;
const showContent = 10;
const maxPage = Math.ceil(numberOfContent/showContent);
let page = 1;

