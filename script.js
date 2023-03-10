// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
window.onload = function() {
  if (localStorage.getItem("new_Data")) {
    let T = [];
    T = JSON.parse(localStorage.getItem("new_Data"));
    // let localData = JSON.parse(T[0]);
    console.log(T);
  }
}
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
  
  let discussionToLink = undefined;
  if (obj.url === null) {
    discussionToLink = document.createElement("p");
    discussion__title.appendChild(discussionToLink);
  }
  else {
    discussionToLink = document.createElement("a");
    discussion__title.appendChild(discussionToLink);
    discussionToLink.setAttribute("href", obj.url);
  }
  discussionToLink.textContent = obj.title;
  let T = obj.createdAt;
  console.log(T);
  const formattedDateString = T.replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/, (_, year, month, day, hour, minute, second) =>
  `${year}년 ${Number(month)}월 ${Number(day)}일 ${Number(hour)}시 ${Number(minute)}분 ${Number(second)}초`
);
  discussion__information.textContent = `${obj.author} / ${formattedDateString}`;

  const discussionToP = document.createElement("p");
  discussionAnswered.appendChild(discussionToP);
  discussionToP.textContent = (obj.answer === null ? "⛔" : "✅");

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
  elPagination.forEach((el) => {
    const pageNum = parseInt(el.textContent);
    if (pageNum === currentPage) {
      el.classList.add("current_button");
      return;
    }
    el.classList.remove("current_button");
  })
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

      currentPage = parseInt(elPagination[i].children[0].textContent);
      
      elPagination.forEach((el) => {
        const pageNum = parseInt(el.textContent);
        console.log(pageNum === currentPage);
        if (pageNum === currentPage) {
          el.classList.add("current_button");
          return;
        }
        el.classList.remove("current_button");
      })
      
      render(ul);
    }
  }
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  sessionStorage.setItem("totalLength", agoraStatesDiscussions.length);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = (currentPage - 1) * 8; i < currentPage * 8; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  document.querySelector(".total_agora_list").textContent = `총 Agora List 수 : ${sessionStorage.getItem("totalLength")}개`;
  
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

const now = new Date();
const koreanDateString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}Z`;
  console.log(koreanDateString);
  const newData = {
    id: "몰루",
    createdAt: koreanDateString,
    title: titleData.value,
    url: null,
    author: nameData.value,
    answer: null,
    bodyHTML: storyData.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
}
  agoraStatesDiscussions.unshift(newData);
  if (localStorage.getItem("new_Data")) {
    localStorage.setItem("new_Data", localStorage.getItem("new_Data") + `,${JSON.stringify(newData)}`);
  }
  else {
    localStorage.setItem("new_Data", JSON.stringify(newData));
  }
  render(ul);
  pagination();
  
  alert("데이터가 입력되었습니다.");
  nameData.value = "";
  titleData.value = "";
  storyData.value = "";
  modal.classList.remove("modal_open_animation");
}