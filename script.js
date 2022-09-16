// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = document.createElement('li'); // li 요소 생성
    li.className = 'discussion__container'; // 클래스 이름 지정

    const avatarWrapper = document.createElement('div');
    avatarWrapper.className = 'discussion__avatar--wrapper';
    const discussionContent = document.createElement('div');
    discussionContent.className = 'discussion__content';
    const discussionAnswered = document.createElement('div');
    discussionAnswered.className = 'discussion__answered';

    // 1. 아바타 영역
    const avatarImg = document.createElement('img');
    // avatarImg.className = 'discussion__avatar--image'; //내가 아바타 이비지 클래스에 적용한 css 가 없어서 안 써도 됨
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    // 2. 콘텐츠 영역
    const discussionTitle = document.createElement('h2');
    discussionTitle.className = 'discussion__title';

    const discussionTitleLink = document.createElement('a');
    discussionTitleLink.href = obj.url;
    discussionTitleLink.textContent = obj.title;
    discussionTitleLink.target = '_blank'; // 써도 되고 안 써도 되고 ?
    discussionTitle.append(discussionTitleLink);
    // discussionContent.append(discussionTitle);
    const discussionInfo = document.createElement('div');
    discussionInfo.className = 'discussion__information';
    discussionInfo.textContent =
        obj.author + ' | ' + new Date(obj.createdAt).toLocaleTimeString();
    discussionContent.append(discussionTitle, discussionInfo);

    // 3. 체크박스 영역
    // if (obj.answer === null) {
    //     discussionAnswered.textContent = '✖︎';
    // } else {
    //     discussionAnswered.textContent = '✔︎';
    // }
    discussionAnswered.textContent = obj.answer ? '✔︎' : '✖︎';

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
};

const form = document.querySelector('.form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputStory = document.querySelector('.form__textbox > textarea');

// submit 버튼 누르면 질문 리스트에 추가
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newAdd = {
        id: 'abc',
        createdAt: new Date().toISOString(),
        title: inputTitle.value,
        url: '#',
        author: inputName.value,
        answer: null,
        bodyHTML: inputStory.value,
        avatarUrl: 'avatar.jpeg',
    };
    agoraStatesDiscussions.unshift(newAdd);
    const newList = convertToDiscussion(newAdd);
    ul.prepend(newList);

    nputName.value = '';
    inputTitle.value = '';
    inputStory.value = '';

    // if (!objArr) {
    //     objArr = [];
    // }
    // objArr.unshift(newAdd);
    // localStorage.setItem('list', JSON.stringify(newAdd));

    // const data = JSON.parse(localStorage.getItem('list'));
    // agoraStatesDiscussions.unshift(data);
    // localStorage.setItem('list', JSON.stringify(newAdd));
});

form.addEventListener('submit', (e) => {});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
        element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);
