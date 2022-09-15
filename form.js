// form에는 name, title, question이 있다.
// form의 데이터를 받아서 agoraStatesDiscussion로 넘겨주면 된다. how?
// aSD는 배열이며, 배열의 첫번째로 form의 객체를 unshift해주면 됨.
// aSD는 id, createdAt, title, url, author, answer{}, bodyHTML, avatarURL로 구성되어 있음
// id: 일단 패스
// createdAt: 현재 생성된 시간 (이건 알지?)
// title: form의 title을 가져온다
// url: 일단 #
// author: form의 name
// answer: 일단 null
// bodyHTML: form의 question을 어떻게든?
// avatarURL: 랜덤으로 만들기? 나중에 알아보기

// 현재 구현 가능한 것: createdAt, title, url, author, answer
// localstorage에 넣는다?

const questionForm = document.querySelector(".form");
const questionName = questionForm.querySelector("#name");
const questionTitle = questionForm.querySelector("#title");
const questionText = questionForm.querySelector("#story");

function saveAgora() {
  localStorage.setItem("Agora", JSON.stringify(agoraStatesDiscussions));
}

function questionSubmit(event) {
  event.preventDefault();
  const newQuestion = {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: Date(),
    title: questionTitle.value,
    url: "#",
    author: questionName.value,
    answer: null,
    bodyHTML: questionText.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  console.log(newQuestion);

  agoraStatesDiscussions.unshift(newQuestion);
  const addNewQuestion = (element) => {
    element.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
    return;
  };
  console.log(agoraStatesDiscussions);
  addNewQuestion(ul);
  saveAgora();

  questionName.value = "";
  questionTitle.value = "";
  questionText.value = "";
}

questionForm.addEventListener("submit", questionSubmit);
