const ul = document.querySelector('ul.discussions__container');
const div_page = document.querySelector('div#page');
let renderData; //data는 랜더링할 데이터들이 들어있음
let page = 1;
const pageButtons = document.querySelector('#page');

//로컬스토리지가 비어있지 않으면 data에 로컬스토리지 할당
if (localStorage.getItem('agoraStatesDiscussions')) {
    renderData = JSON.parse(localStorage.getItem('agoraStatesDiscussions')).slice(0,10);
} else {
    //아니라면 agoraStatesDiscussions를 로컬스토리지에 할당
    localStorage.setItem('agoraStatesDiscussions',JSON.stringify(agoraStatesDiscussions));
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    if (obj) {
        const li = document.createElement('li'); // li 요소 생성
        li.className = 'discussion__container'; // 클래스 이름 지정

        const avatarWrapper = document.createElement('div');
        avatarWrapper.className = 'discussion__avatar--wrapper';

        const discussionContent = document.createElement('div');
        discussionContent.className = 'discussion__content';

        const discussionAnswered = document.createElement('div');
        discussionAnswered.className = 'discussion__answered';

        //프로필 사진 생성
        const avatarImg = document.createElement('img');
        avatarImg.className = 'discussion__avatar--image';
        avatarImg.src = obj.avatarUrl;
        avatarImg.alt = 'avatar of ' + obj.author;
        avatarWrapper.append(avatarImg);

        //타이틀 생성
        const title = document.createElement('h2');
        const title_a = document.createElement('a');
        title_a.href = obj.url;
        title_a.textContent = obj.title;
        title.append(title_a);

        //이름과 시간정보 생성
        const information = document.createElement('div');
        const information_delete = document.createElement('button');
        const information_Revise = document.createElement('button');
        const information_p = document.createElement('span');

        information_delete.classList = 'delete'
        information_delete.textContent = '삭제';
        information_delete.id = ul.childElementCount+1;
        information_p.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()} `;
        information.className = 'discussion__information';
        information.append(information_p,information_Revise ,information_delete);

        discussionContent.append(title, information);

        //체크박스 이미지 생성
        const checked = document.createElement('img');
        checked.classList = 'checkImg';
        checked.id = ul.childElementCount+1;
        checked.src = obj.answer ? 'img/check.png' : 'img/checkEmpty.png';

        discussionAnswered.append(checked);

        // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
        li.append(avatarWrapper, discussionContent, discussionAnswered);
        return li;
    }
    return '';
};
//
const pageView = function () {
    let view = page * 10; // 10개씩 ex) 1페이지 0~10 미만
    renderData = JSON.parse(localStorage.getItem('agoraStatesDiscussions')).slice(view - 10,view);
    
    //html 초기화
    while (ul.hasChildNodes()) {
        //자식 요소가 있는지 확인-false가 될때까지 반복
        ul.removeChild(ul.firstChild); // 첫번째 자식 요소를 삭제
    }
    while (div_page.hasChildNodes()) {
        //자식 요소가 있는지 확인-false가 될때까지 반복
        div_page.removeChild(div_page.firstChild); // 첫번째 자식 요소를 삭제
    }
    render(ul);
};

//페이지 버튼생성
const createPageButton = function (pageLength) {
    for (let i = 1; i <= pageLength + 1; i++) {
        const button = document.createElement('button');
        button.id = `${i}`;
        button.classList = 'pageNum';
        button.textContent = i;
        pageButtons.appendChild(button);
    }
};

//Discussion 요소 이벤트
ul.addEventListener('click', function(event){
    const target = event.target;
    let tmp = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));
    let index = (target.id -1) + (page * 10) - 10; // 변경할 데이터 인덱스번호

    //삭제
    if(target.className === 'delete'){
        tmp.splice(index,1);
        localStorage.setItem('agoraStatesDiscussions',JSON.stringify(tmp));
    }

    //체크박스
    if(target.className === 'checkImg'){
        if(tmp[index].answer ) {
            tmp[index].answer ='';
        }
        else {
            tmp[index].answer = 'true';
        }

        localStorage.setItem('agoraStatesDiscussions',JSON.stringify(tmp));
    }

    //랜더링
    pageView();
    createPageButton(JSON.parse(localStorage.getItem('agoraStatesDiscussions')).length / 10);
})

pageButtons.addEventListener('click', function (event) {
    // 버튼을 눌렀을 때 작동하는 함수입니다.
    const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
    page = target.id[0]; // 현재 페이지 

    if (target.classList[0] === 'pageNum') {
        pageView();
        createPageButton(JSON.parse(localStorage.getItem('agoraStatesDiscussions')).length / 10);
    }
    
});


//form
const form = document.querySelector('form.form');
const author = form.querySelector('div.form__input--name > input');
const title = form.querySelector('div.form__input--title > input');
const textBox = form.querySelector('div.form__textbox > textarea');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    //agoraStatesDiscussions에 넣을 객체생성
    const obj = {
        id: 'unique id',
        createdAt: new Date().toISOString(),
        title: title.value,
        url: 'https://github.com/codestates-seb/agora-states-fe/discussions',
        author: author.value,
        answer: null,
        bodyHTML: textBox.value,
        avatarUrl:
            'img/user.png',
    };

    let tmp = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));
    tmp.unshift(obj);
    //로컬스토리지와 renderData 동기화(새로 추가한 데이터와)
    localStorage.setItem(
        'agoraStatesDiscussions',
        JSON.stringify(tmp)
    );

    //랜더링
    pageView();
    createPageButton(agoraStatesDiscussions.length / 10);
});

//검색창
const searchInput = document.querySelector('#search > input');

searchInput.addEventListener('keypress', (key) => {
    if (key.key === 'Enter') {
        let tmp = [];
        if (searchInput.value !== '') {
            for (let i = 0; i < agoraStatesDiscussions.length; i++) {
                if (agoraStatesDiscussions[i].title.includes(searchInput.value)) {
                    tmp.push(agoraStatesDiscussions[i]);             
                }
            }
            //찾아낸 객체들을 로컬스토리지에 저장
            localStorage.setItem('agoraStatesDiscussions',JSON.stringify(tmp));

            //랜더링
            pageView();
            createPageButton(JSON.parse(localStorage.getItem('agoraStatesDiscussions')).length / 10);
        }
        else{
            //검색창에 아무런 값도 입력하지 않았을때 로컬스토리지 초기값으로
            localStorage.setItem('agoraStatesDiscussions',JSON.stringify(agoraStatesDiscussions));
            pageView();
            createPageButton(JSON.parse(localStorage.getItem('agoraStatesDiscussions')).length / 10);
        }
    }
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.//
const render = (element) => {
    for (let i = 0; i < 10; i++) {
        element.append(convertToDiscussion(renderData[i]));
    }
    return;
};

//기본실행
pageView();
createPageButton(JSON.parse(localStorage.getItem('agoraStatesDiscussions')).length / 10);
