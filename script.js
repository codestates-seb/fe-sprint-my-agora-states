// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

let newAgoraStatesDiscussions =
  JSON.parse(window.localStorage.getItem("agoraStatesDiscussions")) ||
  agoraStatesDiscussions;
console.log(newAgoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const answeredLi = document.createElement("li"); // li 요소 생성
  answeredLi.className = "discussion__container"; // 클래스 이름 지정

  //아바타
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  //제목, 작성자, 날짜
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const title = document.createElement("h2");
  title.className = "discussion__title";
  discussionContent.append(title);

  const link = document.createElement("a");
  link.innerText = obj.title;
  link.href = obj.url;
  title.append(link);

  const info = document.createElement("div");
  info.className = "discussion__information";

  const infoAuthor = document.createElement("span");
  infoAuthor.className = "author";
  infoAuthor.textContent = `by ${obj.author}`;

  const infoCreated = document.createElement("span");
  infoCreated.className = "createdAt";
  let toDay = dateFormat(new Date(obj.createdAt));
  infoCreated.textContent = `  ${toDay}`;
  info.append(infoAuthor, infoCreated);

  const calendarIcon = document.createElement("i");
  calendarIcon.className = "fa-regular fa-calendar";
  infoCreated.prepend(calendarIcon);

  /* info.textContent = `by ${infoAuthor.textContent} ${infoCreated.textContent} `; */
  discussionContent.append(info);

  // 답변 확인
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const AnsweredParaph = document.createElement("p");
  AnsweredParaph.textContent = "☑";
  discussionAnswered.append(AnsweredParaph);
  discussionContent.append(discussionAnswered);

  if (obj.answer === null) {
    const notAnsweredLi = document.createElement("li");
    notAnsweredLi.className = "discussion__container__notAnswered";
    notAnsweredLi.append(avatarWrapper, discussionContent, discussionAnswered);
    return notAnsweredLi;
  } else {
    answeredLi.append(avatarWrapper, discussionContent, discussionAnswered);
    return answeredLi;
  }
};

// 날짜 변경 함수
function dateFormat(date) {
  let dateFormat2 =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 9
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());
  return dateFormat2;
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render1 = (element) => {
  for (let i = 0; i < newAgoraStatesDiscussions.length; i += 1) {
    if(newAgoraStatesDiscussions[i].answer !== null) {
      element.append(convertToDiscussion(newAgoraStatesDiscussions[i]));
    }
  }
  return;
};

const render2 = (element) => {
  for (let i = 0; i < newAgoraStatesDiscussions.length; i += 1) {
    if(newAgoraStatesDiscussions[i].answer === null) {
      element.append(convertToDiscussion(newAgoraStatesDiscussions[i]));
    }
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul2 = document.querySelector("ul.discussions__container__notAnswered");
const ul1 = document.querySelector("ul.discussions__answered__container");

for (let i = 0; i < newAgoraStatesDiscussions.length; i += 1) {
  if (newAgoraStatesDiscussions[i].answer === null) {
    render2(ul2);
  } else {
    render1(ul1);
  }
}

// 디스커션 추가
const form = document.querySelector("form.form");
const formAuthor = document.querySelector(".form__input--name input");
const formTitle = document.querySelector(".form__input--title input");
const formStory = document.querySelector(".form__textbox textarea");
const formSubmit = document.querySelector(".form__submit input[type='submit']");

const date = new Date();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const obj = {
    id: "105564451",
    createdAt: date.toLocaleDateString("ko-kr"),
    title: formTitle.value,
    url: "",
    author: formAuthor.value,
    answer: null,
    bodyHTML: formStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/105564451?v=4",
  };

  const newDiscussion = [{ ...obj }, ...newAgoraStatesDiscussions];
  window.localStorage.setItem(
    "agoraStatesDiscussions",
    JSON.stringify(newDiscussion)
  );

  newAgoraStatesDiscussions.unshift(obj);
  // prepend : obj를 ul의 맨 앞에 추가
  ul2.prepend(convertToDiscussion(obj));

  formAuthor.value = "";
  formStory.value = "";
  formTitle.value = "";
});

function modal(id) {
  const zIndex = 9999;
  var modal = document.getElementById(id);

  // 모달 div 뒤에 희끄무레한 레이어
  var bg = document.createElement("div");
  bg.setStyle({
    position: "fixed",
    zIndex: zIndex,
    left: "0px",
    top: "0px",
    width: "100%",
    height: "100%",
    overflow: "auto",
    // 레이어 색갈은 여기서 바꾸면 됨
    backgroundColor: "rgba(0,0,0,0.4)",
  });
  document.body.append(bg);

  // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
  modal.querySelector(".form__submit").addEventListener("click", function () {
    bg.remove();
    modal.style.display = "none";
  });

  modal
    .querySelector(".modal_close_btn")
    .addEventListener("click", function () {
      bg.remove();
      modal.style.display = "none";
    });

  modal.setStyle({
    position: "fixed",
    display: "block",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

    // 시꺼먼 레이어 보다 한칸 위에 보이기
    zIndex: zIndex + 1,

    // div center 정렬
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    webkitTransform: "translate(-50%, -50%)",
  });
}

// Element 에 style 한번에 오브젝트로 설정하는 함수 추가
Element.prototype.setStyle = function (styles) {
  for (var k in styles) this.style[k] = styles[k];
  return this;
};

document
  .getElementById("popup_open_btn")
  .addEventListener("click", function () {
    // 모달창 띄우기
    modal("my_modal");
  });