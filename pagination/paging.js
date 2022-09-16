const contents = document.querySelector(".discussions__container");
const buttons = document.querySelector("#pagination");

const numOfContent = agoraStatesDiscussions.length;
const showContent = 10;
const showButton = 5;
const maxContent = 3;
const maxButton = 5;
const maxPage = Math.ceil(numOfContent / maxContent);
let page = 1;

//버튼 생성함수 구현
const makeButton = (id) => {
    const button = document.createElement("button");
    button.classList.add("button");
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

const renderContent = (page) => {
    // 목록 리스트 초기화
    while (contents.hasChildNodes()) {
        contents.removeChild(contents.lastChild);
    }
    // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
    for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
        contents.appendChild(convertToDiscussion(agoraStatesDiscussions[id]));
    }
};
//페이지 이동
const goPrevPage = () => {
    page -= maxButton;
    renderPage(page);
};

const goNextPage = () => {
    page += maxButton;
    renderPage(page);
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
next.addEventListener("click", goNextPage);

const renderButton = (page) => {
    // 버튼 리스트 초기화
    while (buttons.hasChildNodes()) {
        buttons.removeChild(buttons.lastChild);
    }
    // 화면에 최대 5개의 페이지 버튼 생성
    for (let id = page; id < page + maxButton && id <= maxPage; id++) {
        buttons.appendChild(makeButton(id));
    }
    // 첫 버튼 활성화(class="active")
    buttons.children[0].classList.add("active");

    buttons.prepend(prev);
    buttons.append(next);

    // 이전, 다음 페이지 버튼이 필요한지 체크
    if (page - maxButton < 1) buttons.removeChild(prev);
    if (page + maxButton > maxPage) buttons.removeChild(next);
};

const renderPage = (page) => {
    renderContent(page);
    renderButton(page);
};
renderPage(page);

