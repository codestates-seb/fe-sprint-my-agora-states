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
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // div요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 클래스 지정 - discussion__avatar--wrapper
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

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

  // [ 각각의 요소를 기존의 요소와 같이 구성하기 위해 append ]
  // discussion__avatar--wrapper
  avatarWrapper.append(avatarImg);

  // discussion__content
  discussionTitle.append(element_a);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInfo);

  // discussionAnswered
  // discussionAnswered.append(element_p);
  discussionAnswered.append(element_img);
  element_img.style.width = "20px";

  // [ data.js에 있는 데이터를 요소에 넣기 ]
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  element_a.href = obj.url;
  element_a.textContent = obj.title;

  if (obj.answer === null) {
    discussionInfo.textContent = `${obj.author}`;
    // element_p.textContent = "⊠";
    element_img.className = "fa-regular fa-circle-check";
    element_img.style.color = "green";
    obj.author === "kimploo" ? (element_img.style.visibility = "hidden") : "";
  } else {
    let objTime = obj.answer.createdAt.replace("T", " ").replace("Z", "");
    let result = timeForToday(objTime);
    discussionInfo.textContent = `${obj.author} asked ${result}`;
    // element_p.textContent = "☑";
    element_img.className = "fa-solid fa-circle-check";
    element_img.style.color = "green";
  }

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

submit.addEventListener("click", () => {
  const userId = document.querySelector("#name");
  const userTitle = document.querySelector("#title");
  const userStory = document.querySelector("#story");

  agoraStatesDiscussions.unshift({
    author: userId.value,
    title: userTitle.value,
    bodyHTML: userStory.value,
  });
});
