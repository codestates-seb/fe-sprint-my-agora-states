const ul = document.querySelector("ul.discussions__container");

fetch(`http://localhost:4000/discussions/`)
  .then((response) => response.json())
  .then((data) => render(data));

function render(response) {
  for (let i = 0; i < response.length; i += 1) {
    ul.append(convertToDiscussion(response[i]));
  }
  return;
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); 
  li.className = "discussion__container"; 

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleAnchor = document.createElement("a");
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // const discussionCheckbox = document.createElement("p");
  const discussionCheckbox = document.createElement("img");

  // 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  discussionTitleAnchor.textContent = obj.title;
  discussionTitleAnchor.href = obj.url;
  discussionInfo.textContent =  `${obj.author} • ${new Date(obj.createdAt).toLocaleString('ko-KR')}`;

  if (obj.answer) {
    discussionCheckbox.src = "./img/answered.png";
    discussionCheckbox.alt = "answered"
  } else {
    discussionCheckbox.src = "./img/unanswered.png";
    discussionCheckbox.alt = "unanswered"
  }
  
  avatarWrapper.append(avatarImg);
  discussionTitle.append(discussionTitleAnchor);
  discussionContent.append(discussionTitle, discussionInfo);
  discussionAnswered.append(discussionCheckbox);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const formName = document.querySelector('div.form__input--name > input');
const formTitle = document.querySelector('div.form__input--title > input');
const formStory = document.querySelector('div.form__textbox > textarea');

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const obj = {
    id: "null id",
    createdAt: new Date(),
    title: formTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/",
    author: formName.value,
    answer: null,
    bodyHTML: formStory.value,
    avatarUrl: "./img/avatar.png",
  };

  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);

  formName.value = "";
  formTitle.value = "";
  formStory.value = "";
});
