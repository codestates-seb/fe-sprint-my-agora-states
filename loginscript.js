let loginButton = document.querySelector(".form_login");
let idSet = document.querySelector("#login__id");
let idSetStorage = null;
loginButton.onsubmit = function (event) {
    console.log(document.querySelector("#login__id").textContent);
    event.preventDefault();
    sessionStorage.setItem("ID", idSetStorage);
    
    document.querySelector("#login_site").classList.add("shift_up");
    setTimeout(function () {
        document.querySelector("#login_site").remove();
    }, 1000);
    document.querySelector("#AgoraStates").classList.remove("hidden");
    document.querySelector("#get_user_id").textContent = `${sessionStorage.getItem("ID")}`;
}


idSet.onkeyup = function (event) {
    idSetStorage = event.target.value;
}