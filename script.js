const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const title = document.createElement("h2");
  title.className = "discussion__title";
  const titleText = document.createElement("a");
  titleText.href = obj.url;
  titleText.innerText = obj.title;
  discussionContent.append(title);
  title.append(titleText);

  const information = document.createElement("div");
  information.className = "discussion__information";
  information.innerText = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(information);

  const answer = document.createElement("p");
  answer.innerText = obj.answer ? "✅" : "❌";
  discussionAnswered.append(answer);

  return li;
};

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const form = document.querySelector("form.form");
const author = document.querySelector("div.form__input--name > input");
const title = document.querySelector("div.form__input--title > input");
const textbox = document.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  agoraStatesDiscussions.unshift(obj);

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  render(ul);
});

const ul = document.querySelector("ul.discussions__container");
render(ul);
