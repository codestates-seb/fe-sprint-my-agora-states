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
  // image
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = obj.author;
  avatarWrapper.append(avatarImg);
  // title & link
  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);

  const contentLink = document.createElement("a");
  contentLink.textContent = obj.title;
  contentLink.href = obj.url;
  contentTitle.appendChild(contentLink);

  // information

  const contentInfo = document.createElement("div");
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(contentInfo);

  // answered

  const answered = document.createElement("div");
  answered.className = "discussion__answered";
  discussionAnswered.append(answered);

  const answeredP = document.createElement("p");
  if (obj.answer !== null) {
    answeredP.textContent = "☑";
  } else answeredP.textContent = "☒";
  answered.appendChild(answeredP);

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

const form = document.getElementsByClassName("form");
// const form = document.querySelector('form.form)
const inputTitle = document.querySelector("div.form__input--title > input");
const inputName = document.querySelector("div.form__input--name > input");
const inputTextbox = document.querySelector("div.form__textbox > textarea");

form[0].addEventListener("submit", function (e) {
  // 새로운 객체를 만들어야 한다.
  // Input에 입력된 값을 얺은 새로운 객체
  // 새로운 객체를 ul요소 아래로 넣어준다.
  // 더미 데이터 (agroaStatesDiscussions)에도 추가해준다.
  const obj = {
    id: "unique id",
    createdAt: new Date().toLocaleString,
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    bodyHTML: inputTextbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);
  e.preventDefault();
  localStorage.setItem(
    "agoraStatesDiscussions",
    JSON.stringify(agoraStatesDiscussions)
  );
  let localStorageObject = localStorage.getItem(agoraStatesDiscussions);
});

// // 버튼 & 페이지네이션

// const buttons = document.querySelector(".buttons");

// const numOfContent = 50;
// const maxContent = 10;
// const maxButton = 5;
// const maxPage = Math.ceil(numOfContent / maxContent);
// let page = 1;

// const makeButton = (id) => {
//   const button = document.createElement("button");
//   button.classList.add("button");
//   button.dataset.num = id;
//   button.innerText = id;
//   button.addEventListener("click", (e) => {
//     Array.prototype.forEach.call(buttons.children, (button) => {
//       if (button.dataset.num) button.classList.remove("active");
//     });
//     e.target.classList.add("active");
//     renderContent(parseInt(e.target.dataset.num));
//   });
//   return button;
// };

// const renderContent = (page) => {
//   // 목록 리스트 초기화
//   while (ul.hasChildNodes()) {
//     ul.removeChild(ul.lastChild);
//   }
//   // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
//   for (
//     let id = (page - 1) * maxContent + 1;
//     id <= page * maxContent && id <= numOfContent;
//     id++
//   ) {
//     ul.appendChild(makeContent(id));
//   }
// };

// const renderButton = (page) => {
//   // 버튼 리스트 초기화
//   while (buttons.hasChildNodes()) {
//     buttons.removeChild(buttons.lastChild);
//   }
//   // 화면에 최대 5개의 페이지 버튼 생성
//   for (let id = page; id < page + maxButton && id <= maxPage; id++) {
//     buttons.appendChild(makeButton(id));
//   }
//   // 첫 버튼 활성화(class="active")
//   buttons.children[0].classList.add("active");

//   buttons.prepend(prev);
//   buttons.append(next);

//   // 이전, 다음 페이지 버튼이 필요한지 체크
//   if (page - maxButton < 1) buttons.removeChild(prev);
//   if (page + maxButton > maxPage) buttons.removeChild(next);
// };

// const renderPage = (page) => {
//   renderContent(page);
//   renderButton(page);
// };
// renderPage(page);

// const goPrevPage = () => {
//   page -= maxButton;
//   renderPage(page);
// };

// const goNextPage = () => {
//   page += maxButton;
//   renderPage(page);
// };

// const prev = document.createElement("button");
// prev.classList.add("button", "prev");
// prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
// prev.addEventListener("click", goPrevPage);

// const next = document.createElement("button");
// next.classList.add("button", "next");
// next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
// next.addEventListener("click", goNextPage);
