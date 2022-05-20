// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = makingTag("li", "discussion__container"); // li 요소 생성

    const avatarWrapper = document.createElement("div"); //<div class="discussion__avatar--wrapper"></div> 생성.
    avatarWrapper.className = "discussion__avatar--wrapper";

    const avatarImg = makingTag("img", "discussion__avatar--image");
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = "avatar of " + obj.author;

    avatarWrapper.append(avatarImg);

    //================================================================

    const discussionContent = makingTag("div", "discussion__content"); //<div class="discussion__content"></div> 생성
    const contentTitle = makingTag("h2", "discussion__title"); //div안에 담아놓을 태그 생성.
    const contentInformation = makingTag("div", "discussion__information");
    const aTag = makingAtag(obj); //h2 안에 담아놓을 a태그 생성.
    contentInformation.textContent = `${obj.author} /  ${obj.createdAt}`;
    contentTitle.append(aTag);
    discussionContent.append(contentTitle);
    discussionContent.append(contentInformation);

    //======================================================================

    const discussionAnswered = makingTag("div", "discussion__answered"); //<div class="discussion__answered"><div> 생성
    const tagP = makingTag("p", "");
    discussionAnswered.append(tagP);

    if (obj.answer === null) {
        tagP.classList.add("red");
        tagP.classList.remove("green");
        tagP.textContent = "☒";
    } else {
        tagP.classList.add("green");
        tagP.classList.remove("red");
        tagP.textContent = "☑";
    }
    // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

    li.append(avatarWrapper, discussionContent, discussionAnswered); // <li> div*3 </li>  => 지금까지 한거 넣어줌.
    return li;
};

//a태그를 만들어내는 함수.
function makingAtag(obj) {
    const aTag = document.createElement("a");
    aTag.href = obj.url;
    aTag.textContent = obj.title;
    return aTag;
}

//태그를 만들어내는 함수.
function makingTag(tagName, className) {
    const tag = document.createElement(tagName);
    tag.className = className;
    return tag;
}

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

//submit처리 함수

let inputName = document.querySelector(".form__input--name input");
let inputTitle = document.querySelector(".form__input--title input");
let questionText = document.querySelector(".form__textbox textarea");
let submitForm = document.querySelector("form");
let submitButton = document.querySelector(".form__submit input");

function handleSubmit(e) {
    e.preventDefault();
    const newDiscussion = {
        Id: null,
        createdAt: null,
        title: null,
        url: null,
        author: null,
        answer: null,
        bodyHTML: null,
        avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    };

    newDiscussion.title = inputTitle.value;
    newDiscussion.author = inputName.value;
    newDiscussion.createdAt = new Date().toISOString();

    inputTitle.value = "";
    inputName.value = "";
    questionText.value = "";
    submitButton.value = "Submit";

    agoraStatesDiscussions.unshift(newDiscussion);
    console.log("동작");
    console.log(agoraStatesDiscussions);

    ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
    console.log(submitForm);
}

submitForm.addEventListener("submit", handleSubmit);
