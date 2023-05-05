const discussions = document.querySelectorAll(".discussion__container");
const modal = document.querySelector("#modal");
const close = document.querySelector(".modal__close");

const openModal = (event) => {
  const id = event.currentTarget.dataset.id;
  const targetData = agoraStatesDiscussions.find((x) => x.id === id);

  const modalTitle = document.querySelector(".modal__title > h2");
  modalTitle.textContent = targetData.title;

  const modalContent = document.querySelector(".modal__story");
  modalContent.innerHTML = targetData.bodyHTML;

  const modalAvatar = document.querySelector(".modal__avatar--wrapper");
  while (modalAvatar.firstChild) {
    modalAvatar.firstChild.remove();
  }
  const avatarImg = document.createElement("img");
  avatarImg.src = targetData.avatarUrl;
  avatarImg.alt = `avatar of ${targetData.author}`;
  modalAvatar.append(avatarImg);

  const modalAuthor = document.querySelector(".modal__author--name");
  modalAuthor.textContent = targetData.author;

  const modalRecordTime = document.querySelector(".modal__record__time");
  const time = targetData.createdAt;
  console.log(time);
  modalRecordTime.textContent = `${Number(time.slice(0, 4))}년 ${Number(
    time.slice(5, 7)
  )}월 ${Number(time.slice(8, 10))}일  ${Number(
    time.slice(11, 13)
  )}:${time.slice(14, 16)}`;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

const closeModal = (e) => {
  modal.classList.add("hidden");
  document.body.style.overflow = "unset";
};

discussions.forEach((discussion) => {
  discussion.addEventListener("click", openModal);
});

close.addEventListener("click", closeModal);
