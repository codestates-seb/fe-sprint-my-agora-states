// 질문 배열
const discussionsArray = [];
// 로컬스토리지 연동
let localData = JSON.parse(localStorage.getItem("discussionsDB"));
if (localData !== null) {
  discussionsArray.push(...localData);
} else {
  localStorage.setItem("discussionsDB", JSON.stringify(agoraStatesDiscussions));
  discussionsArray.push(...agoraStatesDiscussions);
}
// 페이지 네이션
let currentPage = 1;
let totalPage = Math.ceil(discussionsArray.length / 10);

// 시간 변환 함수
const timeConvert = function (time) {
  return new Date(time).toLocaleString();
};

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

// modal
// const modal = document.querySelector(".modal");
// const modalBackground = document.querySelector(".modal__background");
// modalBackground.addEventListener("click", () => {
//   modal.classList.add("hidden");
// });

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
  discussionContent.append(discussionTitle, discussionInformation);

  // create discussionContent anchor
  const discussionAnchor = document.createElement("a");
  discussionAnchor.href = obj.url;
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
  if (obj.answer === null) {
    discussionAnswerBtn.src = "./edit_icon.png";
  } else {
    discussionAnswerBtn.src = "./check_icon.png";
  }
  discussionAnswerBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    // 밸류를 채워넣은 모달을 순간적으로 생성해서 해당요소를 통해 discussionsArray 수정
    // 답변 등록
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
const ul = document.querySelector("ul.discussions__container");
render(ul);

const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const submitBtn = document.querySelector("#submitBtn");
const deleteBtn = document.querySelector(".discussion__deleteBtn");

// 공백체크 함수
const blankCheck = function () {
  if (
    inputName.value === "" ||
    inputTitle.value === "" ||
    inputStory.value === ""
  ) {
    return true;
  } else {
    return false;
  }
};

// 폼 초기화 함수
const formReset = function () {
  inputName.value = "";
  inputTitle.value = "";
  inputStory.value = "";
};

// 질문 객체 생성
const createQuestion = function () {
  const newObj = {
    id: new Date(),
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    url: "",
    author: inputName.value,
    answer: null,
    bodyHTML: `<p dir="auto">${inputStory.value}</p>`,
    avatarUrl:
      "https://i.pinimg.com/736x/e2/b7/da/e2b7da6bc749ba2d7ebdfda28fac6009.jpg",
  };
  return newObj;
};

//폼전송 이벤트
submitBtn.addEventListener("click", () => {
  const isBlank = blankCheck();
  if (!isBlank) {
    discussionsArray.unshift(createQuestion());
    formReset();
    localStorage.setItem("discussionsDB", JSON.stringify(discussionsArray));

    currentPage = 1;
    totalPage = Math.ceil(discussionsArray.length / 10);
    render(ul);
  }
});

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
