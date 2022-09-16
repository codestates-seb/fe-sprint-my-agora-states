const form = document.querySelector(".form");
const author = document.querySelector('.form__input--name > input');
const title = document.querySelector('.form__input--title > input');

const avatarImg1=document.querySelector('#img1');
const avatarImg2=document.querySelector('#img2');
const avatarImg3=document.querySelector('#img3');
const avatarImg4=document.querySelector('#img4');
const avatarImg5=document.querySelector('#img5');
const avatarImg6=document.querySelector('#img6');

avatarImg1.classList.add('check');
let imgSelectClass = avatarImg1;

function img1(){
    imgSelectClass.classList.remove('check')
    imgSelectClass = avatarImg1;
    avatarImg1.classList.add('check')
}
function img2(){
    imgSelectClass.classList.remove('check')
    imgSelectClass = avatarImg2;
    avatarImg2.classList.add('check')
}
function img3(){
    imgSelectClass.classList.remove('check')
    imgSelectClass = avatarImg3;
    avatarImg3.classList.add('check')
}
function img4(){
    imgSelectClass.classList.remove('check')
    imgSelectClass = avatarImg4;
    avatarImg4.classList.add('check')
}
function img5(){
    imgSelectClass.classList.remove('check')
    imgSelectClass = avatarImg5;
    avatarImg5.classList.add('check')
}
function img6(){
    imgSelectClass.classList.remove('check')
    imgSelectClass = avatarImg6;
    avatarImg6.classList.add('check')
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(localStorage.obj);
    const obj = {
        id: "unique_number",
        createdAt: new Date(),
        title: title.value,
        author: author.value,
        answer: null,
        avatarUrl: imgSelectClass.childNodes[1].src
    }
    let dataObj = JSON.parse(localStorage.getItem("data"));
    dataObj.unshift(obj)
    console.log(obj)
    console.log(JSON.parse(localStorage.getItem("data")));
    localStorage.setItem("data", JSON.stringify(dataObj))
    title.value = "";
    author.value = "";
    form.value = "";
})

let submitButton = document.querySelector('#submit')
submitButton.addEventListener('click', alt);

function alt() {
    alert("성공적으로 등록했습니다");
    window.close();
}
