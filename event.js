let discussionAnswerButtons = document.querySelectorAll(".discussion__answer__button");
let discussionAnswerContents = document.querySelectorAll(".discussion__answer__content");

discussionAnswerButtons.forEach((button, i) =>
  button.addEventListener("click", function () {
    if (discussionAnswerContents[i].classList[1] === "show") {
      discussionAnswerContents[i].classList.remove("show");
    } else {
      discussionAnswerContents[i].classList.add("show");
    }
  })
);

const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const form = document.querySelector(".form");
const submitButton = document.querySelector(".submit-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function inputValue(e) {
  if (e.target.type === "submit") {
    agoraStatesDiscussions.push({
      createdAt: new Date().toISOString(),
      title: inputTitle.value,
      author: inputName.value,
      answer: null,
      bodyHTML: inputStory.value,
      avatarUrl: "https://avatars.githubusercontent.com/u/76990149?v=4",
    });
    ul.prepend(convertToDiscussion(agoraStatesDiscussions[agoraStatesDiscussions.length - 1]));
    console.log(agoraStatesDiscussions);
  }
  inputTitle.value = "";
  inputName.value = "";
  inputStory.value = "";
}

submitButton.addEventListener("click", inputValue);
