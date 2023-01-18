

let data; // (1) 앞으로 사용할 데이터. 변수 선언

const localStorageData = localStorage.getItem("discussionData");

if (localStorageData) {                   // 만약 localStorageData가 있으면 (= submit을 한 번 한 이후)
    data = JSON.parse(localStorageData)    // 로컬 스토리지에서 가져온 데이터로 할당
} else {                                 // (2) localStorageData가 없으면 ( = 최초 렌더링일 경우)
    data = agoraStatesDiscussions.slice(); // data는 agoraStatesDiscussions(원본 데이터)을 복사한 그대로. (QQQ: 처음 1번만 쓸 것이기 때문에 그냥 얕은 복사로? 주소값 같아도 상관없어서?)
}

// formContainer 나왔다 사라졌다 하게. 시작
const formContainer = document.querySelector('.form__container');
const toggleFormButton = document.querySelector('#toggle-form');

toggleFormButton.addEventListener('click', () => {
    formContainer.classList.toggle('hidden');
});
// formContainer 나왔다 사라졌다 하게. 끝

// const date = new Date();

// const year = date.getFullYear();
// const month = ('0' + (date.getMonth() + 1)).slice(-2);
// const day = ('0' + date.getDate()).slice(-2);
// const dateStr = year + '-' + month + '-' + day;

// const hours = ('0' + date.getHours()).slice(-2);
// const minutes = ('0' + date.getMinutes()).slice(-2);
// const timeStr = hours + ':' + minutes;


const convertToDiscussion = (obj) => {


    const dateString = obj.createdAt.slice(0, 10);
    let timeString = new Date(obj.createdAt).toLocaleTimeString([], { hour12: false }).slice(0,5);
    console.log(timeString);

    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정

    const avatarWrapper = document.createElement("div");        // 아바타 박스
    avatarWrapper.className = "discussion__avatar--wrapper";

    const avatarImg = document.createElement('img');              // 아바타 이미지
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    const discussionContent = document.createElement("div");    // 제목과 저자, 날짜 박스
    discussionContent.className = "discussion__content";

    const discussionTitle = document.createElement("h2")          // 제목
    discussionTitle.className = "discussion__title"
    discussionContent.append(discussionTitle)

    const titleLink = document.createElement("a")                 // 제목 링크
    titleLink.setAttribute("href", obj.url)
    titleLink.setAttribute("target", "_blank")
    titleLink.textContent = obj.title
    discussionTitle.append(titleLink)


    const discussionInfo = document.createElement("div")          // 저자, 날짜
    discussionInfo.className = "discussion__information"
    discussionInfo.textContent = `${obj.author} / ${dateString} ${timeString}`
    discussionContent.append(discussionInfo)

    const discussionAnswered = document.createElement("div");   // 대답 여부 박스
    discussionAnswered.className = "discussion__answered";
    obj.answer == null ? discussionAnswered.textContent = "☐" : discussionAnswered.textContent = "☑"

    // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const renderDiscussions = (element) => {

    

    while (element.firstChild) {               // (8-1) 일단 ul 안의 내용 다 지우기
        element.removeChild(element.firstChild);
    }
    console.log(data);
    for (let i = 0; i < data.length; i += 1) { // (8-2) ul 안에 하나씩 다시 붙이기
        element.append(convertToDiscussion(data[i]));
    }

    return;

};

const ul = document.querySelector("ul.discussions__container");
renderDiscussions(ul);


const form = document = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const story = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {

    event.preventDefault();
    formContainer.classList.toggle('hidden');

    const newData = {
        title: title.value,
        author: author.value,
        createdAt: new Date().toISOString(),
        avatarUrl: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fly6ZE%2FbtrVA0j9QpV%2FTVhGhX6yZbk04FlsfK1Zkk%2Fimg.jpg',
        url: '#',
        story: story.value,
        answer: null
    }

    data.unshift(newData);
    localStorage.setItem("discussionData", JSON.stringify(data));

    renderDiscussions(ul);

    author.value = '';
    title.value = '';
    story.value = '';

    renderContentAndButton(page);    // 여기서 page 별로 10개씩 채우는 함수를 실행시켜주면 submit 후 첫 화면에 모든 컨텐츠가 다 담기는 현상 해결 완료!!!

})

// 페이지네이션

const contents = document.querySelector("ul.discussions__container");
const buttons = document.querySelector(".buttons");

const maxContent = 10;
const maxButton = 5;
// const numOfContent = data.length;

// const maxPage = Math.ceil(data.length / maxContent);
let page = 1;

const goPrevPage = () => {
    page -= maxButton;
    renderContentAndButton(page);
};

const goNextPage = () => {
    page += maxButton;
    renderContentAndButton(page);
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
next.addEventListener("click", goNextPage);

const makeButton = (id) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.dataset.num = id;
    button.innerText = id;
    button.addEventListener("click", (e) => {
        Array.prototype.forEach.call(buttons.children, (button) => {
            if (button.dataset.num) button.classList.remove("active");
        });
        e.target.classList.add("active");
        renderContent(parseInt(e.target.dataset.num));
    });
    return button;
};

const renderContent = (page) => {

    while (contents.hasChildNodes()) {
        contents.removeChild(contents.lastChild);
    }
    for (let id = (page - 1) * maxContent; id < page * maxContent && id < data.length; id++) {  
        // 갓상은!!!! 원래는 id < data.length 가 아니라 id < numOfData라고 되어있었고, numOfContent는 위에서 data.length를 할당받은 상태였다. 
        // 근데 data가 추가되어도 기존에 받아놨던 길이는 변하지 않으니 하나씩 지워질 수 밖에!!!

        contents.append(convertToDiscussion(data[id]))  // 여기서 싹다 지우고 새로 입력될 때 agoraStatesDiscussions 거를 불러와서 리셋되던 문제가 있었음.
    }
}

const renderButton = (page) => {
    // 버튼 리스트 초기화
    while (buttons.hasChildNodes()) {
        buttons.removeChild(buttons.lastChild);
    }
    // 화면에 최대 5개의 페이지 버튼 생성
    for (let id = page; id < page + maxButton && id <= Math.ceil(data.length / maxContent); id++) {
        buttons.appendChild(makeButton(id));
    }
    // 첫 버튼 활성화(class="active")
    buttons.children[0].classList.add("active");
    buttons.prepend(prev);
    console.log(buttons.innerHTML);
    buttons.append(next);

    // 이전, 다음 페이지 버튼이 필요한지 체크
    if (page - maxButton < 1) buttons.removeChild(prev);
    if (page + maxButton > Math.ceil(data.length / maxContent)) buttons.removeChild(next);
};

const renderContentAndButton = (page) => {
    renderContent(page);
    renderButton(page);
};

renderContentAndButton(page);



