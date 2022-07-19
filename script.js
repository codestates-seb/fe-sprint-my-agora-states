// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement('h2');
  contentTitle.className = 'discussion__title';
  const contentUrl = document.createElement('a');
  contentUrl.href = obj.url;
  contentUrl.textContent = obj.title;
  contentTitle.append(contentUrl);
  discussionContent.append(contentTitle);

  const contentInformation = document.createElement('div');
  contentInformation.className = "discussion__information";
  contentInformation.textContent = obj.author + " / " + new Date(obj.createdAt).toLocaleString();
  discussionContent.append(contentInformation);

  const contentIsAnswered = document.createElement('p');
  contentIsAnswered.style.color = obj.answer ? 'green' : 'red';
  contentIsAnswered.textContent = obj.answer ? 'o' : 'x';
  discussionAnswered.append(contentIsAnswered);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('.form')
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');

// agoraStatesDiscussions 배열에 객체가 추가됩니다.
// ul에 첫번째 자식으로 새롭게 생성된 li가 추가됩니다.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj =
  {
    id: "unique id",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);
});

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
