// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

localStorage.removeItem("username");
if (localStorage.length === 0) {
  localStorage.setItem("discussions", "[]");
}
let thisPage = 1;

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  // 질문과 하이퍼링크 추가
  const title = document.createElement("h3");
  const titleLink = document.createElement("a");
  title.classList.add("discussion__title");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);
  discussionContent.append(title);

  // 작성자 닉네임과 작성 시간 추가
  const information = document.createElement("div");
  information.classList.add("discussion__information");
  information.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(information);

  // 답변 유무 추가
  if (obj.answer === null) {
    // ☑
    discussionAnswered.textContent = "❎";
  } else {
    discussionAnswered.textContent = "✅";
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (element, num) => {
  ul.textContent = "";
  for (let i = (num - 1) * 10; i < num * 10; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  window.scrollTo(0, 0);
  return;
};

// localStorage에 저장된 discussion값을 agoraStatesDiscussions에 shift();
// for (let j = 1; j <= localStorage.length; j++) {
//   let key = localStorage.key(localStorage.length - j);
//   agoraStatesDiscussions.unshift(JSON.parse(localStorage.getItem(key)));
// }
for (let j = 0; j < JSON.parse(localStorage.discussions).length; j++) {
  agoraStatesDiscussions.unshift(JSON.parse(localStorage.discussions)[j]);
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

const ul = document.querySelector("ul.discussions__container");
render(ul, 1);

// submit 버튼 클릭 시 이벤트 제어
const submitBtn = document.querySelector(".submit__btn");

Date.prototype.amPm = function () {
  let h = this.getHours() < 12 ? "AM" : "PM";
  return h;
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const formName = document.querySelector("#name");
  const formTitle = document.querySelector("#title");
  const formStory = document.querySelector("#story");

  let newObj = {};
  const date = new Date();
  let hours;
  if (date.getHours() > 12) {
    hours = date.getHours() - 12;
  } else {
    hours = date.getHours();
  }
  if (formTitle.value && formName.value && formTitle.value) {
    newObj.title = formTitle.value;
    newObj.bodyHTML = formStory.value;
    newObj.author = formName.value;
    newObj.createdAt = `${date.amPm()} ${hours} : ${String(
      date.getMinutes()
    ).padStart(2, "0")} : ${String(date.getSeconds()).padStart(2, "0")}`;
    newObj.avatarUrl =
      "https://avatars.githubusercontent.com/u/103625066?s=200&v=4";
    newObj.url =
      "https://github.com/codestates-seb/agora-states-fe/discussions";
    newObj.answer = null;

    const newLocalStorage = JSON.parse(localStorage.getItem("discussions"));

    newLocalStorage.push(newObj);
    localStorage.setItem("discussions", JSON.stringify(newLocalStorage));
    agoraStatesDiscussions.unshift(newObj);

    thisPage = 1;
    render(ul, thisPage);

    formName.value = "";
    formTitle.value = "";
    formStory.value = "";
  } else {
    alert("내용을 입력해주세요");
  }
});

// pagination 구현

const paginationContainer = document.querySelector("#pagination__num");
const paginationCnt = Math.ceil(agoraStatesDiscussions.length / 10);
for (let i = 1; i <= paginationCnt; i++) {
  const paginationBtn = document.createElement("button");
  paginationBtn.textContent = i;
  paginationContainer.append(paginationBtn);
  paginationBtn.addEventListener("click", handlePaginationBtn);
}

// pagination 버튼 클릭 이벤트 제어

const previousBtn = document.querySelector("#previous__btn");
const nextBtn = document.querySelector("#next__btn");

previousBtn.addEventListener("click", handlPreviousNextBtn);
nextBtn.addEventListener("click", handlPreviousNextBtn);

function handlPreviousNextBtn(e) {
  if (e.target.textContent === "⬅️") {
    if (thisPage === 1) {
      alert("처음 페이지입니다.");
    } else {
      thisPage--;
      render(ul, thisPage);
    }
  } else {
    if (thisPage === paginationCnt) {
      alert("마지막 페이지입니다.");
    } else {
      thisPage++;
      render(ul, thisPage);
    }
  }
}

function handlePaginationBtn(e) {
  const paginationNum = e.target.textContent;
  ul.textContent = "";
  render(ul, paginationNum);
  thisPage = Number(paginationNum);
}
