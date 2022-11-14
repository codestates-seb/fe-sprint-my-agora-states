// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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
  // avatarWrapper
  const $avatarImg = document.createElement("img");
  $avatarImg.className = "discussion__avatar--image"; // img 태그
  $avatarImg.setAttribute("alt", `avatar of ${obj.author || ""}`); // alt 속성
  $avatarImg.src =
    obj.avatarUrl || "https://github.com/identicons/jasonlong.png";
  avatarWrapper.appendChild($avatarImg);

  // discussionContent
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

  // discussionAnswered
  const $discussionAnswered = document.createElement("p");
  $discussionAnswered.textContent = "☑";
  $discussionAnswered.className = "discussion__check";
  discussionAnswered.appendChild($discussionAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, startIdx, endIdx) => {
  // 기존 화면 비우기
  element.textContent = "";
  const paginationList = agoraStatesDiscussions.slice(startIdx, endIdx);
  for (let i = 0; i < paginationList.length; i += 1) {
    element.append(convertToDiscussion(paginationList[i]));
  }
  return;
};

/* 
  페이지네이션 처리
*/
let page = 1; // 현재 페이지 인덱스
const PAGE_ITEM_NUMBERS = 5; // 한번에 보여줄 개수
const totalPage = Math.ceil(agoraStatesDiscussions.length / PAGE_ITEM_NUMBERS); // 총 페이지 숫자

/**
 * 첫 페이지네이션을 렌더링하는 함수
 * @param totalPage 총 페이지 개수
 * @param maxShowPage 한 번에 보여줄 페이지네이션 개수
 */
const renderPagination = (totalPage, maxShowPage) => {
  const $discussion__pagination = document.querySelector(".pagination__btns");
  const $pageFragment = document.createDocumentFragment(); // fragment로 한번만 DOM 변경하기
  // 총 페이지가 한 번에 보여줄 페이지 개수보다 작거나 같은 경우
  if (totalPage <= maxShowPage) {
    for (let i = 1; i <= totalPage; i++) {
      const $pageBtn = document.createElement("button");
      $pageBtn.className = `pagination__btn ${i === 1 ? "active" : ""}`; // i===1이면 active 클래스 추가
      $pageBtn.textContent = i;
      $pageFragment.appendChild($pageBtn);
    }
  } else {
    // 총 페이지가 한 번에 보여줄 페이지 개수보다 많은 경우
    for (let i = 1; i <= maxShowPage; i++) {
      const $pageBtn = document.createElement("button");
      $pageBtn.className = `pagination__btn ${i === 1 ? "active" : ""}`; // i===1이면 active 클래스 추가
      $pageBtn.textContent = i;
      $pageFragment.appendChild($pageBtn);
    }
    // ...와 마지막 페이지 숫자 붙여주기
    const $pageNextTrack = document.createElement("span");
    $pageNextTrack.textContent = "...";
    const $lastPage = document.createElement("button");
    $lastPage.textContent = totalPage;
    $lastPage.className = "pagination__btn pagination__last";
    $pageFragment.append($pageNextTrack, $lastPage);
  }

  // DOM에 붙이기
  $discussion__pagination.appendChild($pageFragment);
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, PAGE_ITEM_NUMBERS); // 초기 화면 렌더링

// 페이지네이션 렌더링 하기
renderPagination(totalPage, PAGE_ITEM_NUMBERS);

// 질문 작성하는 로직
const $form = document.getElementById("form");
const $formName = document.getElementById("name");
const $formTitle = document.getElementById("title");

// submit 이벤트 캐치
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
  agoraStatesDiscussions.unshift(newDiscussion);
  console.log("배열 추가 확인", agoraStatesDiscussions);
  // 하나만 렌더링 해주기
  const li = convertToDiscussion(newDiscussion);
  ul.prepend(li); // 앞에 추가할 때는 prepend를 써준다.
});

/* 
  페이지네이션 이벤트 핸들러
*/
const $pagination = document.getElementById("pagination");
// 이벤트 위임
$pagination.addEventListener("click", (e) => {
  const $paginationBtns = document.querySelector(".pagination__btns");
  // button 태그인 경우에만 이벤트 처리하기
  if (
    e.target.tagName !== "BUTTON" ||
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
  page = e.target.textContent;

  // 화면 다시 렌더링하기
  render(
    ul,
    parseInt(page) * PAGE_ITEM_NUMBERS,
    parseInt(page) * PAGE_ITEM_NUMBERS + parseInt(PAGE_ITEM_NUMBERS)
  ); // 초기 화면 렌더링
});
