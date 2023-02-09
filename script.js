let agoraData = [];
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

getDiscussions().then((res) => {
  agoraData = [...res];
  setPage(Math.ceil(agoraData.length / 10), 1);
});

//요소내 자식요소를 모두 지우는 함수
const removeAll = (element) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, start) => {
  removeAll(element);
  for (let i = start; i < start + 10; i += 1) {
    if (agoraData[i]) {
      element.append(convertToDiscussion(agoraData[i]));
    }
  }
  return;
};
//아바타이미지 생성
const createAvartarImg = function (obj) {
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";

  if (obj.avatarUrl) {
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = "avatar of " + obj.author;
    avatarWrapper.append(avatarImg);
  }
  return avatarWrapper;
};

//글제목 생성
const createDiscussionTitle = function (obj) {
  //글 정보
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  //제목 40글자로 요약
  discussionTitle.textContent =
    obj.title.length > 40 ? `${obj.title.slice(0, 40)}...` : obj.title;

  return discussionTitle;
};

//답변 생성
const createAnswerContent = function (obj) {
  const answerContent = document.createElement("h3");
  answerContent.className = "discussion__answeredcontent";

  answerContent.innerHTML = obj.bodyHTML;

  return answerContent;
};

//글정보 생성
const createDiscussionInfo = function (obj) {
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;

  return discussionInfo;
};

//답변여부 생성
const createDiscussionCheck = function (obj) {
  //답변 여부
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionCheck = document.createElement("p");
  obj.answer
    ? (discussionCheck.textContent = "☑")
    : (discussionCheck.textContent = "☐");
  discussionAnswered.append(discussionCheck);

  return discussionAnswered;
};

//질문 컨텐츠 생성
const createQuestion = function (obj) {
  const discussionQuestion = document.createElement("div"); // li 요소 생성
  discussionQuestion.className = "discussion__question"; // 클래스 이름 지정

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const avatarWrapper = createAvartarImg(obj);
  const discussionTitle = createDiscussionTitle(obj);
  const discussionInfo = createDiscussionInfo(obj);
  const discussionAnswered = createDiscussionCheck(obj);
  discussionContent.append(discussionTitle, discussionInfo);

  discussionQuestion.append(
    avatarWrapper,
    discussionContent,
    discussionAnswered
  );

  return discussionQuestion;
};

//답변 컨텐츠 생성
const createAnswer = function (obj) {
  const discussionAnswer = document.createElement("div"); // li 요소 생성
  discussionAnswer.className = "discussion__answer hide"; // 클래스 이름 지정

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const avatarWrapper = createAvartarImg(obj);
  const answerContent = createAnswerContent(obj);
  const discussionInfo = createDiscussionInfo(obj);
  const discussionAnswered = createDiscussionCheck(obj);
  discussionContent.append(answerContent, discussionInfo);

  discussionAnswer.append(avatarWrapper, discussionContent, discussionAnswered);

  return discussionAnswer;
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container";
  const discussionQuestion = createQuestion(obj);

  li.append(discussionQuestion);

  //답변이 있는경우만 생성
  if (obj.answer) {
    const discussionAnswer = createAnswer(obj.answer);
    li.append(discussionAnswer);
    // answer 숨기기 기능
    discussionQuestion.addEventListener("click", () => {
      toggle(discussionAnswer);
    });
  }

  return li;
};

//Pagination
const paginationContianer = document.querySelector(".page_list");

function setPage(totalPage, currentPage) {
  let li = "";
  let prevPage = currentPage - 2;
  let nextPage = currentPage + 2;

  //현재 페이지 위치에 따라
  //보여지는 페이지 조정
  if (currentPage === 1) {
    nextPage += 2;
  }
  if (currentPage === 2) {
    nextPage += 1;
  }
  if (currentPage === totalPage) {
    prevPage -= 2;
  }
  if (currentPage === totalPage - 1) {
    prevPage -= 1;
  }
  // '<'을 누르면 이전 페이지로 이동 가능하게 구현
  if (currentPage > 1) {
    li += `<li class="prev__page" onClick=setPage(${totalPage},${
      currentPage - 1
    })><</li>`;
  }

  //페이지의 num을 설정
  for (let i = prevPage; i <= nextPage; i++) {
    if (i >= 1 && i <= totalPage) {
      //선택해주기
      if (i === currentPage) {
        li += `<li class="page_num select_li" onClick=setPage(${totalPage},${i})>${i}</li>`;
      } else {
        li += `<li class="page_num" onClick=setPage(${totalPage},${i})>${i}</li>`;
      }
    }
  }

  // '>'을 누르면 이후 페이지로 이동 가능하게 구현
  if (currentPage < totalPage) {
    li += `<li class="next__page" onClick=setPage(${totalPage},${
      currentPage + 1
    })>></li>`;
  }
  paginationContianer.innerHTML = li;

  ul.innerHTML = "";
  render(ul, (currentPage - 1) * 10);
}

//토글 버튼
function toggle(element) {
  if (element.className.includes("hide")) {
    element.classList.remove("hide");
  } else {
    element.classList.add("hide");
  }
}
