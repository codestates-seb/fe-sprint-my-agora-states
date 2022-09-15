const eventForm = document.querySelector(".form");
const nameInput = document.querySelector(".form__input--name input");
const titleInput = document.querySelector(".form__input--title input");
const questionTextarea = document.getElementById("story");

let users = [];
const USER = "user";

function saveUser() {
  localStorage.setItem(USER, JSON.stringify(users));
}
function toZero() {
  nameInput.value = "";
  titleInput.value = "";
  questionTextarea.value = "";
}
const addContent = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.appendChild(avatarImg);

  const titleContent = document.createElement("h2");
  titleContent.className = "discussion__title";
  const titleHyper = document.createElement("a");
  titleHyper.href = obj.url;
  titleHyper.textContent = obj.title;

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;

  const discussionCheckBox = document.createElement("p");
  discussionCheckBox.textContent = "☑";
  //자식 요소 넣기
  discussionAnswered.appendChild(discussionCheckBox);
  discussionContent.append(titleContent, discussionInformation);
  titleContent.appendChild(titleHyper);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  ul.insertBefore(li, ul.firstElementChild);
};

const images = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.jpeg",
  "9.jpeg",
  "10.jpeg",
];
const chosenImage = images[Math.floor(Math.random() * images.length)];
console.log(chosenImage);

function onHandleSubmit(event) {
  event.preventDefault();
  const newObj = {
    author: nameInput.value,
    id: Date.now(),
    title: titleInput.value,
    createdAt: Date(),
    avatarUrl: `img/${chosenImage}`,
  };
  users.push(newObj);
  saveUser();
  addContent(newObj);
  toZero();
}

const savedUsers = localStorage.getItem(USER);
if (savedUsers !== null) {
  const paresdUsers = JSON.parse(savedUsers);
  paresdUsers.forEach((user) => addContent(user));
  users = paresdUsers;
}

eventForm.addEventListener("submit", onHandleSubmit);
