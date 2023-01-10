// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//제출하면 화면에 표시
const ul = document.querySelector("ul.discussions__container");
const elPageBtnList = document.querySelector(".pageBtnList");
function saveDiscussions() {
  localStorage.setItem("discussion", JSON.stringify(agoraStatesDiscussions));
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

  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author; //되게 당연한건데... agoraStatesDiscussions[0]이렇게 생각해서, 해답찾는데 오래걸림
  avatarWrapper.append(avatarImg);
  avatarImg.className = "discussion__avatar--image";

  const discussionTitle = document.createElement("h2");
  const discussuonTitleLink = document.createElement("a");

  discussuonTitleLink.href = obj.url;
  discussuonTitleLink.textContent = obj.title;
  discussionTitle.append(discussuonTitleLink);
  discussionContent.append(discussionTitle);
  discussionTitle.className = "discussion__title";

  const discussionInformation = document.createElement("div");
  discussionInformation.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionInformation);
  discussionInformation.className = "discussion__information";

  const discussionAnsweredP = document.createElement("p");
  discussionAnsweredP.textContent = obj.answer ? "✅" : "";
  discussionAnswered.append(discussionAnsweredP);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  ul.append(li);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (num, arr) => {
  for (let i = 0 + num * 10; i < num * 10 + 10; i += 1) {
    ul.append(convertToDiscussion(arr[i]));
  }
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

let addBtn = document.querySelector(".form__submit_btn");
const addList = () => {
  let addDiscussionsName = document.querySelector("#input-name").value;
  let addDiscussionsTitle = document.querySelector("#input-title").value;
  let addDiscussionsStory = document.querySelector("#input-story").value;

  const addObj = {
    author: addDiscussionsName,
    title: addDiscussionsTitle,
    story: addDiscussionsStory,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    url: "",
    createdAt: thisClock(),
  };

  document.querySelector("#input-name").value = "";
  document.querySelector("#input-title").value = "";
  document.querySelector("#input-story").value = "";

  agoraStatesDiscussions.unshift(addObj);

  document.querySelector("ul").innerHTML = ""; //이거 나중에 수정해서 다른 방법으로 삭제??
  while (elPageBtnList.hasChildNodes()) {
    elPageBtnList.removeChild(elPageBtnList.lastChild);
  }
  saveDiscussions();

  pageNation();
  render(0, agoraStatesDiscussions);
  pageBtnClick();
  //얘 리스트에 추가하는 함수 만들것...??render함수를 실행하는 함수가 필요할 듯함...
}; //제출한 내용을 배열에 추가 하는 함수

function clock(today) {
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let hour = ("0" + today.getHours()).slice(-2);
  let minute = ("0" + today.getMinutes()).slice(-2);
  let second = ("0" + today.getSeconds()).slice(-2);
  let todayString = `${year}-${month}-${day} / ${hour} : ${minute} : ${second}`;

  return todayString;
}
function thisClock() {
  today = new Date();
  return clock(today);
}
function pageNation() {
  const numOfContent = agoraStatesDiscussions.length;
  const showContent = 10;
  const maxPage = Math.ceil(numOfContent / showContent);

  for (let pageNum = 1; pageNum <= maxPage; pageNum++) {
    const pageButton = document.createElement("button");
    pageButton.classList.add("page-button");
    pageButton.innerText = pageNum;
    elPageBtnList.append(pageButton);
  }
}

function pageBtnClick() {
  let clickedPageBtn = document.querySelectorAll(".page-button");

  [].forEach.call(clickedPageBtn, (btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelector("ul").innerHTML = "";
      render(parseInt(e.target.innerText - 1), agoraStatesDiscussions);
      console.log(`${e.target.innerText}`);
    });
  });
}

addBtn.addEventListener("click", addList);
const savedDiscussions = localStorage.getItem("discussion");

const parsedDiscussions = JSON.parse(savedDiscussions);

if (parsedDiscussions !== null) {
  agoraStatesDiscussions = parsedDiscussions;
}

render(0, agoraStatesDiscussions);
pageNation();
pageBtnClick();

console.log([...parsedDiscussions]);
