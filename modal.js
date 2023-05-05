const discussions = document.querySelectorAll(".discussion__container");
const modal = document.querySelector("#modal");

function handleDiscussionClick(event) {
  const id = event.currentTarget.dataset.id;
  const targetData = agoraStatesDiscussions.find((x) => x.id === id);

  const modalTitle = document.querySelector(".modal__title > h2");
  const modalContent = document.querySelector(".modal__content");
  modalTitle.textContent = targetData.title;
  modalContent.innerHTML = targetData.bodyHTML;

  modal.classList.remove("hidden");
  openModal();
}

discussions.forEach((discussion) => {
  discussion.addEventListener("click", handleDiscussionClick);
});

// 스크롤 비활성화
const openModal = (e) => {
  document.body.style.overflow = "hidden";
};

// 스크롤 활성화
const closeModal = (e) => {
  document.body.style.overflow = "unset";
};
