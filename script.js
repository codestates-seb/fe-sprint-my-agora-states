// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const noticeSection = agoraStatesDiscussions.splice(
  36,
  agoraStatesDiscussions.length - 1
);
console.log(agoraStatesDiscussions);
////////////////////////////////////////////
////// 메인 컨텐츠 렌더링
////////////////////////////////////////////

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const imgBox = document.createElement("img");
  imgBox.classList.add("discussion__avatar--image");
  imgBox.setAttribute("src", obj.avatarUrl);
  avatarWrapper.appendChild(imgBox);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.classList.add("discussion__title");
  const discussionTitleTag = document.createElement("a");
  discussionTitleTag.setAttribute("href", obj.url);
  discussionTitleTag.textContent =
    String(obj.title).length >= 55
      ? `${String(obj.title).slice(0, 55)}...`
      : obj.title;
  discussionTitle.appendChild(discussionTitleTag);

  const dicussionInfo = document.createElement("div");
  dicussionInfo.classList.add("discussion__information");
  // 인포 안에 속성 추가 필요
  const createAuthor = document.createElement("p");
  createAuthor.textContent = obj.author;
  const createTime = document.createElement("p");
  createTime.textContent = String(obj.createdAt).slice(0, 10);
  const createId = document.createElement("p");
  createId.classList.add("hide");
  createId.textContent = obj.id;
  dicussionInfo.appendChild(createAuthor);
  dicussionInfo.appendChild(createTime);
  dicussionInfo.appendChild(createId);

  discussionContent.appendChild(discussionTitle);
  discussionContent.appendChild(dicussionInfo);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionAnswerCheck = document.createElement("p");
  discussionAnswerCheck.textContent = obj.answer === null ? "" : "✔️";
  discussionAnswered.appendChild(discussionAnswerCheck);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

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

////////////////////////////////////////////
////// 노티스 렌더링
////////////////////////////////////////////
noticeSection.forEach((element) => {
  const noticeBox = document.createElement("a");
  noticeBox.classList.add("notice-box");
  noticeBox.setAttribute("href", element.url);

  const noticeTitle = document.createElement("div");
  noticeTitle.classList.add("notice__title");
  const $h3 = document.createElement("h3");
  $h3.textContent = "[Notice]";
  const $h4 = document.createElement("h4");
  $h4.textContent = element.title.slice(8);
  noticeTitle.appendChild($h3);
  noticeTitle.appendChild($h4);

  const profileTotalContainer = document.createElement("div");
  profileTotalContainer.classList.add("profile-total-container");
  const profileContainer = document.createElement("div");
  profileContainer.classList.add("profile-container");
  const $image = document.createElement("img");
  $image.classList.add("profile-image");
  $image.setAttribute("src", element.avatarUrl);
  profileContainer.appendChild($image);
  const $p = document.createElement("p");
  $p.classList.add("user-name");
  $p.textContent = element.author;

  profileTotalContainer.appendChild(profileContainer);
  profileTotalContainer.appendChild($p);

  noticeBox.appendChild(noticeTitle);
  noticeBox.appendChild(profileTotalContainer);

  const noticeHidden = document.querySelector(".notice-hidden");
  noticeHidden.appendChild(noticeBox);
});

////////////////////////////////////////////
////// answer 박스 보여주기
////////////////////////////////////////////

/// id값만 모아놓은 배열
let findId = agoraStatesDiscussions.map((a) => a["id"]);

/// answer 박스 보여주는 이벤트 핸들러
function showAnswer(event) {
  const check = event.currentTarget.children[2].textContent;
  const siblingElement = event.currentTarget.nextElementSibling;
  if (check === "" || siblingElement.className === "answerBox") return;

  const hereTarget = event.currentTarget;
  const idBox = hereTarget.querySelector(".discussion__content").children[1];
  const id = idBox.querySelector(".hide").textContent;

  const answerBox = document.createElement("div");
  answerBox.classList.add("answerBox");

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question-div");
  questionDiv.innerHTML = agoraStatesDiscussions[findId.indexOf(id)].title;

  const answerDiv = document.createElement("div");
  answerDiv.classList.add("answer-div");
  answerDiv.innerHTML =
    agoraStatesDiscussions[findId.indexOf(id)].answer.bodyHTML;

  answerBox.appendChild(questionDiv);

  answerBox.appendChild(answerDiv);

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("closeBtn");
  closeBtn.textContent = "▲";
  closeBtn.addEventListener("click", removeAnswerBox);

  answerBox.appendChild(closeBtn);

  hereTarget.insertAdjacentElement("afterend", answerBox);
}

