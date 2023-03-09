let loginButton = document.querySelector(".form_login");
loginButton.onsubmit = function (event) {
    console.log(loginButton);
    event.preventDefault();
    
    document.querySelector("#login_site").classList.add("shift_up");
    setTimeout(function () {
        document.querySelector("#login_site").remove();
    }, 1000);
    document.querySelector("#AgoraStates").classList.remove("hidden");
}
