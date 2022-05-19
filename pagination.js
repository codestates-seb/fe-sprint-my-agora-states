let articlesPerPage = Number(localStorage.getItem("articlesPerPage")) || 10;

function lastPage(database) {
  return Math.ceil(database.length / articlesPerPage);
}

function labelingPages(totalPages, currentPage = 1) {
  const maxLength = totalPages > 5 ? 5 : totalPages;
  let pageLabels = Array(maxLength).fill(0).map((el, i) => i + 1);

  if (currentPage > 1 && totalPages > 5) {

  }
  return pageLabels
}

console.log(labelingPages(6, 3))
