const blackButton = document.querySelector(".dark");
const labelInput = document.querySelector("label");
const body = document.body;
blackButton.addEventListener("click", () => {
  const discussionContainer = document.querySelectorAll(
    ".discussion__container"
  );
  if (blackButton.textContent === "dark모드") {
    blackButton.textContent = "light모드";
    discussionContainer.forEach((container) => {
      container.classList.remove("black__line");
    });
    discussionContainer.forEach((container) => {
      container.classList.add("white__line");
    });

    body.classList.remove("white");
    labelInput.classList.remove("white");
    body.classList.add("black");
    labelInput.classList.add("black");
  } else {
    discussionContainer.forEach((container) => {
      container.classList.add("black__line");
    });
    discussionContainer.forEach((container) => {
      container.classList.remove("white__line");
    });
    body.classList.remove("black");
    labelInput.classList.remove("black");
    body.classList.add("white");
    labelInput.classList.add("white");
    blackButton.textContent = "dark모드";
  }
});

const myFunction = (event) => {
  const leng = newAgoraStatesDiscussions
    ? newAgoraStatesDiscussions.length
    : agoraStatesDiscussions.length;

  let eventTarget = event.target.parentNode;

  for (let i = 0; i < leng; i++) {
    if (
      eventTarget.firstChild &&
      agoraStatesDiscussions[i] &&
      agoraStatesDiscussions[i].id === eventTarget.firstChild.textContent
    ) {
      const contentAdd = document.querySelector(".answer__content");
      const contentAuthor = document.createElement("div");
      const contentCreate = document.createElement("div");
      const contentClose = document.createElement("div");
      let contentHtml = document.createElement("div");
      contentAdd.replaceChildren();

      contentClose.textContent = "X";
      contentClose.className = "content__close";
      contentHtml = stringToHTML(agoraStatesDiscussions[i].answer.bodyHTML);
      contentHtml.className = "content__html";
      contentAuthor.textContent = agoraStatesDiscussions[i].answer.author;
      contentCreate.textContent = agoraStatesDiscussions[i].answer.createdAt;
      contentAdd.append(
        contentClose,
        contentHtml,
        contentAuthor,
        contentCreate
      );

      const contentX = document.querySelector(".content__close");
      if (contentX) {
        contentX.addEventListener("click", () => {
          contentAdd.replaceChildren();
        });
      }
    }
  }
};
const deleteFunction = (event) => {
  const newAgoraStatesDiscussions = JSON.parse(localStorage.getItem("nums"))
    ? JSON.parse(localStorage.getItem("nums"))
    : agoraStatesDiscussions;
  const leng = newAgoraStatesDiscussions
    ? newAgoraStatesDiscussions.length
    : agoraStatesDiscussions.length;
  const eventTarget = event.target.parentNode.lastChild.firstChild; // 결국은 id 찾기 위한 전쟁 ㅋ
  for (let i = 0; i < leng; i++) {
    if (
      eventTarget.textContent &&
      newAgoraStatesDiscussions[i] &&
      newAgoraStatesDiscussions[i].id === eventTarget.textContent
    ) {
      newAgoraStatesDiscussions.splice(i, 1);
      localStorage.setItem("nums", JSON.stringify(newAgoraStatesDiscussions));
    }
  }
  location.reload();
};

