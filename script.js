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
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";

  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionInformation);

  const discussionAnswer = document.createElement("p");
  if (obj.answer !== null) {
    discussionAnswer.innerText = "☑";
  } else {
    discussionAnswer.innerText = "☒";
  }
  discussionAnswered.append(discussionAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//form에서 적은 내용 ul에 추가하기
const questionForm = document.querySelector("form");
const nameInput = document.querySelector(".form__input--name input");
const titleInput = document.querySelector(".form__input--title input");
const questionTextarea = document.querySelector(".form__textbox textarea");

//작성 시간 입력해주는 함수
function getClock() {
  const fulldate = new Date();
  const year = String(fulldate.getFullYear());
  const month = String(fulldate.getMonth() + 1).padStart(2, "0");
  const date = String(fulldate.getDate()).padStart(2, "0");
  const hours = String(fulldate.getHours()).padStart(2, "0");
  const minutes = String(fulldate.getMinutes()).padStart(2, "0");
  const seconds = String(fulldate.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}Z`;
}

//DOM으로 li의 내용들을 넣는 함수
const formToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src =
    "https://imagescdn.gettyimagesbank.com/171/201607/a10519973.jpg";
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";

  const discussionLink = document.createElement("a");
  discussionLink.href = "";
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj.name + " / " + obj.time;
  discussionContent.append(discussionInformation);

  const discussionAnswer = document.createElement("p");
  discussionAnswer.innerText = "☒";
  discussionAnswered.append(discussionAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//localStorage에 저장할 질문들을 담을 배열을 생성
let questionArray = [];

//localStorage에 저장하는 함수
function saveForm() {
  localStorage.setItem("question", JSON.stringify(questionArray));
}

//생성한 li를 ul에 넣고 localStorage에 작성자, 제목, 질문, 시간을 저장
function handleOnSubmit(event) {
  event.preventDefault();
  const newName = nameInput.value;
  const newTitle = titleInput.value;
  const newQuest = questionTextarea.value;
  const newTime = getClock();
  nameInput.value = "";
  titleInput.value = "";
  questionTextarea.value = "";
  const newQuestion = {
    name: newName,
    title: newTitle,
    question: newQuest,
    time: newTime,
  };
  questionArray.push(newQuestion);
  ul.prepend(formToDiscussion(newQuestion));
  saveForm();
}

questionForm.addEventListener("submit", handleOnSubmit);

const savedQuestions = localStorage.getItem("question");

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  if (savedQuestions !== null) {
    const parsedQuestions = JSON.parse(savedQuestions);
    questionArray = parsedQuestions;
    for (let i = 0; i < questionArray.length; i += 1) {
      element.prepend(formToDiscussion(questionArray[i]));
    }
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열과 localStorage의 questionArray 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
