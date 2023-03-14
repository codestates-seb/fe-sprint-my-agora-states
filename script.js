// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
let nickname;
const loginBtn = document.querySelectorAll(".btn_lonin");
const profileBtn = document.querySelector("#btn_profile");
//로그인 모달
const loginForm = document.querySelector("#form_login");
const loginModal = document.querySelector("#modal_login");
const closeModalBtn_login = document.querySelector("#btn_modal_close");
const idInput = document.querySelector("#login_id");
const passwordInput = document.querySelector("#login_password");
const submitBtn_login = document.querySelector("#btn_login_submit");
//질문추가 모달창 조작
const modal = document.querySelector("#myModal");
const modalContent = document.querySelector(".modal-content");
const btnOpenModal = document.querySelector("#myBtn");
const btnCloseModal = document.querySelectorAll(".closeModal");
//비로그인 상태에서 질문추가 버튼 클릭시 모달창 내용
const question_nonLogin = document.querySelector("#content_question_nonLogin");
const nonLoginModal = document.querySelector("#modal_toLogin");
//질문추가요소
const form = document.querySelector("#form_question");
const questionTitle = document.querySelector("#title");
const questionContent = document.querySelector("#story");
const btnSubmit = document.querySelector("#btn_quesiton_submit");
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

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
//로그인 모달 컨트롤
loginBtn[0].onclick = function () {
  loginModal.classList.remove("hide");
};
loginBtn[1].onclick = function () {
  nonLoginModal.classList.add("hide");
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
  questionTitle.value = "";
  questionContent.value = "";
};
//질문추가 모달창 조절

btnOpenModal.onclick = function () {
  //로그인시와 비로그인시에 따라 모달창이 달라짐
  if (nickname) {
    btnSubmit.disabled = true;
    modal.classList.remove("hide");
    nonLoginModal.classList.add("hide");
    // modalContent.classList.add("toQuestion");
    // modalContent.classList.remove("toLogin");
  } else {
    modal.classList.add("hide");
    nonLoginModal.classList.remove("hide");
    // modalContent.classList.remove("toQuestion");
    // modalContent.classList.add("toLogin");
    // question_nonLogin.classList.remove("hide");
  }
};
btnCloseModal[0].onclick = function () {
  resetInput();
  nonLoginModal.classList.add("hide");
};
btnCloseModal[1].onclick = function () {
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
  if (questionTitle.value.length === 0 || questionContent.value.length === 0) {
    btnSubmit.disabled = true;
  } else {
    btnSubmit.disabled = false;
  }
};
questionTitle.onkeyup = btnState;
questionContent.onkeyup = btnState;
//새로운 discussion을 추가
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newDiscusstion = {
    createdAt: new Date(),
    title: questionTitle.value,
    author: nickname,
    bodyHTML: questionContent.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/87750478?s=64&v=4",
  };
  ul.prepend(convertToDiscussion(newDiscusstion));
  modal.classList.add("hide");
  resetInput();
});
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  nickname = idInput.value;
  profileBtn.classList.remove("hide");
  profileBtn.innerHTML = nickname;
  loginBtn[0].classList.add("hide");
  loginModal.classList.add("hide");
  idInput.value = "";
});
if (nickname) {
}
profileBtn.addEventListener("click", (event) => {});
