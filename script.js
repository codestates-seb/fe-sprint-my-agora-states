// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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
