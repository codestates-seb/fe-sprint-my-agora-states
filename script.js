// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("a");
  discussionTitle.className = "discussion__title";
  discussionTitle.href = obj.url;
  discussionTitle.textContent = `${obj.title}`;

  const discussionCreateat = document.createElement("div");
  discussionCreateat.className = "discussion__information";

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  const utcDate = new Date(obj.createdAt);

  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // 12시간 형식 사용
  };
  const localTime = utcDate.toLocaleString("ko-KR", options);
  discussionInfo.innerHTML = `${obj.author}` + "<br>" + `${localTime}`;

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;

  // const discussionAnswered = document.createElement("div");
  // discussionAnswered.className = "discussion__answered";
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(
    avatarWrapper,
    discussionContent,
    // discussionAnswered,
    discussionTitle,
    discussionInfo
  );

  avatarWrapper.append(avatarImg);
  return li;
};

/////////////////////////
//////notice///////////
/////////////////////

const convertNotice = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "notice__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "notice__avatar--wrapper";

  const noticeContent = document.createElement("div");
  noticeContent.className = "notice__content";

  const noticeTitle = document.createElement("a");
  noticeTitle.className = "notice__title";
  noticeTitle.href = obj.url;
  noticeTitle.textContent = `${obj.title}`;

  const noticeCreateat = document.createElement("div");
  noticeCreateat.className = "notice__information";

  const noticeInfo = document.createElement("div");
  noticeInfo.className = "notice__information";
  const utcDate = new Date(obj.createdAt);
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // 12시간 형식 사용
  };
  const localTime = utcDate.toLocaleString("ko-KR", options);
  noticeInfo.innerHTML = `${obj.author}` + "<br>" + `${localTime}`;

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;

  li.append(avatarWrapper, noticeContent, noticeTitle, noticeInfo);
  avatarWrapper.append(avatarImg);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = () => {
  const discussionsContainer = document.querySelector(
    "ul.discussions__container"
  );
  const noticeContainer = document.querySelector(".notice");

  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    const discussion = agoraStatesDiscussions[i];
    let li;
    if (discussion.author === "kimploo") {
      li = convertNotice(discussion);
      noticeContainer.append(li);
    } else {
      li = convertToDiscussion(discussion);
      discussionsContainer.append(li);
    }
  }
};

////////////////////////////////////////////
///////////////////////////////////////////
///////////input //////////////////////

const ul = document.querySelector("ul.discussions__container");
render();
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submit 이벤트 발생했다!!");
  console.log(author.value, title.value, textbox.value);

  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };

  // agoraStatesDiscussions 객체 추가
  agoraStatesDiscussions.unshift(obj);

  // 화면 다 지우고
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
  render();

  // 사실은..
  // HTML 파일을 새로 받아오는 시절이 있었다.
  // 폼 제출을 하면 완전히 새로운 HTML 파일을 받아와야 했다. => 새로고침
});

///////////////////////////////////////
///////////pagination/////////////////
/////////////////////////////////////

// // JavaScript
// let itemsPerPage = 5; // 페이지당 보여줄 항목 수

// // 총 페이지 수 계산
// let totalPages = Math.ceil(totalItems / itemsPerPage);

// // 각 페이지마다 보여줄 항목의 인덱스 계산
// let startItem = (currentPage - 1) * itemsPerPage; // 페이지 시작 항목 인덱스
// let endItem = Math.min(startItem + itemsPerPage, totalItems); // 페이지 마지막 항목 인덱스

// const discussionsContainer = document.querySelector(".discussions__container");
// const paginationContainer = document.querySelector(".pagination");

// 총 페이지 수 계산

// // 페이지 번호 버튼 생성
// for (let i = 1; i <= totalPages; i++) {
//   const startItem = (i - 1) * itemsPerPage; // 페이지 시작 항목 인덱스
//   const endItem = Math.min(startItem + itemsPerPage, discussions.length); // 페이지 마지막 항목 인덱스

//   // 페이지 버튼 생성
//   const pageButton = document.createElement("button");
//   pageButton.textContent = i;
//   pageButton.addEventListener("click", () => {
//     // 페이지 버튼 클릭 시, 해당 페이지의 항목만 보이도록 설정
//     discussionsContainer.innerHTML = "";

//     for (let j = startItem; j < endItem; j++) {
//       const discussion = discussions[j];

