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

    //avatarWrapper
    const avatarImg = document.createElement("img");
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = "avatar of " + obj.author;
    avatarImg.className = "discussion__avatar--image";
    avatarWrapper.append(avatarImg);

    //discussion content
    const discussionTitle = document.createElement("h2");
    const titleLink = document.createElement("a");
    discussionTitle.className = "discussion__title";
    titleLink.href = obj.url;
    titleLink.textContent = obj.title;
    discussionTitle.append(titleLink);

    const discussionInfo = document.createElement("div");
    discussionInfo.className = "discussion__information";
    discussionInfo.textContent =
        obj.author + " / " + new Date(obj.createdAt).toLocaleString();
    discussionContent.append(discussionTitle, discussionInfo);

    //discussion answer
    const answerCheck = document.createElement("p");
    answerCheck.textContent = obj.answer ? "☑" : "𐄂";
    discussionAnswered.append(answerCheck);

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

const form = document.querySelector("form");
const inputName = document.querySelector(".form__input--name > input");
const inputTitleName = document.querySelector(".form__input--title > input");
const story = document.querySelector("#story");

const onSubmit = function (event) {
    event.preventDefault();

    const newObj = {
        id: Math.random(),
        createdAt: new Date(),
        title: inputTitleName.value,
        url: "",
        author: inputName.value,
        answer: null,
        bodyHTML: story.value,
        avatarUrl: "https://picsum.photos/150/150/?random​",
    };

    const newLi = convertToDiscussion(newObj);
    ul.prepend(newLi);

    inputName.value = "";
    inputTitleName.value = "";
    story.value = "";
};

form.addEventListener("submit", onSubmit);
