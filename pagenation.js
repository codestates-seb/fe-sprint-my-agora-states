const pageCount = 10;
const pages = document.querySelectorAll("li.discussion__container");
const totalPage = document.querySelectorAll("li.discussion__container").length;
const buttonCount = Math.ceil(totalPage / pageCount);
const buttons = document.querySelector(".page_button_container");

for (let i = 0; i < buttonCount; i++) {
  const button = document.createElement("button");
  button.className = `page_button`;
  button.textContent = i + 1;
  buttons.append(button);

  button.addEventListener("click", function () {
    pageDisplay(button.textContent - 1);
  });
}

const pageDisplay = (index) => {
  let pageArr = [...pages];
  let start = index * pageCount;
  let end = start + pageCount;

  for (let page of pages) {
    page.style.display = "none";
  }

  for (let page of pageArr.slice(start, end)) {
    page.style.display = "";
  }
};
