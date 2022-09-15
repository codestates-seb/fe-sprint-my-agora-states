const questionContainer = document.querySelector(".form__container");
const questionFormBtn = document.querySelector(".form__button");

function questionFormToggle() {
  questionContainer.classList.toggle("hide");
}

questionFormBtn.addEventListener("click", questionFormToggle);
