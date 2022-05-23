// section.form__container에 새로운 아고라 스테이츠 질문을 입력할 수 있는 입력폼을 제작한다.
// 인풋, 버튼 들고와
const author = document.querySelector("#name");
let title = document.querySelector("#title");
let textArea = document.querySelector("#story");
let subBtn = document.querySelector("#submit");

//버튼에 이벤트 붙이기
subBtn.addEventListener("click", (event) => {
  //새로 추가할 객체를 만든다.
  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "http://github.com/codestates-seb/agora-states-fe/discussion",
    author: author.value,
    answer: null,
    bodyHTML: textArea.value,
    avatarUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/250px-Macaca_nigra_self-portrait_large.jpg",
  };

  // 원래 있던 배열 안에 객체를 넣어야 한다.
  agoraStatesDiscussions.unshift(obj);
  console.log(obj);
  // 처음에 만튼 convertToDiscussion함수에 새로 만든 객체를 넣는다. 원래있던 객체는 41개였으나 새로 들어가는 객체의 첫번째 리스트 목록은 42개가 될 것이다.
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);
});
