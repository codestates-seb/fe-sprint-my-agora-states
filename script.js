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

    const avatarWrapper = createEle("div", "discussion__avatar__wrapper");
    avatarWrapper.style.backgroundImage = `url(${obj.avatarUrl})`;

    const discussionAuthor = createEle("h3", "discussion__title", {
        textContent: obj.author,
    });
    const discussionCreateAt = createEle("div", "discussion__create__At", {
        textContent: obj.createdAt,
    });

    const discussionWrittenInfo = createEle("div", "discussion__Written__Info");
    discussionWrittenInfo.append(discussionCreateAt, discussionAuthor);

    const discussionContent = createEle("div", "discussion__content");
    const title = createEle("h3", "title", { textContent: obj.title });

    discussionContent.append(title, discussionWrittenInfo);

    const discussionAnswered = createEle("div", "discussion__answered");

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
