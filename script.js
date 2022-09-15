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

    // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
    // 이미지 삽입
    const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);
    // a 태그 생성
    const aTag = document.createElement('a');
    aTag.href = obj.url;
    aTag.textContent = obj.title;
    // h2 태그 생성
    const h2Title = document.createElement('h2');
    h2Title.className = 'discussion__title';
    // infomation
    const info = document.createElement('div');
    info.className = 'discussion__information';
    info.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString('ko-KR')}`;
    // h2 태그 안에 a 태그 append
    h2Title.append(aTag);
    // discussionContent에 h2 append
    discussionContent.append(h2Title, info);

    const pTag = document.createElement('p');
    obj.answer ? (pTag.textContent = '☑︎') : (pTag.textContent = '☒');
    if (pTag.textContent === '☒') {
        pTag.style.color = 'red';
    }
    discussionAnswered.append(pTag);

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.s
const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
        element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);
