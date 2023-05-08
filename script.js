/* light/dark theme */
const themeBtn = document.querySelector("#chkbox");
const themeContainerIcon = document.querySelector(".theme__container i");

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.classList.add("dark");
  themeContainerIcon.classList.add("fa-moon");
}

themeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    themeContainerIcon.classList.remove("fa-sun");
    themeContainerIcon.classList.add("fa-moon");
  } else {
    themeContainerIcon.classList.add("fa-sun");
    themeContainerIcon.classList.remove("fa-moon");
  }
});

/* Local Storage */
let discussionsList;

if (localStorage.getItem("discussions") === null) {
  discussionsList = agoraStatesDiscussions;
  localStorage.setItem("discussions", JSON.stringify(discussionsList));
} else {
  discussionsList = JSON.parse(localStorage.getItem("discussions"));
}
// console.log("discussionsList", discussionsList);

/* discussion List */
// create discussion list
const ul = document.querySelector(".discussions__container");
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";
  li.setAttribute("id", obj.id);
  
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  
  // avatarWrapper
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
  // discussionContent
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionTitle.textContent = obj.title;
  // const discussionTitleLink = document.createElement("a");
  // discussionTitleLink.href = obj.url;
  // discussionTitle.append(discussionTitleLink);
  
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  const discussionInformationAuthor = document.createElement("span");
  discussionInformationAuthor.className = "discussion__author";
  discussionInformationAuthor.textContent = obj.author;
  
  const discussionInformationDate = document.createElement("span");
  discussionInformationDate.className = "discussion__date";
  discussionInformationDate.textContent = convertToCreateDate(obj.createdAt);
  discussionInformation.append(discussionInformationAuthor, discussionInformationDate)

  discussionContent.append(discussionTitle, discussionInformation);

  // discussionAnswered
  const discussionAnsweredCheckmark = document.createElement("p");
  if (!(obj.answer === null)) {
    discussionAnsweredCheckmark.classList.add("complete");
    discussionAnsweredCheckmark.textContent = "답변완료";
  } else {
    discussionAnsweredCheckmark.classList.add("inprogress");
    discussionAnsweredCheckmark.textContent = "답변대기";
  }
  discussionAnswered.append(discussionAnsweredCheckmark);

  // discussionDelete
  const discussionDelete = document.createElement("div");
  discussionDelete.className = "discussion__delete";
  const discussionDeleteBtn = document.createElement("button");
  discussionDeleteBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>"
  discussionDelete.append(discussionDeleteBtn);
  discussionDelete.addEventListener("click", deleteDiscussion);

  
  li.append(avatarWrapper, discussionContent, discussionAnswered, discussionDelete);
  return li; 
}

// render discussion list
const render = (element) => {
  for (let i = 0; i < discussionsList.length; i += 1) {
    element.append(convertToDiscussion(discussionsList[i]));
  }
  return;
};
render(ul);

// convert date 
function convertToCreateDate(time) { // 2023.5.6 PM 4:46
  const createdDate = new Date(time);
  const year = createdDate.getFullYear();
  const month = createdDate.getMonth() + 1;
  const date = createdDate.getDate();
  const hour = createdDate.getHours();
  const minutes = createdDate.getMinutes();
  
  let amPm;
  
  if ( hour > 12 ) {
    amPm = `PM ${hour - 12}`;
  } else {
    amPm = `AM ${hour}`;
  }

  return `${year}.${month}.${date} ${amPm}:${minutes}`;
}

// convert date 다른 방법 // 2022. 5. 16. 오전 10:02:17
// function convertToCreateDate(time) { 
//   return new Date(time).toLocaleString(); 
// }

/* Discussion Form */
const questionBtn = document.querySelector(".form__create > button");
const questionForm = document.querySelector(".form");
const questionText = document.querySelector(".textBtn");

const formInputName = document.querySelector(".form__input--name input");
const formInputTitle = document.querySelector(".form__input--title input");
const formTextbox = document.querySelector(".form__textbox textarea");
const formSubmitBtn = document.querySelector(".form__submit button");

// form open
questionBtn.addEventListener("click", () => {
  questionForm.classList.toggle("close");
  resetForm();
  changeFormText();
  resizeDiscussionsContainer();
});

// form reset
const resetForm = () => {
  formInputName.value = "";
  formInputTitle.value = "";
  formTextbox.value = "";
}

