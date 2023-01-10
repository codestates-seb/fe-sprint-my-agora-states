import storage from "../../storage/storage.js";

import { $c } from "../../utils/createElement.js";
import { $ } from "../../utils/query.js";

export default function NewDiscussionModal($app, initialState, onSubmit) {
  this.$target = $c("section");

  this.$target.classList.add("modal");
  this.state = initialState;

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.$target.addEventListener("click", (e) => {
    if (e.target.className === "modal") {
      this.setState({ hide: true });
    }
    if (e.target.textContent === "SUBMIT") {
      onSubmit();
      this.setState({ hide: true });
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
      <header class="modal__title">NEW DISCUSSION</header>
      <div class="modal__contentBody">
        <div class="modal__topText modal__text">TITLE</div>
        <input class="modal__input new-discussion-title" />
      </div>
      <div class="modal__contentBody">
        <div class="modal__topText modal__text">TAG</div>
        <input class="modal__input new-discussion-tag" />
      </div>
      <div class="modal__contentBody">
        <div class="modal__topText modal__text">CONTENT</div>
        <textarea class="modal__body new-discussion-content" ></textarea>
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
