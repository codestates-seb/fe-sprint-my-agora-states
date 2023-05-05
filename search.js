const searchInput = document.querySelector(".search--input");

function handleSearch(event) {
  const container = document.querySelector(".discussions__search__container");
  const titles = document.querySelectorAll(".discussion__title");
  const stories = document.querySelectorAll(".discussion__story");
  const authors = document.querySelectorAll(".discussion__author");

  while (container.firstChild) {
    container.firstChild.remove();
  }
  const searchKey = event.target.value;
  if (searchKey === "") {
    render(ul);
    return;
  }
  const discussions = ul.childNodes;
  console.dir(discussions);

  for (i of titles) {
    if (i.textContent.toUpperCase().includes(searchKey.toUpperCase())) {
      container.append(i.closest("li"));
    }
  }
  render(container);
}

searchInput.addEventListener("keyup", handleSearch);
