// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const ANSWERED_MARK = "☑︎";
const UNANSERED_MARK = "☒";

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  // Append 과정
  avatarWrapper.append(avatarImg);

  const title = document.createElement('h2');
  title.className = "discussion__title";
  discussionContent.append(title);
 
  const contentLink = document.createElement('a');
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  title.append(contentLink);


  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`; 
  discussionContent.append(discussionInformation);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionIcon = document.createElement("p");

  if (obj.answer === null) {
    discussionIcon.textContent = UNANSERED_MARK;
  } else {
    discussionIcon.textContent = ANSWERED_MARK;
  }

  discussionAnswered.append(discussionIcon);

  
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

new Date().toLocaleString()


const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log('submit 이벤트 발생했다!!')
  console.log(author.value, title.value, textbox.value)

  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };

  // agoraStatesDiscussions 객체 추가
  agoraStatesDiscussions.unshift(obj);

  // 화면 다 지우고 
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
  render(ul);
});

