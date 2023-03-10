// ======== 페이지네이션 ======== //
let pageNumber = 1;
const PAGE_SIZE = 9;
const LOCAL_STORAGE_KEY = 'agora';

// 로컬스토리지 데이터 불러오기
const loadLocalStorageDate = () => {
    const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse(data);
};

// 로컬스토리지에 데이터 저장하기
const saveLocalStorageDate = (data) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

// 페이징 작업 (0~8) (9~17) (18~26)
// 페이지는 1부터 시작이지만, 게시글은 인덱스 0번부터 불러온다.
const getPagedDiscussions = (pageNumber) => {
    const pageSize = PAGE_SIZE;
    const startIndex = pageSize * (pageNumber - 1);
    const endIndex = startIndex + (pageSize - 1);

    return loadLocalStorageDate().slice(startIndex, endIndex + 1);
};

// 페이징 바 만들기(화면 새로 렌더링할 때마다 새로 그림!)
const createNavi = (ul) => {
    const naviSize = Math.ceil(loadLocalStorageDate().length / PAGE_SIZE);
    const discussionFooter = document.querySelector('#pagination_container');

    // '<' 버튼을 누르면 pageNumber - 1 해주기
    const naviPrev = document.createElement('a');
    naviPrev.textContent = '<';
    naviPrev.className = 'pagination-button';
    naviPrev.href = '#';
    naviPrev.addEventListener('click', (e) => {
        e.preventDefault();
        pageNumber = pageNumber - 1;
        if (pageNumber < 1) pageNumber = 1;
        render(ul);
    });
    discussionFooter.appendChild(naviPrev);

    // '숫자' 버튼을 누르면 해당 pageNumber로 렌더링
    for (let i = 0; i < naviSize; i++) {
        const navi = document.createElement('a');
        navi.textContent = i + 1;
        navi.id = i + 1;
        navi.className = 'pagination-button';
        navi.addEventListener('click', () => {
            pageNumber = navi.id;
            render(ul);
        });
        discussionFooter.appendChild(navi);
    }

    // '>' 버튼을 누르면 pageNumber + 1 해주기
    const naviEnd = document.createElement('a');
    naviEnd.textContent = '>';
    naviEnd.className = 'pagination-button';
    naviEnd.href = '#';
    naviEnd.addEventListener('click', (e) => {
        e.preventDefault();
        pageNumber = pageNumber + 1;
        if (pageNumber > naviSize) pageNumber = naviSize;
        render(ul);
    });
    discussionFooter.appendChild(naviEnd);
};

if (!loadLocalStorageDate()) {
    saveLocalStorageDate(agoraStatesDiscussions);
}

const $submit = document.querySelector('.form');
$submit.addEventListener('submit', (e) => {
    const obj = {
        id: 'guest',
        createdAt: dateFormating(),
        title: title.value,
        author: author.value,
        url: '#',
        avatarUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdOTLKF%2Fbtr2OqwN8fe%2F75rJmFEs9jrg9n2Wx4X1X0%2Fimg.png',
        answer: null,
    };
    console.log(obj);

    let dataObj = JSON.parse(localStorage.getItem('agora'));
    dataObj.unshift(obj);
    console.log(dataObj);
    localStorage.setItem('agora', JSON.stringify(dataObj));
    title.value = '';
    author.value = '';
});

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = document.createElement('li');
    li.className = 'discussion__container';

    const avatarWrapper = document.createElement('div');
    avatarWrapper.className = 'discussion__avatar--wrapper';
    const discussionContent = document.createElement('div');
    discussionContent.className = 'discussion__content';
    const discussionAnswered = document.createElement('div');
    discussionAnswered.className = 'discussion__answered';

    // 아바타 이미지
    const avatarImg = document.createElement('img');
    avatarImg.className = 'discussion__avatar--image';
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    // 콘텐츠
    const contentTitle = document.createElement('h2');
    contentTitle.className = 'discussion__title';
    const contentLink = document.createElement('a');
    contentLink.href = obj.url;
    contentLink.target = '_blank';
    contentLink.textContent = obj.title;
    contentTitle.append(contentLink);
    const contentInfo = document.createElement('div');
    contentInfo.className = 'discussion__information';
    contentInfo.textContent = `${obj.author} / ${obj.createdAt}`;

    discussionContent.append(contentTitle, contentLink, contentInfo);

    // 답변 표시
    const answered = document.createElement('p');
    if (obj.answer) {
        answered.textContent = '답변완료';
        answered.classList.add('complete');
    } else {
        answered.textContent = '해결중';
    }
    discussionAnswered.append(answered);

    // 컴포넌트화
    li.append(avatarWrapper, discussionContent, discussionAnswered);

    return li;
};

const render = (element) => {
    // 현재 화면에 그려진 요소들을 새로 렌더링하기 위해 기존 요소들 삭제
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }

    const pagedDiscussions = getPagedDiscussions(pageNumber);

    for (let i = 0; i < pagedDiscussions.length; i += 1) {
        element.append(convertToDiscussion(pagedDiscussions[i]));
    }
    return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
createNavi(ul);
render(ul);

// ======== 모달창 관련 ======== //
const $modal = document.querySelector('.modal');
const $form_container = document.querySelector('.form__container');
const $main_container = document.querySelector('#main_container');
const $bg = document.querySelector('.black_bg');

// 질문하기Btn 눌러서 모달 켜고 끄기
$modal.addEventListener('click', function () {
    if ($form_container.classList.contains('hide')) {
        $form_container.classList.remove('hide');
        $bg.style.display = 'block';
    } else {
        $form_container.classList.add('hide');
        $bg.style.display = 'none';
    }
});

// 모달창 바깥 클릭하면 끄기
window.addEventListener('click', (e) => {
    if (e.target === $bg) {
        $form_container.classList.add('hide');
        $bg.style.display = 'none';
    }
});

// ======== 날짜, 시간 포맷 ======== //
const dateFormating = () => {
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    let hour = today.getHours();
    let min = today.getMinutes();

    return `${year}년 ${month}월 ${day}일, ${hour}시 ${min}분`;
};
