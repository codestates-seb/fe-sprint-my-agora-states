import agoraStatesDiscussions from "./data.js";
import convertToDiscussion from "./fragment.js"; // 개별 돔 생성

const $form = document.querySelector("form");
const $inputName = document.querySelector("#name");
const $inputTitle = document.querySelector("#title");
const $inputTextbox = document.querySelector("#story");
const $BtnSubmit = document.querySelector(".Btn__submit");
const $ul = document.querySelector("ul.discussions__container");
const $cntQ = document.querySelector(".count-Q");

const toDay = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const hours = ("0" + today.getHours()).slice(-2);
  const minutes = ("0" + today.getMinutes()).slice(-2);
  const seconds = ("0" + today.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
//폼 내용을 기반으로 객체 생성
const questionToObject = () => {
  const avata_random = [
    "avatar-blue.png",
    "avatar-pink.png",
    "avatar-purple.png",
    "avatar-yello.png",
  ];
  const newQ = {
    id: String(new Date().getTime() + Math.random()),
    createdAt: toDay(),
    title: $inputTitle.value,
    author: $inputName.value,
    url: $inputTextbox.value,
    answer: null,
    avatarUrl: "./src/" + avata_random[parseInt(Math.random() * 4)],
  };
  return newQ;
};
//로컬스토리지에 저장
const localStore = (obj) => {
  let addNewQ = JSON.parse(localStorage.getItem("allQ"));
  if (addNewQ == null) addNewQ = [];
  localStorage.setItem("newQ", JSON.stringify(obj));
  addNewQ.unshift(obj);
  localStorage.setItem("allQ", JSON.stringify(addNewQ));
};
//re렌더링
const rerender = () => {
  const allDiscussions = [
    ...JSON.parse(localStorage.getItem("allQ")),
    ...agoraStatesDiscussions,
  ];
  $ul.replaceChildren();
  $ul.append(convertToDiscussion(allDiscussions));
  countQ(allDiscussions.length);
  return;
};
const countQ = (length) => {
  $cntQ.textContent = `총 ${length}개의 질문을 수집했습니다.`;
};
//submit 제출버튼 클릭
const formSubmit = (e) => {
  let isFormValid = $form.checkValidity();
  if (!isFormValid) {
    $form.reportValidity();
    return;
  }
  e.preventDefault();
  //local 저장
  localStore(questionToObject());
  rerender($ul);
};

$BtnSubmit.addEventListener("click", formSubmit);

export default countQ;
