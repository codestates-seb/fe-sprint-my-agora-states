// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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

  //TODO : 여기서부터
  //1번 : avatarWrapper에 img태그를 넣어야함
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);

  //2번 : discussionContent에 <h2> <a> </h2>태그와 div태그를넣어야함
  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  // discussionTitle의 a tag를 h2태그에 넣기
  const tagA = document.createElement("a");
  tagA.href = obj.url;
  tagA.textContent = obj.title;
  discussionTitle.append(tagA);

  // discussionInformation div태그 (author, createdAt)
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${createdAt(obj.createdAt)}`;
  discussionContent.append(discussionInformation);

  //3번 : discussionAnswered에 p태그 넣어야함
  const discussionCheck = document.createElement("p");
  discussionCheck.textContent = obj.answer ? "✔" : "✖";
  discussionAnswered.append(discussionCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 오전 오후 바꾸는 함수
// 2022-05-16T01:02:17Z
// 00~11 오전    오후 5:52:37
// 12~23 오후
function createdAt(str) {
  const getHour = parseInt(str.split("T")[1].split(":")[0], 10);
  const getMinute = str.split("T")[1].split(":")[1];
  const getSecond = str.split("T")[1].split(":")[2].slice(0, 2);
  let createdAtStr = "";

  if (getHour <= 11 && getHour >= 0) {
    createdAtStr = `오전 ${getHour}:${getMinute}:${getSecond}`;
  } else {
    if (getHour >= 13 && getHour < 24) {
      createdAtStr = `오후 ${getHour - 12}:${getMinute}:${getSecond}`;
    } else if (getHour === 24) {
      createdAtStr = `오전 00:${getMinute}:${getSecond}`;
    } else {
      createdAtStr = `오후 ${getHour}:${getMinute}:${getSecond}`;
    }
  }
  return createdAtStr;
}
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// submit 기능구현
// input value 가져오기
const submitBtn = document.querySelector(".form");
let getName = document.querySelector("#name");
let getTitle = document.querySelector("#title");
let getStory = document.querySelector("#story");

// 이벤트 핸들러 submit 시 자동 새로고침 방지
function handleSubmit(e) {
  e.preventDefault();
  //임의로 이미지 넣기
  let images = ["1.jpg", "2.png", "3.jpg", "4.png"];
  let chosenImg = images[Math.floor(Math.random() * images.length)];
  let getImg = `img/${chosenImg}`;

  let date = new Date();
  // console.log(date.toLocaleString()); //2023. 1. 9. 오후 5:52:37
  date = "오" + date.toLocaleString().split("오")[1];

  agoraStatesDiscussions.unshift({
    avatarUrl: getImg,
    title: getTitle.value,
    author: getName.value,
    createdAt: date,
  });
  console.log(agoraStatesDiscussions[0]);
  console.log(agoraStatesDiscussions.length);

  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  // getName = "";
  // getTitle = "";
  // getStory = "";
  // getImg = "";
}
addEventListener("submit", handleSubmit);
