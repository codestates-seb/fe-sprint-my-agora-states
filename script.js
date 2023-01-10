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
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.setAttribute("src" , obj.avatarUrl);
  avatarImg.setAttribute("alt" , "avatar of " + obj.author);
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  discussionLink.textContent = obj.title;
  discussionLink.setAttribute("href", obj.url);
  discussionContent.append(discussionTitle);
  discussionTitle.append(discussionLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionInfo);

  const isDiscussionAnswer = document.createElement("p");
  isDiscussionAnswer.textContent = obj.answer ? "☑" : "☐"
  discussionAnswered.append(isDiscussionAnswer)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector(".form");
const author = document.querySelector(".form__input--name > input");
const title = document.querySelector(".form__input--title > input");
const textbox = document.querySelector(".form__textbox > textarea");

form.addEventListener("submit",(e) => {
  e.preventDefault();
  const obj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/84169393?s=400&u=a807c039fdf25028466d96b7cfd5b74dff4ea38d&v=4",
    bodyHTML: textbox.value,
  }
agoraStatesDiscussions.unshift(obj);
const discussion = convertToDiscussion(obj);
ul.prepend(discussion);
})




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
