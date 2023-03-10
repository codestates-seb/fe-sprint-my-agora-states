// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let discussionHref = document.querySelector("a");
discussionHref.addEventListener("click", (event) => {
  event.stopPropagation();
});

const addLocalStorage = (obj) => {
  let data = getLocalStorage("agoraStates");
  localStorage.setItem("agoraStates", JSON.stringify([...data, obj]));
};

const setLocalStorage = (obj) => {
  localStorage.setItem("agoraStates", JSON.stringify(obj));
  return;
};

const getLocalStorage = (name) => {
  let data = JSON.parse(localStorage.getItem(name));
  return data;
};

const handleClickDiscussion = (event) => {
  const modalWrapper = document.querySelector(".answer__wrapper");
  modalWrapper.classList.remove("hide");

  const localData = getLocalStorage("agoraStates");
  const selectedData = localData.find(
    (item) => item.id == event.currentTarget.id
  );

  const questionTitle = document.querySelector(".question-box__title");
  questionTitle.href = selectedData.url;
  questionTitle.textContent = selectedData.title;

  const questionAuthorImg = document.querySelector(
    ".question-box__author--image"
  );
  questionAuthorImg.src = selectedData.avatarUrl;

  const questionAuthorName = document.querySelector(
    ".question-box__author--name"
  );
  questionAuthorName.textContent = selectedData.author;

  const questionDate = document.querySelector(".question-box__date");
  questionDate.textContent = new Date(selectedData.createdAt).toLocaleString();

  const questionBody = document.querySelector(".question-box__question");
  questionBody.innerHTML = selectedData.bodyHTML;

  const answerBox = document.querySelector(".answer__container--answer-box");

  if (!!selectedData?.answer) {
    answerBox.classList.remove("hide");

    const answerTitle = document.querySelector(".answer-box__title");
    answerTitle.href = selectedData.answer.url;

    const answerAuthorImg = document.querySelector(
      ".answer-box__author--image"
    );
    answerAuthorImg.src = selectedData.answer.avatarUrl;

    const answerAuthorName = document.querySelector(
      ".answer-box__author--name"
    );
    answerAuthorName.textContent = selectedData.answer.author;

    const answerDate = document.querySelector(".answer-box__date");
    answerDate.textContent = new Date(
      selectedData.answer.createdAt
    ).toLocaleString();

    const answerBody = document.querySelector(".answer-box__answer");
    answerBody.innerHTML = selectedData.answer.bodyHTML;
  } else {
    answerBox.classList.add("hide");
  }

  const bodyWrapper = document.querySelector("body");
  bodyWrapper.classList.add("hide");
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  li.id = obj.id;

  li.addEventListener("click", handleClickDiscussion);

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.className = "discussion__avatar--image";
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionHref = document.createElement("a");
  discussionHref.target = "_blank";
  discussionHref.href = obj.url;
  discussionHref.textContent = obj.title;
  discussionHref.onclick = (event) => {
    event.stopPropagation();
  };

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  let createdAt = new Date(obj.createdAt).toLocaleString();
  discussionInformation.textContent = obj.author + " / " + createdAt;

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionTitle.appendChild(discussionHref);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);

  const answeredChecked = document.createElement("p");
  answeredChecked.className = `discussion__answered--icon ${!!obj.answer}`;
  answeredChecked.textContent = !!obj.answer ? "☑" : "☒";
  discussionAnswered.append(answeredChecked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const handleAddDiscussion = (event) => {
  event.preventDefault();
  let author = document.querySelector("#name").value;
  let title = document.querySelector("#title").value;
  let story = document.querySelector("#story").value;
  let timestamp = new Date().getTime();

  let data = {
    id: timestamp,
    createdAt: new Date(),
    title,
    url: "https://github.com/codestates-seb/fe-sprint-my-agora-states",
    author,
    answer: null,
    bodyHTML: `<p>${story}</p>`,
    avatarUrl:
      "https://velog.velcdn.com/images/wlsdk0313/post/6df001e8-8335-4a78-9e5f-76debd047994/image.jpeg",
  };

  addLocalStorage(data);

  const ul = document.querySelector("ul.discussions__container");
  ul.prepend(convertToDiscussion(data));
};

let form = document.querySelector(".form");
form.addEventListener("submit", handleAddDiscussion);

let discussion = document.getElementsByTagName("li");
for (let i = 0; i < discussion.length; i++) {
  discussion[i].addEventListener("click", handleClickDiscussion);
}

const handleClickBackground = () => {
  const modalWrapper = document.querySelector(".answer__wrapper");
  modalWrapper.classList.add("hide");

  const bodyWrapper = document.querySelector("body");
  bodyWrapper.classList.remove("hide");

  const modalContent = document.querySelector(".answer__container");
  modalContent.scrollTop = 0;
};

let discussionBackground = document.querySelector(
  ".answer__wrapper--background"
);
discussionBackground.addEventListener("click", handleClickBackground);

let discussionAnswer = document.querySelector(".answer__container");
discussionHref.addEventListener("click", (event) => {
  return false;
});

const reRender = (event) => {
  render(ul, event.target.textContent);
};

const createPagination = (page, total) => {
  let totalPage = Math.ceil(total / 10);
  const pagination = document.querySelector(".discussion__pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPage; i++) {
    const li = document.createElement("div");
    li.classList.add("discussion__pagination--item");
    li.textContent = i;
    if (li.textContent === String(page)) {
      li.classList.add("true");
    }
    li.addEventListener("click", reRender);
    pagination.append(li);
  }
};

const render = (element, page = "1") => {
  element.innerHTML = "";
  let localData = getLocalStorage("agoraStates");

  createPagination(page, localData.length);

  const orderedData = localData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const start = (Number(page) - 1) * 10;
  const end = page * 10;
  const currentPage = orderedData.slice(start, end);

  for (let i = 0; i < currentPage.length; i++) {
    element.append(convertToDiscussion(currentPage[i]));
  }
  return;
};

if (!localStorage.getItem("agoraStates")) {
  setLocalStorage(agoraStatesDiscussions);
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const topFloating = document.querySelector(".top-floating");

topFloating.addEventListener("click", (event) => {
  event.preventDefault();

  let PageLocation = document.querySelector(".body").offsetTop;
  window.scrollTo({ top: PageLocation, behavior: "smooth" });
});
