// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
// localStorage에 디스커션 목록이 있는 경우, 해당 목록을 사용하기
let discussionList = localStorage.getItem("discussionList")
  ? JSON.parse(localStorage.getItem("discussionList"))
  : agoraStatesDiscussions;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // avatarWrapper 아바타 DOM
  const $avatarImg = document.createElement("img");
  $avatarImg.className = "discussion__avatar--image"; // img 태그
  $avatarImg.setAttribute("alt", `avatar of ${obj.author || ""}`); // alt 속성
  $avatarImg.src =
    obj.avatarUrl || "https://github.com/identicons/jasonlong.png";
  avatarWrapper.appendChild($avatarImg);

  // discussionContent 토론 내용 DOM
  const $titleWrapper = document.createElement("h2");
  $titleWrapper.className = "discussion__title";
  const $title = document.createElement("a");
  const $discussionInfo = document.createElement("div");
  $discussionInfo.className = "discussion__information";

  $title.textContent = obj.title;
  $title.href = obj.url;
  const createdAt = obj.createdAt
    ? new Date(obj.createdAt).toLocaleString()
    : "-";
  $discussionInfo.textContent = `${obj.id}\t/\t${createdAt}`;
  $titleWrapper.appendChild($title);
  discussionContent.append($titleWrapper, $discussionInfo);

  // discussionAnswered 토론 기타 정보 DOM
  const $discussionAnswered = document.createElement("p");
  $discussionAnswered.textContent = "☑";
  $discussionAnswered.className = "discussion__check";
  discussionAnswered.appendChild($discussionAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

/**
 * @description agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
 * @param element DOM 요소
 * @param startIdx 화면에 보여줄 배열 시작 인덱스
 * @param endIdx 화면에 보여줄 배열 마지막 인덱스 (포함 X )
 * @param dataList 사용할 데이터 배열
 */
const render = (element, startIdx, endIdx, dataList) => {
  element.textContent = ""; // 기존 화면 비우기
  const paginationList = dataList.slice(startIdx, endIdx);
  for (let i = 0; i < paginationList.length; i += 1) {
    element.append(convertToDiscussion(paginationList[i]));
  }
  return;
};

/**
 * @description 첫 페이지네이션을 렌더링하는 함수
 * @param totalPage 총 페이지 개수
 * @param maxShowPage 한 번에 보여줄 페이지네이션 개수
 */
const renderPagination = (totalPage, maxShowPage) => {
  const $discussionPagination = document.querySelector(".pagination__btns");
  $discussionPagination.textContent = ""; // 렌더링 전 초기화
  const $pageFragment = document.createDocumentFragment(); // fragment로 한번만 DOM 변경하기

  // 총 페이지가 한 번에 보여줄 페이지 개수보다 작거나 같은 경우
  if (totalPage <= maxShowPage) {
    for (let i = 1; i <= totalPage; i++) {
      const $pageBtn = document.createElement("a");
      $pageBtn.className = `pagination__btn ${
        parseInt(page) === i ? "active" : ""
      }`; // i===1이면 active 클래스 추가
      $pageBtn.textContent = i;
      $pageFragment.appendChild($pageBtn);
    }
  } else {
    // 총 페이지가 한 번에 보여줄 페이지 개수보다 많은 경우
    // 만약 현재 페이지(page)가 중간 이상 숫자인 경우 앞에 1번 페이지와 prevTrack 추가
    // if (page >= Math.ceil(maxShowPage / 2)) {
    if (page >= 2) {
      const $firstPage = document.createElement("a");
      $firstPage.className = "pagination__btn";
      $firstPage.textContent = "1";

      const $pagePrevTrack = document.createElement("span");
      $pagePrevTrack.textContent = "...";
      $pagePrevTrack.className = "pagination__prev-track";
      $pageFragment.appendChild($firstPage);
      $pageFragment.appendChild($pagePrevTrack);
    }
    // 나머지 페이지네이션 추가
    for (let i = 0; i < maxShowPage; i++) {
      // for문은 항상 maxShowPage 만큼 돌아야한다.
      let startIdx = page - Math.floor(maxShowPage / 2);
      if (startIdx <= 0) {
        startIdx = 1;
      }
      // 시작 idx에서 maxShowPage칸 이동한 경우가 totalPage보다 크다면
      // 그 격차만큼 더 적은 idx부터 페이지네이션을 시작해야한다.
      if (startIdx + maxShowPage - 1 > totalPage) {
        // startIdx -= (startIdx + maxShowPage - 1 - totalPage);
        startIdx -= startIdx + maxShowPage - 1 - totalPage;
      }
      const $pageBtn = document.createElement("a");
      $pageBtn.className = `pagination__btn ${
        parseInt(page) === startIdx + i ? "active" : ""
      }`; // page이면 active 클래스 추가
      $pageBtn.textContent = startIdx + i;
      $pageFragment.appendChild($pageBtn);
    }

    // nexdTrack(...)와 마지막 페이지 숫자 붙여주기
    const $pageNextTrack = document.createElement("span");
    $pageNextTrack.textContent = "...";
    $pageNextTrack.className = "pagination__next-track";

    const $lastPage = document.createElement("a");
    $lastPage.textContent = totalPage;
    $lastPage.className = "pagination__btn pagination__last";
    $pageFragment.append($pageNextTrack, $lastPage);

    // 총 페이지 개수 totalPage가 최대 보여줘야하는 페이지네이션보다 큰 경우
    // 만약 자식 중의 contenteText 중에 total이 있다면 마지막 제거
    // = 화면에 마지막 페이지 번호가 나왔기 때문에 존재할 이유가 없음
    for (const pageBtn of [...$pageFragment.children]) {
      if (
        parseInt(pageBtn.textContent) === totalPage &&
        !pageBtn.classList.contains("pagination__last")
      ) {
        const nextTrack = $pageFragment.querySelector(
          ".pagination__next-track"
        );
        const lastPage = $pageFragment.querySelector(".pagination__last");
        $pageFragment.removeChild(nextTrack);
        $pageFragment.removeChild(lastPage);
      }
    }
  }

  // DOM에 붙이기
  $discussionPagination.appendChild($pageFragment);
};

/* 
  DOM 선언문
*/
// Discussion List DOM
const ul = document.querySelector("ul.discussions__container");
// form DOM
const $form = document.getElementById("form");
const $formName = document.getElementById("name");
const $formTitle = document.getElementById("title");
const $formStory = document.getElementById("story");
// 페이지네이션 DOM
const $pagination = document.getElementById("pagination");
const $paginationPrevBtn = document.querySelector(".pagination__prev");
const $paginationNextBtn = document.querySelector(".pagination__next");

/* 
  렌더링
*/
let page = 1; // 현재 페이지 인덱스
const PAGE_ITEM_NUMBERS = 10; // 한번에 보여줄 개수
let totalPage = Math.ceil(discussionList.length / PAGE_ITEM_NUMBERS); // 총 페이지 숫자

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul, 0, PAGE_ITEM_NUMBERS, discussionList); // 초기 화면 렌더링
// 페이지네이션 렌더링 하기
renderPagination(totalPage, 5);

