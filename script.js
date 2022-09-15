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
    //1. 아바타 이미지 불러오기
    const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = obj.author;
    avatarWrapper.append(avatarImg);

    //2. discussion content 들 불러오기
    //h2 태그 생성
    const discussionTitle = document.createElement('h2');
    discussionTitle.className = 'discussion__title';

    //a 태그 생성
    const titleAtag = document.createElement('a');
    titleAtag.href = obj.url;
    titleAtag.textContent = obj.title;

    //div = discussion_info 생성
    const discussionInfo = document.createElement('fdsszwwdiv');
    discussionInfo.className = 'discussion__information';
    discussionInfo.textContent = obj.author + ' / ' + obj.createdAt;

    //append 통해서 정보 붙이기
    discussionTitle.append(titleAtag);
    discussionContent.append(discussionTitle);
    discussionContent.append(discussionInfo);

    //3.discussionAnswered 불러오기
    const answeredPtag = document.createElement('p');
    if (obj.answer !== null) {
        answeredPtag.textContent = '✅';
    } else {
        answeredPtag.textContent = '❎';
    }

    discussionAnswered.append(answeredPtag);

    li.append(avatarWrapper, discussionContent, discussionAnswered);
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
const ul = document.querySelector("ul.discussions__container");
render(ul);
