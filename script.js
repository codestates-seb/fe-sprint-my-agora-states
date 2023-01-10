// 댭변 상태에 따라 아이콘 사용
const ANSWERED_MARK = "☑︎";
const UNANSERED_MARK = "◻︎";
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");

  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "discussion__avatar--image";

  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  const discussionUrl = document.createElement("a");

  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title;

  discussionTitle.append(discussionUrl);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  const createQuestionDate = new Date(obj.createdAt).toLocaleString();

  discussionInformation.textContent = `${obj.author} / ${createQuestionDate}`;

  discussionContent.append(discussionTitle, discussionInformation);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const discussionIcon = document.createElement("p");

  if (obj.answer === null) {
    discussionIcon.textContent = UNANSERED_MARK;
  } else {
    discussionIcon.textContent = ANSWERED_MARK;
  }

  discussionAnswered.append(discussionIcon);

  // 자세히 보기 버튼
  const discussionAnswerButton = document.createElement("button");
  discussionAnswerButton.className = "discussion__answer__button";
  discussionAnswerButton.textContent = "자세히 보기";

  // 자세히 보기 버튼을 누르면 보이는 컨텐츠 영역
  const discussionAnswerContent = document.createElement("div");
  discussionAnswerContent.className = "discussion__answer__content";

  // 질문 제목
  const discussionQuestionTitle = document.createElement("h2");
  discussionQuestionTitle.className = "discussion__question__title";

  discussionQuestionTitle.textContent = `${obj.title}`;

  // 질문 내용
  const discussionQuestionDescription = document.createElement("div");
  discussionQuestionDescription.className = "discussion__question__description";

  discussionQuestionDescription.innerHTML = obj.bodyHTML;

  const discussionAnswerTitle = document.createElement("h2");
  const discussionAnswerInfo = document.createElement("div");
  const answerAvatarImage = document.createElement("img");
  const answerDate = document.createElement("p");

  discussionAnswerInfo.className = "discussion__answer__information";

  const discussionAnswerDescription = document.createElement("div");

  discussionAnswerTitle.textContent = "답변";

  if (obj.answer != null) {
    discussionAnswerInfo.append(answerDate, answerAvatarImage);

    discussionAnswerDescription.innerHTML = obj.answer.bodyHTML;

    // 답변 제목
    discussionAnswerTitle.className = "discussion__answer__title";

    // 답변한 사람 아바타
    answerAvatarImage.className = "discussion__answer__avatar--image";

    // 답변한 날짜
    answerDate.className = "discussion__answer__date";
    const createAnswerDate = new Date(obj.answer.createdAt).toLocaleString();

    answerAvatarImage.src = obj.answer.avatarUrl;
    answerAvatarImage.alt = "avatar of" + obj.answer.author;
    answerDate.textContent = `${obj.answer.author} / ${createAnswerDate}`;

    // 답변 내용
    discussionAnswerDescription.className = "discussion__answer__description";
  }
  // 답변 내용이 없으면 보여줄 화면
  else {
    discussionAnswerDescription.textContent = "답변이 아직 없네요";
  }

  discussionAnswerContent.append(
    discussionQuestionTitle,
    discussionQuestionDescription,
    discussionAnswerTitle,
    discussionAnswerInfo,
    discussionAnswerDescription
  );

  li.append(avatarWrapper, discussionContent, discussionAnswered, discussionAnswerContent, discussionAnswerButton);
  return li; // il요소를 위의 함수를 통해 가공해서 append
};
const removeFocusParameter = (url) => {
  return url.replace("&focus=true", "");
};

const getQueryString = () => {
  const qs = {};
  const qsList = window.location.search
    .slice(1)
    .split("&")
    .map((qs) => qs.split("="));

  for (let i = 0; i < qsList.length; i++) {
    qs[qsList[i][0]] = qsList[i][1];
  }

  return qs;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => { // 여기 엘리먼트는 ul.discussions__container 이게 들어옴
  const querystring = getQueryString();
  const pageNo = Number(querystring.pageNo || 1);

  for (let i = (pageNo - 1) * 10; i < pageNo * 10; i++) {
    const list = getDiscussionList();
    if (list[i] == null) {
      break;
    }
    element.append(convertToDiscussion(list[i]));
  }
  return;
};

// 랜더 후 발생하는 액션 정의
const mounted = () => {
  const querystring = getQueryString();
  const focus = querystring.focus;

  if (focus === "true") {
    const inputName = document.querySelector("#name");
    const currentUrl = window.location.href;
    const title = document.title;
    inputName.focus();

    window.history.replaceState(null, title, removeFocusParameter(currentUrl));
  }
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); 
mounted();

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
      avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    });

    const focus = true; // 제출 후, 인풋폼에 포커싱
    const pageNo = 1; // 추가된 디스커션을 보기위해 첫 페이지로 이동
    window.location.href = `${window.location.origin}${window.location.pathname}?pageNo=${pageNo}&focus=${focus}`;
  }
}
const addDiscussion = (discussion) => {
  const discussionList = getDiscussionList();

  discussionList.unshift(discussion);

  localStorage.setItem("discussionList", JSON.stringify(discussionList)); //로컬 스토리지 저장 localStorage.clear() 정리 가능
};

submitButton.addEventListener("click", inputValue);

window.addEventListener("scroll", () => {
  if (window.scrollY <= 40) {
    titleFixedBar.classList.remove("active");
  } else {
    titleFixedBar.classList.add("active");
  }
});

const buttonCount = Math.ceil(getDiscussionList().length / 10);
const buttonContainer = document.querySelector(".page-button-container");

for (let i = 0; i < buttonCount; i++) {
  const button = document.createElement("button");
  button.className = `page-button page-button-${i + 1}`;
  button.textContent = i + 1;
  buttonContainer.append(button);

  button.addEventListener("click", function () {
    console.log(button.textContent);
    window.location.href = `${window.location.origin}${window.location.pathname}?pageNo=${i + 1}`;
    window;
  });
}