//       // 항목 생성
//       const discussionItem = document.createElement("li");
//       discussionItem.classList.add("discussion__container");

//       const discussionAvatarWrapper = document.createElement("div");
//       discussionAvatarWrapper.classList.add("discussion__avatar--wrapper");

//       const discussionAvatarImage = document.createElement("img");
//       discussionAvatarImage.classList.add("discussion__avatar--image");
//       discussionAvatarImage.src = discussion.avatar;
//       discussionAvatarImage.alt = discussion.title;

//       discussionAvatarWrapper.appendChild(discussionAvatarImage);

//       const discussionContent = document.createElement("div");
//       discussionContent.classList.add("discussion__content");

//       const discussionTitle = document.createElement("h2");
//       discussionTitle.classList.add("discussion__title");

//       const discussionTitleLink = document.createElement("a");
//       discussionTitleLink.href = discussion.link;
//       discussionTitleLink.textContent = discussion.title;

//       discussionTitle.appendChild(discussionTitleLink);

//       const discussionInformation = document.createElement("div");
//       discussionInformation.classList.add("discussion__information");
//       discussionInformation.textContent = discussion.information;

//       discussionContent.appendChild(discussionTitle);
//       discussionContent.appendChild(discussionInformation);

//       const discussionAnswered = document.createElement("div");
//       discussionAnswered.classList.add("discussion__answered");
//       discussionAnswered.textContent = discussion.answered;

//       discussionItem.appendChild(discussionAvatarWrapper);
//       discussionItem.appendChild(discussionContent);
//       discussionItem.appendChild(discussionAnswered);

//       discussionsContainer.appendChild(discussionItem);
//     }
//   });

//   paginationContainer.appendChild(pageButton);
// }

let itemsPerPage = 3; // 페이지당 보여줄 항목 수

// 총 페이지 수 계산
let totalPages = Math.ceil(totalItems / itemsPerPage);

// 페이지 번호 버튼 생성
for (var i = 1; i <= totalPages; i++) {
  var startItem = (i - 1) * itemsPerPage; // 페이지 시작 항목 인덱스
  var endItem = Math.min(startItem + itemsPerPage, totalItems); // 페이지 마지막 항목 인덱스

  let pagination = document.querySelector(".discussions__container");

  let prevPageItem = document.createElement("li");
  prevPageItem.classList.add("page-item");

  let prevPageLink = document.createElement("a");
  prevPageLink.classList.add("page-link");

  prevPageLink.setAttribute("href", "#");

  prevPageItem.appendChild(prevPageLink);
  pagination.appendChild(prevPageItem);

  var pageItem = document.createElement("li");
  pageItem.classList.add("page-item");
  var pageLink = document.createElement("a");
  pageLink.classList.add("page-link");
  pageLink.setAttribute("href", "#");
  pageLink.textContent = i;
  pageItem.appendChild(pageLink);
  pagination.appendChild(pageItem);

  // 다음 페이지 버튼 생성
  var nextPageItem = document.createElement("li");
  nextPageItem.classList.add("page-item");
  var nextPageLink = document.createElement("a");
  nextPageLink.classList.add("page-link");
  nextPageLink.setAttribute("href", "#");
  nextPageItem.appendChild(nextPageLink);
  pagination.appendChild(nextPageItem);
}

// const render = (li) => {
//   const discussionsContainer = document.querySelector(
//     "ul.discussions__container"
//   );
//   const noticeContainer = document.querySelector("#notice-list");

//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     const discussion = agoraStatesDiscussions[i];
//     if (discussion.author === "kimploo") {
//       noticeContainer.append(li);
//     } else {
//       discussionsContainer.append(li);
//     }
//   }
// };

// render();

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);
// const noticeUl = document.querySelector("ul.notice");

// render(noticeUl);

// const li = document.createElement('li'); // li 요소 생성
// li.className = 'discussion__container'; // 클래스 이름 지정

// const avatarWrapper = document.createElement('div');
// avatarWrapper.className = 'discussion__avatar--wrapper';
// const discussionContent = document.createElement('div');
// discussionContent.className = 'discussion__content';
// const discussionAnswered = document.createElement('div');
// discussionAnswered.className = 'discussion__answered';

// li.append(avatarWrapper, discussionContent, discussionAnswered);

// const ul = document.querySelector('ul.discussions__container');
// ul.append(li);
