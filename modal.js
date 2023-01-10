const body = document.querySelector("body");
const formContainer = document.querySelector(".form__container");
const formInput = document.querySelector(".form__input--wrapper");
const formInputName = formInput.querySelector(".form__input--name");
const formInputTitle = formInput.querySelector(".form__input--title");
const formInputTextbox = formInput.querySelector(".form__textbox");
const formBtn = document.querySelector(".form__submit").querySelector("input");
let formImg;

//모달 관련 버튼
const createBtn = document.querySelector(".create-input");
const closeModal = document.querySelector(".close-btn");

//깃허브 이미지 불러오기
fetch("https://api.github.com/users/yunhwan98")
  .then((response) => response.json())
  .then((data) => {
    formImg = data;
    console.log(data);
  });

//제출 버튼 클릭시 실행
formBtn.onclick = function (event) {
  //새로고침 방지
  event.preventDefault();
  let inputName = formInputName.querySelector("#name").value;
  let inputTitle = formInputTitle.querySelector("#name").value;
  let inputTextbox = formInputTextbox.querySelector("#story").value;
  const obj = {
    author: inputName,
    title: inputTitle,
    avatarUrl: formImg.avatar_url,
    createdAt: Date(),
  };
  //
  if (inputName && inputTitle && inputTextbox) {
    //console.log(inputName, inputTitle, inputTextbox);
    //글을 맨앞으로 추가
    agoraStatesDiscussions.unshift(obj);
    setPage(totalPage, currentPage);
    //ul.prepend(convertToDiscussion(obj));
    //모달을 닫고 초기화
    formContainer.classList.add("hide");
    body.style.overflow = "auto";
    formInputName.querySelector("#name").value = "";
    formInputTitle.querySelector("#name").value = "";
    formInputTextbox.querySelector("#story").value = "";
  }
};

createBtn.onclick = function () {
  console.log(formContainer);
  formContainer.classList.remove("hide");
  body.style.overflow = "hidden";
};

closeModal.onclick = function () {
  console.log(formContainer);
  formContainer.classList.add("hide");
  body.style.overflow = "auto";
};
