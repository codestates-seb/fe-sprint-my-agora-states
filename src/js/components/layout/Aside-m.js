import { user } from "../../user/user.js";
import { $c } from "../../utils/createElement.js";
import { map } from "../../utils/functional.js";
import { filter } from "../../utils/functional.js";

export default function AsideM($app, initialState, onClick) {
  this.$target = $c("aside");
  this.state = initialState;
  this.$target.classList.add("filter__container--mobile");

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
    <ul class="filter__tagsContainer">
      <span>TAGS</span>
      ${map((e) => {
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
    </ul>
    <button class="newDiscussion-btn btn can-disable" ${
      user.getCurrentUser() ? "" : "disabled"
    }>
      NEW DISCUSSION
    </button>`;
    this.$target.innerHTML = html;
  };

  $app.append(this.$target);
  this.render();
}
