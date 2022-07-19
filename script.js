// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const inputName = document.querySelector('.form__input--name > #name');
const inputTitle = document.querySelector('.form__input--title > #name');
const textareaStory = document.querySelector('.form__textbox > #story');
const buttonSubmit = document.querySelector('.form__submit > input');

const form = document.querySelector('.form');

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


  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  discussionTitle.appendChild(document.createElement("a"));

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  discussionTitle.firstChild.href = obj.url;
  discussionTitle.firstChild.textContent = obj.title;
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;


  if (obj.answer) {
    discussionAnswered.textContent = "☑";
  }
  else {
    discussionAnswered.textContent = "☒";
  }

  discussionContent.append(discussionTitle);
  avatarWrapper.append(avatarImg);
  discussionContent.append(discussionInformation);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 다 지우고 배열에 있는 내용 다 보여주기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

form.addEventListener('submit', function (event) {
  // console.log('submit');
  event.preventDefault();
  
  const newDiscussion = {
    id: inputName.value,
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: inputName.value,
    bodyHTML: textareaStory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  // console.log(newDiscussion);

  agoraStatesDiscussions.unshift(newDiscussion);
  // const discussion = convertToDiscussion(newDiscussion);

  
  // while (ul.firstChild) {
  //   ul.removeChild(ul.firstChild);
  // }

  render(ul);
})
