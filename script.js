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
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 1. avatarWrapper 적용
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  // 2. discussionContet 적용
  // 2-1 title
  const title = document.createElement("h2");
  title.textContent = obj.title;
  title.classList.add("discussion__title");
  discussionContent.append(title);
  // 2-2 information
  const information = document.createElement("div");
  information.textContent = `${obj.author} / ${agoraStatesDiscussions[0].createdAt}`;
  information.classList.add("discussion__information");
  discussionContent.append(information);

  // 3. discussionAnswered 적용
  const answerCheck = document.createElement("p");
  if (obj.answer !== null) answerCheck.textContent = "☑";
  else answerCheck.textContent = "none";
  discussionAnswered.append(answerCheck);

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

function remove_children(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

const form = document.querySelector("form");

function getTime(date) {
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
class IDGenerator {
  #count = 0;
  getID() {
    const timestamp = new Date().getTime().toString(16);
    const randomNumber = Math.floor(Math.random() * 2 ** 20).toString(16);

    const count = this.#count.toString(16);
    this.#count = (this.#count + 1) % 2 ** 12;

    return timestamp + randomNumber.padStart(5, "0") + count.padStart(3, "0");
  }
}

function handleFormEvent(event) {
  event.preventDefault();

  // 입력받은 값을 오브젝트에 저장
  // 저장할 것들 (id, 시간, 제목, url, 작성자, 답변 유무, 내용, 작성자 사진, )

  const target = event.target;

  // id
  const id = new IDGenerator().getID();

  // 시간
  const date = new Date();
  const createdAt = getTime(date);

  // 제목
  const title = target.querySelector(".form__input--title > input").value;

  // url
  const url = null;

  // 작성자
  const author = target.querySelector(".form__input--name > input").value;

  // 답변
  const answer = null;

  // 내용
  const bodyHTML = target.querySelector("#story").value;

  // 작성자 사진
  const avatarUrl = null;

  // 객체화
  const item = {
    id,
    createdAt,
    title,
    url,
    author,
    answer,
    bodyHTML,
    avatarUrl,
  };
  agoraStatesDiscussions.unshift(item);
  remove_children(ul);
  render(ul);
}

form.addEventListener("submit", handleFormEvent);
