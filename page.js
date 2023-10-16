/* 
<ul class="discussions__container">
       
</ul>
*/

// 페이지 그룹으로 이전, 다음으로 구분하여 보여줌
// ex) 10개 페이지 -> 2개 그룹으로 1 ~ 5 / 6 ~ 10  총 2개의 그룹 (첫 그룹이거나 마지막 그룹이면 클릭 안되게)


// 필요한 페이지 번호 수 구하기
const COUNT_PER_PAGE = 5; // 한 페이지에 최대 5개 요소
const PAGE_PER_GROUP = 5; // 페이지 그룹당 페이지 개수

const getTotalPageCount = () => {
    return Math.ceil(agoraStatesDiscussions.length / PAGE_PER_GROUP);
};
let currentPage = 1; // 현재 페이지
let totalPages = getTotalPageCount(); // 전체 페이지 수
// 페이지 그룹을 업데이트하는 함수
const updatePageGroup = () => {
    return Math.ceil(currentPage / PAGE_PER_GROUP);
};
let currentGroup = updatePageGroup(); // 현재 페이지 그룹

// 이전 버튼 클릭 시
document.querySelector('.prev-button').addEventListener('click', () => {
    if (currentGroup > 1) {
      currentGroup--;
      currentPage = (currentGroup - 1) * PAGE_PER_GROUP + 1;
      setPageButtons();
  }
  
});

// 다음 버튼 클릭 시
document.querySelector('.next-button').addEventListener('click', () => {
    if (currentGroup < Math.ceil(totalPages / PAGE_PER_GROUP)) {
      currentGroup++;
      currentPage = (currentGroup - 1) * PAGE_PER_GROUP + 1;
      setPageButtons();
    }
  });
  
// 해당 페이지에서 보여줄 목록 렌더링
const setPageOf = (pageNumber) => {
// 현재 페이지 요소 가져오기
let currentPage = document.querySelector('.active');

// 'active' 클래스가 있는지 확인 후 제거
if (currentPage) {
    currentPage.classList.remove('active');
}
    ul.unnerHTML = ''; // ul 리스트 내부 비워줌
    
    let tmp = [];

    // 5 * (1 -1) = 0 ~ 5 * (1 - 1) + 5 = 5
    // 01234 인덱스 까지만 필요
    // 5 * (2 - 1) = 5

    // 1. 해당 페이지에 맞는 객체 생성
    for (
        let i = COUNT_PER_PAGE * (pageNumber - 1);
        i < COUNT_PER_PAGE * (pageNumber - 1) + COUNT_PER_PAGE &&
        i < agoraStatesDiscussions.length ;
        i++
    ) {
        tmp.push(agoraStatesDiscussions[i]);
    }

    // 페이지를 보여주면서 현재 페이지가 어디고, 현재 페이지 그룹은 어디다 정보 갱신
    currentPage = pageNumber;
  currentGroup = updatePageGroup();

    // 'class' 이름이 "number-button"이면서 텍스트 값이 currentPage와 같은 요소를 찾아 'active' 클래스 추가
  let numberButtons = document.querySelectorAll('.number-button');
  for (let i = 0; i < numberButtons.length; i++) {
      if (numberButtons[i].textContent === currentPage.toString()) {
          numberButtons[i].classList.add('active');
          break; // 해당 요소를 찾으면 루프 종료
      }
    }
  
    // 2. render 함수에 넘겨주면 끝
    render(ul, tmp);
};

// 페이지 번호 버튼 새로 생성하기
// 호출되면 1, 2, ... 페이지 번호 생성됨
const numberButtonWrapper = document.getElementsByClassName('number-buttons')[0];

const setPageButtons = () => {
    numberButtonWrapper.innerHTML = ''; // 기존 버튼 비우기
  
    const startPage = (currentGroup - 1) * PAGE_PER_GROUP + 1;
    // 마지막 페이지 그룹의 마지막 숫자보다 작으면 마지막 페이지 까지만 표기
    // 예시 : 5개씩 2개 그룹 : 10페이지 까지 가능 -> 하지만 데이터 개수로 총 9페이지 까지만 나오면 9까지만 표기
    const endPage = Math.min(startPage + PAGE_PER_GROUP - 1, totalPages);  
  
    for (let i = startPage; i <= endPage; i++) {
      const button = document.createElement('li');
      button.classList.add('number-button');
      button.textContent = i;
      numberButtonWrapper.appendChild(button);
  
      button.addEventListener('click', function (e) {
        setPageOf(+e.target.textContent);
      });
    }
};

let storedData = JSON.parse(localStorage.getItem("storedData") || "[]");
const addAdditionalData = () => {
    storedData = JSON.parse(localStorage.getItem("storedData") || "[]");
    if (storedData.length !== 0) {
        for (let i = 0; i < storedData.length; i++) {
            agoraStatesDiscussions.push(storedData[i]);
        }
    }
};

const goToLastPage = () => {
  // 마지막 페이지 정보로 수정
  currentPage = totalPages; // 가장 마지막 페이지 정보를 가지고 있음
  currentGroup = updatePageGroup(); // 가장 마지막 페이지의 그룹을 가르킴

  // 마지막 페이지를 화면에 출력
  // 페이지 버튼 업데이트
  setPageButtons();
  setPageOf(currentPage);
};
  
const goToFirstPage = () => {
  // 마지막 페이지 정보로 수정
  currentPage = 1; // 1페이지 정보를 가르킴
  currentGroup = 1; // 1페이지 그룹을 가르킴

  // 마지막 페이지를 화면에 출력
  // 페이지 버튼 업데이트
  setPageButtons();
  setPageOf(currentPage);
};
  
window.onload = function () {
    addAdditionalData(); // html 로드 시 바로 로컬스토리지에 추가 데이터가 있는지 검사하고 있으면 추가하도록
};

// 초기 페이지 버튼 생성
setPageButtons();
// 1페이지 기본으로 보여주기
setPageOf(1);
