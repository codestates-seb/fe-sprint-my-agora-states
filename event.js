import inputClear from "./inputClear.js"

// 버튼 누를 시 입력 폼이 나타나도록
let isInputModal = null

const btnQuestion = document.querySelector('.btn-question')
const inputModal = document.querySelector('.input-modal')
btnQuestion.addEventListener('click', () =>{
    isInputModal = true
    inputModal.classList.remove('hide')
})


// 입력 폼 닫기 버튼
const inputId = document.querySelector('#name')
const inputTitle = document.querySelector('#title')
const inputStory = document.querySelector('#story')
const btnInputClose = document.querySelector('.btn-input-close')
btnInputClose.addEventListener('click', () =>{
    isInputModal = false
    inputClear(inputId,inputTitle,inputStory)
    inputModal.classList.add('hide')
})

// 입력 폼 제출 버튼
const inputForm = document.querySelector('.form')
inputForm.addEventListener('submit', (e)=>{
    isInputModal = false
    e.preventDefault();
    let newDate = new Date()
    let year = newDate.getFullYear()
    let month = newDate.getMonth()+1
    let date = newDate.getDate()
    let hour = newDate.getHours()
    let minute = newDate.getMinutes()
    let second = newDate.getSeconds()
    if(month < 10){
        month = `0${month}`
    }
    if(date < 10){
        date = `0${date}`
    }
    const submitObj = {
        url:null,
        author: e.target.elements.name.value,
        title: e.target.elements.title.value,
        bodyHTML: e.target.elements.story.value,
        avatarUrl: '/image/codestates-logo.png',
        answer: null,
        createdAt: `${year}-${month}-${date}T${hour}:${minute}:${second}Z`
    }
    let newPostIt = convertToDiscussion(submitObj)
    postContainer.prepend(newPostIt)
    agoraStatesDiscussions.unshift(submitObj)
    inputClear(inputId,inputTitle,inputStory)
})

// 스크롤이 아래로 내려가면 글 더 불러오기
document.addEventListener('scroll',(e)=>{
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        render(postContainer);
    }
})

//스크롤 리셋 버튼
let btnTop = document.querySelector('.btn-top')
btnTop.addEventListener('click',()=>{
scrollTo({behavior:'smooth',top:0})
})


const postIt = document.querySelectorAll('.post-it')
const postItModal = document.querySelector('.post-it-modal')
const postItModalTitle = document.querySelector('.post-it-modal-title')
const pistItModalInfo = document.querySelector('.post-it-modal-info')
const postItModalQuestion = document.querySelector('.post-it-modal-question')
const postItModalAnswer = document.querySelector('.post-it-modal-answer-wrap')
const postItModalAvatar = document.querySelector('.post-it-modal-answer-avatar')
const postItModalInfo = document.querySelector('.post-it-modal-answer-info')
const postItModalUrl = document.querySelector('.post-it-modal-answer-url')
postIt.forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        if(isInputModal){ // 인풋 모달 활성화 시 포스트잇 모달 금지
            e.preventDefault();
            return;
        }
        postItModal.classList.remove('hide')
        postItModalTitle.textContent = e.target.children[1].children[0].children[0].textContent
        pistItModalInfo.textContent = e.target.children[1].children[1].textContent
        postItModalQuestion.textContent = e.target.children[2].textContent
        if(postItModalQuestion.textContent.includes('http')){
            postItModalQuestion.href=e.target.children[2].textContent
        }
        if(e.target.children[3].children[1]){
            postItModalAvatar.classList.remove('hide')
            postItModalAvatar.src = e.target.children[3].children[1].src
            postItModalInfo.textContent = `${e.target.children[3].children[0].textContent} / ${e.target.children[3].children[3].textContent}`
            postItModalUrl.textContent = e.target.children[3].children[2].textContent
        }else{
            postItModalAvatar.classList.add('hide')
            postItModalAvatar.src = ''
            postItModalUrl.textContent = '아직 답변이 없습니다.'
            postItModalInfo.textContent = ''
        }
    })
})

// 화면 클릭 시 모달창 사라짐
postItModal.addEventListener('click',()=>{
    postItModal.classList.add('hide')
})