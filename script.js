// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // console.log("obj = ", obj);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 작성자 프로필
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  // 프로필 이미지 넣기
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImage);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionContentTitle = document.createElement("h2");
  discussionContentTitle.className = "discussion__title";
  const discussionContentUrl = document.createElement("a");
  discussionContentUrl.href = obj.url;
  discussionContentUrl.textContent = obj.title;
  const discussionContentInfo = document.createElement("div");
  discussionContentInfo.className = "discussion__information";
  let day = new Date(obj.createdAt).toISOString().split("T")[0];
  let time = new Date(obj.createdAt).toISOString().split("T")[1].split(".")[0];
  discussionContentInfo.textContent = `${obj.author} / ${day} ${time}`;
  discussionContentTitle.append(discussionContentUrl);
  discussionContent.append(discussionContentTitle, discussionContentInfo);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionAnsweredBox = document.createElement("p");
  if (obj.answer !== null) discussionAnsweredBox.textContent = "☑";
  discussionAnswered.append(discussionAnsweredBox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const openFormButton = document.querySelector(".open__form");
const formContainer = document.querySelector(".form__container");

openFormButton.addEventListener("click", function (event) {
  const target = event.target;
  const buttonContent = target.textContent;

  if (buttonContent === "질문 등록하기") {
    formContainer.classList.remove("hide");
    openFormButton.textContent = "질문 등록 숨기기";

    window.scrollTo(0, 0);
  }

  if (buttonContent === "질문 등록 숨기기") {
    formContainer.classList.add("hide");
    openFormButton.textContent = "질문 등록하기";
  }
});

const resetHomeButton = document.querySelector(".reset__home");
resetHomeButton.addEventListener("click", function (event) {
  window.scrollTo(0, 0);
});

const formSubmit = document.querySelector("form.form");
let inputName = formSubmit.querySelector("div.form__input--name > input");
let inputTitle = formSubmit.querySelector("div.form__input--title > input");
let inputTextBox = formSubmit.querySelector("div.form__textbox > textarea");

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();

  let id = uuidv4();

  const obj = {
    id,
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    author: inputName.value,
    answer: null,
    bodyHTML: inputTextBox.value,
    avatarUrl: "https://cataas.com/cat",
  };

  showCat(obj);

  agoraStatesDiscussions.unshift(obj);

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  render(ul);

  window.scrollTo(0, 0);
});

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function showCat(obj) {
  $.ajax({
    type: "GET",
    url: "https://api.thecatapi.com/v1/images/search",
    data: {},
    success: function (response) {
      imgUrl = response[0]["url"];
      obj.url = imgUrl;
    },
  });
  return obj;
}

function renderPagination(currentPage) {
  if (_totalCount <= 5) return;
}
