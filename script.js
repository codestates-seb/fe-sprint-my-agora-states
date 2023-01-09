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
    // 아바타 이미지
    const avatarImg = document.createElement("img");
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = `avatar of ${obj.author}`;

    // 디스커션 제목
    const discussionTitle = document.createElement("h2");
    const discussionLink = document.createElement("a");

    discussionLink.href = obj.url;
    discussionLink.textContent = obj.title;

    discussionTitle.className = "discussion__title";
    discussionTitle.append(discussionLink);

    // 디스커션 작성자 + 작성날짜
    const discussionInformation = document.createElement("div");
    discussionInformation.className = "discussion__information";
    discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;

    // 디스커션 답변 여부
    const discussionAnsweredCheck = document.createElement("p");
    discussionAnsweredCheck.textContent =
        obj.answer === null ? "답변없음" : obj.answer.author;

    avatarWrapper.append(avatarImg);
    discussionContent.append(discussionTitle, discussionInformation);
    discussionAnswered.append(discussionAnsweredCheck);

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
        element.append(convertToDiscussion(agoraStatesDiscussions[i]));
        // 배열의 모든 요소 개수만큼 반복
        // 배열 인덱스번째의 객체가 convertToDiscussion의 매개변수가 된다.
    }
    return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