/// answer 박스 없애주는 이벤트 핸들러
function removeAnswerBox(event) {
  const answerParent = event.currentTarget.parentNode;
  answerParent.remove();
}

/// list 누르면 answer 박스 보여주기
const questionList = document.querySelectorAll(".discussion__container");
questionList.forEach((element) =>
  element.addEventListener("click", showAnswer)
);

////////////////////////////////////////////
////// 스크롤버튼
////////////////////////////////////////////
const scrollBtn = document.querySelector(".scroll-top-btn");
window.addEventListener("scroll", function () {
  const scrollCheck = this.window.scrollY;

  if (scrollCheck >= 470) {
    scrollBtn.style.opacity = "1";
  } else {
    scrollBtn.style.opacity = "0";
  }
});

// 스크롤 버튼 누르면 올라가기
scrollBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

////////////////////////////////////////////
////// 입력할 때마다, 변화
////////////////////////////////////////////
const titleInput = document.getElementById("title");
const storyInput = document.getElementById("story");

let titleInputValue = titleInput.value;
let storyInputValue = storyInput.value;

function titleInputChange(event) {
  titleInputValue = event.currentTarget.value;
}
function storyInputChange(event) {
  storyInputValue = event.currentTarget.value;
}

titleInput.addEventListener("keyup", titleInputChange);
storyInput.addEventListener("keyup", storyInputChange);
////////////////////////////////////////////
////// 제출버튼
////////////////////////////////////////////

function preventSubmit(event) {
  event.preventDefault();
}

function clickSubmit(event) {
  submitForm.addEventListener("submit", preventSubmit);

  // 모든 값이 null이 아니여야 Obj 생성
  if (titleInputValue !== "" && storyInputValue !== "") {
    const today = new Date();
    const Year = today.getFullYear();
    const Month =
      `${today.getMonth()}`.length === 1
        ? "0" + `${today.getMonth() + 1}`
        : today.getMonth() + 1;
    const Day =
      `${today.getDate()}`.length === 1
        ? "0" + `${today.Date()}`
        : today.getDate();
    const unshiftObj = {};
    unshiftObj["id"] = `${Date.now()}`;
    unshiftObj["createdAt"] = `${Year}-${Month}-${Day}`;
    unshiftObj["title"] = `${titleInputValue}`;
    unshiftObj["author"] = "냥펀치";
    unshiftObj["answer"] = null;
    unshiftObj["bodyHTML"] = `${storyInputValue}`;
    unshiftObj["url"] = "";
    unshiftObj["avatarUrl"] =
      "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg";
    agoraStatesDiscussions.unshift(unshiftObj);
    findId = agoraStatesDiscussions.map((a) => a["id"]);

    const discussionContainer = document.querySelector(
      ".discussions__container"
    );
    discussionContainer.insertAdjacentElement(
      "afterbegin",
      convertToDiscussion(unshiftObj)
    );
    titleInput.value = "";
    storyInput.value = "";
  }
}

const submitBtn = document.querySelector(".submit");
const submitForm = document.querySelector(".form");
submitBtn.addEventListener("click", clickSubmit);
////////////////////////////////////////////
////// 캐러샐파트 carousel
////////////////////////////////////////////
const noticeContainer = document.querySelector(".notice-container");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

function RightMove() {
  noticeContainer.scrollLeft = "432";
}
function LeftMove() {
  noticeContainer.scrollLeft = "0";
}

leftBtn.addEventListener("click", LeftMove);
rightBtn.addEventListener("click", RightMove);
