const searchInput = document.querySelector(".search--input");
const createBtn = document.querySelector(".search--create");
const titles = document.querySelectorAll(".discussion__title");
const authors = document.querySelectorAll(".discussion__author");

// 제목, 내용, 작성자로 검색
function handleSearch(event) {
  const searchKey = event.target.value;
  if (searchKey === "") render(ul);
  else {
    while (ul.firstChild) {
      ul.firstChild.remove();
    }
    const discussionDatas = JSON.parse(localStorage.getItem("data"));
    console.log(discussionDatas);
    for (let i = 0; i < discussionDatas.length; i++) {
      const titleCheck = discussionDatas[i].title
        .toUpperCase()
        .replace(/ /g, "")
        .includes(searchKey.toUpperCase().replace(/ /g, ""));

      const authorCheck = discussionDatas[i].author
        .toUpperCase()
        .replace(/ /g, "")
        .includes(searchKey.toUpperCase().replace(/ /g, ""));

      if (titleCheck || authorCheck) {
        ul.append(convertToDiscussion(discussionDatas[i]));
      }
    }
  }
}

// 새 포스트 전환
function changeContainer() {
  // 다시 모든 discussions 보여줌
  for (let i = 0; i < ul.childNodes.length; i++) {
    titles[i].closest("li").classList.remove("hidden");
  }
  // 검색 key 초기화
  searchInput.value = "";

  // 화면 전환
  formContainer.classList.remove("hidden");
  searchContainer.classList.add("hidden");
}

searchInput.addEventListener("keyup", handleSearch);
createBtn.addEventListener("click", changeContainer);
