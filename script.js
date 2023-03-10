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
    //이미지
    const avatarImg = document.createElement("img");
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = "avatar of " + obj.author;
    avatarWrapper.append(avatarImg);

    //타이틀
    const contentTitle = document.createElement("h2");
    const contentUrl = document.createElement("a");
    contentUrl.href = obj.url;
    contentUrl.textContent = `${obj.title}`;
    contentTitle.className = "discussion__title";
    contentTitle.append(contentUrl);
    discussionContent.append(contentTitle);

    //작성자, 날짜
    const contentAuthor = document.createElement("div");
    contentAuthor.className = "discussion__information";
    contentAuthor.textContent = `${obj.author} / ${new Date(
        obj.createdAt
    ).toLocaleString()}`;
    discussionContent.append(contentAuthor);

    //답변 여부
    const iconAnswered = document.createElement("i");
    iconAnswered.className = "fa-regular";
    if (obj.answer !== null) {
        iconAnswered.classList.add("fa-square-check");
    } else {
        iconAnswered.classList.add("fa-square");
    }
    discussionAnswered.append(iconAnswered);

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
};

const askAnythingBtn = document.querySelector(".text-balloon__btn");
const askAnythingPopup = document.querySelector(".overlay");
const popupCancelBtn = document.querySelector(".form__button--cancel");
const popupSubmitBtn = document.querySelector(".form__button--submit");
const form = document.querySelector("form.form");
const inputName = document.querySelector("input#name");
const inputTitle = document.querySelector("input#title");
const textarea = document.querySelector("textarea#story");

//입력창 초기화
const reset = () => {
    inputName.value = "";
    inputTitle.value = "";
    textarea.value = "";
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newDiscussion = {
        id: "unique value",
        createdAt: new Date(),
        title: inputTitle.value,
        url: "https://github.com/codestates-seb/agora-states-fe/discussions/",
        author: inputName.value,
        bodyHTML: textarea.value,
        answer: null,
        avatarUrl: "https://picsum.photos/seed/picsum/50",
    };
    discussionContainer.prepend(convertToDiscussion(newDiscussion));
    data.unshift(newDiscussion);
    saveToLocalStorage(data);
    reset();
});

//모달 팝업 제어
askAnythingBtn.addEventListener("click", function () {
    askAnythingPopup.classList.remove("hide");
});
popupCancelBtn.addEventListener("click", function () {
    askAnythingPopup.classList.add("hide");
    reset();
});
popupSubmitBtn.addEventListener("click", function () {
    if (inputName.value === "") {
        alert("이름을 입력해주세요.");
    } else if (inputTitle.value === "") {
        alert("제목을 입력해주세요.");
    } else if (textarea.value === "") {
        alert("내용을 입력해주세요.");
    } else {
        askAnythingPopup.classList.add("hide");
        window.location.reload();
    }
});

//로컬스토리지 저장 기능
const saveToLocalStorage = (obj) => {
    localStorage.setItem("discussionList", JSON.stringify(obj));
    return;
};
const getFromLocalStorage = (name) => {
    let data = JSON.parse(localStorage.getItem(name));
    return data;
};
if (!localStorage.getItem("discussionList")) {
    saveToLocalStorage(agoraStatesDiscussions);
}

let data = getFromLocalStorage("discussionList");

// //페이지네이션
const discussionList = document.querySelector(".discussion__container");
const pagination = document.querySelector(".pagination");
const numOfContent = data.length;
const maxContent = 10;
const maxButton = 5;
const maxPage = Math.ceil(numOfContent / maxContent);
let page = 1;

const makeButton = (id) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.dataset.num = id;
    button.innerText = id;
    button.addEventListener("click", (e) => {
        Array.prototype.forEach.call(pagination.children, (button) => {
            if (button.dataset.num) button.classList.remove("active");
        });
        e.target.classList.add("active");
        renderContent(parseInt(e.target.dataset.num));
    });
    return button;
};

const renderContent = (page) => {
    // 목록 리스트 초기화
    while (discussionContainer.hasChildNodes()) {
        discussionContainer.removeChild(discussionContainer.lastChild);
    }
    // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
    for (
        let id = (page - 1) * maxContent;
        id < page * maxContent && id < numOfContent;
        id++
    ) {
        discussionContainer.append(convertToDiscussion(data[id]));
    }
};

const renderButton = (page) => {
    // 버튼 리스트 초기화
    while (pagination.hasChildNodes()) {
        pagination.removeChild(pagination.lastChild);
    }
    // 화면에 최대 10개의 페이지 버튼 생성
    for (let id = page; id < page + maxButton && id <= maxPage; id++) {
        pagination.appendChild(makeButton(id));
    }
    // 첫 버튼 활성화(class="active")
    pagination.children[0].classList.add("active");

    pagination.prepend(prev);
    pagination.append(next);

    // 이전, 다음 페이지 버튼이 필요한지 체크
    if (page - maxButton < 1) pagination.removeChild(prev);
    if (page + maxButton > maxPage) pagination.removeChild(next);
};

const goPrevPage = () => {
    page -= maxButton;
    render2(page);
};

const goNextPage = () => {
    page += maxButton;
    render2(page);
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.textContent = "<";
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.textContent = ">";
next.addEventListener("click", goNextPage);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
    // for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    // }
    for (let i = 0; i < data.length; i++) {
        element.append(convertToDiscussion(data[i]));
    }
    return;
};

const render2 = (page) => {
    renderContent(page);
    renderButton(page);
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const discussionContainer = document.querySelector("ul.discussions__container");
render(discussionContainer);
render2(page);
