const pageNum = document.querySelector("#pagination-numbers");
const li = ul.querySelectorAll("li");

const paginationLimit = 10;
let pageCount = Math.ceil(agoraStatesDiscussions.length / paginationLimit);

let currentPage;

const appendPage = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "page-number";
  pageNumber.textContent = index;

  pageNum.appendChild(pageNumber);
};

const renderPage = () => {
  let child = pageNum.lastElementChild;
  while (child) {
    pageNum.removeChild(child);
    child = pageNum.lastElementChild;
  }
  for (let i = 1; i <= pageCount; i++) {
    appendPage(i);
  }

  document.querySelectorAll(".page-number").forEach((button) => {
    const pageIndex = button.textContent;
    if (pageIndex === "1") {
      button.classList.add("active");
    }

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
        let buttons = pageNum.children;
        for (button of buttons) {
          button.classList.remove("active");
        }
        buttons[pageIndex - 1].classList.add("active");
      });
    }
  });
};

window.addEventListener("load", () => {
  renderPage();
  setCurrentPage(1);
});

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;
  const prevRange = (pageNum - 1) * paginationLimit;
  const currentRange = pageNum * paginationLimit;

  li.forEach((item, index) => {
    item.classList.add("hide");
    if (index >= prevRange && index < currentRange) {
      item.classList.remove("hide");
    }
  });
};
