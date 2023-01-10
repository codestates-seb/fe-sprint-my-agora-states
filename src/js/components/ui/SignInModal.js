import { user } from "../../user/user.js";
import { userAPI } from "../../user/userAPI.js";
import { $c } from "../../utils/createElement.js";
import { $ } from "../../utils/query.js";
export default function SignInModal($app, initialState) {
  this.$target = $c("section");
  this.$target.classList.add("modal");

  this.state = initialState;

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.$target.addEventListener("click", (e) => {
    const $id = $(".modal__input.signInId");
    const $pw = $(".modal__input.signInPw");
    if (e.target.className === "modal") {
      this.setState({ hide: true });
    }
    if (e.target.textContent === "SUBMIT") {
      if (userAPI.signIn($id.value, $pw.value)) {
        this.setState({ hide: true });
      }
    }
  });

  this.render = () => {
    if (this.state.hide) {
      $app.removeChild(this.$target);
    } else {
      this.$target.style.display = "flex";
    }
    const html = `
    <div class="modal__container">
      <header class="modal__title">SIGN IN</header>
      <div class="modal__contentBody">
        <div class="modal__topText modal__text">id</div>
        <input class="modal__input signInId" />
      </div>
      <div class="modal__contentBody">
        <div class="modal__topText modal__text">password</div>
        <input class="modal__input signInPw" />
      </div>
      
      <div class="modal__btnList">
        <button class="modal__btnList--btn btn">SUBMIT</button>
      </div>
    </div>`;

    this.$target.innerHTML = html;
  };
  $app.append(this.$target);
  this.render();
}
