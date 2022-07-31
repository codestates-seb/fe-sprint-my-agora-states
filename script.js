// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 이미지
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;

  avatarWrapper.append(avatarImg);

  // 내용
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const contentH2 = document.createElement("h2");
  contentH2.className = "discussion__title";
  const contentAnchor = document.createElement("a");
  contentAnchor.href = obj.url;
  contentAnchor.textContent = obj.title;
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  // time conversion
  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;

  contentH2.append(contentAnchor);
  discussionContent.append(contentH2, discussionInfo);

  // 답변확인
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answerIcon = document.createElement("p");
  answerIcon.textContent = obj.answer ? "☑" : "☒";

  discussionAnswered.append(answerIcon);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  // li.append(avatarWrapper, discussionContent);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  console.log(agoraStatesDiscussions);
  agoraStatesDiscussions.reverse();
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// 아고라스테이츠 데이터 배열에 로컬스토리지에 있는 데이터 추가하기
const arrLength = agoraStatesDiscussions.length;
for (let i = 0; i < localStorage.length; i++) {
  // console.log(localStorage);
  const key = arrLength + i;
  //스토리지에서 discussion 불러오기
  const objFromJSON = JSON.parse(localStorage.getItem(key));

  //스토리지 discussion을 기존 데이터 배열에 저장
  agoraStatesDiscussions.push(objFromJSON);
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//// new Disscusion
// selecting elements
const formEl = document.querySelector(".form");
const formName = document.getElementById("name");
const formTitle = document.getElementById("title");
const formStory = document.getElementById("story");

// Submit event
formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  //new discussion DOM 불러오기
  const obj = {
    id: "unque id",
    createdAt: new Date(),
    author: formName.value,
    bodyHTML: formStory.value,
    title: formTitle.value,
    avatarUrl: "./img/codingii.png",
    url: "#",
    answer: null,
  };
  //JSON conversion
  const objToJSON = JSON.stringify(obj);

  // localStorage key number
  let newDiscussionIndexNumber = agoraStatesDiscussions.length;

  //new discussion 스토리지에 저장
  localStorage.setItem("agoraStatesDiscussions", objToJSON);

  //new discussion 기존 데이터 배열에 저장
  agoraStatesDiscussions.push(obj);
  console.log(agoraStatesDiscussions);

  //new discussion DOM 생성하기
  ul.prepend(convertToDiscussion(obj));

  return;
});
