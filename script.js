/* // index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
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
render(ul); */

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const discussionsContainer = document.querySelector(".discussions__container");
const textareaQuestion = document.querySelector(".textarea__question");
const pageNumContainer = document.querySelector(".pageNumber__list");
const autoResize = (e) => {
  let scrollHeight = textareaQuestion.scrollHeight;
  if (textareaQuestion.clientHeight < scrollHeight) {
    textareaQuestion.style.height = `${scrollHeight}px`;
  }
};
textareaQuestion.addEventListener("keyup", autoResize);

const convertDiscussionToDom = (obj) => {
  return `
  <li class="discussion__container">
    <div class="discussion__avatar--wrapper">
      <img
        class="discussion__avatar--image"
        src="${obj.avatarUrl}"
        alt="avatar of ${obj.author}"
      />
    </div>
    <div class="discussion__content">
      <h5 class="discussion__title">
        <a
          href="${obj.url}"
          >${obj.title}</a
        >
      </h5>
      <div class="discussion__information">
        ${obj.author} / ${obj.createdAt}
      </div>
  </div>
  <div class="discussion__answered"><p>☑</p></div>
  </li>`;
};

const countPage = () => {
  for (let i = 1; i <= Math.ceil(agoraStatesDiscussions.length / 10); i++) {
    const numberList = document.createElement("li");
    numberList.textContent = i;
    numberList.classList.add("pageNumber__list--item");
    pageNumContainer.appendChild(numberList);
  }
};
countPage();
const displayOnScreen = (e, page = 0) => {
  /*   for (let i = 0; i < pageNum * 10; i++) {
    discussionsContainer.innerHTML += convertDiscussionToDom(
      agoraStatesDiscussions[i]
    ); */
  for (let i = page * 10; i < page * 10 + 10; i++) {
    discussionsContainer.innerHTML += convertDiscussionToDom(
      agoraStatesDiscussions[i]
    );
  }
};
displayOnScreen();
let pageTarget;
const handleClickPageNum = (e) => {
  pageTarget ? (pageTarget.style.color = "black") : null;
  pageTarget = e.target;
  e.target.style.color = "red";
  console.log(e.target.textContent);
  let page = e.target.textContent - 1;
  discussionsContainer.innerHTML = "";
  displayOnScreen(event, page);
};
pageNumContainer.addEventListener("click", handleClickPageNum);
/* 페이지네이션 의사코드
1.  10개씩 보여준다 치고, array의 index를 지정할 변수 하나 생성
2. 페이지 버튼 누르면 해당 인덱스부터 10개씩 보여주기.*/
