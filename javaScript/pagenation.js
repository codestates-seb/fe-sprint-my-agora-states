const contents = document.querySelector('ul.discussions__container');
const buttons = document.querySelector('.pagenation__Nav');

const numOfContent = agoraStatesDiscussions.length;// 41
const showContent = 10;
const showButton = 5;
const maxPage = Math.ceil(numOfContent / showContent); // 4.1 -> 5
let page = 1;

// 버튼 생성 함수
const makeButton = (id) => {
    const button = document.createElement('button');
    button.classList.add("pagenation__Btn");
    button.dataset.num = id;
    button.innerText = id;
    button.addEventListener("click", (e) => {
        Array.prototype.forEach.call(buttons.children, (button) => {
          if (button.dataset.num) button.classList.remove("active");
        });
        e.target.classList.add("active");
        renderContent(parseInt(e.target.dataset.num));
      });
    return button;
};

// 페이지 이동 함수 구현
const goPrevPage = () => {
    page -= showButton;
    renderPageNation(page);
};

const goNextPage = () => {
    page += showButton;
    renderPageNation(page);
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
next.addEventListener("click", goNextPage);

// 렌더링 함수
// 컨텐츠 10개씩 끊어서 생성
const renderContent = (page) => {
    // 목록 리스트 초기화
    while (contents.hasChildNodes()) {
        contents.removeChild(contents.lastChild);
    }
    
    // 글의 최대개수를 10개 넘지 않는 선에서, 화면에 최대 10개의 글 생성
    // agoraStatesDiscussions 를 <10 씩 끊기
    const rotateArray = (id) => convertToDiscussion(agoraStatesDiscussions[id],id);    
        
    for(let id = (page - 1) * showContent; id <= page * showContent; id++) {
        contents.appendChild(rotateArray(id));
    }
};

const renderButton = (page) => {
    // 버튼 리스트 초기화
    while (buttons.hasChildNodes()) {
        buttons.removeChild(buttons.lastChild);
    }

    // 화면에 최대 5개의 페이지 버튼 생성
     for (let id = page; id < page + showButton && id <= maxPage; id++) {
      buttons.appendChild(makeButton(id));
    }
    // 첫 버튼 활성화(class="active")
    buttons.children[0].classList.add("active");

    buttons.prepend(prev);
    buttons.append(next);

    // 이전, 다음 페이지 버튼이 필요한지 체크
    if (page - showButton < 1) buttons.removeChild(prev);
    if (page + showButton > maxPage) buttons.removeChild(next);
};

const renderPageNation = (page) => {
    console.log(agoraStatesDiscussions[0]);
  renderContent(page);
  renderButton(page);
};
renderPageNation(page);

