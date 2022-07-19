// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log("agoraStatesDiscussions", agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionFlex = document.createElement("div");
  discussionFlex.className = "discussion__flex";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl ? obj.avatarUrl : "./images/default-avata.png";
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleAnchor = document.createElement("a");
  discussionTitleAnchor.href = obj.url;
  discussionTitleAnchor.textContent = obj.title;
  discussionTitle.append(discussionTitleAnchor);
  discussionContent.append(discussionTitle);

  let date = obj.createdAt.slice(0, 10);
  let time = obj.createdAt.slice(11, 16);

  let reCreateAt = "";

  if (Number(time.slice(0, 2)) < 12) {
    if (time.slice(0, 1) === "0") {
      reCreateAt = `오전 ${time.slice(1)}`;
    } else {
      reCreateAt = `오전 ${time}`;
    }
  } else {
    time = `${Number(time.slice(0, 2)) - 12}${time.slice(2)}`;
    if (time.slice(0, 1) === "0") {
      reCreateAt = `오후 ${time.slice(1)}`;
    } else {
      reCreateAt = `오후 ${time}`;
    }
  }

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  const discussionInformationCreatedAt = document.createElement("span");
  const discussionInformationAuthor = document.createElement("span");
  discussionInformationCreatedAt.textContent = `${date} / ${reCreateAt}`;
  discussionInformationAuthor.textContent = obj.author;
  discussionInformation.append(discussionInformationCreatedAt);
  discussionInformation.append(discussionInformationAuthor);
  discussionContent.append(discussionInformation);

  const discussionAnsweredParagraph = document.createElement("p");
  discussionAnsweredParagraph.className = "material-symbols-outlined";
  discussionAnsweredParagraph.textContent = obj.answer
    ? "check_circle"
    : "cancel";
  if (discussionAnsweredParagraph.textContent === "check_circle") {
    discussionAnsweredParagraph.style.color = "#b6e6bd";
  }
  discussionAnswered.append(discussionAnsweredParagraph);

  discussionFlex.append(avatarWrapper, discussionContent, discussionAnswered);
  li.append(discussionFlex);

  const discussionAnswerdLink = document.createElement("a");
  discussionAnswerdLink.className = "discussion__answerd--link";
  discussionAnswerdLink.href = obj.answer ? obj.answer.url : null;
  discussionAnswerdLink.textContent = "답변 보러가기";
  discussionAnswerdLink.title = "Click!";
  const discussionAnswerdLinkIcon = document.createElement("span");
  discussionAnswerdLinkIcon.className = "material-symbols-outlined";
  discussionAnswerdLinkIcon.textContent = "chevron_right";
  discussionAnswerdLink.append(discussionAnswerdLinkIcon);

  if (obj.answer) {
    li.append(discussionAnswerdLink);
  }

  return li;
};

// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);

const ul = document.querySelector("ul.discussions__container");

// 새 디스커션 업로드
const onUpload = () => {
  console.log("새 디스커션 업로드");

  const inputTitle = document.querySelector(".form__input--title > input");
  const inputName = document.querySelector(".form__input--name > input");
  const inputTextbox = document.querySelector(".form__textbox > textarea");

  if (!(inputTitle.value && inputName.value && inputTextbox.value)) {
    alert("빈 칸을 모두 입력해주세요");
    return;
  }

  const date = new Date();

  const inputObj = {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: date.toISOString(),
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: inputTextbox.value,
    avatarUrl: null,
  };

  agoraStatesDiscussions.unshift(inputObj);

  ul.prepend(convertToDiscussion(inputObj));

  displayPageNav(perPage);
  displayItems(1, perPage);

  inputTitle.value = "";
  inputName.value = "";
  inputTextbox.value = "";
};

let perPage = 10;

// 페이지네이션 컨테이너 그리기
const displayPageNav = (perPage) => {
  const pagintionContainer = document.querySelector(".pagination__container");

  let pagination = "";

  const totalItems = agoraStatesDiscussions.length; // 전체 디스커션 수

  const totalPage = Math.ceil(totalItems / perPage); // 전체 페이지 수

  // 페이지네이션 아이템 하나씩 그리기
  for (let i = 1; i <= totalPage; i++) {
    pagination += `<a href="#" onclick="displayItems(${i}, ${perPage})">${i}</a>`;
  }

  pagintionContainer.innerHTML = pagination;
};

// 현재 페이지 그리기
const displayItems = (currentPage, perPage) => {
  console.log("agoraStatesDiscussions", agoraStatesDiscussions);

  localStorage.setItem(
    "local-discussions",
    JSON.stringify(agoraStatesDiscussions)
  );

  const discussions = JSON.parse(localStorage.getItem("local-discussions"));

  console.log("discussions", discussions);

  console.log("페이지 변경");

  ul.innerHTML = "";

  const currentPageNum = document.querySelectorAll(
    ".pagination__container > a"
  );

  for (const el of currentPageNum) {
    el.classList.remove("selected");
  }

  for (let i = 0; i < currentPageNum.length; i++) {
    if (i + 1 == currentPage) {
      currentPageNum[i].classList.add("selected");
    }
  }

  let index; // 현재 페이지의 시작 디스커션 index
  let offset; // 현재 페이지의 마지막 디스커션 index

  if (currentPage == 1 || currentPage <= 0) {
    index = 0;
    offset = perPage;
  } else if (currentPage > discussions.length) {
    index = currentPage - 1;
    offset = dataSet.length;
  } else {
    index = currentPage * perPage - perPage;
    offset = index + perPage;
  }

  const slicedItems = discussions.slice(index, offset); // 디스커션 배열 slice

  // 디스커션 그리기
  slicedItems.map((item) => {
    ul.append(convertToDiscussion(item));
  });
};

displayPageNav(perPage);
displayItems(1, perPage);
