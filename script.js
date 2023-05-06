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

  //Image of Avatar
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  //Title
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';

  //Author, Date
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionTitle, discussionInformation);

  //Link, Contents
  const discussionLink = document.createElement('a');
  discussionLink.href = obj.url;
  discussionLink.text = obj.title;
  discussionTitle.append(discussionLink);

  //Check box
  const contentAnswered = document.createElement('p');
  contentAnswered.className = 'discussion__answered';
  if (obj.answer === null) {
    contentAnswered.textContent = "ok";
  } else {
    contentAnswered.textContent = "no";
  }
  discussionAnswered.append(contentAnswered);

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

//Local storage function
const renderlocalStorage = (element) => {
  const objLocalData = JSON.parse(localStorage.getItem("agoraDatas"));
  if (objLocalData) {
    for (let i = 0; i < objLocalData.length; i++) {
      element.prepend(convertToDiscussion(objLocalData[i]));
    }
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
renderlocalStorage(ul);

const form = document.querySelector('.form');
const formName = document.querySelector('#name');
const formTitle = document.querySelector('#title');
const formStory = document.querySelector('#story');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const newDiscussion = {
    id: "",
    createdAt: new Date().toLocaleDateString(),
    title: formTitle.value,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45',
    author: formName.value,
    answer: null,
    bodyHTML: formStory.value,
    avatarUrl: 'https://i.natgeofe.com/k/7bfcf2d2-542e-44f0-962a-c36f2efa98a5/heart.jpg'
  };

  let objData = [];
  if (localStorage.length > 0) {
    localStorage.setItem('agoraDatas', JSON.stringify(objData));

    agoraStatesDiscussions.unshift(newDiscussion);
    ul.prepend(convertToDiscussion(newDiscussion));

    form.reset();
  }
});