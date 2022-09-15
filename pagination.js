import convertToDiscussion from "./converToDiscussion.js";

function calculateMaxPage(total, pageInfo) {
  if(total % 10 ) {
    pageInfo.pagemax = Math.ceil(total / 10);
  } else {
    pageInfo.pagemax = total / 10;
  }
  console.log(total, pageInfo.pagemax);
}

  // 데이터 개수에 따라 페이지들로 이동할 수 있는 a태그들을 만들어 주는 함수
  function makingPageButtons (el, pageInfo, data) {
    let pagemax = pageInfo.pagemax;
    console.log(pageInfo);
    for(let i = 1; i <= pagemax; i++) {
      const pageElement = document.createElement('a'); //빈 a태그 생성 후 반복문으로 숫자 자동 할당
      pageElement.textContent = i;
      pageElement.id = i;
      pageElement.className = 'pagebtn';
      pageElement.onclick = () => {pageInfo.currentPage = pageRender(i, data)}; // 페이지렌더러 함수에 자신의 페이지 번호에 해당하는 인수를 넘겨준뒤 이벤트 바인딩
      el.append(pageElement);
    }
  }
  
  // 버튼을 누를 때마다 페이지 번호에 해당되는 데이터들을 렌더링 하는 함수
  function pageRender (pagenum, data) {
    // currentPage = pagenum; //currentPage 변수에 자신이 해당되는 페이지 넘버를 전달
    const ul = document.querySelector('ul.discussions__container');

    let startIdx = (pagenum -1) * 10;
    let endIdx = pagenum * 10;
    while(ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    // 렌더링 해야할 양이 10개 이상일 경우, 10개만 렌더링
    if(data.length - startIdx >= 10) {
      for(startIdx; startIdx < endIdx; startIdx++) {
        ul.append(convertToDiscussion(data[startIdx]));
      }
    } else { // 그렇지 않으면 남은 갯수 전부 렌더링
      for(startIdx; startIdx < data.length; startIdx++) {
        ul.append(convertToDiscussion(data[startIdx]));
      }
    }

    return pagenum;
  }


export {makingPageButtons, pageRender, calculateMaxPage};