const agoraStatesDiscussions = require('./data.js');
require('./style.css');
console.log(agoraStatesDiscussions);
const discussions = document.querySelector('.discussions__container');

if (localStorage.getItem('data') === null) {
    localStorage.setItem('data', JSON.stringify(agoraStatesDiscussions));
}

let addData = {
    id: 'D_kwDOHOApLM4APjJi',
    createdAt: '',
    title: '',
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45',
    author: '',
    avatarUrl: 'https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4',
};

let newData = JSON.parse(JSON.stringify(addData));
const inputName = document.querySelector('#name');
let inputNameValue = '';
inputName.onkeyup = () => {
    newData.author = inputName.value;
};

const inputTitle = document.querySelector('#title');
let inputTitleValue = '';
inputTitle.onkeyup = () => {
    newData.title = inputTitle.value;
};

const inputStory = document.querySelector('#story');
let inputStoryValue = '';
inputStory.onkeyup = () => {
    newData.story = inputStory.value;
};

const offset = new Date().getTimezoneOffset() * 60000;

newData.createdAt = new Date(Date.now() - offset).toISOString().split('.')[0] + 'Z';

const form = document.querySelector('.form__submit');

// localStorage.setItem('data', JSON.stringify(agoraStatesDiscussions));
const addDiscussion = () => {
    console.log('눌림');
    let newLocalData = JSON.parse(localStorage.getItem('data'));
    newLocalData.unshift(newData);
    localStorage.setItem('data', JSON.stringify(newLocalData));
    inputName.value = '';
    inputTitle.value = '';
    inputStory.value = '';
    render(ul);

    newData = JSON.parse(JSON.stringify(addData));
    const offset = new Date().getTimezoneOffset() * 60000;
    newData.createdAt = new Date(Date.now() - offset).toISOString().split('.')[0] + 'Z';
};

form.onclick = () => {
    if (newData.author && newData.title && newData.story && newData.createdAt) {
        addDiscussion();
    } else {
        alert('빈칸을 채워주세요');
    }
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = document.createElement('li'); // li 요소 생성
    li.className = 'discussion__container'; // 클래스 이름 지정

    // 아바타
    const avatarWrapper = document.createElement('div');
    avatarWrapper.className = 'discussion__avatar--wrapper';
    const avatarImg = document.createElement('img');
    avatarImg.className = 'discussion__avatar--image';
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = obj.author;
    avatarWrapper.append(avatarImg);

    // 내용
    const discussionContent = document.createElement('div');
    discussionContent.className = 'discussion__content';

    const discussionTitle = document.createElement('h2');
    discussionTitle.className = 'discussion__title';

    const discussionTitleLink = document.createElement('a');
    discussionTitleLink.className = 'discussion_title_link';
    discussionTitleLink.href = obj.url;
    discussionTitleLink.textContent = obj.title;
    discussionTitle.append(discussionTitleLink);
    discussionContent.append(discussionTitle);

    const discussionTitleInfo = document.createElement('div');
    discussionTitleInfo.className = 'discussion__information';
    let customAt = obj.createdAt.replace('T', ' ').substring(0, 19).split(' ');
    const findAmPm = customAt[1].split(':');
    let ampm = '오전';
    if (findAmPm[0] > 12) {
        findAmPm[0] = findAmPm[0] % 12;
        ampm = '오후';
    }
    discussionTitleInfo.textContent = `${obj.author} / ${customAt[0]} ${ampm} ${findAmPm.join(':')}`;
    discussionTitle.append(discussionTitleInfo);
    discussionContent.append(discussionTitle);

    const discussionContentCheck = document.createElement('div');
    const discussionContentCheckbox = document.createElement('p');
    discussionContentCheck.className = 'discussion__answered';
    discussionContentCheckbox.textContent = obj.answer ? '☑' : 'x';
    discussionContentCheck.append(discussionContentCheckbox);
    discussionContent.append(discussionContentCheck);

    // 답변
    const discussionAnswered = document.createElement('div');
    discussionAnswered.className = 'discussion__answered';

    // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

    li.append(avatarWrapper, discussionContent, discussionAnswered, discussionContentCheck);
    return li;
};

// 페이지네이션에 필요한 변수들
const agoraStatesLocalDiscussions = JSON.parse(localStorage.getItem('data'));
let currentPage = 1;
let totalCount = agoraStatesLocalDiscussions ? agoraStatesLocalDiscussions.length : 0;
let limit = 10;
let totalPage = Math.ceil(totalCount / limit);
let pageCount = Math.ceil(totalCount / limit);
let pageGroup = Math.ceil(currentPage / pageCount);

let lastNumber = pageGroup * pageCount;
if (lastNumber > totalPage) {
    lastNumber = totalPage;
}
let firstNumber = lastNumber - (pageCount - 1);

const next = lastNumber + 1;
const prev = firstNumber - 1;

// 페이지 상단이동
const scrollTop = () => {
    window.scrollTo(0, 0);
};

// 페이지네이션
const goPrevPage = () => {
    if (currentPage === 1) {
        return;
    } else {
        currentPage -= 1;
        render(ul);
        console.log(currentPage);
    }
};

const goNextPage = () => {
    if (currentPage === lastNumber) {
        return;
    } else {
        currentPage += 1;
        render(ul);
        // scrollTop();
        console.log(currentPage);
    }
};

const goFirstPage = () => {
    currentPage = 1;
    render(ul);
};

const goEndPage = () => {
    currentPage = lastNumber;
    render(ul);
};

const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');
const firstBtn = document.querySelector('.firstBtn');
const endBtn = document.querySelector('.endBtn');

nextBtn.addEventListener('click', goNextPage);
prevBtn.addEventListener('click', goPrevPage);
firstBtn.addEventListener('click', goFirstPage);
endBtn.addEventListener('click', goEndPage);
// console.log(currentPage);

const selectPage = window.setInterval(() => {
    const buttonList = document.querySelectorAll('.numberingBtn');
    const goSelectPage = (item) => {
        currentPage = item.innerHTML;
    };
    buttonList.forEach((value) => {
        value.onclick = () => {
            goSelectPage(value);
            render(ul);
        };
    });
}, 1000);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
    discussions.innerHTML = null;
    const agoraStatesLocalDiscussions = JSON.parse(localStorage.getItem('data'));

    // 페이지 버튼 렌더링
    let html = '';
    for (let i = firstNumber; i <= lastNumber; i++) {
        html += `<button class="pageNumber numberingBtn" id="page_${i}">${i}</button>`;
    }
    document.getElementById('pageButton').innerHTML = html;

    // 리스트 렌더링
    for (let i = (currentPage - 1) * limit; i < (currentPage - 1) * limit + limit; i += 1) {
        if (agoraStatesLocalDiscussions && agoraStatesLocalDiscussions[i] === undefined) {
            element.append('');
        } else if (!!agoraStatesLocalDiscussions) {
            element.append(convertToDiscussion(agoraStatesLocalDiscussions[i]));
        }
    }
    animation();
    return;
};

const animation = () => {
    let item = document.querySelectorAll('.discussion__container');
    let cnt = 0;

    function activeFunc() {
        item[cnt]?.classList?.add('active');
        cnt++;
        if (cnt >= item.length) {
            clearInterval(addActive);
        }
    }

    let addActive = setInterval(activeFunc, 80);
};

// 목록 초기화
const resetList = document.querySelector('.list_reset_btn');
const listReset = () => {
    localStorage.removeItem('data');
};
if (resetList) {
    resetList.addEventListener('click', listReset);
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);
