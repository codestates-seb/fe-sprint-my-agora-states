// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// submit 이벤트리스너
const form = document.querySelector(".form");
form.addEventListener("submit", handleFormSubmit);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionBox = document.createElement("div");
  discussionBox.className = "discussion__box";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // avatarWrapper 하위 요소
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";

  // discussionContent 하위 요소
  const title = document.createElement("div");
  title.className = "discussion__title__container";
  const information = document.createElement("div");
  information.className = "discussion__information";

  // title 하위 요소
  const titleH3 = document.createElement("h3");
  titleH3.className = "discussion__title__h3";
  const titleA = document.createElement("a");

  // discussionAnswerd 하위 요소
  const answered = document.createElement("p");

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // avatarImg 데이터 입력
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;

  // avatarWrapper 자식요소 추가
  avatarWrapper.append(avatarImg);

  // titleA 데이터 입력
  titleA.href = obj.url;
  titleA.innerText = obj.title;

  // titleH3 자식요소 추가
  titleH3.append(titleA);

  // information 데이터 입력
  information.innerText = `${obj.author} / ${utcToLocal(obj.createdAt)}`;

  // title 자식요소 추가
  title.append(titleH3);

  // discussionContetn 자식요소 추가
  discussionContent.append(title);
  discussionContent.append(information);

  // answerd 데이터 입력
  if (obj.answer !== null) {
    answered.innerText = "☑";
  } else {
    answered.innerText = "☒";
  }

  // discussionAnswered 자식요소 추가
  discussionAnswered.append(answered);

  // discussionBox 자식요소 추가
  discussionBox.append(avatarWrapper);
  discussionBox.append(discussionContent);
  discussionBox.append(discussionAnswered);

  // li 자식요소 추가
  li.append(discussionBox);

  return li;
};

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

// UTC 시간을 현지시간으로 변경하는 함수 선언
function utcToLocal(utc) {
  const local = new Date(utc);

  // 달
  let localMonth = (local.getMonth() + 1).toString();
  if (localMonth.length === 1) localMonth = "0" + localMonth;

  // 일
  let localDate = local.getDate().toString();
  if (localDate.length === 1) localDate = "0" + localDate;

  // 시간 + 오전 오후 확인
  let amOrPm = "AM";
  let localHours = local.getHours().toString();
  if (localHours >= 12) {
    amOrPm = "PM";
    if (Number(localHours) !== 12) localHours = Number(localHours) - 12;
  }

  // 분
  let localMinutes = local.getMinutes().toString();
  if (localMinutes.length === 1) localMinutes = "0" + localMinutes;

  // 초
  let localSeconds = local.getSeconds().toString();
  if (localSeconds.length === 1) localSeconds = "0" + localSeconds;

  const localTime = `${local.getFullYear()}.${localMonth}.${localDate} ${amOrPm} ${localHours}:${localMinutes}:${localSeconds}`;

  return localTime;
}

// form submit시 데이터베이스에 추가

function handleFormSubmit(event) {
  const inputName = document.getElementById("name");
  const inputTitle = document.getElementById("title");
  const inputStory = document.getElementById("story");

  const newName = inputName.value;
  const newTitle = inputTitle.value;
  const newStory = inputStory.value;
  const newTime = new Date().toISOString();

  const newObj = {
    id: Date.now(),
    createdAt: newTime,
    title: newTitle,
    url: "",
    author: newName,
    answer: null,
    bodyHTML: "",
  };

  agoraStatesDiscussions.unshift(newObj);

  return;
}
