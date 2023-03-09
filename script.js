// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
const ul = document.querySelector("ul.discussions__container");
let elPagination = document.querySelectorAll("#pagination li");
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
  const imgSetting = document.createElement("img");
  imgSetting.className = "discussion__avatar--image";
  avatarWrapper.appendChild(imgSetting);
  imgSetting.setAttribute("src", obj.avatarUrl);

  const discussion__title = document.createElement("h2");
  const discussion__information = document.createElement("div");
  discussionContent.appendChild(discussion__title);
  discussionContent.appendChild(discussion__information);
  
  const discussionToLink = document.createElement("a");
  discussion__title.appendChild(discussionToLink);
  discussionToLink.setAttribute("href", obj.url);
  discussionToLink.textContent = obj.title;
  discussion__information.textContent = `${obj.author} / ${obj.createdAt}`;

  const discussionToP = document.createElement("p");
  discussionAnswered.appendChild(discussionToP);
  discussionToP.textContent = (obj.answer === null ? "X" : "O");

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
let currentPage = 1;
const pagination = () => {
  let pageGroup = Math.ceil(currentPage / 5);
  let lastPage = pageGroup * 5;
  let firstPage = lastPage - (5 - 1);
  let totalPageCount = Math.ceil(agoraStatesDiscussions.length / 8);
  let prev = firstPage - 1;

  if (lastPage > totalPageCount) {
    lastPage = totalPageCount;
  }

  while (document.querySelector("#pagination").firstChild) {
    document.querySelector("#pagination").removeChild(document.querySelector("#pagination").firstChild);
  }

  const fragmentPage = document.createDocumentFragment();

  if (prev > 0) {
    let prevPaging = document.createElement("li");
    prevPaging.insertAdjacentHTML("beforeend", `<button id="prev"><</button>`)
    fragmentPage.appendChild(prevPaging);
  }

  for (let i = firstPage; i <= lastPage; i++) {
    const elFooter = document.createElement("li");
    elFooter.insertAdjacentHTML("beforeend", `<button>${i}</button>`);
    fragmentPage.appendChild(elFooter);
  }

  if (lastPage < totalPageCount) {
    let nextPaging = document.createElement("li");
    nextPaging.insertAdjacentHTML("beforeend", `<button id="next">></button>`)
    fragmentPage.appendChild(nextPaging);
  }

  document.querySelector("#pagination").append(fragmentPage);

  elPagination = document.querySelectorAll("#pagination li");
  for (let i = 0; i < elPagination.length; i++) {
    elPagination[i].onclick = function () {
      if (elPagination[i].children[0].textContent === "<") {
        let len = elPagination.length;
        for (let j = 0; j < len; j++) {
          document.querySelector("#pagination").removeChild(elPagination[j]);
        }
        pageGroup--;
        currentPage = (pageGroup * 5);
        console.log(currentPage);
        pagination();
        render(ul);
        return;
      }
      if (elPagination[i].children[0].textContent === ">") {
        let len = elPagination.length;
        for (let j = 0; j < len; j++) {
          document.querySelector("#pagination").removeChild(elPagination[j]);
        }
        currentPage = (pageGroup * 5 + 1);
        pagination();
        render(ul);
        return;
      }
      currentPage = elPagination[i].textContent;
      render(ul);
    }
  }
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = (currentPage - 1) * 8; i < currentPage * 8; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

render(ul);
pagination();

let formSubmit = document.querySelector(".form");
const nameData = document.querySelector("#name");
const titleData = document.querySelector("#title");
const storyData = document.querySelector("#story");

formSubmit.onsubmit = function (event) {
  event.preventDefault();

  agoraStatesDiscussions.unshift({
      id: "몰루",
      createdAt: new Date(),
      title: titleData.value,
      url: null,
      author: nameData.value,
      answer: null,
    bodyHTML: storyData.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    })

  render(ul);
  pagination();
}