const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const submitButton = document.querySelector(".submit_button");

document.querySelector(".form").onsubmit = (event) => {
  if (inputTitle.value === "") {
    return;
  }
  if (inputName.value === "") {
    return;
  }
  if (inputStory.value === "") {
    return;
  }
  event.preventDefault();
  const obj = {
    id: "",
    createdAt: new Date(),
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/87750478?s=64&v=4",
  };

  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
};
