// section.form__container에 새로운 아고라 스테이츠 질문을 입력할 수 있는 입력폼을 제작한다.
// 인풋, 버튼 들고와
let inputId = document.querySelector("#name");
let inputTitle = document.querySelector("#title");
let textArea = document.querySelector("#story");
let subBtn = document.querySelector("#submit");

//빈 객체생성

let list = [];

//버튼에 이벤트 붙이기
subBtn.addEventListener("click", makeObj);

function makeObj() {
  let inputIdVal = inputId.value;
  let inputTitleVal = inputTitle.value;
  let textAreaVal = textArea.value;
  list.push(inputIdVal, inputTitleVal, textAreaVal);
  console.log(list);

  return {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    answer: null,
    avatarUrl:
      "http://storage.enuri.info/pic_upload/knowbox2/202009/093248968202009165117a6b8-b537-4950-8131-2433faf7ff51.jpg",
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputIdVal,
    title: inputTitleVal,
    text: textAreaVal,
  };
}
