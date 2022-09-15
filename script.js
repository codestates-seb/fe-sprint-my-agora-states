//디스커션 추가기능
//제출 버튼 이벤트 객체 등록
const submitBtn = document.querySelector('#submit');

//이름 정보
const userName = document.querySelector('#name');

//제목 정보
const userTitle = document.querySelector('#title');

//질문 정보
const userQuestion = document.querySelector('#story');

const form = document.querySelector('.form');

//제출버튼 클릭후 창 새로고침 막기
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

//해당 정보 data.js 에 삽입하는 함수
function inputValue(e) {
    if (e.target.type === 'submit') {//해당 이벤트가 일어나는 target 의 type이 submit 일때
        agoraStatesDiscussions.unshift({
            createdAt: new Date().toLocaleString(),
            title: userTitle.value,
            author: userName.value,
            answer: null,
            bodyHTML: userQuestion.value,
            avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
        });
        //해당 정보를 ul 리스트 가장 앞부분에 가장 첫번째 항목으로 보여주기
        ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]))
    }
    //초기화
    userTitle.value = '';
    userName.value = '';
    userQuestion.value = '';
}

//submit 버튼 누를때 inputValue 함수 실행
submitBtn.addEventListener('click', inputValue);

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

    //1. 아바타 이미지 불러오기
    const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = obj.author;
    avatarWrapper.append(avatarImg);

    //2. discussion content 들 불러오기
    //h2 태그 생성
    const discussionTitle = document.createElement('h3');
    discussionTitle.className = 'discussion__title';

    //a 태그 생성
    const titleAtag = document.createElement('a');
    titleAtag.href = obj.url;
    titleAtag.textContent = obj.title;

    //div = discussion_info 생성
    const discussionInfo = document.createElement('div');
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


