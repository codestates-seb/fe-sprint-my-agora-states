// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// 올린지 얼마나 시간이 지났는지 계산
function timePassed(value) {
  now = new Date().getTime();
  created = new Date(value).getTime();
  time = now - created;
  if (time < 1000 * 60) {
    // seconds ago
    timepassed = parseInt(time / 1000);
    if (timepassed === 1) {
      timepassed += " second";
    } else {
      timepassed += " seconds";
    }
  } else if (time < 1000 * 60 * 60) {
    // minites ago
    timepassed = parseInt(time / (1000 * 60));
    if (timepassed === 1) {
      timepassed += " minute";
    } else {
      timepassed += " minutes";
    }
  } else if (time < 1000 * 60 * 60 * 24) {
    // hours ago
    timepassed = parseInt(time / (1000 * 60 * 60));
    if (timepassed === 1) {
      timepassed += " hour";
    } else {
      timepassed += " hours";
    }
  } else if (time < 1000 * 60 * 60 * 24 * 30) {
    // days ago
    timepassed = parseInt(time / (1000 * 60 * 60 * 24));
    if (timepassed === 1) {
      timepassed += " day";
    } else {
      timepassed += " days";
    }
  } else if (time < 1000 * 60 * 60 * 24 * 365) {
    // months ago
    timepassed = parseInt(time / (1000 * 60 * 60 * 24 * 30));
    if (timepassed === 1) {
      timepassed += " month";
    } else {
      timepassed += " months";
    }
  } else {
    // years ago
    timepassed = parseInt(time / (1000 * 60 * 60 * 24 * 365));
    if (timepassed === 1) {
      timepassed += " year";
    } else {
      timepassed += " years";
    }
  }
  return timepassed;
}

const convertToNotice = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const arrowUp = document.createElement("div");
  arrowUp.className = "discussion__noti";
  arrowUp.innerHTML += `<i class="fa-solid fa-circle-exclamation"></i>`;
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarImage = `<img class="discussion__avatar--image" src="${obj.avatarUrl}" alt="avatar of ${obj.author}" />`;
  avatarWrapper.innerHTML += avatarImage;
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionTitle = `<h2 class="discussion__title"><a href="${obj.url}">${obj.title}</a></h2>`;
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.innerHTML += `${obj.author} asked ${timePassed(
    obj.createdAt
  )} ago`;
  discussionContent.innerHTML += discussionTitle;
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  if (obj.answer === null) {
    discussionInformation.innerHTML += `&nbsp;·&nbsp;Unanswered`;
    discussionAnswered.innerHTML += `<i
    class="fa-solid fa-circle-exclamation"
    style="color: #f2cc60"
  ></i>`;
  } else {
    discussionInformation.innerHTML += `&nbsp;<span style="color: #3fb950">·&nbsp;Answered</span>`;
    discussionAnswered.innerHTML += `<i
    class="fa-solid fa-circle-exclamation"
    style="color: #f2cc60"
  ></i>`;
  }
  discussionContent.append(discussionInformation);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(arrowUp, discussionContent, avatarWrapper, discussionAnswered);
  return li;
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const arrowUp = document.createElement("div");
  arrowUp.className = "discussion__arrow";
  arrowUp.innerHTML += `<button><i class="fa-solid fa-arrow-up"></i></button>`;
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarImage = `<img class="discussion__avatar--image" src="${obj.avatarUrl}" alt="avatar of ${obj.author}" />`;
  avatarWrapper.innerHTML += avatarImage;
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionTitle = `<h2 class="discussion__title"><a href="${obj.url}">${obj.title}</a></h2>`;
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.innerHTML += `${obj.author} asked ${timePassed(
    obj.createdAt
  )} ago`;
  discussionContent.innerHTML += discussionTitle;
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  if (obj.answer === null) {
    discussionInformation.innerHTML += `&nbsp;·&nbsp;Unanswered`;
    discussionAnswered.innerHTML += `<i class="fa-regular fa-circle-check" style="color: #8b949e"></i>`;
  } else {
    discussionInformation.innerHTML += `&nbsp;<span style="color: #3fb950">·&nbsp;Answered</span>`;
    discussionAnswered.innerHTML += `<i class="fa-solid fa-circle-check" style="color: #3fb950"></i>`;
  }
  discussionContent.append(discussionInformation);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(arrowUp, discussionContent, avatarWrapper, discussionAnswered);
  return li;
};

const sortingDiscussion = (noti, normal) => {
  let localDiscussion = JSON.parse(localStorage.getItem("local-discussion"));
  if (localDiscussion === null) {
    localDiscussion = [];
  }
  let AllDiscussions = localDiscussion.concat(agoraStatesDiscussions);

  for (el of AllDiscussions) {
    if (el.notice === true) {
      noti.push(el);
    } else {
      normal.push(el);
    }
  }
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 렌더링 초기화
  for (el of element) {
    el.innerHTML = "";
  }

  // 공지와 일반질문 분류하기
  let notiDiscussion = [];
  let normalDiscussion = [];
  sortingDiscussion(notiDiscussion, normalDiscussion);

  // const discussionBar = document.createElement("div");
  // discussionBar.className = "discussion__bar";

  for (let i = 0; i < notiDiscussion.length; i += 1) {
    element[0].append(convertToNotice(notiDiscussion[i]));
    // element[0].append(discussionBar);
  }

  for (let i = 0; i < normalDiscussion.length; i += 1) {
    element[1].append(convertToDiscussion(normalDiscussion[i]));
    // element[1].append(discussionBar);
  }

  return normalDiscussion;
};
