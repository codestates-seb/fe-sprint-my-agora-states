const discussions = document.querySelectorAll(".discussion__container");
const modal = document.querySelector("#modal");
const close = document.querySelector(".modal__close");

// 스크롤 비활성화
const openModal = (event) => {
  const id = event.currentTarget.dataset.id;
  const targetData = agoraStatesDiscussions.find((x) => x.id === id);

  const modalTitle = document.querySelector(".modal__title > h2");
  const modalContent = document.querySelector(".modal__story");
  modalTitle.textContent = targetData.title;
  modalContent.innerHTML = targetData.bodyHTML;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};

// 스크롤 활성화
const closeModal = (e) => {
  modal.classList.add("hidden");
  document.body.style.overflow = "unset";
};

discussions.forEach((discussion) => {
  discussion.addEventListener("click", openModal);
});

close.addEventListener("click", closeModal);