// change text
const changeFormText = () => {
  if (questionForm.classList.contains("close")) {
    questionText.innerHTML = "<i class='fa-regular fa-comment'></i>새 포스트";
  } else {
    questionText.textContent = "닫기";
  }
}

// form submit 
questionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newDiscussion = {
    id: String(new Date().getTime()),
    createdAt: new Date().toISOString(),
    title: formInputTitle.value,
    url: "#",
    author: formInputName.value,
    answer: null,
    bodyHTML: formTextbox,
    avatarUrl: "image.png",
  }

  discussionsList.unshift(newDiscussion);
  ul.prepend(convertToDiscussion(newDiscussion));
  
  localStorage.setItem("discussions", JSON.stringify(discussionsList));
  // console.log("생성완료", discussionsList);
  
  questionForm.classList.add("close");

  resetForm();
  changeFormText();
  resizeDiscussionsContainer();
  loadPagination()
});

// delete list
function deleteDiscussion(e) {
  const deleteItem = e.target.closest(".discussion__container");

  if (confirm("정말 삭제하시겠습니까?")) {
    ul.removeChild(deleteItem);

    const updatedDiscussionsList = discussionsList.filter((list) => {
      return list.id !== deleteItem.id;
    });

    // update discussionsList
    localStorage.setItem("discussions", JSON.stringify(updatedDiscussionsList));
    discussionsList = updatedDiscussionsList;
    // console.log("삭제완료", discussionsList);

    loadPagination()
  }
}

// resize discussions container 
const formContainer = document.querySelector(".form__container");
const discussionWrapper = document.querySelector(".discussion__wrapper");

function resizeDiscussionsContainer() {
  let formContainerHeight = formContainer.offsetHeight;
  // console.log("formContainerHeight", formContainerHeight)
  discussionWrapper.style.height = `calc(100% - ${formContainerHeight}px)`;
}
resizeDiscussionsContainer();


/* pagination */
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const pageNumbers = document.querySelector(".pageNumbers");
let discussionList = document.querySelectorAll(".discussion__container");

const contentLimit = 10;
let pageCount = Math.ceil(discussionList.length / contentLimit);
let currentPage = 1;

// create page numbers
const displayPageNumbers = (index) => {
  const pageNumber = document.createElement("a");
  pageNumber.textContent = index;
  pageNumber.setAttribute("href", "#");
  pageNumber.setAttribute("index", index);
  pageNumbers.append(pageNumber);
};

const getPageNumbers = () => {
  for (let i=1; i<=pageCount; i++) {
      displayPageNumbers(i);
  };
};

// handle prev, next btn 
const disableButton = (button) => button.setAttribute("disabled", true);
const enableButton = (button) => button.removeAttribute("disabled");
const handleButtonsStatus = () => {
  currentPage === 1 ? disableButton(prevBtn) : enableButton(prevBtn);
  currentPage === pageCount ? disableButton(nextBtn) : enableButton(nextBtn);
};

prevBtn.addEventListener("click", () => {   
  setCurrentPage(currentPage - 1);
});

nextBtn.addEventListener("click", () => {
  setCurrentPage(currentPage + 1);
});

// handle active page
const handleActivePageNumber = () => {
  document.querySelectorAll(".pageNumbers a").forEach((pageNum) => {
    pageNum.classList.remove("active");

      const pageIndex = Number(pageNum.getAttribute("index"));
      if (pageIndex === currentPage) {
        pageNum.classList.add('active');
      }
  });
};

// set current page
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handleButtonsStatus();

  const prevRange = (pageNum - 1) * contentLimit;
  const currRange = pageNum * contentLimit;

  discussionList.forEach((item, index) => {
      item.classList.add("hidden");
      if (index >= prevRange && index < currRange) {
          item.classList.remove("hidden");
      }
  });
};

// reload pagination
const loadPagination = () => {
    discussionList = document.querySelectorAll(".discussion__container");
    pageCount = Math.ceil(discussionList.length / contentLimit);

    while (pageNumbers.firstChild) {
      pageNumbers.removeChild(pageNumbers.firstChild);
    }
    
    getPageNumbers();
    setCurrentPage(1);

    document.querySelectorAll(".pageNumbers a").forEach((pageNum) => {
      const pageIndex = Number(pageNum.getAttribute("index"));
    
      if (pageIndex) {
          pageNum.addEventListener('click', () => {
              setCurrentPage(pageIndex);
          });
      };
    });
}

// window load
window.addEventListener("load", () => {
  loadPagination();
});