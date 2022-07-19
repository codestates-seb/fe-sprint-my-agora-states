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
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInfo);

  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);

  const answeredCheck = document.createElement('p');
  answeredCheck.textContent = `☑`
  discussionAnswered.append(answeredCheck);

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

// 입력하면 agoraStatesDiscuussions 배열 맨앞에 객체 요소 추가 -> unshift
const newDiscussionform = document.querySelector('form.form');
const newDiscussionAuthor = document.querySelector('div.form__input--name>input');
const newDiscussionTitle = document.querySelector('div.form__input--title>input');
const newDiscussionCont = document.querySelector('div.form__textbox>textarea');
newDiscussionform.addEventListener('submit', (event) => {
  event.preventDefault();
  const newData = {
    id: "user id",
    createdAt: new Date(),
    title: newDiscussionTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: newDiscussionAuthor.value,
    answer: null,
    bodyHTML: newDiscussionCont.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  };
  agoraStatesDiscussions.unshift(newData); // data.js 더미에도 추가
  const newDiscussion = convertToDiscussion(newData) // DOM으로 바꿔줌
  ul.prepend(newDiscussion) // li를 ul의 맨 앞에 붙여줌
})