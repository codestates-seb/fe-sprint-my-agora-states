//===========================================================//
//========================= Create ==========================//
//===========================================================//
const author    = document.querySelector("#name");
const title     = document.querySelector("#title");
const question  = document.querySelector("#question");
const submit    = document.querySelector("#submitBtn");

submit.addEventListener('click', validCheck);

function validCheck() {
    if(author.value === "") {
        author.focus();
        return;
    }
    else if(title.value === '') {
        title.focus();
        return;
    }
    else if(question.value === '') {
        question.focus();
        return;
    }
    else createDiscussion();
}

function createDiscussion() {
    const time      = curTime();
    console.log(time);

    const obj = {
        id : null,
        createdAt : time,
        title : title.value,
        url : null,
        author : author.value,
        answer : null,
        bodyHTML : question.value,
        avatarUrl : 'https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4'
    };

    agoraStatesDiscussions.unshift(obj);
    console.log(agoraStatesDiscussions.length)
    ul.textContent = '';
    pageArea.textContent = '';
    render(ul);
    pageBtn();
    curPage = 1;
}

//enter 입력
function enter(event) {
    if(event.keyCode === 13) validCheck();
}

//shift + enter 입력
function shiftEnter(event) {
    console.log(event.which);
    if(event.which === 13 && event.shiftKey) validCheck();
}

author.addEventListener('keyup', enter);
title.addEventListener('keyup', enter);
question.addEventListener('keypress', shiftEnter);

