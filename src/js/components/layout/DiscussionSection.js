import { discussion } from "../../discussion/discussions.js";
import { $c } from "../../utils/createElement.js";
import { map } from "../../utils/functional.js";
import { $ } from "../../utils/query.js";
import DiscussionItem from "../DiscussionItem.js";
import Pagination from "../Pagination.js";
export default function ($app, initialState) {
  this.$target = $c("section");

  this.$target.setAttribute("id", "discussion__wrapper");

  this.state = initialState;

  discussion.subscribe(this);
  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };
  const onPageClick = (e) => {
    if (e.target.tagName === "LI") {
      if (e.target.textContent === "<") {
        if (this.state.start !== 0) {
          this.setState({
            start: this.state.start - 1 * 10,
            page: this.state.page - 1,
          });
        }
      } else if (e.target.textContent === ">") {
        if (this.state.last !== this.state.page) {
          this.setState({
            start: this.state.start + 1 * 10,
            page: this.state.page + 1,
          });
        }
      } else {
        this.setState({
          start: (+e.target.textContent - 1) * 10,
          page: +e.target.textContent - 1,
        });
      }
    }
  };

  this.render = () => {
    const $ul = $c("ul");
    $ul.classList.add("discussions__container");
    const sortedDiscussion = Object.values(this.state.discussions).sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
    const items = map((e) => {
      return new DiscussionItem(this.$target, e);
    }, sortedDiscussion.slice(this.state.start, this.state.start + 10));

    map((e) => {
      $ul.append(e);
    }, items);
    this.$target.innerHTML = "";
    this.$target.append($ul);
    new Pagination(
      this.$target,
      {
        page: this.state.page,
        last: this.state.last,
      },
      onPageClick
    );
  };
  $app.append(this.$target);

  this.render();
}
