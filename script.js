// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
let nickname;
//로그인 모달
const loginBtn = document.querySelector("#btn_lonin");
const loginModal = document.querySelector("#modal_login");
const closeModalBtn_login = document.querySelector("#btn_modal_close");
const idInput = document.querySelector("#login_id");
const passwordInput = document.querySelector("#login_password")
const submitBtn_login = document.querySelector("#btn_login_submit")
//모달창
const modal = document.querySelector("#myModal");
const btnOpenModal = document.querySelector("#myBtn");
const btnCloseModal = document.querySelector("#closeModal");
//질문추가요소
const inputName = document.querySelector("#name");
const questionTitle = document.querySelector("#title");
const questionContent = document.querySelector("#story");
const btnSubmit = document.querySelector("#submit");
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const form = document.querySelector(".form");

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const content = document.createElement("div");
  content.classList.add("question_content");
  const questionData = document.createElement("div");
  questionData.classList.add("question_userinfo");
  //userinfo
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  //answer
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // questionData.append(avatarWrapper, discussionAnswered);

  //작성자 아바타를 추가
  const imgElement = document.createElement("img");
  questionData.append(imgElement);
  imgElement.className = "discussion__avatar--image";
  imgElement.src = `${obj.avatarUrl}`;
  const username = document.createElement("span");
  questionData.append(username);
  username.textContent = `${obj.author}`;

  //질문의 제목을 추가
  const questionTitle = document.createElement("h3");
  questionTitle.className = "discussion__title";
  content.append(questionTitle);
  // const questionContent = document.createElement("p")
  // discussionContent.append(questionContent)
  // questionContent.textContent = `${obj.bodyHTML.slice(0,30)}`
  const questionLink = document.createElement("a");
  questionTitle.append(questionLink);
  questionLink.textContent = `${obj.title}`;
  questionLink.href = `${obj.url}`;

  //질문 작성일을 추가
  const author = document.createElement("div");
  content.append(author);
  const time = new Date(obj.createdAt).toLocaleString().slice(2);
  author.textContent = `${time}`;

  //답변의 유무를 작성
  const answer = document.createElement("p");
  if (obj.answer) {
    answer.textContent = "✅";
  } else {
    answer.textContent = "❎";
  }
  questionData.append(answer);

  li.append(content, questionData);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

render(ul);
//
loginBtn.onclick = function () {
  loginModal.classList.remove("hide");
};
closeModalBtn_login.onclick = function () {
  loginModal.classList.add("hide");
};
window.onclick = function (event) {
  if (event.target === loginModal) {
    loginModal.classList.add("hide");
  }
};

const resetInput = () => {
  inputName.value = "";
  questionTitle.value = "";
  questionContent.value = "";
};
//모달창 조절
btnOpenModal.onclick = function () {
  modal.classList.remove("hide");
};
btnCloseModal.onclick = function () {
  resetInput();
  modal.classList.add("hide");
};
window.onclick = function (event) {
  if (event.target === modal) {
    resetInput();
    modal.classList.add("hide");
  }
};
//버튼 활성화 상태 조절
const btnState = () => {
  if (
    inputName.value.length === 0 ||
    questionTitle.value.length === 0 ||
    questionContent.value.length === 0
  ) {
    btnSubmit.disabled = true;
  } else {
    btnSubmit.disabled = false;
  }
};
inputName.onkeyup = btnState;
questionTitle.onkeyup = btnState;
questionContent.onkeyup = btnState;
//새로운 discussion을 추가
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newDiscusstion = {
    createdAt: new Date(),
    title: questionTitle.value,
    author: inputName.value,
    bodyHTML: questionContent.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/87750478?s=64&v=4",
  };
  ul.prepend(convertToDiscussion(newDiscusstion));
  modal.classList.add("hide");
  resetInput();
});
submitBtn_login.addEventListener(
  ("submit",
  (event) => {
    event.preventDefault();
    nickname = idInput.value;
    loginModal.classList.add("hide");
    idInput.value = ""
  })
);
