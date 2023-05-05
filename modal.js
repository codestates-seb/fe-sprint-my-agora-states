// TODO: 답변 보여주기

const modalOverlay = document.querySelector(".modal__overlay");

const discussions = document.querySelectorAll(".discussion__container");
const modal = document.querySelector("#modal");
const close = document.querySelector(".modal__close");

const modalTag = document.querySelector(".modal__tag");
const modalTitleText = document.querySelector(".modal__title > h2");
const modalContent = document.querySelector(".modal__story");
const modalAvatar = document.querySelector(".modal__avatar--wrapper");

const modalAuthor = document.querySelector(".modal__author--name");
const modalRecordTime = document.querySelector(".modal__record__time");

let isOpen = false;

const openModal = (event) => {
  isOpen = true;
  const id = event.currentTarget.dataset.id;
  const targetData = agoraStatesDiscussions.find((x) => x.id === id);

  modalTitleText.textContent = targetData.title;

  modalContent.innerHTML = targetData.bodyHTML;

  const avatarImg = document.createElement("img");
  avatarImg.src = targetData.avatarUrl;
  avatarImg.alt = `avatar of ${targetData.author}`;
  modalAvatar.append(avatarImg);

  modalAuthor.textContent = targetData.author;

  const time = targetData.createdAt;
  modalRecordTime.textContent = `${Number(time.slice(0, 4))}년 ${Number(
    time.slice(5, 7)
  )}월 ${Number(time.slice(8, 10))}일  ${Number(
    time.slice(11, 13)
  )}:${time.slice(14, 16)}`;

  // tag 있으면 적용, 없으면 '기타'로 적용
  const tag = document.createElement("span");
  tag.className = "tag";
  if (agoraStatesDiscussions.tag) {
    for (i of agoraStatesDiscussions.tag) {
      tag.textContent = i;
      modalTag.append(tag);
    }
  } else {
    tag.textContent = "기타";
    modalTag.append(tag);
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeModal = (e) => {
  if (isOpen) {
    isOpen = false;
    while (modalTag.firstChild) {
      modalTag.firstChild.remove();
    }
    while (modalAvatar.firstChild) {
      modalAvatar.firstChild.remove();
    }
    modal.classList.add("hidden");
    document.body.style.overflow = "unset";
  }
};

function handleOverlayClick(event) {
  if (event.currentTarget === event.target) closeModal();
}

discussions.forEach((discussion) => {
  discussion.addEventListener("click", openModal);
});

close.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", handleOverlayClick);
