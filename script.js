// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
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

  // image
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  // content-title
  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);
  const contentLink = document.createElement("a");
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  contentTitle.append(contentLink);

  // content-information
  const contentInformation = document.createElement("div");
  contentInformation.className = "discussion__information";
  contentInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString("ko-KR")}`;
  discussionContent.append(contentInformation);

  // answer
  const checkAnswered = document.createElement("p");
  discussionAnswered.append(checkAnswered);
  obj.answer
    ? (checkAnswered.textContent = "☑")
    : (checkAnswered.textContent = "☒");
  if (checkAnswered.textContent === "☒") {
    checkAnswered.style.color = "red";
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, num1, num2) => {
  for (let i = num1; i < num2; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
let startIdx = 0;
let endIdx = 10;

const ul = document.querySelector("ul.discussions__container");
// render(ul, startIdx, endIdx);

// form
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const submitBtn = document.querySelector("#submit__btn");
const newDiscussionBtn = document.querySelector("#new__discussion");
const formContainer = document.querySelector(".form__container");

const formValidate = () => {
  if (inputName.value && inputTitle.value && inputStory.value) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
};

const inputArr = [inputName, inputTitle, inputStory];

inputArr.forEach((el) => {
  el.addEventListener("keyup", () => {
    formValidate();
  });
});

newDiscussionBtn.addEventListener("click", () => {
  formContainer.classList.toggle("hide");
  inputName.focus();
});

// local storage

const DISCUSSIONS_KEY = "discussions";

const saveDiscussion = () => {
  localStorage.setItem(DISCUSSIONS_KEY, JSON.stringify(agoraStatesDiscussions));
};

const saveLocalStorage = () => {
  localStorage.setItem(DISCUSSIONS_KEY, JSON.stringify(parsedDiscussions));
}

const savedDiscussions = localStorage.getItem(DISCUSSIONS_KEY);
const parsedDiscussions = JSON.parse(savedDiscussions);

const renderLocalStorage = (element, num1, num2) => {
  for (let i = num1; i < num2; i += 1) {
    element.append(convertToDiscussion(parsedDiscussions[i]));
  }
  return;
};

console.log(parsedDiscussions);

const formReset = () => {
  inputName.value = "";
  inputTitle.value = "";
  inputStory.value = "";
  formContainer.classList.add("hide");
  submitBtn.disabled = true;
};

const removeChildes = (el) => {
  while (el.firstChild) {
    el.firstChild.remove();
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const newDiscussion = {
    id: Date.now(),
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/95295766?s=64&u=85d493e0be0d2ca55965efd9f6c5b268c9dca168&v=4",
  };

  formReset();

  removeChildes(ul);

  if (!savedDiscussions) {
    agoraStatesDiscussions.unshift(newDiscussion);
    saveDiscussion();
  } else {
    parsedDiscussions.unshift(newDiscussion);
    saveLocalStorage();
  }

  // agoraStatesDiscussions.unshift(newDiscussion);
  // ul.insertBefore(convertToDiscussion(newDiscussion), ul.firstChild);

  // add to Local Storage
  // saveDiscussion();

  // render(ul, startIdx, endIdx);
  if (!savedDiscussions) {
    render(ul, startIdx, endIdx);
  } else {
    renderLocalStorage(ul, startIdx, endIdx);
  }
});

// pagination
const nextPageBtn = document.querySelector("#next__page");
const prevPageBtn = document.querySelector("#prev__page");

nextPageBtn.addEventListener("click", () => {
  if (endIdx > agoraStatesDiscussions.length) return;
  removeChildes(ul);

  startIdx += 10;
  endIdx += 10;

  // render(ul, startIdx, endIdx);
  if (!savedDiscussions) {
    render(ul, startIdx, endIdx);
  } else {
    renderLocalStorage(ul, startIdx, endIdx);
  }
});

prevPageBtn.addEventListener("click", () => {
  if (startIdx <= 0) return;
  removeChildes(ul);

  startIdx -= 10;
  endIdx -= 10;

  // render(ul, startIdx, endIdx);
  if (!savedDiscussions) {
    render(ul, startIdx, endIdx);
  } else {
    renderLocalStorage(ul, startIdx, endIdx);
  }
});

if (!savedDiscussions) {
  render(ul, startIdx, endIdx);
} else {
  renderLocalStorage(ul, startIdx, endIdx);
}
