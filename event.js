const discussionAnswerButtons = document.querySelectorAll(".discussion__answer__button");
const discussionAnswerContents = document.querySelectorAll(".discussion__answer__content");

discussionAnswerButtons.forEach((button, i) =>
  button.addEventListener("click", function () {
    if (discussionAnswerContents[i].classList[1] === "show") {
      discussionAnswerContents[i].classList.remove("show");
    } else {
      discussionAnswerContents[i].classList.add("show");
    }
  })
);
