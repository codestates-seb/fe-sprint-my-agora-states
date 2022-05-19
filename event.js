const discussionAnswerButton = document.querySelector(".discussion__answer__button");
const discussionAnswerContent = document.querySelector(".discussion__answer__content");

discussionAnswerButton.addEventListener("click", function () {
  if (discussionAnswerContent.classList[1] === "show") {
    discussionAnswerContent.classList.remove("show");
  } else {
    discussionAnswerContent.classList.add("show");
  }
});
