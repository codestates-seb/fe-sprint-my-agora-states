const paginationNumbers = document.querySelector("#pagination-numbers");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");
const paginationLimit = document.querySelector("#pagination-limit");
let currentPage;

// 공지와 일반질문 분류하기
const sortingDiscussion = () => {
  let localDiscussion = JSON.parse(localStorage.getItem("local-discussion"));
  if (localDiscussion === null) {
    localDiscussion = [];
  }
  const AllDiscussions = localDiscussion.concat(agoraStatesDiscussions);
  return {
    noti: AllDiscussions.filter((element) => element.notice === true),
    normal: AllDiscussions.filter((element) => !element.notice),
  };
};

// Add Page Numbers
const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("label", "Page" + index);

  paginationNumbers.append(pageNumber);
};

const getPaginationNumbers = () => {
  paginationNumbers.innerHTML = "";

  const { noti, normal } = sortingDiscussion();

  const pageCount = Math.ceil(normal.length / Number(paginationLimit.value));

  for (let i = 1; i <= pageCount; i += 1) {
    appendPageNumber(i);
  }
  return { noti, normal };
};

// Display Active Page
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * Number(paginationLimit.value);
  const currRange = pageNum * Number(paginationLimit.value);
  return { prevRange, currRange };
};

// Set Active Page Number
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex === currentPage) {
      button.classList.add("active");
    }
  });
};

// Disable Page Navigation Buttons
const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  pageCount = paginationNumbers.querySelectorAll("button").length;
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

// 출처: https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896
