// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleLink = document.createElement("a");
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionAnsweredParagraph = document.createElement("p");

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  discussionTitleLink.textContent = obj.title;
  discussionTitleLink.href = obj.url;
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionAnsweredParagraph.textContent = obj.answer ? "☑" : "☒";

  avatarWrapper.append(avatarImage);
  discussionTitle.append(discussionTitleLink);
  discussionContent.append(discussionTitle, discussionInformation);
  discussionAnswered.append(discussionAnsweredParagraph);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const submitBtn = document.querySelector("div.form__submit > input");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const elInputName = document.querySelector("div.form__input--name > input");
  const elInputTitle = document.querySelector("div.form__input--title > input");
  const elInputStory = document.querySelector("div.form__textbox > textarea");

  const obj = {
    id: "unique value",
    createdAt: new Date().toISOString(),
    title: elInputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: elInputName.value,
    answer: null,
    bodyHTML: elInputStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/47207736?s=400&v=4",
  };

  ul.prepend(convertToDiscussion(obj));
  agoraStatesDiscussions.unshift(obj);
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
