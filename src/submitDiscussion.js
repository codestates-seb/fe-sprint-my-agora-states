export const submitDiscussion = () => {
  const inputName = document.querySelector("#name");
  const inputTitle = document.querySelector("#title");
  const inputStory = document.querySelector("#story");
  const submit = document.querySelector("#form");
  let result = {};

  const remove = (...input) => {
    input.forEach((x, i) => {
      result[`${i}`] = x.value;
      x.value = "";
    });
  };

  submit.addEventListener("submit", function (even) {
    even.preventDefault();
    remove(inputName, inputTitle, inputStory);
  });
  return result;
};
