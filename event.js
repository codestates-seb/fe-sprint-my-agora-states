let discussionAnswerButtons = document.querySelectorAll(".discussion__answer__button");
let discussionAnswerContents = document.querySelectorAll(".discussion__answer__content");

// 버튼에 맞는 게시글 보이게 하기
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

// 기본 동작 이벤트 막기
form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputTitle.value = "";
  inputName.value = "";
  inputStory.value = "";
});

// name 입력창에 커서 가도록 하기
inputName.focus();

// submit 버튼 누르면 정보가 객체 안에 저장되고 화면에 렌더되게 하는 함수
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
}

submitButton.addEventListener("click", inputValue); // { a: 'b' }
