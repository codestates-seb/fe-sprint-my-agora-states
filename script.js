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

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
// render(ul);

//Bare Mininum: 디스커션 추가 기능
const submitForm = document.querySelector("form");
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const title = document.querySelector("#title").value;
  const date = new Date();
  const elDiscussion = {
    createdAt: date,
    title: title,
    author: name,
    url: "https://github.com",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };
  agoraStatesDiscussions.unshift(elDiscussion);
  ul.innerHTML = "";
  render(ul);
});

//페이지 랜더링
const render = (element, start) => {
  for (let i = start; i < start + 10; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    console.log(i);
  }
  return;
};

render(ul, 0);

//페이지네이션
const pageNation = (currentPage, state) => {
  let start = 1;
  let end = Math.ceil(agoraStatesDiscussions.length / 10);
  const pageNumber = [];
  for (i = 1; i <= end; i++) {
    pageNumber.push(i);
  }
  console.log(pageNumber);

  if (state === "next") {
    render2(ul, currentPage + 10);
    state = "";
  }

  //페이지 표기
  const pageGuide = document.querySelector("#page");
  pageGuide.textContent = `${currentPage} of ${end}`;

  //1부터 end까지를 current of end로 표현
  //prev, next 버튼 생성
};

// const prevBtn = document.querySelector("#prev");
// const nextBtn = document.querySelector("#next");

// prevBtn.addEventListener("click", pageNation(1, "prev"));
// nextBtn.addEventListener("click", pageNation(1, "next"));

//Advanced: 페이지네이션, 디스커션 유지 (LocalStorage)
