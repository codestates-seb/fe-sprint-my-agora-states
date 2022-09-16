// const $ = (selector) => document.querySelector(selector);

// const userForm = $(".form");
// const nameInput = $("#name");
// const titleInput = $("#title");
// const storyInput = $("#story");

// // index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// // convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// const convertToDiscussion = (obj) => {
//   const li = document.createElement("li"); // li 요소 생성
//   li.className = "discussion__container"; // 클래스 이름 지정

//   const avatarWrapper = document.createElement("div");
//   avatarWrapper.className = "discussion__avatar--wrapper";
//   const discussionContent = document.createElement("div");
//   discussionContent.className = "discussion__content";
//   const discussionAnswered = document.createElement("div");
//   discussionAnswered.className = "discussion__answered";

//   // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
//   // 아바타, 컨텐츠, 체크박스
// const avatarImg = document.createElement("img");

// const contentInfo = document.createElement("div");
// contentInfo.textContent = `${obj.author}/${new Date(
//   obj.createdAt
// ).toLocaleString()}`;

// contentInfo.className = "discussion__infomation";

// const checkedBox = document.createElement("p");
// discussionAnswered.apeend(checkedBox);

// 아바타 src와 img.alt = 'avatar of' + obj.author; 추가

//   li.append(avatarWrapper, discussionContent, discussionAnswered);
//   return li;
// };

// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = $("ul.discussions__container");
// render(ul);

const $ = (selector) => document.querySelector(selector);

const ul = $("ul.discussions__container");
console.log(agoraStatesDiscussions);

const convertToDiscussion = (name, img, story) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__content";
  avatarWrapper.textContent = name;

  const discussionContent = document.createElement("img");
  discussionContent.className = "discussion__avatar--image";
  discussionContent.src = img;

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.textContent = story;

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const newToDiscussion = (name, title, story) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const userName = document.createElement("div");
  userName.className = "discussion__answered";
  userName.textContent = name;

  const discussionTitle = document.createElement("div");
  discussionTitle.className = "discussion__title";
  discussionTitle.innerText = title;

  const discussionStory = document.createElement("div");
  discussionStory.className = "discussion__information";
  discussionStory.innerText = story;

  // const discussionContent = document.createElement("img");
  // discussionContent.className = "discussion__avatar--wrapper";
  // discussionContent.src = img;

  li.append(userName, discussionTitle, discussionStory);
  return li;
};

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    const data = agoraStatesDiscussions[i];
    element.append(
      convertToDiscussion(data.title, data.avatarUrl, data.author)
    );
  }
  return;
};

const handleSubmit = (e) => {
  e.preventDefault();

  const name = $("#name").value;
  const title = $("#title").value;
  const story = $("#story").value;
  ul.append(newToDiscussion(name, title, story));
};

$(".form").addEventListener("submit", handleSubmit);

render(ul);
