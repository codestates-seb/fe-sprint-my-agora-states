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

  //
  if (inputName && inputTitle && inputTextbox) {
    //console.log(inputName, inputTitle, inputTextbox);
    //글을 맨앞으로 추가
    agoraData.unshift(obj);
    saveData();
    //console.log(agoraData);
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
  //console.log(formContainer);
  formContainer.classList.remove("hide");
  body.style.overflow = "hidden";
};

closeModal.onclick = function () {
  //console.log(formContainer);
  formContainer.classList.add("hide");
  body.style.overflow = "auto";
};

//데이터를 로컬에 저장
function saveData() {
  const stringifyData = JSON.stringify(agoraData);
  window.localStorage.setItem("agoraData", stringifyData);
}
