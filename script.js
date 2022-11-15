//로컬 스토리지에 정보 저장
let data;
//agoraStatesDiscussions 으로부터 string 타입으로 가져옴
const dataFromLocalStorage = localStorage.getItem('agoraStatesDiscussions');

if (dataFromLocalStorage) {
    //있으면 data 변수에 문자열로 가져온 dataFromLocalStorage 을 배열로 다시 변환하여 할당
    data = JSON.parse(dataFromLocalStorage);
} else {
    //없으면 data 에 agoraStatesDiscussions과 다른 주소를 가진 새로운 배열 할당
    //로컬 스토리지 삭제 후에는 데이터 초기화시키기
    data = agoraStatesDiscussions.slice();
}

//DOM 으로 데이터 바꾸기
const makeContent = (obj) => {
    const li = document.createElement('li');
    li.className = 'discussion__container';

    //1. 아바타 정보 만들기
    const avatarWrapper = document.createElement('div');
    avatarWrapper.className = 'discussion__avatar--wrapper';

    const avatarImage = document.createElement('img');
    avatarImage.className = 'discussion__avatar--image';
    avatarImage.src = obj.avatarUrl;
    avatarImage.alt = `avatar of ${obj.author}`;

    avatarWrapper.append(avatarImage);

    //2.content 내용 만들기
    const discussionContent = document.createElement('div');
    discussionContent.className = 'discussion__content';

    //2-1. content 제목 만들기
    const discussionTitle = document.createElement('h2');
    discussionTitle.className = 'discussion__title';

    const titleAnchor = document.createElement('a');
    titleAnchor.href = obj.url;
    titleAnchor.textContent = obj.title;

    discussionTitle.append(titleAnchor);

    //2-2. content 작성자, 작성시간 만들기
    const discussionInfo = document.createElement('div');
    discussionInfo.className = 'discussion__information';
    discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;

    discussionContent.append(discussionTitle, discussionInfo);

    //3.답변유무 체크박스 만들기
    const checked = document.createElement('div');
    checked.className = 'discussion__answered';

    const checkedParagraph = document.createElement('p');
    checkedParagraph.textContent = obj.answer ? '☑︎' : '☒';

    checked.append(checkedParagraph);

    //4. 모든 내용 붙이기
    li.append(avatarWrapper, discussionContent, checked);
    return li;
}

//데이터 렌더링 함수
const render = (element, from, to) => {
    //시작 값과 끝값이 정해지지 않은 상태라면 정해주기
    if (!from && !to) {
        from = 0;
        to = data.length;
    }

    //렌더해줄때마다 남아있는 정보가 있다면 모두 지우고
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    //처음부터 다시 데이터 붙이기
    for (let i = from; i < to; i++) {
        element.append(makeContent(data[i]));
    }
    //렌더링 완료 후 함수 종료시키기
    return;
}

//페이지네이션 변수
//한 화면에 보여질 질문 갯수
let maxContent = 5;
//첫페이지 설정
let page = 1;

//전체 목록 렌더링
const ul = document.querySelector('ul.discussions__container');
render(ul, 0, maxContent);

//페이지 시작과 끝 계산하는 함수
const getPage = (maxContent, page) => {
    const len = data.length;
    let start = (page - 1) * maxContent;
    let end = start + maxContent;

    if (page <= 0) {
        start = 0;
    }

    if (end >= len) {
        end = len;
    }

    return {start, end};
}

//페이지 버튼 클릭 이벤트
const buttons = document.querySelector('.buttons');

//이전 버튼 클릭시 발생 이벤트
buttons.children[0].addEventListener('click', () => {
    if (page > 1) {//현재 페이지가 2페이지면 1페이지로 이동
        page -= 1;
    }

    const {start, end} = getPage(maxContent, page);
    render(ul, start, end);
})

//다음 버튼 클릭시 발생 이벤트
buttons.children[2].addEventListener('click', () => {
    if (maxContent * page < data.length) {
        //현재 위치한 페이지에 있는 데이터 순서가 현재 데이터의 끝 인덱스보다 작은 상황일때
        //다음 버튼 누르면 다음페이지로 이동
        page += 1;
    }

    const {start, end} = getPage(maxContent, page);
    render(ul, start, end);
})

//정보 삭제 버튼 클릭시 이벤트
buttons.children[1].addEventListener('click', () => {
    //전체 삭제
    localStorage.removeItem('agoraStatesDiscussions');
    //data 에 다시 할당
    data = agoraStatesDiscussions.slice();
    //페이징 초기화 후 다시 첫번째 페이지 보여주기
    maxContent = 5;
    page = 1;
    render(ul, 0, maxContent);
})

//제출시 사용되는 변수
const form = document.querySelector('form.form');
const author = document.querySelector('div.form__input--name > input');
const title = document.querySelector('div.form__input--title > input');
const textBox = document.querySelector('div.form__textbox > textarea');

//제출 이벤트
form.addEventListener('submit', (event) => {
    //새로고침으로 정보 초기화 방지
    event.preventDefault();

    const obj = {
        id: "D_kwDOHOApLM4APjJi",
        createdAt: new Date(),
        title: title.value,
        url: "https://github.com/codestates-seb/agora-states-fe/discussions",
        author: author.value,
        answer: null,
        bodyHTML: textBox.value,
        avatarUrl:
            "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    };

    //앞에 추가
    data.unshift(obj);

    //로컬스토리지에 추가된 정보를 반영 후 저장
    localStorage.setItem('agoraStatesDiscussions', JSON.stringify(data));

    //렌더링
    render(ul, 0, maxContent);
})