function PageNation(list, tag) {
  const $buttons = document.querySelector(".buttons");
  const $notSearch = document.querySelector(".not__search");
  const showContent = 6;
  const maxButton = 5;
  let numOfContent = list.length;
  let maxPage = Math.round(numOfContent / showContent);
  let page = 1;

  const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정

    // img 처리
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const img = document.createElement("img");
    img.alt = `avatar`;
    img.src = obj.avatarUrl;
    img.classList.add("discussion__avatar--image");
    avatarWrapper.append(img);

    //토의 박스
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";
    const h2 = document.createElement("h2");
    const a = document.createElement("a");
    h2.classList.add("discussion__title");
    a.textContent = obj.title;
    a.href = obj.url || "#";
    a.target = "_blank";
    h2.append(a);

    //작성자 밑, 작성일
    const discussionInfo = document.createElement("div");
    discussionInfo.className = "discussion__information";
    discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
    discussionContent.append(h2, discussionInfo);

    // 답변 완료 여부 확인하기
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";
    const icon = document.createElement("i");
    const answerLink = document.createElement("a");
    if (!!obj.answer) {
      icon.className = "fa-solid fa-heart fa-2xl";
      answerLink.href = obj.answer.url;
      answerLink.target = "_blank";
      answerLink.append(icon);
      discussionAnswered.append(answerLink);
    } else {
      icon.className = "fa-solid fa-face-sad-tear fa-2xl";
      discussionAnswered.append(icon);
    }

    // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
  };

  // 페이지네이션을 위한 버튼 만들기
  const makeButton = (id) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.dataset.num = id;
    button.textContent = id;
    button.addEventListener("click", (e) => {
      Array.prototype.forEach.call($buttons.children, (button) => {
        if (button.dataset.num) button.classList.remove("active");
      });
      e.target.classList.add("active");
      renderContent(parseInt(e.target.dataset.num));
    });
    return button;
  };

  const renderButton = (page) => {
    // 버튼 리스트 초기화
    while ($buttons.hasChildNodes()) {
      $buttons.removeChild($buttons.lastChild);
    }
    // 화면에 최대 5개의 페이지 버튼 생성
    for (let id = page; id < page + maxButton && id <= maxPage; id++) {
      $buttons.appendChild(makeButton(id));
    }
    $buttons.children[0].classList.add("active");

    $buttons.prepend(prev);
    $buttons.append(next);

    // 이전, 다음 페이지 버튼이 필요한지 체크
    if (page - maxButton < 1) $buttons.removeChild(prev);
    if (page + maxButton > maxPage) $buttons.removeChild(next);
  };

  const renderContent = (page) => {
    // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
    tag.innerHTML = "";
    for (
      let id = (page - 1) * showContent + 0;
      id <= page * showContent && id <= numOfContent;
      id++
    ) {
      tag.appendChild(convertToDiscussion(list[id]));
    }
  };

  //전후 페이지 구현 및 이벤트 기능 추가
  // 전 후 버튼 이벤트
  const goPrevPage = () => {
    page -= maxButton;
    renderPageButton(page);
  };

  const goNextPage = () => {
    page += maxButton;
    renderPageButton(page);
  };

  //전 후 버튼 구현
  const prev = document.createElement("button");
  const prevIcon = document.createElement("i");
  prevIcon.className = "fa-solid fa-angle-left";
  prev.classList.add("button", "prev");
  prev.appendChild(prevIcon);
  prev.addEventListener("click", goPrevPage);

  const next = document.createElement("button");
  const nextIcon = document.createElement("i");
  nextIcon.className = "fa-solid fa-angle-right";
  next.classList.add("button", "next");
  next.appendChild(nextIcon);
  next.addEventListener("click", goNextPage);

  const renderPageButton = (page) => {
    if (list.length < 1) {
      $notSearch.classList.remove("hide");
      $buttons.innerHTML = "";
      tag.innerHTML = "";
      return;
    } else if (list.length < 7) {
      $notSearch.classList.add("hide");
      $buttons.innerHTML = "";
      renderContent(page);
    } else {
      $notSearch.classList.add("hide");
      renderContent(page);
      renderButton(page);
    }
  };
  return renderPageButton(page);
}

export default PageNation;
