const formInput = document.querySelector(".form__input--wrapper");
const formInputName = formInput.querySelector(".form__input--name");
const formInputTitle = formInput.querySelector(".form__input--title");
const formInputTextbox = formInput.querySelector(".form__textbox");
const formBtn = document.querySelector(".form__submit").querySelector("input");

console.log(formBtn);
formBtn.onclick = function (event) {
  event.preventDefault();
  const inputName = formInputName.querySelector("#name").value;
  const inputTitle = formInputTitle.querySelector("#name").value;
  const inputTextbox = formInputTextbox.querySelector("#story").value;
  const obj = {
    author: inputName,
    title: inputTitle,
    createdAt: Date(),
  };
  if (inputName && inputTitle && inputTextbox) {
    console.log(inputName, inputTitle, inputTextbox);
    //console.log(convertToDiscussion(obj));

    ul.append(convertToDiscussion(obj));
    //console.log(ul);
    //render(ul);
  }
};
