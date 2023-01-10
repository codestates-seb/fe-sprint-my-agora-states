import { $c } from "../utils/createElement.js";

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

  this.render = () => {
    const tmpl = `
    <ul class='pageList'>
      <li class="page1">1</li>
      <li class="page2">2</li>
      <li class="page3">3</li>
      <li class="page4">4</li>
    </ul>`;
    this.$pagination.innerHTML = tmpl;
  };
  $app.append(this.$pagination);
  this.render();
}
