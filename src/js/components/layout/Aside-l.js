import { storageAPI } from "../../storage/storageAPI.js";
import { user } from "../../user/user.js";
import { $c } from "../../utils/createElement.js";

import { filter, map } from "../../utils/functional.js";
export default function AsideL($app, initialState, onClick) {
  this.$target = $c("aside");
  this.state = initialState;

  user.subscribe(this);

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.$target.addEventListener("click", onClick);

  this.$target.classList.add("filter__container");

  this.render = () => {
    const filterBy = this.state.tag;
    const tag = filter((e) => e.name !== "unanswered", filterBy);
    const html = `
    <button class="newDiscussion-btn btn can-disable" ${
      user.getCurrentUser() ? "" : "disabled"
    }>
      NEW DISCUSSION
    </button>
    <ul class="filter__tagsContainer">
      <span>TAGS</span>
      ${map((e) => {
        // console.log(e);
        return `<li class = "filter__tags ${
          e.selected === true ? "selected" : ""
        }" data-filtername = ${e.name} >
      <img src=${e.url} class="filter__tagImg" />${e.name}
    </li>`;
      }, tag).join("")}
    </ul>

    <ul class="filter__filterContainer">
      <span>FILTER BY</span>
      <li data-filtername = 'unanswered' class=${
        filterBy[filterBy.length - 1].selected ? "selected" : ""
      }>unanswered</li>
    </ul>`;
    this.$target.innerHTML = html;
  };

  $app.append(this.$target);
  this.$target.textContent = "test";
  this.render();
}
