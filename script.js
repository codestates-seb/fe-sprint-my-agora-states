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
avatarImg.className = 'discussion__avatar--image';
avatarImg.alt = "avatar of" + ""
avatarImg.src = obj.avatarUrl;
avatarWrapper.append(avatarImg);

const contentTitle = document.createElement('h2');
const titleAnchor =  document.createElement('a');
titleAnchor.href = obj.url;
titleAnchor.textContent = obj.title;

const contentInfo = document.createElement('div');
contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`

contentTitle.append(titleAnchor);
discussionContent.append(contentTitle, contentInfo);

const checked = document.createElement("p");
checked.textContent = obj.answer ? "☑︎" : "☒";
discussionAnswered.append(checked);

const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
      id: "한가을",
      createdAt: new Date().toLocaleDateString(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: inputName.value,
      answer: null,
      bodyHTML: inputQuestion,
      avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    }

    agoraStatesDiscussions.unshift(obj);
    ul.prepend(convertToDiscussion(obj));
})


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