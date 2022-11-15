// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let data;
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
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
  //avatar image
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  //discussion title
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  //discussion a tag
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);

  //discussion author
  const discussionAuthor = document.createElement("div");
  discussionAuthor.className = "discussion__information";
  discussionAuthor.textContent = obj.author;
  discussionContent.append(discussionAuthor);

  //duscussion time
  const discussionTime = document.createElement("div");
  discussionTime.className = "discussion__time";
  discussionTime.textContent = new Date(obj.createdAt).toLocaleString();
  discussionContent.append(discussionTime);

  //discussion check
  const discussionCheck = document.createElement("p");
  discussionCheck.className = "check";
  discussionCheck.textContent = obj.answer ? "✅" : "❎";
  discussionContent.append(discussionCheck);

  //more button
  const discussionAnswerButton = document.createElement("button");
  discussionAnswerButton.className = "more";
  discussionAnswerButton.textContent = "자세히 보기";
  discussionContent.append(discussionAnswerButton);

  li.append(
    discussionContent,
    avatarWrapper,
    discussionAnswered,
    discussionCheck
  );
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, from, to) => {
  console.log(from, to);
  if (!from && !to) {
    from = 0;
    to = data.length - 1;
  }
  // 다 지우고 배열에 있는 내용 다 보여주기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

//form submit
const form = document.querySelector("form.form"); //form의 class인 form
const inputName = document.querySelector(".form__input--name > input");
const inputTitle = document.querySelector(".form__input--title > input");
const inputQuestion = document.querySelector(".form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault(); //새로고침 막기
  //id는 임의의 값 넣기, 자동으로 주기 때문
  let obj = {
    id: "999",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/25774030?s=64&v=4",
  };

  //데이터 맨 앞에다 추가
  data.unshift(obj);
  //하나의 돔으로 만든 다음에 전체 컨테이너인 ul에 맨 앞에다가 추가
  ul.prepend(convertToDiscussion(obj));

  //초기화
  inputName.value = "";
  inputTitle.value = "";
  inputQuestion.value = "";
  // 로컬스토리지에 저장
  console.log(data);
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//pagination
let currentPage = 1; // current page, 1

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const discussions = ul.children; // discussion
let total = discussions.length; // discussion li amount
const pageAmount = 5; // button amount
const pageLimit = 10; // how many pages

// total page = ceil total / how many pages you want to show
let totalPage = Math.ceil(total / pageLimit);

// pageGroup = ceil current/ how many buttons you wnat to show
let pageGroup = Math.ceil(currentPage / pageAmount);

// find the first and last page number
let lastPageNumber = pageGroup * pageAmount;
if (lastPageNumber > totalPage) {
  lastPageNumber = totalPage;
}
let firstPageNumber = (pageGroup - 1) * pageAmount + 1;
let numberButtons = document.querySelectorAll(".pagination--number");

// pageGroup buttons
const makeNumberButtons = () => {
  for (let i = firstPageNumber; i <= lastPageNumber; i++) {
    const pageNumberButton = document.createElement("li");
    pageNumberButton.classList.add("pagination--number");
    pageNumberButton.setAttribute("id", `button__pagination--num${i}`);
    pageNumberButton.textContent = i;
    next.before(pageNumberButton);
    numberButtons = document.querySelectorAll(".pagination--number");
  }
};
makeNumberButtons();

// curretn page index
const currentPageIndex = () => {
  numberButtons.forEach((el) => {
    el.classList.remove("current__page");
  });
  let currentPageButton = document.querySelector(
    `#button__pagination--num${currentPage}`
  );
  currentPageButton.classList.add("current__page");
};
currentPageIndex();

// 10 discussions for each page
const pageChange = () => {
  // total, total page, last page's number
  total = discussions.length;
  totalPage = Math.ceil(total / pageLimit);
  lastPageNumber = pageGroup * pageAmount;

  if (lastPageNumber > totalPage) {
    lastPageNumber = totalPage;
  }
  let firstIndexNum = (currentPage - 1) * pageLimit; //0
  let lastIndexNum = currentPage * pageLimit - 1; //9
  for (let i = 0; i < total; i++) {
    if (i < firstIndexNum || i > lastIndexNum) {
      discussions[i].style = "display : none";
    } else {
      discussions[i].style = "display : flex";
    }
  }
};
pageChange();

// page button cllick event
const pageClickEvent = () => {
  currentPageIndex();
  pageChange();
};

numberButtons.forEach((el) => {
  el.addEventListener("click", (event) => {
    let selectedNum = Number(event.target.textContent);
    currentPage = selectedNum;
    pageClickEvent();
  });
});

// prev page click event
prev.addEventListener("click", () => {
  if (currentPage === firstPageNumber) {
    if (currentPage === 1) {
      return;
    } else {
      numberButtons.forEach(function (button) {
        button.remove();
      });
      pageGroup -= 1;
      lastPageNumber = pageGroup * pageAmount;
      if (lastPageNumber > totalPage) {
        lastPageNumber = totalPage;
      }
      firstPageNumber = (pageGroup - 1) * pageAmount + 1;
      makeNumberButtons();
      numberButtons.forEach((el) => {
        el.addEventListener("click", (event) => {
          let selectedNum = Number(event.target.textContent);
          currentPage = selectedNum;
          pageClickEvent();
        });
      });
    }
  }
  currentPage -= 1;
  pageClickEvent();
});

// next button click event
next.addEventListener("click", () => {
  if (currentPage === lastPageNumber) {
    if (lastPageNumber === totalPage) {
      return;
    } else {
      numberButtons.forEach(function (button) {
        button.remove();
      });
      pageGroup += 1;
      lastPageNumber = pageGroup * pageAmount;
      if (lastPageNumber > totalPage) {
        lastPageNumber = totalPage;
      }
      firstPageNumber = (pageGroup - 1) * pageAmount + 1;
      makeNumberButtons();
      numberButtons.forEach((el) => {
        el.addEventListener("click", (event) => {
          let selectedNum = Number(event.target.textContent);
          currentPage = selectedNum;
          pageClickEvent();
        });
      });
    }
  }
  currentPage += 1;
  pageClickEvent();
});

//scrolltotop
const scrollButton = document.querySelector(".scroll");
let intervalId = 0;

function scrollStep(scrollStepHeight) {
  if (window.pageYOffset === 0) {
    clearInterval(intervalId);
  }
  window.scrollTo(0, window.pageYOffset - scrollStepHeight);
}

function scrollToTop(scrollStepHeight, delay) {
  if (scrollStepHeight <= 0) {
    alert("The specified scroll step height must be positive!");
  } else if (delay <= 0) {
    alert("The specified scroll delay must be positive!");
  }
  intervalId = setInterval(() => scrollStep(scrollStepHeight), delay);
}

scrollButton.addEventListener("click", () => scrollToTop(90, 16.6));

//audio play section
const bars = document.querySelectorAll(".audiobar");
const audioContainer = document.querySelector(".audio--container");
const audio = document.querySelector("audio");
let interval = null;

bars.forEach((bar) => {
  let size = Math.random();
  bar.style.transform = `scaleY(${size})`;
});

audioContainer.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
    audio.pause();
    interval = null;

    bars.forEach((bar) => {
      bar.style.background = `white`;
    });
    return;
  } else {
    audio.play();
    interval = setInterval(() => {
      bars.forEach((bar) => {
        let size = Math.random();
        let hue = Math.floor(Math.random() * 360);
        bar.style.transform = `scaleY(${size})`;
        bar.style.background = `hsl(${hue}, 70%, 60%)`;
      });
    }, 150);
  }
});

audio.addEventListener("ended", () => {
  clearInterval(interval);
});
