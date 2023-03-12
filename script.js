// 요소 노드 취득
const ul = document.querySelector("ul.discussions__container");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const submitBtn = document.querySelector("#submitBtn");
const deleteBtn = document.querySelector(".discussion__deleteBtn");
const nav = document.querySelector("#nav");
const feedsContents = document.querySelector(".feeds__contents");
const feedDetail = document.querySelector(".feedDetail");
const feedDetailPreviousBtn = document.querySelector(
  ".feedDetail__previousBtn"
);
const userImg = document.querySelector(".userImg");
const userName = document.querySelector(".userName");
const uploadDate = document.querySelector(".uploadDate");
const formHeaderText = document.querySelector(".form__header_text");
const feedDetailBellBtn = document.querySelector(".feedDetail__bellBtn");
const feedDetailQuestion = document.querySelector(".question__content");
const questionTitle = document.querySelector(".question__title");
const formInputnameTitle = document.querySelector(".form__input--nameTitle");
const formInputTitle = document.querySelector(".form__input--title");
const formStoryTitle = document.querySelector(".form__story--title");
// 변수
const discussionsArray = [];
let isDetailPage = false;
let discussionId = "";
let currentPage = 1;

// 시간 변환 함수
const timeConvert = function (time) {
  return new Date(time).toLocaleString();
};

// 공백체크 함수
const blankCheck = function () {
  if (isDetailPage) {
    return inputName.value === "" || inputStory.value === "";
  } else {
    return (
      inputName.value === "" ||
      inputTitle.value === "" ||
      inputStory.value === ""
    );
  }
};

// 답변obj 생성
const createAnswer = () => {
  const newAnswer = {
    id: new Date(),
    createdAt: new Date().toLocaleString(),
    url: "",
    author: inputName.value,
    bodyHTML: `<p dir="auto">${inputStory.value}</p>`,
    avatarUrl:
      "https://i.pinimg.com/736x/e2/b7/da/e2b7da6bc749ba2d7ebdfda28fac6009.jpg",
  };
  return newAnswer;
};

// 로컬스토리지 연동
let localData = JSON.parse(localStorage.getItem("discussionsDB"));
if (localData !== null) {
  discussionsArray.push(...localData);
} else {
  agoraStatesDiscussions.forEach((discussion) => {
    const copyObj = { ...discussion };
    copyObj.answer = copyObj.answer === null ? [] : [copyObj.answer];
    discussionsArray.push(copyObj);
  });
  localStorage.setItem("discussionsDB", JSON.stringify(discussionsArray));
}

let totalPage = Math.ceil(discussionsArray.length / 10);

// 디테일 페이지 ----------------------------------------------------

const feedDetailAnswer = document.querySelector(".feedDetail__answer");

// 사이드 폼 변환
const converToForm = () => {};
//디테일 렌더 함수
const convertToDetail = (obj) => {
  //초기화
  while (feedDetailAnswer.firstChild) {
    feedDetailAnswer.removeChild(feedDetailAnswer.firstChild);
  }
  while (feedDetailAnswer.firstChild) {
    feedDetailAnswer.removeChild(feedDetailAnswer.firstChild);
  }
  //적용
  userImg.src = obj.avatarUrl;
  userImg.alt = "avatar of " + obj.author;
  userName.innerText = obj.author;
  uploadDate.innerText = timeConvert(obj.createdAt);
  questionTitle.innerText = obj.title;
  feedDetailQuestion.innerHTML = obj.bodyHTML;
  // 답변 처리
  if (0 < obj.answer.length) {
    obj.answer.forEach((element) => {
      const li = document.createElement("li");
      li.className = "feedDetail__answer--container";
      const answerTitleWrapper = document.createElement("div");
      answerTitleWrapper.className = "answer__title--wrapper";
      const h6 = document.createElement("h6");
      h6.innerText = "A.";
      const answerTitle = document.createElement("h6");
      answerTitle.className = "answer__title";
      answerTitle.innerText = `${element.author}님의 답변입니다.`;
      const answerContent = document.createElement("answer__content");
      answerTitleWrapper.append(h6, answerTitle);
      answerContent.className = "answer__content";
      answerContent.innerHTML = element.bodyHTML;

      li.append(answerTitleWrapper, answerContent);
      feedDetailAnswer.appendChild(li);
    });
  }
};

// 폼 초기화 함수
const formReset = function () {
  inputName.value = "";
  inputStory.value = "";
  inputTitle.value = "";
};
//폼전송 이벤트
submitBtn.addEventListener("click", () => {
  const isBlank = blankCheck();
  if (!isBlank && !isDetailPage) {
    discussionsArray.unshift(createQuestion());
    formReset();
    localStorage.setItem("discussionsDB", JSON.stringify(discussionsArray));

    currentPage = 1;
    totalPage = Math.ceil(discussionsArray.length / 10);
    render(ul);
  } else if (!isBlank && isDetailPage) {
    const findIndex = discussionsArray.findIndex((x) => x.id === discussionId);
    discussionsArray[findIndex].answer.push(createAnswer());
    convertToDetail(discussionsArray[findIndex]);
    formReset();
    localStorage.setItem("discussionsDB", JSON.stringify(discussionsArray));
  }
});

