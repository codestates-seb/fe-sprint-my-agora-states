// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const submit = document.querySelector('input[type="submit"]');

// [ 게시글 시간을 계산하여 출력하는 함수 ]
// 출처 : https://kdinner.tistory.com/68
const timeForToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime} miniute ago`; //분전
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour} hours ago`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay} days ago`;
  }

  return `${Math.floor(betweenTimeDay / 365)} years go`;
};

// [ convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다. ]
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // discussion__avatar--wrapper 하위 요소 생성 및 클래스 지정
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";

  // discussion__content 하위 요소 생성 및 클래스 지정
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const element_a = document.createElement("a");

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";

  // discussion__answered 하위 요소 생성
  // const element_p = document.createElement("p");
  const element_img = document.createElement("i");

  // 각각의 요소를 기존의 요소와 같이 구성하기 위해 append
  // discussion__avatar--wrapper
  avatarWrapper.append(avatarImg);

  // discussion__content
  discussionTitle.append(element_a);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInfo);

  // discussionAnswered
  discussionAnswered.append(element_img);

  // [ data.js에 있는 데이터를 요소에 넣기 ]
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  element_a.href = obj.url;
  element_a.textContent = obj.title;

  let objTime = obj.createdAt.replace("T", " ").replace("Z", "");
  let result = timeForToday(objTime);
  discussionInfo.textContent = `${obj.author} asked ${result}`;

  obj.answer === null
    ? (element_img.className = "fa-regular fa-circle-check")
    : (element_img.className = "fa-solid fa-circle-check");

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// [ agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다. ]
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// [ ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다. ]
const ul = document.querySelector("ul.discussions__container");
render(ul);

// [ discussion 추가 기능]
submit.addEventListener("click", () => {
  const userId = document.querySelector("#name"); // author
  const userTitle = document.querySelector("#title"); // title
  const userStory = document.querySelector("#story"); // answer: bodyHTML
  const date = new Date(); // createdAt
  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  // 객체 생성
  const obj = {
    author: userId.value,
    createdAt: dateString,
    title: userTitle.value,
    answer: { bodyHTML: userStory.value },
  };

  console.log(obj);

  // userid, usertitle, userStory를 localstorage에 { }형태로 저장한다.
  //  - 배열에 객체 형태로 저장한다.
  // localStorage.setItem();

  // localStorage에 저장된 데이터를 불러온다.
  // 데이터를 화면에 띄운다.
  //  html요소를 만들어서
  //  요소 안에 데이터 정보를 넣는다.
  //  화면에 띄운다.
});
