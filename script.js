// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

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

  //사용자 아바타

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  if (obj.avatarUrl) {
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = "avatar of " + obj.author;
    avatarWrapper.append(avatarImg);
  }
  //글 정보
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  //제목 40글자로 요약
  discussionTitle.textContent =
    obj.title.length > 40 ? `${obj.title.slice(0, 40)}...` : obj.title;

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionTitle, discussionInfo);

  //답변 여부
  const discussionCheck = document.createElement("p");
  obj.answer
    ? (discussionCheck.textContent = "☑")
    : (discussionCheck.textContent = "☐");

  discussionAnswered.append(discussionCheck);

  li.id = obj.id;
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  const containerAnswer = document.createElement("div");
  containerAnswer.className = "answer";
  containerAnswer.classList.add("hide");
  const modalAnswer = document.createElement("div");
  modalAnswer.className = "answer_modal";
  const closeArea = document.createElement("div");
  closeArea.className = "close-area";
  const btnClose = document.createElement("button");
  btnClose.className = "close-btn";
  btnClose.textContent = "X";

  if (obj.answer) {
    closeArea.append(btnClose);
    modalAnswer.append(closeArea);
    containerAnswer.append(modalAnswer);
    li.append(containerAnswer);
  } else {
  }

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, start = 0) => {
  end = start + 8;
  for (let i = start; i < end; i += 1) {
    if (!agoraStatesDiscussions[i]) {
      break;
    }
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
//render(ul);

//Pagination
const paginationContianer = document.querySelector(".page_list");

//8개씩 출력
let totalPage = Math.ceil(agoraStatesDiscussions.length / 8);
let currentPage = 1;

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
  render(ul, (currentPage - 1) * 8);
}

setPage(totalPage, currentPage);
