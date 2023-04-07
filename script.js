// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let data;
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}
// -----------------------------------------------------
// 디스커션 추가 기능

// let elInputUsername = document.querySelector('#name');
// let elInputTitle = document.querySelector('#title');
// let elInputQuestion = document.querySelector('#story');
let today = new Date();
let year = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let day = ("0" + today.getDate()).slice(-2);
let dateString = year + "-" + month + "-" + day;

let hours = ("0" + today.getHours()).slice(-2);
let minutes = ("0" + today.getMinutes()).slice(-2);
let seconds = ("0" + today.getSeconds()).slice(-2);
let timeString = hours + ":" + minutes + ":" + seconds;

const form = document.querySelector(".form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = form.elements.name;
  let title = form.elements.title;
  let story = form.elements.story;

  // agoraStatesDiscussions.unshift({
  //   id: "",
  //   createdAt: `${dateString} / ${timeString}`, // 현재시간추가(현지시간에 맞춰 출력)
  //   title: title.value,
  //   url: "", // 제목을 눌렀을때, 질문이 작은 새로운 창으로 뜨게끔 하는 기능 추가 (story가 여기 들어가야함) -> 팝업창이 뜨게끔 시도해봄 -> 실패
  //   author: username.value,
  //   answer: "", // answer도 결국엔 렌더링 되게끔 해야되지만, 여기선 필요없을듯? (답변까지 제출하는 폼은 없으니까 추가되는 답변은 다루기가 좀 애매)
  //   bodyHTML: "",
  //   avatarUrl:
  //     "images.jpg",
  //   story: story.value
  // })
  const obj = {
    id: "",
    createdAt: `${dateString} / ${timeString}`, // 현재시간추가(현지시간에 맞춰 출력)
    title: title.value,
    url: "", // 제목을 눌렀을때, 질문이 작은 새로운 창으로 뜨게끔 하는 기능 추가 (story가 여기 들어가야함) -> 팝업창이 뜨게끔 시도해봄 -> 실패
    author: username.value,
    answer: "", // answer도 결국엔 렌더링 되게끔 해야되지만, 여기선 필요없을듯? (답변까지 제출하는 폼은 없으니까 추가되는 답변은 다루기가 좀 애매)
    bodyHTML: "",
    avatarUrl: "images.jpg",
    story: story.value,
  };
  data.unshift(obj);
  agoraStatesDiscussions.unshift(obj);
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));

  username.value = "";
  title.value = "";
  story.value = "";

  ul.prepend(convertToDiscussion(data[0]));
  alert("질문이 등록되었습니다");

  location.reload();
  // document.querySelector("pagination-number 1").click();
  // window.load();
  //   const target = document.querySelector('.btn_open');
  //   const btnPopClose = document.querySelector('.pop_inner .btn_close');
  //   let targetID;

  // target.addEventListener('click', function(){
  //   targetID = this.getAttribute('href');
  //   document.querySelector(targetID).style.display = 'block';
  // })

  // btnPopClose.addEventListener('click', function() {
  //   this.parentNode.style.display = 'none';
  // })
});

// ----------------------------------------------------------------
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
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  const discussionLink = document.createElement("a");
  discussionLink.setAttribute("href", obj.url);
  discussionLink.textContent = obj.title;
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent =
    obj.author + " / " + obj.createdAt.replace("T", " / ").replace("Z", "");
  discussionContent.append(discussionInformation);

  discussionAnswered.textContent = obj.answer ? "☑" : "☒";

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 새로운 배열요소부터 다르게 적용할 dom 요소 함수.

// const convertToDiscussion2 = (obj) => {
//   const li = document.createElement("li"); // li 요소 생성
//   li.className = "discussion__container"; // 클래스 이름 지정

//   const avatarWrapper = document.createElement("div");
//   avatarWrapper.className = "discussion__avatar--wrapper";
//   const discussionContent = document.createElement("div");
//   discussionContent.className = "discussion__content";
//   const discussionAnswered = document.createElement("div");
//   discussionAnswered.className = "discussion__answered";

//   // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
//   const avatarImg = document.createElement('img');
//   avatarImg.className = "discussion__avatar--image";
//   avatarImg.src = obj.avatarUrl;
//   avatarImg.alt = 'avatar of '+ obj.author;
//   avatarWrapper.append(avatarImg);

//   const pop = document.createElement('div');
//   const popText = document.createElement('p');
//   popText.textContent = obj.story;
//   const popBtn = document.createElement('button');
//   popBtn.setAttribute('type', 'button');
//   popBtn.className = 'btn_close';
//   popBtn.textContent = '닫기';
//   pop.className = 'pop_inner';
//   pop.setAttribute('style', 'display:none;');
//   pop.append(popText, popBtn);

//   const discussionLink = document.createElement('a');
//   discussionLink.setAttribute('href', ".pop_inner");
//   discussionLink.className = 'btn_open';
//   discussionLink.textContent = obj.title;
//   const discussionTitle = document.createElement('h2');
//   discussionTitle.className = "discussion__title"
//   discussionTitle.append(discussionLink);
//   discussionContent.append(discussionTitle);

//   const discussionInformation = document.createElement('div');
//   discussionInformation.className = "discussion__information";
//   discussionInformation.textContent = obj.author + ' / ' + obj.createdAt;
//   discussionContent.append(discussionInformation);

//   discussionAnswered.textContent = obj.answer ? "☑" : "☒";;

//   li.append(avatarWrapper, discussionContent, discussionAnswered);
//   return li;
// };

// data 배열의 모든 데이터를 화면에 렌더링하는 함수 입니다.
// const render = (element, from, to) => {
//   if(!from && !to) {
//     from = 0;
//     to = data.length - 1;
//   }

//   while (element.firstChild) {
//     element.removeChild(element.firstChild);
//   }
//   for(let i = from; i < to; i += 1) {
//     element.append(convertToDiscussion(data[i]));
//   }
//   return
// }

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < data.length; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// ------------------------------------------------------------
// 페이지네이션

const paginationNumbers = document.querySelector(".pagination-numbers");
const paginatedList = document.querySelector(".paginated-list");
const listItems = paginatedList.querySelectorAll("li");
const paginationLimit = 10;

const pageCount = Math.ceil(listItems.length / paginationLimit);

let currentPage;

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = `pagination-number ${index}`;
  pageNumber.setAttribute("page-index", index);
  pageNumber.textContent = index;

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

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

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");

    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex === currentPage) {
      button.classList.add("active");
    }
  });
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

// test용주석
