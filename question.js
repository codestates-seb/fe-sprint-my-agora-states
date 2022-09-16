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
        url: "https://github.com/codestates-seb/agora-states-fe/discussions/43",
        author: author.value,
        answer: null,
        avatarUrl: imgSelectClass.childNodes[1].src
    }
    localStorage.setItem("localObj", JSON.stringify(obj))
    ul.prepend(convertToDiscussion(obj))
    title.value = "";
    author.value = "";
    form.value = "";
})

let submitButton = document.querySelector('#submit')
submitButton.addEventListener('click', alt);

function alt() {
    Swal.fire({
        width: '60%',
        icon: 'success',
        title: '성공적으로 등록되었습니다',
    }).then((result) => {
        window.close();
    });
}
