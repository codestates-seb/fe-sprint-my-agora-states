const changeUtcToLocal = (date) => {
  let localDate = new Date(date);

  let nowMonth = (localDate.getMonth() + 1).toString();
  if ((nowMonth).length === 1) nowMonth = "0" + nowMonth;

  let nowDate = localDate.getDate().toString();
  if (nowDate.length === 1) nowDate = "0" + nowDate;

  let nowHours = localDate.getHours().toString();
  if (nowHours.length === 1) nowHours = "0" + nowHours;

  let nowMinutes = localDate.getMinutes().toString();
  if (nowMinutes.length === 1) nowMinutes = "0" + nowMinutes;

  const changedDate = `${localDate.getFullYear()}-${nowMonth}-${nowDate} ${nowHours}:${nowMinutes}`;

  return changedDate;
};

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
  discussionAnswered.textContent = (obj.answer) ? "☑️" : "❎";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${changeUtcToLocal(obj.createdAt)}`;
  discussionContent.append(discussionInfo);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
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
