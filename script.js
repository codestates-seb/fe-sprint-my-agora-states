localStorage.setItem("data", JSON.stringify(agoraStatesDiscussions))
let dataObj = JSON.parse(localStorage.getItem("data"));

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
    for (let i = 0; i < newArr.length; i ++) {
        if (dataObj[i].answer == null) {
            element.append(convertToDiscussion(newArr[i]), convertToAnswerIsNull());
        } else {
            element.append(convertToDiscussion(newArr[i]), convertToAnswer(newArr[i]));
        }
    }
    return;
}

const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");
const page4 = document.querySelector("#page4");
const page5 = document.querySelector("#page5");
let newArr = [];

let ul = document.querySelector("ul.discussions__container");

page1.onclick = () => {
    removeChildren();
    newArr = dataObj.slice(0,10)
    render(ul)
};

page2.onclick = () => {
    removeChildren();
    newArr = dataObj.slice(20,30)
    render(ul)
};
page3.onclick = () => {
    removeChildren();
    newArr = dataObj.slice(20,30)
    render(ul)
};
page4.onclick = () => {
    removeChildren();
    newArr = dataObj.slice(20,30)
    render(ul)
};
page5.onclick = () => {
    removeChildren();
    newArr = dataObj.slice(20,30)
    render(ul)
};
newArr = dataObj.slice(0,10)
render(ul)
function removeChildren() {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}