// localStorage 
const localStorage = window.localStorage;
// localStorage.clear();

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정

    const discussionContentContainer = document.createElement('div');
    discussionContentContainer.className = 'discussion__content--container';

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    discussionContentContainer.append(avatarWrapper);

    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";
    discussionContentContainer.append(discussionContent);

    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";
    discussionContentContainer.append(discussionAnswered);

    // profile image
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('discussion__avatar--image');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    // title
    const discussionTitle = document.createElement('h2');
    discussionTitle.classList.add('discussion__title');
    discussionContent.append(discussionTitle);

    // title -> url
    const discussionURL = document.createElement('a');
    discussionURL.href = obj.url;
    discussionURL.textContent = obj.title;
    discussionTitle.append(discussionURL);

    // information
    const discussionInfo = document.createElement('div');
    discussionInfo.classList.add('discussion__information');
    discussionContent.append(discussionInfo);

    // author 
    const discussionInfoAuthor = document.createElement('span');
    discussionInfoAuthor.classList.add('discussion__information--author');
    discussionInfoAuthor.textContent = obj.author;
    discussionInfo.append(discussionInfoAuthor);

    // author 
    const discussionInfoDate = document.createElement('span');
    discussionInfoDate.classList.add('discussion__information--date');
    const createdDateTime = new Date(obj.createdAt).toLocaleString('en-US', {
        dateStyle: 'short',
        timeStyle: 'short',
    });
    discussionInfoDate.textContent = createdDateTime;
    discussionInfo.append(discussionInfoDate);


    const discussionAnsweredSign = document.createElement('i');

    if (!obj.answer) {
        discussionAnsweredSign.classList.add('fa-regular', 'fa-circle-check');
    } else {
        discussionAnsweredSign.classList.add('fa-solid', 'fa-circle-check');
    }

    discussionAnswered.append(discussionAnsweredSign);

    const hr = document.createElement('div');
    hr.classList.add('hr');

    li.append(discussionContentContainer, hr);
    return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
    for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        const obj = JSON.parse(localStorage.getItem(key));

        element.append(convertToDiscussion(obj));
    }

    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
        element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }

    return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// declare/set pagination variables
const paginationNumbers = document.querySelector("#pagination-numbers");
const paginatedList = document.querySelector("#paginated-list");
let listItems = paginatedList.querySelectorAll(".discussion__container");
const nextButton = document.querySelector("#next-button");
const prevButton = document.querySelector("#prev-button");

const paginationLimit = 7;
let pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

// add discussion to list on submit 
let form = document.querySelector('.form');
form.onsubmit = function (e) {
    // prevent page from refreshing 
    e.preventDefault();

    // create input data object 
    const createdDateTime = new Date();
    const author = document.querySelector('#name');
    const title = document.querySelector('#title');

    const inputData = {
        avatarUrl: `https://avatars.dicebear.com/api/identicon/:${author.value}.svg`,
        author: author.value,
        url: '',
        title: title.value,
        createdAt: createdDateTime,
        answer: null,
    };

    const random_id = `_${Math.random().toString(30).substr(2,17) + Math.random().toString(30).substring(2,17)}`;
    localStorage[random_id] = JSON.stringify(inputData);
    
    ul.prepend(convertToDiscussion(inputData));

    // update pagination on discussion post submission 
    listItems = paginatedList.querySelectorAll(".discussion__container");
    pageCount = Math.ceil(listItems.length / paginationLimit);

    document.querySelector("#pagination-numbers").textContent = '';
    getPaginationNumbers();
    setCurrentPage(1);
    addEventToPaginationNumber();

    // reset submission value 
    author.value = '';
    title.value = '';
    document.querySelector('#story').value = '';
};

// pagination
const disableButton = (button) => {
    button.classList.add("disabled");
    button.setAttribute("disabled", true);
};

const enableButton = (button) => {
    button.classList.remove("disabled");
    button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
    if (currentPage === 1) {
        disableButton(prevButton);
    } else {
        enableButton(prevButton);
    }

    if (pageCount === currentPage) {
        disableButton(nextButton);
    } else {
        enableButton(nextButton);
    }
};

const handleActivePageNumber = () => {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");
        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage) {
            button.classList.add("active");
        }
    });
};

const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
    }
};

const setCurrentPage = (pageNum) => {
    currentPage = pageNum;

    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    listItems.forEach((item, index) => {
        item.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
            item.classList.remove("hidden");
        }
    });
};

const addEventToPaginationNumber = function () {
    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
            button.addEventListener("click", () => {
                setCurrentPage(pageIndex);
            });
        }
    });
};

window.addEventListener("load", () => {
    getPaginationNumbers();
    setCurrentPage(1);

    prevButton.addEventListener("click", () => {
        setCurrentPage(currentPage - 1);
    });

    nextButton.addEventListener("click", () => {
        setCurrentPage(currentPage + 1);
    });

    addEventToPaginationNumber();
});