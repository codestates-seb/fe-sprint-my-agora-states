const paginationNumbers = document.querySelector("#pagination-numbers");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");
const paginationLimit = 10;
let currentPage;

const ul = document.querySelectorAll("ul.discussions__container");

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

  const pageCount = Math.ceil(render(ul).length / 10);

  for (let i = 1; i <= pageCount; i += 1) {
    appendPageNumber(i);
  }
};

// Display Active Page
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  const paginatedList = document.querySelectorAll(
    "ul.discussions__container"
  )[1];
  const listItems = paginatedList.querySelectorAll("li");
  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
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

prevButton.addEventListener("click", () => {
  setCurrentPage(currentPage - 1);
});

nextButton.addEventListener("click", () => {
  setCurrentPage(currentPage + 1);
});

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});

discussionForm.addEventListener("submit", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});


// 출처: https://webdesign.tutsplus.com/tutorials/pagination-with-vanilla-javascript--cms-41896