//디테일 페이지 이동
const enterDetailPage = (obj) => {
  formHeaderText.innerHTML = "답변하기";
  formInputnameTitle.innerText = "ANSWERER";
  formStoryTitle.innerText = "ANSWER CONTENT";
  discussionId = obj.id;
  formReset();
  isDetailPage = true;
  nav.classList.add("hidden");
  formInputTitle.classList.add("hidden");
  feedsContents.classList.add("hidden");
  feedDetail.classList.remove("hidden");
  inputStory.style.height = "200px";
  convertToDetail(obj);
};
// 이전 페이지 이동
feedDetailPreviousBtn.addEventListener("click", () => {
  inputStory.style.height = "100px";
  formHeaderText.innerHTML = "질문하기";
  formInputnameTitle.innerText = "QUESTIONER";
  formStoryTitle.innerText = "QUESTION CONTENT";
  discussionId = "";
  formReset();
  isDetailPage = false;
  formInputTitle.classList.remove("hidden");
  nav.classList.remove("hidden");
  feedsContents.classList.remove("hidden");
  feedDetail.classList.add("hidden");
});
// 알림 버튼
feedDetailBellBtn.addEventListener("click", () => {
  alert("띠링띠링");
});

// 요소 삭제 함수
const deleteDiscussion = function (id) {
  const ok = confirm("질문을 삭제하시겠습니까?");
  if (ok) {
    const deleteIndex = discussionsArray.findIndex((obj) => obj.id === id);
    discussionsArray.splice(deleteIndex, 1);
    localStorage.setItem("discussionsDB", JSON.stringify(discussionsArray));
    currentPage = 1;
    totalPage = Math.ceil(discussionsArray.length / 10);
    render(ul);
  }
};

const navBtns = document.querySelector("ul.nav__btns");

// 네비게이션 객체 DOM 변환함수
const convertToNav = (index) => {
  const li = document.createElement("li");
  navBtns.appendChild(li);
  const navPageBtn = document.createElement("button");
  navPageBtn.innerText = index;
  if (currentPage === index) {
    navPageBtn.className = "nav__pageBtn active";
  } else {
    navPageBtn.className = "nav__pageBtn";
  }
  navPageBtn.addEventListener("click", () => {
    currentPage = index;
    render(ul);
  });
  li.appendChild(navPageBtn);
};

// 질문 객체 DOM 변환함수
const convertToDiscussion = (obj) => {
  // create li
  const li = document.createElement("li");
  li.className = "discussion__container";

  // create avatar
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // create discussionContent
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.innerText = `${obj.author} / ${timeConvert(
    obj.createdAt
  )}`;
  discussionContent.addEventListener("click", () => {
    enterDetailPage(obj);
  });

  discussionContent.append(discussionTitle, discussionInformation);

  // create discussionContent anchor
  const discussionAnchor = document.createElement("a");
  discussionAnchor.innerText = obj.title;
  discussionTitle.appendChild(discussionAnchor);

  // create discussionAnswered
  const discussionBtnWrapper = document.createElement("div");
  discussionBtnWrapper.className = "discussion__btn--wrapper";
  const discussionDeleteBtn = document.createElement("img");
  discussionDeleteBtn.className = "discussion__deleteBtn";
  discussionDeleteBtn.src = "./delete_icon.png";
  discussionDeleteBtn.addEventListener("click", () => {
    deleteDiscussion(obj.id);
  });
  const discussionAnswerBtn = document.createElement("img");
  discussionAnswerBtn.className = "discussion__answerBtn";
  if (0 < obj.answer.length) {
    discussionAnswerBtn.src = "./check_icon.png";
  } else {
    discussionAnswerBtn.src = "./edit_icon.png";
  }
  discussionAnswerBtn.addEventListener("click", () => {
    enterDetailPage(obj);
  });
  discussionBtnWrapper.append(discussionDeleteBtn, discussionAnswerBtn);

  li.append(avatarWrapper, discussionContent, discussionBtnWrapper);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 새롭게 렌더링하기 위해 요소의 자식 모두 삭제
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  // 페이지 네이션
  let startDiscussion = (currentPage - 1) * 10; //40
  let endDiscussion = (currentPage - 1) * 10 + 10; // 50
  if (discussionsArray.length <= endDiscussion) {
    endDiscussion = discussionsArray.length;
  }
  for (let i = startDiscussion; i < endDiscussion; i += 1) {
    element.append(convertToDiscussion(discussionsArray[i]));
  }

  while (navBtns.firstChild) {
    navBtns.removeChild(navBtns.firstChild);
  }
  for (let i = 1; i < totalPage + 1; i += 1) {
    convertToNav(i);
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);

// 질문 객체 생성
const createQuestion = function () {
  const newObj = {
    id: new Date(),
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    url: "",
    author: inputName.value,
    answer: [],
    // textarea 변환 공부
    bodyHTML: `<p dir="auto">${inputStory.value}</p>`,
    avatarUrl:
      "https://i.pinimg.com/736x/e2/b7/da/e2b7da6bc749ba2d7ebdfda28fac6009.jpg",
  };
  return newObj;
};

//페이지네이션
const navButtons = document.querySelectorAll(".nav__pageBtn");
const nextButton = document.querySelector(".nav__nextPage");
const previousButton = document.querySelector(".nav__previousPage");

navButtons.forEach((element) => {
  element.addEventListener("click", () => {
    currentPage = +element.innerText;
    render(ul);
  });
});

nextButton.addEventListener("click", () => {
  currentPage++;
  if (totalPage <= currentPage) {
    currentPage = totalPage;
  }
  render(ul);
});
previousButton.addEventListener("click", () => {
  currentPage--;
  if (currentPage <= 1) {
    currentPage = 1;
  }
  render(ul);
});
