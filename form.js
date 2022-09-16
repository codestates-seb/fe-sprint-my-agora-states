const questionForm = document.querySelector(".form");
const questionName = questionForm.querySelector("#name");
const questionTitle = questionForm.querySelector("#title");
const questionText = questionForm.querySelector("#story");

function saveAgora() {
  localStorage.setItem("Agora", JSON.stringify(agoraStatesDiscussions));
}

function questionSubmit(event) {
  // event.preventDefault();

  const randomNumber = () => {
    return Math.floor(Math.random() * 40);
  };

  const randomAvatar = agoraStatesDiscussions[randomNumber()].avatarUrl;

  const newQuestion = {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: Date(),
    title: questionTitle.value,
    url: "#",
    author: questionName.value,
    answer: null,
    bodyHTML: questionText.value,
    avatarUrl: randomAvatar,
  };

  agoraStatesDiscussions.unshift(newQuestion);

  const addNewQuestion = (element) => {
    element.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
    return;
  };

  addNewQuestion(ul);

  saveAgora();

  discussionMain.textContent = `Discussions (${agoraStatesDiscussions.length})`;

  questionName.value = "";
  questionTitle.value = "";
  questionText.value = "";
  pageCount = Math.ceil(agoraStatesDiscussions.length / paginationLimit);
}

questionForm.addEventListener("submit", questionSubmit);
