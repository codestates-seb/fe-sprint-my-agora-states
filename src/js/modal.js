const modalOverlay = document.querySelector(".modal__overlay");

const modalWindow = document.querySelector(".modal__window");

const modal = document.querySelector("#modal");
const modalClose = document.querySelector(".modal__close");

const modalTag = document.querySelector(".modal__tag");
const modalTitleText = document.querySelector(".modal__title > h2");
const modalContent = document.querySelector(".modal__story");
const modalAvatar = document.querySelector(".modal__avatar--wrapper");

const modalAuthor = document.querySelector(".modal__author--name");
const modalRecordTime = document.querySelector(".modal__record__time");

const modalAnswer = document.querySelector(".modal__answer");
const answerAvatar = document.querySelector(".modal__answer--avatar");
const answerAuthor = document.querySelector(".modal__answer--author");
const answerTime = document.querySelector(".modal__answer--time");
const answerStory = document.querySelector(".modal__answer--story");

const modalAnswerForm = document.querySelector(".modal__answer--form");

let isOpen = false;
let id;

const modalTimeFormat = (time) => {
  return `${Number(time.slice(0, 4))}년 ${Number(time.slice(5, 7))}월 ${Number(
    time.slice(8, 10)
  )}일  ${Number(time.slice(11, 13))}:${time.slice(14, 16)}`;
};

const modalAvatarFormat = (data) => {
  const avatarImg = document.createElement("img");
  avatarImg.src = data.avatarUrl;
  avatarImg.alt = `avatar of ${data.author}`;
  return avatarImg;
};

const showContent = (targetData) => {
  modalTitleText.textContent = targetData.title;

  modalContent.innerHTML = targetData.bodyHTML;

  modalAvatar.append(modalAvatarFormat(targetData));

  modalAuthor.textContent = targetData.author;

  modalRecordTime.textContent = modalTimeFormat(targetData.createdAt);

  // tag 있으면 적용, 없으면 '기타'로 적용

  if (targetData.tags) {
    for (i of targetData.tags) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = i;
      modalTag.append(tag);
    }
  } else {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "기타";
    modalTag.append(tag);
  }
};

const showAnswer = (targetData) => {
  if (targetData === null || targetData === undefined) {
    return true;
  } else {
    // 답변 아바타 이미지 적용
    answerAvatar.append(modalAvatarFormat(targetData));

    // 답변 작성자
    answerAuthor.textContent = targetData.author;

    // 답변 시간
    answerTime.textContent = modalTimeFormat(targetData.createdAt);

    // 답변 내용
    answerStory.innerHTML = targetData.bodyHTML;

    return true;
  }
};

const openModal = (event) => {
  id = event.currentTarget.dataset.id;
  const prevData = JSON.parse(localStorage.getItem("data"));

  const targetData = prevData.find((x) => x.id === id);

  // 작성 글 보여주기
  showContent(targetData);

  // 답변 보여주기
  showAnswer(targetData.answer);

  modal.classList.remove("hidden");

  modalWindow.scrollTo(0, 0);
  // body 스크롤 방지
  document.body.style.overflow = "hidden";
};

// 모달 닫기
const closeModal = (event) => {
  while (modalAvatar.firstChild) {
    modalAvatar.firstChild.remove();
  }
  while (modalTag.firstChild) {
    modalTag.firstChild.remove();
  }
  answerAuthor.textContent = "";
  answerTime.textContent = "";
  answerStory.textContent = "";
  while (answerAvatar.firstChild) {
    answerAvatar.firstChild.remove();
  }
  modal.classList.add("hidden");

  // body 스크롤 활성화
  document.body.style.overflow = "unset";
};

// 모달 영역 밖을 클릭 시 모달 닫기
function handleOverlayClick(event) {
  if (event.currentTarget === event.target) closeModal();
}

// 답변 등록 이벤트
function handleSubmitAnswer(event) {
  event.preventDefault();
  const story = event.target[0];
  const targetData = agoraStatesDiscussions.find((x) => x.id === id);
  if (Array.isArray(targetData.answer)) targetData.answer.unshift(1);
  else targetData.answer = [1, targetData.answer];
  console.log(targetData.answer);
  story.value = "";
}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", handleOverlayClick);

modalAnswerForm.addEventListener("submit", handleSubmitAnswer);
