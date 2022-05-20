let articlesPerPage = Number(localStorage.getItem("articlesPerPage")) || 10;

/* 데이터의 전체 페이지 수를 반환하는 함수 */
function getLastPage(database) {
  return Math.ceil(database.length / articlesPerPage);
}

/* 페이지 라벨 배열을 반환하는 함수 */
function labelingPages(totalPages, currentPage, designatedLength) {
  let labeling = {};
  const maxLength = totalPages > designatedLength ? designatedLength : totalPages;
  const middlePage = Math.ceil(designatedLength / 2);
  let pageLabels = Array(maxLength).fill(0).map((el, i) => i + 1); // [1, 2, 3, 4, 5]

  if (currentPage <= middlePage || totalPages <= designatedLength) {  // 1-A. 현재 페이지가 중간을 넘어갈 때, 2. 
    labeling.pages = pageLabels;  // [1, 2, 3, 4, 5]
  }
  else if (totalPages - currentPage < middlePage) {
    labeling.pages = pageLabels.map((el) => totalPages + el - designatedLength);  // [last-4, last-3, last-2, last-1, last]
  }
  else {
    labeling.pages = pageLabels.map((el) => currentPage + el - middlePage);  // [current-2, current-1, current, current+1, current+2]
  }

  labeling.currentIndex = labeling.pages.findIndex((el) => el === currentPage);
  return labeling  // { pages: [1, 2, 3, 4, 5], currentIndex: 현재 페이지의 pages 배열 index }
}

/* 페이지 라벨링을 다시 해 현재 페이지를 나타내주는 함수(textContent 및 class 변경) */
function relabeling(parentPageNode, totalPages, currentPage = 1, designatedLength = 5) {
  const pageNodes = Array.from(parentPageNode.children);
  const labeling = labelingPages(totalPages, currentPage, designatedLength);

  pageNodes.forEach((el, i) => {
    el.textContent = labeling.pages[i];
    el.id = "";
    if (i === labeling.currentIndex) {
      el.id = "current-page";
    }
  });
}

/* 데이터가 변경될 때 페이지 라벨 노드를 재구성하는 함수 */
function initializePageNodes(database, parentPageNode, designatedLength = 5) {
  const totalPages = getLastPage(database) > designatedLength ? designatedLength : getLastPage(database);
  const pageNodes = parentPageNode.children;
  const initialPages = pageNodes.length;

  relabeling(parentPageNode, totalPages);  // 이 함수 호출할 때마다 1페이지로 초기화 하므로 이후에 element 삭제해도 문제 없음

  // 1. 페이지 줄어들었을 때: 페이지 라벨 노드 식제
  if (totalPages < pageNodes.length) {
    Array.from(pageNodes).forEach((el, i) => {
      if (i >= totalPages) el.remove();
    })
    return;
  }

  // 2. 페이지 늘어났을 때: 페이지 라벨 노드 추가
  for (let i = 0; i < totalPages - initialPages; i += 1) {
    const newPageNode = document.createElement("span");
    newPageNode.textContent = initialPages + i + 1;
    parentPageNode.appendChild(newPageNode);
  }
}
