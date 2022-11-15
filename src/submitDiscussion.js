export const submitDiscussion = () => {
  const inputName = document.querySelector("#name");
  const inputTitle = document.querySelector("#title");
  const inputStory = document.querySelector("#story");
  const submit = document.querySelector("#form");
  let result = {};
  let nameCount = 0;
  let date = new Date().toDateString();

  const removeSubmit = (...input) => {
    result.author = inputName.value;
    result.title = inputTitle.value;
    result.createAt = date;
    nameCount++;
    localStorage.setItem("discussion" + nameCount, JSON.stringify(result));
    agoraStatesDiscussions.unshift(result);
    input.forEach((x) => {
      x.value = "";
    });
    result = {};
  };

  submit.addEventListener("submit", function (even) {
    even.preventDefault();
    removeSubmit(inputName, inputTitle, inputStory);
  });
};
