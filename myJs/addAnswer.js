const formContainer = document.querySelector(".form__container");
// 폼 으로 입력 받는
const formInputTitle = document.querySelector(".form__input--name>input");
const formInputName = document.querySelector(".form__input--name>input");
const formTextbox = document.querySelector(".form__textbox>textarea");

formContainer.addEventListener("submit", formSubmitAction); //제출 이벤트 처리

function formSubmitAction(event) {
  event.preventDefault(); //새로 고침 막기

  let InputTitleValue = formInputTitle.value;
  let formInputNameValue = formInputName.value;
  let formTextboxValue = formTextbox.value;

  const addData = {
    id: "soulhn",
    createdAt: new Date(),
    title: InputTitleValue,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: formInputNameValue,
    bodyHTML: formTextboxValue,
    avatarUrl: "https://avatars.githubusercontent.com/u/88018456?s=96&v=4",
  };

  //기존 요소 맨앞에 추가
  agoraStatesDiscussions.unshift(addData);
  ul.prepend(convertToDiscussion(addData));
  render(ul);

  //로컬 스토리지 저장 영역
  const cdtSaveData = localStorage.getItem("cdtData");
  if (cdtSaveData !== null) {
    //로컬 스토리지 이미 차있다면
    const parseCdtSaveData = JSON.parse(cdtSaveData);
    parseCdtSaveData.unshift(addData);
    localStorage.setItem("cdtData", JSON.stringify(parseCdtSaveData));
  } else {
    //로컬 스토리지가 비었다면
    const setDataArr = JSON.stringify([addData]);
    localStorage.setItem("cdtData", setDataArr);
  }
}
