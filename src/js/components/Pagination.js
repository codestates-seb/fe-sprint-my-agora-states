import { $c } from "../utils/createElement.js";
import { go, map, filter } from "../utils/functional.js";

export default function Pagination($app, initialState, onPageClick) {
  this.$pagination = $c("div");
  this.state = initialState;
  // {startpage, lastpage, currentpage}

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };
  this.$pagination.className = "pagination";
  this.$pagination.addEventListener("click", onPageClick);
  const pages = Array.from(Array(this.state.last)).keys();
  this.render = () => {
    const tmpl = `
    <ul class='pageList'>
      <li><</li>
      ${map(
        (e) =>
          `<li ${e === this.state.page ? "class = now" : ""}>${e + 1}</li>`,
        pages
      ).join("")}
      <li>></li>
    </ul>`;
    this.$pagination.innerHTML = tmpl;
  };
  $app.append(this.$pagination);
  this.render();
}
