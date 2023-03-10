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

    //아바타 이미지를 불러와 avatarWrapper에 append
    let avatarImg = document.createElement('img')
    avatarImg.src = obj.avatarUrl
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarImg.classList.add('discussion__avatar--image')
    avatarWrapper.append(avatarImg);

    //질문 제목을 불러와 discussionContent에 append
    let discussionTitle = document.createElement('h2')
    discussionTitle.classList.add('discussion__title')
    let discussionURL = document.createElement('a')
    discussionURL.href = obj.url
    discussionURL.textContent = obj.title
    discussionTitle.append(discussionURL)
    discussionContent.append(discussionTitle)

    //질문 작성자와 작성 시간을 불러와 discussionContent에 append
    let discussionInfo = document.createElement('div')
    discussionInfo.classList.add('discussion__information')
    discussionInfo.textContent = obj.author + ' / ' + obj.createdAt
    discussionContent.append(discussionInfo)

    // 답변이 달려있으면 O, 아니면 X를 추가
    let isAnswered = document.createElement('p')
    isAnswered.classList.add('discussion__answered')
    if (obj.answer === null || obj.answer === 'no answer') {
        isAnswered.textContent = '❌'
    } else {
        isAnswered.textContent = '✅'
    }
    discussionAnswered.append(isAnswered)

    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
};

// 페이지네이션을 위한 버튼 만들기
let pagenation = document.querySelector('.pagenation')
let go_before = document.createElement('div')
go_before.classList.add('pagenumber')
go_before.textContent = '이전'
pagenation.append(go_before)

for (let i = 0; i < Math.ceil(agoraStatesDiscussions.length / 10); i++) {
    let pageNum = document.createElement('div')
    pageNum.classList.add('pagenumber')
    pageNum.textContent = i + 1
    pagenation.append(pageNum)
}

let go_next = document.createElement('div')
go_next.classList.add('pagenumber')
go_next.textContent = '다음'
pagenation.append(go_next)


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, first, last) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    for (let i = first; i < last; i += 1) {
        element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, 10);

// 페이지네이션을 위해 버튼 클릭시 나타낼 페이지를 설정
let pagenumber = document.querySelectorAll('.pagenumber')
let num = 0
pagenumberFocus(num)
for (let i = 0; i <= Math.ceil(agoraStatesDiscussions.length / 10) + 1; i++) {
    if (i === 0) {
        pagenumber[i].onclick = () => {
            if (num !== 0) {
                num -= 10
            }
            pagenumberFocus(num)
            render(ul, num, num + 10)
        }
    } else if (i === Math.ceil(agoraStatesDiscussions.length / 10) + 1) {
        pagenumber[i].onclick = () => {
            if (num !== 40) {
                num += 10
            }
            pagenumberFocus(num)
            render(ul, num, num + 10)
        }
    } else {
        pagenumber[i].onclick = () => {
            num = (Number(pagenumber[i].textContent) - 1) * 10
            pagenumberFocus(num)
            render(ul, num, num + 10)
        }
    }
}

// 페이지 버튼 포커싱
function pagenumberFocus(num) {
    for (let i = 0; i <= Math.ceil(agoraStatesDiscussions.length / 10); i++) {
        if (i === num / 10 + 1) {
            pagenumber[i].classList.add('focus')
        } else {
            pagenumber[i].classList.remove('focus')
        }
    }
}

// 모달 켜고 끄기
let question_btn = document.querySelector('#question_btn')
let modal = document.querySelector('.modal_overlay')
let modal_close = document.querySelector('.modal_close')

// 질문하기 버튼을 누르면 모달 생성
question_btn.addEventListener('click', () => {
    modal.style.display = "flex"
    let name_blank = document.querySelector('#name')
    let title_blank = document.querySelector('#title')
    let story_blank = document.querySelector('#story')
    name_blank.value = ''
    title_blank.value = ''
    story_blank.value = ''
    alert.style.display = 'none'
})

// 닫기 버튼을 누르면 모달 꺼짐
modal_close.addEventListener('click', () => {
    modal.style.display = 'none'
})

// 폼 제출
let form = document.querySelector('.form')
let question_name = document.querySelector('#name')
let question_title = document.querySelector('#title')
let question_story = document.querySelector('#story')

form.addEventListener('submit', (event) => {
    //제출을 눌러도 새로고침이 되지 않게 함
    event.preventDefault();

    //새로운 오브젝트 생성
    let question_obj = {}
    question_obj.avatarUrl = 'https://avatars.githubusercontent.com/u/117385050?s=400&v=4'
    question_obj.title = question_title.value
    question_obj.author = question_name.value
    question_obj.createdAt = new Date().toLocaleString()
    question_obj.bodyHTML = question_story.value
    question_obj.answer = 'no answer'

    // 배열에 새로운 객체를 넣고 렌더링
    agoraStatesDiscussions.unshift(question_obj)
    localStorage.setItem("agoraStatesDiscussions", JSON.stringify(agoraStatesDiscussions));
    render(ul, 0, 10);
})

// 제출 버튼을 눌렀을 때, 정보가 제대로 입력되었는지 확인
let submit_btn = document.querySelector('.form__submit')
let alert = document.querySelector('#alert')
submit_btn.addEventListener('click', () => {
    if (question_name.value && question_title.value && question_story.value) {
        modal.style.display = 'none'
    } else {
        alert.style.display = 'flex'
    }
})
