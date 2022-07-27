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

// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// render(ul);

const submit = document.querySelector(".form__submit");
const inputTitle = document.querySelector("#inputTitle");
const inputName = document.querySelector("#inputName");
const inputTextbox = document.querySelector("#inputQuestion");

let arr = []; // 왜 해줬을까...
submit.addEventListener("submit", function (e) {
  const obj = {
    id: "",
    createdAt: Date(),
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    bodyHTML: inputTextbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(obj); // 더미데이터 맨 처음에 obj 추가해주기
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0])); // obj 형식 변경해줘서 uld에 적용하기

  e.preventDefault(); // submit 클릭하면 자동으로 새로고침한다. 새로고침 방지
  inputName.value = ""; // 작성값 초기화
  inputTitle.value = "";
  inputQuestion = "";

  // 로컬스토리지 저장 후 가져오기
  // 로컬스토리지는 문자형만 지원, 다른 자료형을 저장하려고 하면 문자형으로 변환한다.
  // JSON 형태로 데이터를 읽고 쓰기
  localStorage.setItem("newObj", JSON.stringify(obj));
  let localStorageObject = JSON.parse(localStorage.getItem("newObj"));
  agoraStatesDiscussions.unshift(localStorageObject);
});

// 페이지 네이션
const ul = document.querySelector("ul.discussions__container");
const paginatonoContent = document.querySelector(".paginationContent");

function displayContent(page) {
  ul.innerHTML = ""; // 왜 하는걸까...
  const agoraData = agoraStatesDiscussions.slice(10 * page, 10 * page + 10);
  for (let i = 0; i < agoraData.length; i++) {
    ul.append(convertToDiscussion(agoraData[i]));
  }
  return;
}

function paginationBtn() {
  displayContent(0);

  const pageCount = Math.ceil(agoraStatesDiscussions.length / 10);
  for (let i = 1; i < pageCount; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = "pageBtn";
    pageBtn.textcount = i;
    paginatonoContent.appendChild(pageBtn);

    pageBtn.addEventListener("click", () => {
      displayContent(i - 1);
    });
  }
  return;
}
paginationBtn();

let localStorageObject = JSON.parse(localStorage.getItem("newObj"));
ul.prepend(convertToDiscussion(localStorageObject));

localStorage.clear();
