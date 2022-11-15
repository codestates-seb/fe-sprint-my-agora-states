export const submitDiscussion = () => {
  const inputName = document.querySelector("#name");
  const inputTitle = document.querySelector("#title");
  const inputStory = document.querySelector("#story");
  const submit = document.querySelector("#form");
  let result = {};
  let nameCount = 0;

  const removeSubmit = (...input) => {
    result.author = inputName.value;
    result.title = inputTitle.value;
    result.createAt = new Date().toDateString();
    console.log(result);
    localStorage.setItem("discussion" + nameCount, JSON.stringify(result));
    input.forEach((x) => {
      x.value = "";
    });
    result = {};
  };

  const print = () => {};
  submit.addEventListener("submit", function (even) {
    even.preventDefault();
    removeSubmit(inputName, inputTitle, inputStory);
  });
};
