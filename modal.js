const body = document.querySelector("body");
const formContainer = document.querySelector(".form__container");
const formInput = document.querySelector(".form__input--wrapper");
const formInputName = formInput.querySelector(".form__input--name");
const formInputTitle = formInput.querySelector(".form__input--title");
const formInputTextbox = formInput.querySelector(".form__textbox");
const formBtn = document.querySelector(".form__submit").querySelector("input");

//모달 관련 버튼
const createBtn = document.querySelector(".create-input");
const closeModal = document.querySelector(".close-btn");
async function modal() {}
//제출 버튼 클릭시 실행

formBtn.onclick = async function (event) {
  //새로고침 방지

  event.preventDefault();
  let inputName = formInputName.querySelector("#name").value;
  let inputTitle = formInputTitle.querySelector("#name").value;
  let inputTextbox = formInputTextbox.querySelector("#story").value;
  //깃허브 이미지 불러오기
  let formImg = await fetch("https://api.github.com/users/yunhwan98")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  const obj = {
    author: inputName,
    title: inputTitle,
    avatarUrl: formImg.avatar_url,
    createdAt: Date(),
  };
  //필요한 요소가 존재한다면 글 create
  if (inputName && inputTitle && inputTextbox) {
    await createDiscussions(obj).then((res) => {
      agoraData = [...res];
      setPage(Math.ceil(agoraData.length / 10), 1);
      //모달을 닫고 초기화
    });

    formContainer.classList.add("hide");
    body.style.overflow = "auto";
    formInputName.querySelector("#name").value = "";
    formInputTitle.querySelector("#name").value = "";
    formInputTextbox.querySelector("#story").value = "";
  }
};

createBtn.onclick = function () {
  formContainer.classList.remove("hide");
  body.style.overflow = "hidden";
};

closeModal.onclick = function () {
  formContainer.classList.add("hide");
  body.style.overflow = "auto";
};
