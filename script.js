// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

if (!localStorage.getItem("arr")) {
  localStorage.setItem("arr", JSON.stringify(agoraStatesDiscussions));
  var agora = localStorage.getItem("arr");
  var arr = JSON.parse(agora);
}
agora = localStorage.getItem("arr");
arr = JSON.parse(agora);

function createdAt(obj) {
  if (!obj.rendered && obj.id) {
    if (+obj.createdAt.split("T")[1].slice(0, 2) + 9 > 24) {
      obj.createdAt = `오전 ${
        +obj.createdAt.split("T")[1].slice(0, 2) - 15
      }${obj.createdAt.split("T")[1].slice(2, -1)}`;
    } else if (+obj.createdAt.split("T")[1].slice(0, 2) + 9 > 12) {
      obj.createdAt = `오후 ${
        +obj.createdAt.split("T")[1].slice(0, 2) - 3
      }${obj.createdAt.split("T")[1].slice(2, -1)}`;
    } else {
      obj.createdAt = `오전 ${
        +obj.createdAt.split("T")[1].slice(0, 2) + 9
      }${obj.createdAt.split("T")[1].slice(2, -1)}`;
    }
  }
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

  // Avatar Image
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);

  // Discussion Title
  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  // Discussion Title의 a tag
  const titleA = document.createElement("a");
  titleA.href = obj.url;
  titleA.textContent = obj.title;
  discussionTitle.append(titleA);

  // Discussion Information (author, createdAt)
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionInformation);

  const discussionCheck = document.createElement("p");
  discussionCheck.textContent = obj.answer ? "✅" : "❎";
  discussionAnswered.append(discussionCheck);

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
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
let toRender = !arr ? agoraStatesDiscussions : arr;
console.log(toRender);
const render = (element) => {
  for (let i = 0; i < toRender.length; i += 1) {
    createdAt(toRender[i]);
    toRender[i].rendered = true;
    element.append(convertToDiscussion(toRender[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const submitBtn = document.querySelector(".form");
submitBtn.onsubmit = function () {
  const name = this.name.value;
  const title = this.title.value;
  const story = this.story.value;
  let now = new Date();
  now = "오" + now.toLocaleString().split("오")[1];

  arr.unshift({
    avatarUrl: "./profile.jpg",
    title: title,
    author: name,
    createdAt: now,
  });
  ul.prepend(convertToDiscussion(arr[0]));
  localStorage.setItem("arr", JSON.stringify(arr));

  this.name.value = "";
  this.title.value = "";
  this.story.value = "";

  return false;
};
