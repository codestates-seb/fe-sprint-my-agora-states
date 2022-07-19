// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  //
  const avatarImg = document.createElement("img");
  avatarImg.classList.add("discussion__avatar--image");
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);
  //
  const contentTitle = document.createElement("a");
  contentTitle.classList.add("discussion__title");
  contentTitle.href = obj.url;
  contentTitle.textContent = obj.title;

  const questionDate = document.createElement("div");
  questionDate.classList.add("discussion__information");
  questionDate.textContent =
    "작성자 : " + obj.author + " / " + "작성시간 : " + obj.createdAt;

  discussionContent.append(contentTitle, questionDate);
  const resultAnswered = document.createElement("div");
  const resultAnsweredTrue = document.querySelector(".resultTrue");
  const resultAnsweredFalse = document.querySelector(".resultFalse");
  if (obj.answer == null) {
    resultAnsweredTrue.classList.remove("hidden");
    resultAnsweredFalse.classList.add("hidden");
    resultAnswered.innerText = resultAnsweredFalse.innerHTML;
  } else {
    resultAnsweredTrue.classList.add("hidden");
    resultAnsweredFalse.classList.remove("hidden");
    resultAnswered.innerText = resultAnsweredTrue.innerHTML;
  }

  discussionAnswered.append(resultAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

const formSubmit = document.querySelector(".form");

function submitFunction(event) {
  // console.log(111, agoraStatesDiscussions.length, agoraStatesDiscussions);

  const inputFormName = document.querySelector(".formName").value;
  const inputFormTitle = document.querySelector(".formTitle").value;
  const inputFormQuestions = document.querySelector(".formQuestions").value;
  let now = new Date();
  let nowYear = now.getFullYear(); // 년
  let nowMonth = now.getMonth() + 1; // 월
  let nowDate = now.getDate(); // 월
  let nowHour = now.getHours(); // 시간
  let nowMinutes = ("0" + now.getMinutes()).slice(-2); // 분

  const newData = {
    id: "id",
    createdAt:
      nowYear +
      " - " +
      nowMonth +
      " - " +
      nowDate +
      " " +
      nowHour +
      " : " +
      nowMinutes,
    title: inputFormTitle,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputFormName,
    answer: null,
    bodyHTML: inputFormQuestions,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  let original = localStorage.getItem("newArray");
  let newArray = [newData];
  console.log(1111, original);
  if (original) {
    original = JSON.parse(original);
    newArray = [newData, ...original];
  }
  localStorage.setItem("newArray", JSON.stringify(newArray));
  console.log(3333, newArray);
  ul.prepend(convertToDiscussion(newArray));

  //추가 기능넣기

  return;
}
formSubmit.addEventListener("submit", submitFunction);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  let storageArray = JSON.parse(localStorage.getItem("newArray"));
  let newAgoraDiscussions = agoraStatesDiscussions;
  if (storageArray && storageArray.length > 0) {
    newAgoraDiscussions = [...storageArray, ...newAgoraDiscussions];
  }

  for (let i = 0; i < newAgoraDiscussions.length; i += 1) {
    element.append(convertToDiscussion(newAgoraDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
