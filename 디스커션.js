// 1차
const inputForm = document.querySelector("form")
const inputNameTitle = document.querySelectorAll("#name");
const inputStory = document.querySelector("story");
function onStorySubmit(event) {
  event.preventDefault();
  obj.author = inputNameTitle.valus;
  obj.title = inputNameTitle[1];
  obj.bodyHTML = inputStory;
}
inputForm.addEventListener('submit', onStorySubmit);


// 2차 ㅋ
const submitName = document.querySelector(".form__input--name input");
const submitTitle = document.querySelector(".form__input--title input");
const submitStory = document.querySelector(".form__textbox textarea");
const submitBtn = document.querySelector("form .form__submit");

function onSubmit(e) {
  e.preventDefault();
  obj.author = submitName.value;
  obj.title = submitTitle.value;
  // obj. submitStory.value;
}

submitBtn.addEventListener("submit", onSubmit);

