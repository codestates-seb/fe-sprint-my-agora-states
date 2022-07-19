// 로컬 스토리지에 아고라 스테이츠 데이터를 저장합니다.
let discussionString = JSON.stringify(agoraStatesDiscussions);
let discussionJson = JSON.parse(localStorage.getItem("data")); //처음에 이 값은 null

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
    const avatarImg = document.createElement('img');
    avatarImg.className = "discussion__avatar--img";
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    const title = document.createElement('div');
    title.className = "discussion__content--title"
    title.innerHTML = `<a href="${obj.url}">${obj.title}</a>`;
    discussionContent.append(title);

    const answerAndAuthor = document.createElement('div');
    answerAndAuthor.className = "discussion__content--answerAndAuthor--wrapper";
    discussionContent.append(answerAndAuthor);

    const answerChecker = obj.answer;
    const answer = document.createElement('span');
    if (answerChecker === null) {
        answer.innerHTML = `<span>Unanswered</span>`;
        answer.className = 'discussion__content--unanswered';
    }
    if (answerChecker) {
        answer.innerHTML = `<span>Answered</span>`;
        answer.className = 'discussion__content--answered';
    }
    answerAndAuthor.append(answer);

    const author_createdAt = document.createElement('div');
    const createdTime = function(t) {
        //2022-05-16T01:02:17Z formatting
        const year = t.slice(0, 4);
        const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const nth = Number(t.slice(5, 7)) - 1;
        const day = t.slice(8, 10);
        const time = t.slice(11, 13);
        const min = t.slice(14, 16);
        const sec = t.slice(17, 19);
        if (23 >= time && time >= 12) {
            return `${month[nth]} ${day} ${time - 12}:${min} PM`;
        }
        if (12 > time && time >= 0) {
            return `${month[nth]} ${day} ${time}:${min} AM`;
        }
    }
    author_createdAt.className = "discussion__content--author--createdAt"
    author_createdAt.innerHTML = `<span>${obj.author} · ${createdTime(obj.createdAt)}</span>`;
    answerAndAuthor.append(author_createdAt);

    li.append(avatarWrapper, discussionContent);
    return li;
};

//페이지네이션 1. 페이지 개수를 자동으로 만듭니다.
function paginationMaking() {
    if (discussionJson) {
        for (let i = 1; i <= Math.ceil(discussionJson.length / 10); i++) {
            const pageNum = document.createElement('span');
            const pagination = document.querySelector('.pagination__pagenum');
            pageNum.textContent = i;
            pageNum.className = `pagination__pagenum--num num${i}`;
            pagination.append(pageNum);
        }
    } else {
        for (let i = 1; i <= Math.ceil(agoraStatesDiscussions.length / 10); i++) {
            const pageNum = document.createElement('span');
            const pagination = document.querySelector('.pagination__pagenum');
            pageNum.textContent = i;
            pageNum.className = `pagination__pagenum--num num${i}`;
            pagination.append(pageNum);
        }
    }
}
paginationMaking(); //최초 실행

// 페이지네이션 2 및 최초 렌더 agoraStatesDiscussions 배열의 최초 10개 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, pageNum) => {
    if (pageNum) {
        element.innerHTML = "";
    } // 페이지넘버를 눌렀을 때 이 부분이 없으면, 계속해서 쌓이면서 렌더링됩니다.
    if (discussionJson) { //SUBMIT을 실행한 후에는 로컬 스토리지에 저장된 값을 받아온다
        for (let i = pageNum * 10 - 10; i < Math.min(pageNum * 10, discussionJson.length); i += 1) {
            element.append(convertToDiscussion(discussionJson[i]));
        }
    } else { //최초 실행 시에는 원본 배열을 받아온다
        for (let i = pageNum * 10 - 10; i < Math.min(pageNum * 10, agoraStatesDiscussions.length); i += 1) {
            element.append(convertToDiscussion(agoraStatesDiscussions[i]));
        }
    }

    return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 1);


// 페이지네이션 3. 버튼을 누르면 해당 페이지에 10개씩 배열의 데이터를 화면에 렌더링합니다.
// querySelectorAll이 배열을 반환한다는 점에서 착안해, 두 개의 클래스를 미리 부여했습니다.
// 숫자 규칙을 따라서 반복문을 사용해, addEventListener를 동적으로 생성합니다.
let pageNumObject = {};
for (let i = 1; i <= document.querySelectorAll('.pagination__pagenum--num').length; i++) {
    pageNumObject[`num${i}`] = document.querySelector(`.num${i}`);
    pageNumObject[`num${i}`].addEventListener('click', () => {
        render(ul, pageNumObject[`num${i}`].textContent);
    });
}


// 폼 입력값을 agoraStatesDiscussions 배열에 추가하고, 로컬 스토리지를 다시 셋팅한 뒤, ul 가장 위쪽에 추가하는 함수입니다.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = document.querySelector('#form');
    const formName = document.querySelector('#name');
    const formTitle = document.querySelector('#title');
    const formStory = document.querySelector('#story');
    const formBtn = document.querySelector('#submit');
    const timeKR = new Date().getTimezoneOffset() * 60000
    const today = new Date(Date.now() - timeKR);
    agoraStatesDiscussions.unshift({
        id: formName.value,
        createdAt: today.toISOString(),
        title: formTitle.value,
        url: '',
        author: formName.value,
        answer: null,
        bodyHTML: formStory.value,
        avatarUrl: 'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4'
    });
    discussionString = JSON.stringify(agoraStatesDiscussions)
    localStorage.setItem("data", discussionString);
    discussionJson = JSON.parse(localStorage.getItem("data"));
    ul.prepend(convertToDiscussion(discussionJson[0]));
});