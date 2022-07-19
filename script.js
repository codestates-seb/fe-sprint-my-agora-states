// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// localStorage에 data가 없을때 agoraStatesDiscussions data를 localStorage에 저장
if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify(agoraStatesDiscussions));
}

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
  // avatar image
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  // discussionContent
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionLink.setAttribute("href", obj.url);
  discussionLink.textContent = obj.title;
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);

  // answered
  const answered = document.createElement("p");
  answered.textContent = obj.answer ? "☑" : "☐";
  discussionAnswered.append(answered);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// add data
const addAgoraStatesDiscussionsData = (name, title, question) => {
  const today = new Date().toISOString(); // 현재 시간
  // 추가할 새로운 데이터
  const newData = {
    id: name,
    createdAt: today.toLocaleString(), // 밀리초 제거
    title,
    author: name,
    answer: null,
    bodyHTML: question,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  // localStorage에서 data를 받아와 새로운 데이터를 추가하고 다시 localStorage에 저장
  let localData = JSON.parse(localStorage.getItem("data"));
  localData = [newData, ...localData];
  localStorage.setItem("data", JSON.stringify(localData));
};

// notice && try render again
// 제일 상단에 있는 notice글을 제외한 data들을 다시 렌더링 합니다.
const renderForNotice = () => {
  // notice Element를 복사 -> ul.innerHTML을 비움 ->  복사한 Element를 ul에 append
  const noticeEl = ul.children[0].cloneNode(true);
  ul.innerHTML = "";
  ul.append(noticeEl);
  render(ul);
};

// form event handler
const eventHandler = (e) => {
  e.preventDefault();
  const elInputName = document.querySelector("#name").value;
  const elInputTitle = document.querySelector("#title").value;
  const elInputQuestion = document.querySelector("#story").value;
  console.log(elInputName, elInputTitle, elInputQuestion);
  addAgoraStatesDiscussionsData(elInputName, elInputTitle, elInputQuestion);
  renderForNotice();
};
document.querySelector(".form").addEventListener("submit", eventHandler);

// pagination closure
const paginationHandler = () => {
  let page = 1;
  let preventPage;
  return {
    pageClickHandler: (e) => {
      // page의 숫자를 클릭 했을때의 event handler
      elPagination.children[page - 1].classList.remove("current__page");
      page = e.target.textContent;
      elPagination.children[page - 1].classList.add("current__page");
      renderForNotice();
    },
    pageLength: (handler) => {
      // pagination의 길이를 설정하는 event handler
      elPagination.innerHTML = "";
      Array(Math.ceil(JSON.parse(localStorage.getItem("data")).length / 9))
        .fill()
        .forEach((_, i) => {
          const div = document.createElement("div");
          div.textContent = i + 1;
          div.className = "page";
          div.addEventListener("click", (e) => handler(e));
          elPagination.append(div);
        });
    },
    pageSlice: (data, currentPage) => {
      const sliceStart =
        currentPage * 10 - 10
          ? currentPage * 10 - 10 - 1
          : currentPage * 10 - 10;
      const sliceEnd = currentPage * 10 - 1;
      return data.slice(sliceStart, sliceEnd);
    },
    getPageValue: () => page,
    getPreventPageValue: () => preventPage,
  };
};
const elPagination = document.querySelector("#pagination");
const pagination = paginationHandler();

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  const localData = JSON.parse(localStorage.getItem("data"));
  const currentPage = pagination.getPageValue();
  const pageData = pagination.pageSlice(localData, currentPage);
  const maxLength = Math.ceil(localData.length / 9);

  for (let i = 0; i < pageData.length; i += 1) {
    element.append(convertToDiscussion(pageData[i]));
  }
  if (!elPagination.childNodes.length) {
    // pagination의 데이터가 없을시 길이를 설정하고 첫 페이지에 current__page클래스를 추가
    pagination.pageLength(pagination.pageClickHandler);
    elPagination.children[0].classList.add("current__page");
  } else if (maxLength !== elPagination.childNodes.length) {
    // 데이터가 추가되어 pagination의 길이를 재설정
    pagination.pageLength(pagination.pageClickHandler);
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
