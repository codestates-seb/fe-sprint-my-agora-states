const searchInput = document.querySelector(".search--input");
const createBtn = document.querySelector(".search--create");

function handleSearch(event) {
  const titles = document.querySelectorAll(".discussion__title");
  const authors = document.querySelectorAll(".discussion__author");

  const searchKey = event.target.value;

  for (let i = 0; i < ul.childNodes.length; i++) {
    const titleCheck = titles[i].textContent
      .toUpperCase()
      .replace(/ /g, "")
      .includes(searchKey.toUpperCase().replace(/ /g, ""));

    const authorCheck = authors[i].textContent
      .toUpperCase()
      .replace(/ /g, "")
      .includes(searchKey.toUpperCase().replace(/ /g, ""));

    if (titleCheck || authorCheck) {
      titles[i].closest("li").classList.remove("hidden");
    } else {
      titles[i].closest("li").classList.add("hidden");
    }
  }
}

function handleClickCreateBtn(event) {
  formContainer.classList.remove("hidden");
  searchContainer.classList.add("hidden");
}

searchInput.addEventListener("keyup", handleSearch);
createBtn.addEventListener("click", handleClickCreateBtn);
