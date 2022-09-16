//질문 리스트 생성
const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";

    const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    const elTitle = document.createElement('h2');
    elTitle.className = "discussion__title";
    const elTitleATAG = document.createElement('a');
    elTitleATAG.href = obj.url;
    elTitleATAG.textContent = " [Question] " + obj.title;
    elTitle.append(elTitleATAG);
    const elInformation = document.createElement('div');
    elInformation.className = "discussion__information";
    elInformation.textContent = obj.author + ' / ' + new Date(obj.createdAt).toLocaleDateString();
    discussionContent.append(elTitle, elInformation);

    li.append(avatarWrapper, discussionContent,);
    return li;
};
//답변리스트 생성
const convertToAnswer = (value) => {
    const obj = value.answer
    const li = document.createElement("li"); // li 요소 생성
    li.className = "answer__container"; // 클래스 이름 지정
    const answerAvatarWrapper = document.createElement("div");
    answerAvatarWrapper.className = "answer__avatar--wrapper";
    const answerContent = document.createElement("div");
    answerContent.className = "answer__content";
    const answerAnswered = document.createElement("div");
    answerAnswered.className = "answer__answered";

    const answerAvatarImg = document.createElement('img');
    answerAvatarImg.src = obj.avatarUrl;
    answerAvatarImg.alt = 'avatar of ' + obj.author;
    answerAvatarWrapper.append(answerAvatarImg);

    const answerTitle = document.createElement('h2');
    answerTitle.className = "answer__title";
    const answerTitleATAG = document.createElement('a');
    answerTitleATAG.href = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
    answerTitleATAG.textContent = ' [ANSWER] ' + value.title;
    answerTitle.append(answerTitleATAG);
    const answerInformation = document.createElement('div');
    answerInformation.className = "answer__information";
    answerInformation.textContent = obj.author + ' / ' + new Date(obj.createdAt).toLocaleDateString();
    answerContent.append(answerTitle, answerInformation);

    const answerAnsweredPTag = document.createElement('p');
    answerAnsweredPTag.textContent = '➡'
    answerAnswered.append(answerAnsweredPTag);

    li.append(answerAnswered, answerAvatarWrapper, answerContent);
    return li;
};
//빈 대답 리스트
const convertToAnswerIsNull = () => {
    const li = document.createElement('li');
    li.className = "answer__container";

    const pTag = document.createElement('p');
    pTag.textContent = '➡'

    const nullAnswer = document.createElement("h2");
    nullAnswer.textContent = "답변이 없습니다 "
    nullAnswer.className = 'nullAnswer';

    li.append(pTag, nullAnswer)
    return li
}

const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
        if (agoraStatesDiscussions[i].answer == null) {
            element.append(convertToDiscussion(agoraStatesDiscussions[i]), convertToAnswerIsNull());
        } else {
            element.append(convertToDiscussion(agoraStatesDiscussions[i]), convertToAnswer(agoraStatesDiscussions[i]));
        }
    }
    element.prepend(convertToDiscussion(JSON.parse(localStorage.getItem("localObj"))));
    return;
}


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//여깄었음

function load (){
    console.log('hi');
    console.log(JSON.parse(localStorage.getItem("localObj")));
}