const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  if (obj.answer) {
    const discussionCheck = document.createElement("span");
    const discussionSet = document.createElement("p");
    discussionCheck.textContent = `${obj.id}`;
    discussionSet.textContent = `답변완료`;
    discussionAnswered.append(discussionCheck, discussionSet);
    discussionAnswered.addEventListener("click", myFunction);
  } else {
    const discussionCheck = document.createElement("span");
    discussionCheck.textContent = `${obj.id}`;
    discussionAnswered.append(discussionCheck);
  }

  const discussionDelete = document.createElement("div");
  discussionDelete.className = "delete";
  discussionDelete.textContent = "X";
  discussionDelete.addEventListener("click", deleteFunction);

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl ? obj.avatarUrl : "";
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement("h2");
  discussionContent.append(contentTitle);
  const contentAuthor = document.createElement("div");
  contentAuthor.className = "discussion__information";

  let createdAt = obj.createdAt.replace(/[:TZ-]/g, "");
  createdAt =
    createdAt.slice(0, 4) +
    "년 " +
    createdAt.slice(4, 6) +
    "월 " +
    createdAt.slice(6, 8) +
    "일 " +
    Number(createdAt.slice(8, 10)).toString() +
    "시 " +
    Number(createdAt.slice(10, 12)).toString() +
    "분 " +
    Number(createdAt.slice(12, 14)).toString() +
    "초";

  contentAuthor.textContent = `${obj.author} /  ${createdAt}`;
  discussionContent.append(contentAuthor);

  const contentUrl = document.createElement("a");
  contentUrl.textContent = obj.title;
  contentUrl.href = obj.url;
  contentTitle.append(contentUrl);

  li.append(
    discussionDelete,
    avatarWrapper,
    discussionContent,
    discussionAnswered
  );

  return li;
};

const newAgoraStatesDiscussions = JSON.parse(localStorage.getItem("nums"));
const leng = newAgoraStatesDiscussions
  ? newAgoraStatesDiscussions.length
  : agoraStatesDiscussions.length;
const contents = document.querySelector(".contents");
const buttons = document.querySelector(".buttons");
const numOfContent = leng;
const maxContent = 10;
const showButton = 5;
const maxPage = Math.ceil(numOfContent / maxContent);
let page = 1;

const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    Array.prototype.forEach.call(buttons.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num));
  });
  return button;
};

const renderContent = (page) => {
  while (contents.hasChildNodes()) {
    contents.removeChild(contents.lastChild);
  }
  for (
    let id = (page - 1) * maxContent + 1;
    id <= page * maxContent && id < numOfContent;
    id++
  ) {
    const Agora = newAgoraStatesDiscussions
      ? newAgoraStatesDiscussions
      : agoraStatesDiscussions;
    contents.appendChild(convertToDiscussion(Agora[id - 1]));
  }
};

const renderButton = (page) => {
  while (buttons.hasChildNodes()) {
    buttons.removeChild(buttons.lastChild);
  }
  for (let id = page; id < page + showButton && id <= maxPage; id++) {
    buttons.appendChild(makeButton(id));
  }
  buttons.children[0].classList.add("active");
  buttons.prepend(prev);
  buttons.append(next);

  if (page - showButton < 1) buttons.removeChild(prev);
  if (page + showButton > maxPage) buttons.removeChild(next);
};

const goPrevPage = () => {
  page -= showButton;
  render2(page);
};

const goNextPage = () => {
  page += showButton;
  render2(page);
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.textContent = "이전";
prev.addEventListener("click", goPrevPage);
buttons.append(prev);

const next = document.createElement("button");
next.classList.add("button", "next");
next.textContent = "다음";
next.addEventListener("click", goNextPage);
buttons.append(next);

const render2 = (page) => {
  renderContent(page);
  renderButton(page);
};
render2(page);

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", () => {
  console.log("HWE");
});

let stringToHTML = function (str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");
  return doc.body;
};

// 완료
const submitForm = document.querySelector(".form");
submitForm.addEventListener("submit", (event) => {
  const id = document.querySelector("#name");
  const title = document.querySelector("#title");
  const text = document.querySelector("#story");
  const date = new Date();
  date.toLocaleString();
  const obj = {
    title: title.value,
    author: id.value,
    bodyHTML: text.value,
    createdAt: date,
    id: date,
    avatarUrl: "",
    url: "",
    answer: null,
  };
  const newAgoraStatesDiscussions = JSON.parse(localStorage.getItem("nums"))
    ? JSON.parse(localStorage.getItem("nums"))
    : agoraStatesDiscussions;
  if (newAgoraStatesDiscussions) {
    newAgoraStatesDiscussions.unshift(obj);
    localStorage.setItem("nums", JSON.stringify(newAgoraStatesDiscussions));
  }
});
