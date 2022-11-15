// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
// 배열 안에 있는 각각의 요소(객체)를 꺼내서 DOM으로 바꾼다음 , 렌더링(뿌려준다.)
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const convertToDiscussion = (obj) => {
  // obj === agoraStatesDiscussions[i]
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
avatarImg.alt = "avatar of " + obj.autor;
avatarImg.src = obj.avatarUrl;
avatarWrapper.append(avatarImg);

const contentTitle = document.createElement('h2');
const titleAnchor = document.createElement('a');
titleAnchor.href = obj.url;
titleAnchor.textContent = obj.title;

const contentInfo = document.createElement('div');
contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toISOString()}`;

contentTitle.append(titleAnchor);
discussionContent.append(contentTitle, contentInfo);

const checked = document.createElement('p');
checked.textContent = obj.answer ? '☑︎' : '◻︎';
discussionAnswered.append(checked);

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
    id: "D_kwDOHOApLM4APjJi",
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


  inputName.value = '';
  inputQuestion.value = '';
  inputTitle.value = '';
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {
  // agoraStatesDiscussions -> 이 데이터에 있는 모든 요소를 순회하면서
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // ul(디스커션들이 들어있는 컨테이너)에 append한다.(추가한다)
    // 무엇을? agoraStatesDiscussions의 i번째 요소를 convertToDiscussio에 전달해서 나온 디스커션 하나를.
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
