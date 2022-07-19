// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 페이지네이션
// let shownPage = 10; //보여지는 페이지 내부 컨텐츠 개수
// let maxPage = Math.ceil(agoraStatesDiscussions.length / shownPage); //페이지 수

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
  // img
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // content의 title
  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";
  const contentLink = document.createElement("a");
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  discussionContent.append(contentTitle); //discussion__content 내부에 contentTitle(h2)연결
  contentTitle.append(contentLink); //contentTitle(h2)내부에 contentLink(a)연결

  // content의 information
  const contentInformation = document.createElement("div");
  contentInformation.className = "discussion__information";
  contentInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  console.log(obj.createdAt);

  discussionContent.append(contentInformation);

  // answer의 유무
  const exsistAsnwer = document.createElement("p");
  if (obj.answer) {
    (exsistAsnwer.textContent = "☑")
  }
  else {
    (exsistAsnwer.textContent = "☒");
  }
  discussionAnswered.append(exsistAsnwer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const inputTitle = document.querySelector('div.form__input--title > input');
const inputName = document.querySelector('div.form__input--name > input');
const inputTextbox = document.querySelector('div.form__textbox > textarea');

form.addEventListener("submit", (event) => {
  event.preventDefault();
  //새로운 객체를 생성
  //input에 입력된 값을 넣은 새로운 객체
  //새로운 객체를 ul요소 아래로 넣어준다.
  //더미데이터 (아고라스테이츠디스커션스)에도 앞으로 추가
  const obj = {
    id: "unique id",
    createdAt: new Date(),
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: inputTextbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  }
  agoraStatesDiscussions.unshift(obj);
  const newdiscussion = convertToDiscussion(obj);
  ul.prepend(newdiscussion);
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