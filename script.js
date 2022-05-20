// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const form = document.querySelector(".form");
const ul = document.querySelector("ul.discussions__container");
const KEY = "spurs";

let arr = [];

const deleteList = (event) => {
  const li = event.target;
  li.remove();
  // .closest
  arr = arr.filter((item) => item.id !== parseInt(li.id));
  localStorage.setItem(KEY, JSON.stringify(arr));
};

const writeToDiscussion = (event) => {
  const name = document.getElementById("name");
  const title = document.getElementById("title");

  const newObj = {
    id: Date.now(),
    avatarUrl: "",
    author: name.value,
    title: title.value,
    createdAt: new Date(Date.now()).toISOString(),
  };

  arr.unshift(newObj);
  localStorage.setItem(KEY, JSON.stringify(arr));
  render(ul);
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  li.id = obj.id;

  function avatarDom() {
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const avatarImg = document.createElement("img");

    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = "avatar of " + obj.author;
    avatarWrapper.append(avatarImg);
    return avatarWrapper;
  }

  function contentDom() {
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";
    const discussionInfo = document.createElement("div");
    discussionInfo.className = "discussion__information";
    const discussionTitle = document.createElement("h2");
    discussionTitle.className = "discussion__title";
    const discussionHref = document.createElement("a");

    discussionHref.textContent = obj.title;
    discussionHref.href = obj.url;
    discussionTitle.append(discussionHref);
    discussionContent.append(discussionTitle);

    let parseDate = new Date(obj.createdAt);
    discussionInfo.textContent = `${
      obj.author
    } / ${parseDate.toLocaleDateString()} ${parseDate.toLocaleTimeString()}`;
    discussionContent.append(discussionInfo);
    return discussionContent;
  }

  function answerDom() {
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";
    const discussionAnswer = document.createElement("button");

    if (obj.answer === undefined) {
      discussionAnswer.textContent = "❌";
      discussionAnswer.addEventListener("click", deleteList);
    } else {
      discussionAnswer.textContent = "✔️";
      discussionAnswer.disabled = true;
    }
    discussionAnswered.append(discussionAnswer);
    return discussionAnswered;
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarDom(), contentDom(), answerDom());
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  const saved = localStorage.getItem(KEY);
  let parse = JSON.parse(saved);

  if (saved !== null) {
    arr = parse;
    for (let i = 0; i < arr.length; i += 1) {
      element.append(convertToDiscussion(arr[i]));
    }
  } else {
    arr = agoraStatesDiscussions;
    for (let i = 0; i < arr.length; i += 1) {
      element.append(convertToDiscussion(arr[i]));
    }
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
form.addEventListener("submit", writeToDiscussion);

render(ul);
console.log(arr);
