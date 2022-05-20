let discussionAnswerButtons = document.querySelectorAll(".discussion__answer__button");
let discussionAnswerContents = document.querySelectorAll(".discussion__answer__content");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const form = document.querySelector(".form");
const submitButton = document.querySelector(".submit-button");

const titleFixedBar = document.querySelector(".main-title");

// 버튼에 맞는 게시글 보이게 하기
discussionAnswerButtons.forEach((button, i) =>
  button.addEventListener("click", function () {
    if (discussionAnswerContents[i].classList[1] === "show") {
      discussionAnswerContents[i].classList.remove("show");
      discussionAnswerButtons[i].textContent = "자세히 보기";
    } else {
      discussionAnswerContents[i].classList.add("show");
      discussionAnswerButtons[i].textContent = "닫기";
    }
  })
);

// 기본 동작 이벤트 막기
form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputTitle.value = "";
  inputName.value = "";
  inputStory.value = "";
});

// name 입력창에 커서 가도록 하기

// submit 버튼 누르면 정보가 객체 안에 저장되고 화면에 렌더되게 하는 함수
function inputValue(e) {
  if (inputTitle.value === "") {
    return;
  }
  if (inputName.value === "") {
    return;
  }
  if (inputStory.value === "") {
    return;
  } else if (e.target.type === "submit") {
    addDiscussion({
      createdAt: new Date().toISOString(),
      title: inputTitle.value,
      author: inputName.value,
      answer: null,
      bodyHTML: inputStory.value,
      avatarUrl: "https://avatars.githubusercontent.com/u/76990149?v=4",
    });

    const focus = true; // 제출 후, 인풋폼에 포커싱
    const pageNo = 1; // 추가된 디스커션을 보기위해 첫 페이지로 이동
    window.location.href = `${window.location.origin}${window.location.pathname}?pageNo=${pageNo}&focus=${focus}`;
  }
}

submitButton.addEventListener("click", inputValue);

window.addEventListener("scroll", () => {
  if (window.scrollY <= 40) {
    titleFixedBar.classList.remove("active");
  } else {
    titleFixedBar.classList.add("active");
  }
});
