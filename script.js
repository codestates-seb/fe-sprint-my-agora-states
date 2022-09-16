// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성 <li>
  li.className = "discussion__container"; // 클래스 이름 지정 <li class = "discussion__container">

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; // <div class = "discussion__avatar--wrapper">
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; // <div class = "discussion__content">
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; // <div class = "discussion__answered">

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 매개변수 obj 이용(인자로 agoraStatesDiscussions 배열 요소들이 들어옴(Object))
  // 첫 줄의 li 블럭 뒤에 똑같은 형식의 li 계속해서 추가

  // discussion__content 태그에
  // <h2 class="discussion__title"><a href="링크">제목</a></h2>
  // <div class="discussion__information"> 작성자 / 시간 </div>
  const tagH2 = document.createElement("h2");
  tagH2.className = "discussion__title";
  const tagA = document.createElement("a");
  tagA.href = obj.url;
  tagA.textContent = obj.title;
  tagH2.append(tagA);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(tagH2, discussionInformation);

  // discussion__avatar--wrapper 태그에
  // <img class="discussion__avatar--image" src="이미지 링크" alt="이미지 표시 텍스트">
  const discussionAvatarImage = document.createElement("img");
  discussionAvatarImage.className = "discussion__avatar--image";
  discussionAvatarImage.src = obj.avatarUrl;
  discussionAvatarImage.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(discussionAvatarImage);

  // 프로필 사진 중앙정렬 위한 부모태그
  const imgParentDiv = document.createElement("div");
  imgParentDiv.className = "imgParentDiv";
  imgParentDiv.append(avatarWrapper);

  // 체크박스
  const tagP = document.createElement("p");
  tagP.textContent = `☑`;
  discussionAnswered.append(tagP);

  li.append(imgParentDiv, discussionContent, discussionAnswered); // 부모 li 태그의 자식 태그들
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // 인자로 받는 태그가 부모가 되고, agoraStatesDiscussions 배열 요소가 담긴 새로운 li 블럭이 리턴
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); // HTML <ul class="discussions__container"> 자식에 agoraStatesDiscussions 배열 요소들이 li 블럭으로 추가됨

// const form = document.querySelector(".form")
const inputSubmit = document.querySelector("#submit");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");

// 새로운 discussion 추가
function addDiscussion(event) {
  event.preventDefault();

  const newDiscussion = {
    id: `null id`,
    author: inputName.value,
    title: inputTitle.value,
    createdAt: new Date(),
    url: `https://github.com/codestates-seb/agora-states-fe/discussions`,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  };
  agoraStatesDiscussions.unshift(newDiscussion);
  const newDisObj = convertToDiscussion(newDiscussion);
  ul.prepend(newDisObj);

  inputName.value = "";
  inputTitle.value = "";
  inputStory.value = "";
}

inputSubmit.addEventListener("click", addDiscussion);

// 페이지네이션
const paginationNumbers = document.querySelector("#testPagination-numbers");
const paginatedList = document.querySelector(".discussions__container");
const listItems = paginatedList.querySelectorAll("li");
const nextBtn = document.querySelector("#testNext-button");
const prevBtn = document.querySelector("#testPrev-button");

const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableBtn = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableBtn = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableBtn(prevBtn);
  } else {
    enableBtn(prevBtn);
  }

  if (pageCount === currentPage) {
    disableBtn(nextBtn);
  } else {
    enableBtn(nextBtn);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".Pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("testPage-index"));
    if (pageIndex === currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = ".Pagination-number";
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevBtn.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextBtn.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".Pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
