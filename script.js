//===========================================================//
//======================== 함수 실행부 ========================//
//===========================================================//

const ul = document.querySelector("ul.discussions__container");
render(ul);
pageBtn();

//===========================================================//
//========================= Create ==========================//
//===========================================================//
const submit = document.querySelector("#submitBtn");

submit.addEventListener('click', createDiscussion);

function createDiscussion() {
    alert('z');
    const name = document.querySelector("#name");
    const title = document.querySelector("#title");
    const text = document.querySelector("#question");
    const time = curTime();

    const obj = {
        id : null,
        createdAt : time,
        title : title,
        url : null,
        author : name,
        answer : null,
        bodyHTML : text,
        avartarUrl : null
    };

    agoraStatesDiscussions.push(obj);
}
