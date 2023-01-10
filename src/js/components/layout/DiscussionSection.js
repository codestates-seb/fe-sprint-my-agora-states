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
      console.log(e.currentTarget.children[0].children);

      map(
        (e) => e.classList.remove("now"),
        e.currentTarget.children[0].children
      );
      console.log(e.target);
      e.target.classList.add("now");
      this.setState({ page: e.target.textContent - 1 });
    }
  };

  // console.log(this.state.discussions);
  this.render = () => {
    console.log(this.state.discussions);
    const $ul = $c("ul");
    $ul.classList.add("discussions__container");
    const sortedDiscussion = Object.values(this.state.discussions).sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
    const items = map((e) => {
      return new DiscussionItem(this.$target, e);
    }, sortedDiscussion);

    map((e) => {
      $ul.append(e);
    }, items);
    this.$target.innerHTML = "";
    this.$target.append($ul);
    new Pagination(this.$target, this.state.page, onPageClick);
  };
  $app.append(this.$target);

  this.render();
}
