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
  discussionAnswered.textContent = obj.answer === null ? "□" : "☑";
  //answer null인 경우 check X

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionUrl = document.createElement("a");
  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title;
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent =
    obj.author + "/" + new Date(obj.createdAt).toLocaleString();

  discussionTitle.append(discussionUrl);
  discussionContent.append(discussionTitle, discussionInfo);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const pageGuide = document.querySelector("#page");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

//Bare Mininum: 디스커션 추가 기능
const submitForm = document.querySelector("form");

//페이지 랜더링
const render = (element, start) => {
  let discussions;
  if (sessionStorage.getItem("discussions")) {
    console.log("ok");
    discussions = sessionStorage.getItem("discussions");
    discussions = JSON.parse(discussions);
  } else {
    sessionStorage.setItem(
      "discussions",
      JSON.stringify(agoraStatesDiscussions)
    );
  }
  for (let i = start; i < start + 10; i += 1) {
    element.append(convertToDiscussion(discussions[i]));
    if (i + 1 === discussions.length) break;
  }
  start += 9;
  console.log("start: " + start);
  pageGuide.textContent = `${Math.ceil(start / 10)} of ${Math.ceil(
    discussions.length / 10
  )}`;
  return start;
};

let currentpage = render(ul, 0);

//페이지네이션
const pageNation = (currentpage, state) => {
  let end = Math.ceil(agoraStatesDiscussions.length / 10);

  if (state === "next") {
    ul.innerHTML = "";
    return render(ul, currentpage);
  } else if (state === "prev") {
    ul.innerHTML = "";
    return render(ul, currentpage);
  }
  //페이지 표기
  const pageView = Math.ceil(currentpage / 10);
  pageGuide.textContent = `${pageView} of ${end}`;
};

//페이지 버튼 보이기 여부
const btnVisible = () => {
  const end = Math.ceil(agoraStatesDiscussions.length / 10);
  const nowPage = Math.ceil(currentpage / 10);
  console.log("end: " + end);
  console.log("now: " + nowPage);
  if (nowPage >= end) {
    prevBtn.classList.remove("hide");
    nextBtn.classList.add("hide");
  } else if (nowPage === 1) {
    prevBtn.classList.add("hide");
    nextBtn.classList.remove("hide");
  } else {
    prevBtn.classList.remove("hide");
    nextBtn.classList.remove("hide");
  }
};

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const title = document.querySelector("#title").value;
  const date = new Date();
  const elDiscussion = {
    answer: null,
    createdAt: date,
    title: title,
    author: name,
    url: "https://github.com",
    avatarUrl: "./img/user.png",
  };
  let localData = sessionStorage.getItem("discussions");
  localData = JSON.parse(localData);
  localData.unshift(elDiscussion);
  console.log(localData);
  sessionStorage.setItem("discussions", JSON.stringify(localData));
  ul.innerHTML = "";
  currentpage = render(ul, 0);
});

prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentpage = pageNation(currentpage - 19, "prev");
  btnVisible();
});
nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentpage = pageNation(currentpage + 1, "next");
  btnVisible();
});