/* 
  이벤트 핸들러
*/
// form 제출 이벤트 핸들러
$form.addEventListener("submit", (e) => {
  // 기존 submit 기능 중지시키기
  e.preventDefault();

  // 배열에 입력한 데이터를 추가하기
  const newDiscussion = {
    id: $formName.value,
    createdAt: new Date(),
    title: $formTitle.value,
    url: "",
    author: $formName.value,
    answer: null,
    bodyHTML: "",
    avatarUrl: "",
  };
  // 배열 가장 앞에 넣어주기
  discussionList.unshift(newDiscussion);

  page = 1; // 페이지 1로 변경
  totalPage = Math.ceil(discussionList.length / PAGE_ITEM_NUMBERS); // 토탈 페이지 다시 계산

  // 맨 앞 페이지로 이동하고, 다시 렌더링
  render(ul, 0, PAGE_ITEM_NUMBERS, discussionList); // 초기 화면 렌더링
  // 페이지네이션 다시 렌더링
  renderPagination(totalPage, 5);

  // 제출한 배열을 로컬 스토리지에 저장한다.
  localStorage.setItem("discussionList", JSON.stringify(discussionList));

  // 제출 후, input창 내용 지우기
  $formName.value = "";
  $formTitle.value = "";
  $formStory.value = "";
});

// 페이지네이션 이벤트 핸들러 - 이벤트 위임
const changePage = (e) => {
  const $paginationBtns = document.querySelector(".pagination__btns");
  // A 태그인 경우에만 이벤트 처리하기
  if (
    e.target.tagName !== "A" ||
    e.target.classList.contains("pagination__last") ||
    e.target.classList.contains("pagination__prev") ||
    e.target.classList.contains("pagination__next")
  )
    return;
  // 모든 요소에서 active 제거하기 -> 다른 방법이 없을까?
  for (let i = 0; i < $paginationBtns.children.length; i++) {
    $paginationBtns.children[i].classList.remove("active");
  }
  // 현재 클릭한 요소에 클래스 추가하기
  e.target.classList.add("active");
  // 해당 값으로 page값 변경하기
  page = parseInt(e.target.textContent);

  // 화면 다시 렌더링하기
  render(
    ul,
    parseInt(page - 1) * PAGE_ITEM_NUMBERS,
    parseInt(page - 1) * PAGE_ITEM_NUMBERS + parseInt(PAGE_ITEM_NUMBERS),
    discussionList
  ); // 초기 화면 렌더링

  // 페이지네이션 다시 렌더링
  renderPagination(totalPage, 5);

  // 페이지 변경 시, 스크롤을 최상단으로 변경
  window.scrollTo({
    top: 0,
    // left: 0,
    behavior: "smooth",
  });
};
$pagination.addEventListener("click", changePage);

// prev 버튼, next 버튼 이벤트 핸들러
$paginationPrevBtn.addEventListener("click", () => {
  // page가 0보다 작아지는 경우
  if (page - 1 <= 0) return;
  page--;
  // 이전 페이지 클릭하기
  const $paginationBtns = document.querySelector(".pagination__btns");
  const children = [...$paginationBtns.children];
  // 현재 눌려야하는 엘리먼트 찾기
  for (const pageBtn of children) {
    if (parseInt(pageBtn.textContent) === page) {
      pageBtn.click(); // 클릭
      break;
    }
  }
});
$paginationNextBtn.addEventListener("click", () => {
  // page가 토탈 페이지보다 커지는 경우
  if (parseInt(page) + 1 > totalPage) return; // 자꾸 page가 string 타입이 된다.
  page++;
  // 다음 페이지 클릭하기
  const $paginationBtns = document.querySelector(".pagination__btns");
  const children = [...$paginationBtns.children];
  // 현재 눌려야하는 엘리먼트 찾기
  for (const pageBtn of children) {
    if (parseInt(pageBtn.textContent) === page) {
      pageBtn.click(); // 클릭
      break;
    }
  }
});
