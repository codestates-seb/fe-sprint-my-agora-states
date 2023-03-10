// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = obj => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; // Wrapper안에 img
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  // ---------------------------
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; // content안에 h2안에 a, h2옆에 inf
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionTitle.style.display = "flex";
  const aNotice = document.createElement("a");
  aNotice.href = obj.url;
  aNotice.textContent = obj.title;
  discussionTitle.append(aNotice);
  discussionContent.append(discussionTitle);
  const discussionbodyHtml = document.createElement("p");
  discussionbodyHtml.className = "discussion__bodyHtml hide";
  discussionbodyHtml.textContent = obj.bodyHTML;
  discussionContent.append(discussionbodyHtml);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionInformation);
  // ---------------------------
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const pCheck = document.createElement("p");
  if (obj.answer === null) {
    pCheck.textContent = "❌";
  } else {
    pCheck.textContent = "⭕";
  }
  discussionAnswered.append(pCheck);
  discussionContent.append(discussionAnswered);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = element => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// SUBMIT BTN

const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const textInput = document.querySelector("#story");
const inputForm = document.querySelector(".form");
const now = new Date();

// Img Random
const imagePaths = [
  (src = "/fe-sprint-my-agora-states/img/ava1.png"),
  (src = "/fe-sprint-my-agora-states/img/ava2.png"),
  (src = "/fe-sprint-my-agora-states/img/ava3.jpg"),
  (src = "/fe-sprint-my-agora-states/img/ava4.png"),
];
function showRandomImage() {
  let randomIndex = Math.floor(Math.random() * imagePaths.length); // 랜덤한 인덱스 선택
  let randomImagePath = imagePaths[randomIndex]; // 선택한 인덱스에 해당하는 이미지 파일의 경로
  let img = new Image();
  img.src = randomImagePath;
  return img.src;
}

showRandomImage();
inputForm.addEventListener("submit", event => {
  event.preventDefault();
  const newObj = {};

  newObj.id = null;
  newObj.createdAt = now.toISOString();
  newObj.title = inputTitle.value;
  newObj.url = null;
  newObj.author = inputName.value;
  newObj.answer = null;
  newObj.bodyHTML = textInput.value;
  newObj.avatarUrl = showRandomImage();

  agoraStatesDiscussions.unshift(newObj);
  ul.prepend(convertToDiscussion(newObj));

  inputName.value = ""; // 초기화
  inputTitle.value = "";
  textInput.value = "";
});
// -------------------

const liEls = document.querySelectorAll(".discussion__container");

for (let i = 0; i < liEls.length; i++) {
  const showMessage = document.querySelector("#showMessage");
  let pTagText = document.querySelector(".showMessage_content p");
  let closeBtn = document.querySelector(".showMessage_content .closeBtn");
  liEls[i].addEventListener("click", function () {
    // console.log(`li ${i + 1} was clicked`);
    pTagText.textContent = "TEXT";
    closeBtn.textContent = "❌";
    // agoraStatesDiscussions[i].bodyHTML;
    showMessage.style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
    showMessage.style.display = "none";
  });
}
