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

  const avatarImg = document.createElement("img");
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = "avatar of " + obj.author;
    avatarWrapper.append(avatarImg);
    avatarImg.className = "discussion__avatar--image";

  const discussionTitle = document.createElement("h2");
    discussionContent.append(discussionTitle);
    discussionTitle.className = "discussin__title";

  const titleAnchor = document.createElement("a");
    titleAnchor.href = obj.url;
    titleAnchor.textContent = obj.title;
    discussionTitle.append(titleAnchor);

  const discussionInfo = document.createElement("div");
    discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
    discussionContent.append(discussionInfo);
    discussionInfo.className = "discussion__information";

  const checkAnswer = document.createElement("p");

    if (obj.answer === null) {
      checkAnswer.textContent = "☒";
    } else {
      checkAnswer.textContent = "☑";
    }
    discussionAnswered.append(checkAnswer);




  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;


};

const form = document.querySelector('form.form');
const title = document.querySelector('div.form__input--title > input')
const author = document.querySelector('div.form__input--name > input')
const textbox = document.querySelector('div.form__textbox > textarea')

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
      id: "unique id",
      createdAt: new Date().toLocaleString(),
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: author.value,
      answer: null,
      bodyHTML: textbox.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    
  };
  agoraStatesDiscussions.unshift(obj);
  const newDoscussion = convertToDiscussion(obj);
  ul.prepend(newDoscussion);
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
