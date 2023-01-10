const formInput = document.querySelector(".form__input--wrapper");
const formInputName = formInput.querySelector(".form__input--name");
const formInputTitle = formInput.querySelector(".form__input--title");
const formInputTextbox = formInput.querySelector(".form__textbox");
const formBtn = document.querySelector(".form__submit").querySelector("input");
let formImg;

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
  const inputName = formInputName.querySelector("#name").value;
  const inputTitle = formInputTitle.querySelector("#name").value;
  const inputTextbox = formInputTextbox.querySelector("#story").value;
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
    ul.prepend(convertToDiscussion(obj));
  }
};
