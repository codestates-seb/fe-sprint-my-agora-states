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
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionNoanswered = document.createElement("div");
  discussionNoanswered.className = "discussion__no--answered";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;
  discussionTitle.appendChild(discussionLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  const discussionTime = document.createElement("span");

  const createTime = new Date(obj.createdAt);
  discussionTime.textContent = createTime.toLocaleString();
  const time = discussionTime.textContent;
  discussionInfo.textContent = obj.author + " / " + time;

  discussionContent.append(discussionTitle, discussionInfo);

  const discussionCheck = document.createElement("p");

  // 답변 여부에 따라 체크 표시 구분
  if (obj.answer === null) {
    discussionCheck.textContent = "☒";
  } else {
    discussionCheck.textContent = "☑";
  }

  discussionAnswered.append(discussionCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const discussionSubmit = document.querySelector(".form");
const inputName = document.querySelector(".form__input--name input");
const inputTitle = document.querySelector(".form__input--title input");
const inputQuestion = document.querySelector("textarea");

// submit 버튼 클릭시 디스커션 추가
function onSubmit(e) {
  e.preventDefault();
  const username = inputName.value;
  const usertitle = inputTitle.value;
  const userquestion = inputQuestion.value;

  agoraStatesDiscussions.unshift({
    author: username,
    title: usertitle,
    url: "",
    createdAt: new Date().toISOString(),
    id: "",
    answer: null,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/86960007?s=64&u=4863a873d78f406d658e8a50d9b91f3045006920&v=4",
    bodyHTML: userquestion,
  });

  function rerender() {
    const ul = document.querySelector("ul.discussions__container");
    ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  }

  rerender();
}

discussionSubmit.addEventListener("submit", onSubmit);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 페이지네이션 구현
// currentPage : 현재 페이지 1
// totalCount : 총 디스커션의 갯수 41(임의)
// pageCount : 화면에 나타날 페이지의 갯수 10
// limit : 한 페이지 당 나타낼 디스커션의 갯수 10

// let pagenation = (totalCount, pageCount, limit, currentPage) => {
//   let totalPage = Math.ceil(totalCount / limit); //5

//   let firstPage = (currentPage % pageCount) + 1; //최초 페이지 숫자
//   let lastPage = (currentPage % pageCount) + pageCount; // 마지막 페이지 숫자

//   if (lastPage > totalPage) {
//     lastPage = totalPage;
//   }

//   return {
//     firstPage,
//     lastPage,
//     totalPage,
//     totalCount,
//     pageCount,
//     limit,
//     currentPage,
//   };
// };

// let info = pagenation(agoraStatesDiscussions.length, 10, 10, 1);

// for (let i = info.firstPage; i <= info.lastPage; i++) {
//   i === info.currentPage
//     ? return i : return i;
// }
