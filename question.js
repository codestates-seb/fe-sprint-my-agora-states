const form = document.querySelector(".form");
const author = document.querySelector('.form__input--name > input');
const title = document.querySelector('.form__input--title > input');
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
        avatarUrl:
            "https://avatars.githubusercontent.com/u/77476348?s=64&u=64243db62117de5c254c9a76184753b76d7303ff&v=4",
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
        title: 'Alert가 실행되었습니다.',
        text: '이곳은 내용이 나타나는 곳입니다.',
    }).then((result) => {
        window.close();
    });
}