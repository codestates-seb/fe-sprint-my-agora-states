// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

let agoraStatesDiscussions = [];
const ul = document.querySelector("ul.discussions__container");

fetch("http://localhost:4000/discussions/")
  .then((res) => res.json())
  .then((json) => {
    agoraStatesDiscussions = json;

    console.log(ul);
    render(ul);
  });

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
  //  아래 코딩은 사진 넣는 코딩
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = obj.alt;
  avatarWrapper.append(avatarImg);
  // 내용 가져오고 하이퍼링크 걸어주기
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  // 날짜 및 작성자 이름 가져오기
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(discussionTitle, discussionInformation);
  // 체크박스 가져오기
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(checked);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

const render = (element) => {
  ul.innerHTML = ""; //
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul); //fetch 안에 넣었음

const form = document.querySelector("form.form");
const author = document.querySelector(".form__input--name > input");
const title = document.querySelector(".form__input--title > input");
const textbox = document.querySelector(".form__textbox > textarea");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // 새로고침 자동으로 막아줌 (기본기능)
  const newData = {
    id: Date.now(),
    createdAt: new Date(),
    title: title.value,
    url: undefined,
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  agoraStatesDiscussions.unshift(newData);

  render(ul);
});
