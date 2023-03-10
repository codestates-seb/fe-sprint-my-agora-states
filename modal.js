const modal = document.querySelector('.modal');
const btnOpenPopup = document.querySelector('.btn-open-popup');
const btnClosePopup = document.querySelector(".modal_close");

btnOpenPopup.addEventListener("click", function () {
    // console.log(modal);
    modal.classList.add("modal_open_animation");
});

btnClosePopup.addEventListener("click", function () {
    modal.classList.remove("modal_open_animation");
})