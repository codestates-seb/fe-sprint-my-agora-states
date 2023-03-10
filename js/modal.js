import agoraStatesDiscussions from "./data.js";

const $body = document.querySelector("body");
const $modal = document.querySelector(".modal");
const $modal_body = document.querySelector(".modal_body");
const findQ = (e) => {
  let allDiscussions = [];
  if (JSON.parse(localStorage.getItem("allQ")) == null) {
    allDiscussions = [...agoraStatesDiscussions];
  } else {
    allDiscussions = [
      ...JSON.parse(localStorage.getItem("allQ")),
      ...agoraStatesDiscussions,
    ];
  }
  for (let i = 0; i < allDiscussions.length; i++) {
    if (allDiscussions[i].id === e.target.id) return allDiscussions[i];
  }
};

const modal_author = document.querySelector(".modal-writer");
const modal_title = document.querySelector(".modal-title");
const modal_question = document.querySelector(".modal-question");
const helper_author = document.querySelector(".helper-writer");
const helper_answer = document.querySelector(".helper-answer");

const modal = (e) => {
  const clickQ = findQ(e);
  modal_author.textContent = clickQ.author;
  modal_title.textContent = clickQ.title;
  modal_question.textContent = clickQ.url;
  if (!!clickQ.answer === !!null) {
    helper_author.textContent = "";
    helper_answer.textContent = "아직 답변이 없어요";
  } else {
    helper_author.textContent = clickQ.answer.author;
    helper_answer.textContent = clickQ.answer.url;
  }
  //modal 보이기
  $modal.classList.add("show");
  $modal_body.classList.add("show");
  //auto scroll 금지
  $body.classList.remove("scroll-default");
  $body.classList.add("scroll-stop");
};

$modal.addEventListener("click", () => {
  //body scroll auto로 바꾸기
  $body.classList.remove("scroll-stop");
  $body.classList.add("scroll-default");
  //modal display none으로 바꾸기
  $modal.classList.toggle("show");
  $modal_body.classList.toggle("show");
});

export default modal;
