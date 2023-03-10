// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "list-group-item d-flex justify-content-between align-items-center discussion__container"; // 클래스 이름 지정

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";

    // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
    const avatarImg = document.createElement('img');
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = `avatar of ${obj.author}`;
    avatarWrapper.append(avatarImg);

    const contentTitle = document.createElement('h4');
    contentTitle.className = "discussion__title";
    const titleAnchor = document.createElement('p');
    titleAnchor.href = obj.url;
    titleAnchor.textContent = obj.title;
    contentTitle.append(titleAnchor);
    const contentInfo = document.createElement('div');
    contentInfo.className = "discussion__information";
    contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
    discussionContent.append(contentTitle, contentInfo);

    const checked = document.createElement('p');
    checked.className = "badge bg-primary rounded-pill";
    checked.textContent = obj.answer ? '✅' : '❌';
    discussionAnswered.append(checked);

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
};

const form = document.querySelector('form.form');
const title = document.querySelector('input#title');
const author = document.querySelector('input#name');
const story = document.querySelector('textarea#story');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    // 하나의 객체를 만들어서 consverToDiscussion함수에 넣어서 li로 만든 다음 ul요소에 append
    const newDiscussion = {
        id: "unique value",
        createdAt: new Date(),
        title: title.value,
        url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
        author: author.value,
        answer: {
            id: "DC_kwDOHOApLM4AKg7z",
            createdAt: "2022-05-16T02:47:27Z",
            url: "https://github.com/codestates-seb/agora-states-fe/discussions/43#discussioncomment-2756339",
            author: "Kingsenal",
            bodyHTML:
                '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/anotheranotherhoon/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/anotheranotherhoon">@anotheranotherhoon</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">스코프와 클로져에 대해 깊게 공부하는 모습 너무 너무 좋습니다 !</p>\n<p dir="auto">일단 즉시 실행 함수 표현식에 대해 질문 주셨는데요 !<br>\n함수를 정의 -&gt; 변수에 함수를 저장 하고 실행 ! 이 과정을 거치지 않고 정의하자마자 바로 호출하는 것이 즉시 실행 함수 입니다.<br>\n그렇다면 위에 코드는 즉시 실행 함수 일까요?</p>\n<p dir="auto"><a href="https://developer.mozilla.org/ko/docs/Glossary/IIFE" rel="nofollow">즉시실행함수</a><br>\n한 번 읽어보시고 한 번 더 생각해보세요 ! 직접 생각하는 것이 가장 기억에 오래 남습니다 !</p>\n<p dir="auto">두 번째 <code class="notranslate">innerFn</code>이라는 변수를 새로 선언했고 <code class="notranslate">outerFn()</code>을 할당했습니다. 즉, <code class="notranslate">outerFn()</code>을 호출 한 것입니다.<br>\n이는 위의 <code class="notranslate">innerFn</code> 함수와는 다른 녀석입니다.<code class="notranslate">innerFn</code> 함수도 마찬가지로 <code class="notranslate">outerFn</code> 내부에서 선언되었으므로 밖으로 나올 수 없기 때문이에요!</p>\n<p dir="auto"><code class="notranslate">const apple = outerFn()</code>  // innerFn은 단순한 변수명임 ! apple을 넣던 banana를 넣던 상관없음<br>\n<code class="notranslate">expect(apple()).to.equal(178)</code></p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 000</p>',
            avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
        },
        bodyHTML: story.value,
        avatarUrl:
            "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
    };
    ul.prepend(convertToDiscussion(newDiscussion));
})

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