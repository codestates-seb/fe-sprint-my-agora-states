// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// 해당 함수는 li 뭉치 만듬
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
  // 1. 아바타 영역
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // 콘텐츠
  const avatarTitle = document.createElement("h2"); // 질문 타이틀을 만듬
  const avatarAnchor = document.createElement("a"); // 링크를 만듬
  avatarTitle.className = "discussion__title";
  discussionContent.append(avatarTitle);
  avatarTitle.append(avatarAnchor);
  avatarAnchor.setAttribute("href", obj.url);
  avatarAnchor.textContent = obj.title;

  // 인포메이션 불러오기
  // div 만드는 변수 (질문글의 정보)
  const discussionInformation = document.createElement("div"); // div생성
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionInformation);

  const checkBox = document.createElement("p");
  checkBox.textContent = obj.answer ? "😇" : "👿"; // 삼항연산자 참 : 거짓
  discussionAnswered.append(checkBox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // data.js파일의 데이터 legnth만큼 배열 속의 객체를 찾는다.
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // i번째 데이터를 convertToDiscussion의 전달인자로 갖고 element에 추가
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
    id: "newID",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
  title.value = "";
  author.value = "";
  textbox.value = "";
});
