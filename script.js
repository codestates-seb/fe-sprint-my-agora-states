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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImage = document.createElement("img");
  avatarImage.setAttribute('src', obj.avatarUrl);
  avatarImage.setAttribute('alt', `avatar of ${obj.author}`)
  avatarImage.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement("h2");
  discussionTitle.classList.add("discussion__title");
  const discussionTitleLink = document.createElement("a");
  discussionTitleLink.setAttribute('href', obj.url);
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);
  discussionContent.append(discussionTitle);
  const discussionInfo = document.createElement("div");
  discussionInfo.classList.add('discussion__information');
  discussionInfo.textContent = `${obj.author} / ${(new Date(obj.createdAt)).toLocaleString()}`;
  discussionContent.append(discussionInfo);
  
  const discussionAnsweredCheck = document.createElement('p');
  if (obj.answer !== null) {
    discussionAnsweredCheck.textContent = '☑';
  } else {
    discussionAnsweredCheck.textContent = '☒';
  }
  
  discussionAnswered.append(discussionAnsweredCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

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

// submit을 누르면 배열 추가
const submitButton = document.querySelector(".form__submit input");
const inputName = document.querySelector(".form__input--name input");
const inputTitle = document.querySelector(".form__input--title input");
const inputQuest = document.querySelector(".form__textbox textarea");
submitButton.onclick = function(e) {
  e.preventDefault();
  if (!inputName.value || !inputTitle.value || !inputQuest.value) {
    alert("입력되지 않은 항목이 있습니다.");
  } else {
    agoraStatesDiscussions.unshift({id: "D_kwDOHOApLM4APjJi",
    createdAt: new Date(),
    title: `${inputTitle.value}`,
    author: `${inputName.value}`,
    answer: null,
    avatarUrl:
    "https://avatars.githubusercontent.com/u/85952797?v=4",
  });
    ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
    alert("질문이 등록되었습니다");
  }
};

/* pagination */
const paginationNumbers = document.querySelector(".pagination-numbers");
const paginatedList = document.querySelector(".paginated-list");
const listItems = paginatedList.querySelectorAll("li");
const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");

const paginationLimit = 7;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage;

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", `Page ${index}`);

  paginationNumbers.appendChild(pageNumber);
}

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
}

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      })
    }
  })
})

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove('active');

    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex === currentPage) {
      button.classList.add("active");
    }
  })
}

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add('hidden');
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  })
}

