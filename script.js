// data에 시간 포매터
function timeFormater(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const minute = date.getMinutes();
  const s = date.getSeconds();
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(
    2,
    "0"
  )}T${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}Z`;
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionTags = document.createElement("div");
  discussionTags.className = "discussion__tags";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  // tag 있으면 적용, 없으면 '기타'로 적용
  const tag = document.createElement("span");
  tag.className = "tag";
  if (agoraStatesDiscussions.tag) {
    for (i of agoraStatesDiscussions.tag) {
      tag.textContent = i;
      discussionTags.append(tag);
    }
  } else {
    tag.textContent = "기타";
    discussionTags.append(tag);
  }

  // discussionContet 적용
  // 1) title
  const title = document.createElement("h2");
  title.textContent = obj.title;
  title.classList.add("discussion__title");
  discussionContent.append(title);

  // 2) discussionMain 적용
  const main = document.createElement("div");
  main.classList.add("discussion__main");

  // 2-1) author
  const author = document.createElement("div");
  author.classList.add("discussion__author");
  author.textContent = `${obj.author}: `;
  main.append(author);

  // 2-2) story
  const story = document.createElement("div");
  story.classList.add("discussion__story");
  story.textContent = `${obj.bodyHTML}`;
  main.append(story);

  discussionContent.append(main);

  // discussionAnswered 적용
  // 1) comments
  const comment = document.createElement("p");
  comment.className = "discussion__comments";
  if (obj.answer !== null) comment.textContent = `💬1`;
  else comment.textContent = "💬0";
  discussionAnswered.append(comment);

  // 2) time
  const time = document.createElement("div");
  time.className = "discussion__time";
  const date = new Date(timeFormater(new Date()));

  // node에서는 moment라는 모듈을 쓸 수 있다. (경과시간 표기 가능 (ex.1달전))
  const dataDate = new Date(obj.createdAt);
  const elapsedDay =
    (date.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24);

  if (elapsedDay >= 365) {
    time.textContent = `${parseInt(elapsedDay / 365)}년 전`;
  } else if (elapsedDay >= 31) {
    time.textContent = `${parseInt(elapsedDay / 31)}달 전`;
  } else if (elapsedDay >= 1) {
    time.textContent = `${parseInt(elapsedDay)}일 전`;
  } else if (elapsedDay * 24 >= 1) {
    time.textContent = `${parseInt(elapsedDay * 24)}시간 전`;
  } else if (elapsedDay * 24 * 60 >= 1) {
    time.textContent = `${parseInt(elapsedDay * 24 * 60)}분 전`;
  } else {
    time.textContent = `방금 전`;
  }
  discussionAnswered.append(time);

  // 1. avatarWrapper 적용
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  li.append(
    discussionTags,
    discussionContent,
    discussionAnswered,
    avatarWrapper
  );
  li.dataset.id = obj.id;
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
