const form = document.querySelector(".form");
const name = document.querySelector("#name");
const title = document.querySelector("#title");
const story = document.querySelector("#story");
const ul = document.querySelector("ul.discussions__container");
const buttons = document.querySelector(".buttons");

let agora = [...agoraStatesDiscussions];
agora = JSON.parse(localStorage.getItem("agora")) || agora;

const now = new Date();
const today = now.toISOString();

const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  const discussionDelete = document.createElement("button");
  const avatarWrapper = document.createElement("div");
  const discussionContent = document.createElement("div");
  const discussionAnswered = document.createElement("div");

  li.className = "discussion__container";
  discussionDelete.className = "discussion__delete";
  avatarWrapper.className = "discussion__avatar--wrapper";
  discussionContent.className = "discussion__content";
  discussionAnswered.className = "discussion__answered";

  if (obj.title.length > 30) {
    let titleMaxLength = "";
    for (let i = 0; i < 30; i++) {
      titleMaxLength += obj.title[i];
    }
    obj.title = titleMaxLength + " ...";
  }

  discussionDelete.insertAdjacentHTML(
    "afterbegin",
    '<i class="fa-solid fa-circle-xmark"></i>'
  );
  avatarWrapper.insertAdjacentHTML(
    "afterbegin",
    `<img class="discussion_avatar_image" src = ${obj.avatarUrl} alt = "avatar"></img>`
  );
  discussionContent.insertAdjacentHTML(
    "afterbegin",
    `<h2 class="discussion_title">
    <a href = "https://github.com/codestates-seb/agora-states-fe/discussions/6">${obj.title}</a>
    </h2>
    <div class = "discussion_information"><p>${obj.author}</p><p>${obj.createdAt}</p></div>`
  );
  discussionAnswered.insertAdjacentHTML(
    "afterbegin",
    '<i class="fa-sharp fa-regular fa-square-check"></i>'
  );

  li.append(
    discussionDelete,
    avatarWrapper,
    discussionContent,
    discussionAnswered
  );

  discussionDelete.addEventListener("click", () => {
    agora = agora.filter((item) => item !== obj);
    localStorage.setItem("agora", JSON.stringify(agora));
    li.remove();
  });

  return li;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const addQuestion = {};
  for (let key in agora[0]) {
    addQuestion[key] = "";
  }

  addQuestion.author = name.value;
  addQuestion.title = title.value;
  addQuestion.story = story.value;
  addQuestion.createdAt = today;
  addQuestion.avatarUrl =
    "./img/093C4452-0625-41CE-B142-F8F632E02E4C_1_105_c.jpeg";

  agora.unshift(addQuestion);
  localStorage.setItem("agora", JSON.stringify(agora));
  ul.prepend(convertToDiscussion(agora[0]));
});

const render = ((element) => {
  for (let i of agora) {
    element.append(convertToDiscussion(i));
  }
})(ul);
