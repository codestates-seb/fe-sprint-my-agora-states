let time = new Date();

if (localStorage.getItem("key") != undefined) {
  let before_render = JSON.parse(localStorage.getItem("key"));
  for (let i = 0; i < before_render.length; i++) {
    agoraStatesDiscussions.unshift(before_render[i]);
  }
}

let page = 1;
localStorage.getItem("page") == undefined
  ? (page = 1)
  : (page = Number(localStorage.getItem("page")));
document.getElementsByClassName("page__state__now")[0].textContent = page;
// document.getElementsByClassName("page__state__now")[1].textContent = page;
let min_page = 1;
let max_page = Math.floor(agoraStatesDiscussions.length / 10) + 1;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 이미지 박스
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  // 이미지태그
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = obj.author;

  // 이미지 박스에 이미지 태그 삽입
  avatarWrapper.append(avatarImage);

  // 타이틀 박스
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  // h2 타이틀
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  // a 태그
  const discussionTitleLink = document.createElement("a");
  discussionTitleLink.href = obj.url;
  discussionTitleLink.target = "_blank";
  discussionTitleLink.append(obj.title);

  // h2타이틀 태그에 a태그 삽입
  discussionTitle.append(discussionTitleLink);

  // 사용자 정보 / 등록일
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.append(obj.author + " / " + obj.createdAt);

  // 타이틀 박스에 컨텐츠 삽입
  discussionContent.append(discussionTitle, discussionInfo);

  // 답변체크 박스
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 답변에 값이 있으면
  if (obj.answer) {
    const discussionCheck = document.createElement("p");
    discussionCheck.append("☑");
    discussionAnswered.append(discussionCheck);
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = (page - 1) * 10; i < page * 10; i += 1) {
    if (agoraStatesDiscussions[i] === undefined) {
      undefined;
    } else {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//새로운 요소 추가
let newObj = {
  id: "",
  createdAt: "",
  title: "",
  url: "",
  author: "",
  answer: "",
  bodyHTML: "",
  avatarUrl: "",
};
document.querySelector("#name").addEventListener("input", function () {
  newObj.author = document.querySelector("#name").value;
});

document.querySelector("#title").addEventListener("input", function () {
  newObj.title = document.querySelector("#title").value;
});

document.querySelector("#story").addEventListener("input", function () {
  newObj.bodyHTML = document.querySelector("#story").value;
});

document.querySelector(".form__submit").addEventListener("click", function () {
  newObj.createdAt = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}T${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}Z`;
  if (localStorage.getItem("key") != undefined) {
    let old_arr = JSON.parse(localStorage.getItem("key"));
    old_arr.push(newObj);
    localStorage.setItem("key", JSON.stringify(old_arr));
  } else {
    localStorage.setItem("key", JSON.stringify([newObj]));
  }
});

//버튼 누르면 페이지 숫자바꾸고 로컬 스토리지에 저장
document.addEventListener("click", function (e) {
  e.target.className == "page__prev" && page != min_page
    ? ((page -= 1), localStorage.setItem("page", page))
    : undefined;
  e.target.className == "page__next" && page != max_page
    ? ((page += 1), localStorage.setItem("page", page))
    : undefined;
});
