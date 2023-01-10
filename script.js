const createEle = (tag, className, options = {}) => {
    const Element = document.createElement(tag);
    Element.className = className;

    for (const [key, value] of Object.entries(options)) {
        Element[key] = value;
    }

    return Element;
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = createEle("li", "discussion__container"); // li 요소 생성

    const avatarWrapper = createEle("div");
    const discussionAvatarImage = createEle("div", "discussion__avatar__image");

    discussionAvatarImage.style.backgroundImage = `url(${obj.avatarUrl})`;
    avatarWrapper.append(discussionAvatarImage);

    const discussionWrittenInfo = createEle(
        "div",
        "discussion__Written__Info",
        { textContent: `${obj.author} / ${obj.createdAt}` }
    );

    const discussionContent = createEle("div", "discussion__content");
    const title = createEle("h2", "discussion__title", {
        textContent: obj.title,
    });

    discussionContent.append(title, discussionWrittenInfo);

    const discussionAnswered = createEle("div", "discussion__answered", {
        textContent: "☑",
    });

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
        element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const discussionForm = document.querySelector(".form");
discussionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const DEFAULT_AVATAR_URL =
        "https://avatars.githubusercontent.com/u/120073917?v=4";

    const { author, title } = event.target;
    const obj = {
        author: author.value,
        title: title.value,
        createdAt: new Date().toJSON(),
        avatarUrl: DEFAULT_AVATAR_URL,
    };

    ul.prepend(convertToDiscussion(obj));
});
