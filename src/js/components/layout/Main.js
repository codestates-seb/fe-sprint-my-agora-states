import { $c } from "../../utils/createElement.js";
import { $ } from "../../utils/query.js";
import AsideL from "./Aside-l.js";
import AsideM from "./Aside-m.js";
import { filterBy } from "../../data/filterBy.js";
import { filter, go, map } from "../../utils/functional.js";
import DiscussionSection from "./DiscussionSection.js";
import storage from "../../storage/storage.js";
import NewDiscussionModal from "../ui/NewDiscussionModal.js";
import { user } from "../../user/user.js";
import { discussion } from "../../discussion/discussions.js";

export default function Main($app, initialState) {
  this.$target = $c("main");
  this.state = initialState || {
    discussions: discussion.getDiscussions(),
    page: 0,
  };

  discussion.subscribe(this);

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    const filterState = map((e) => {
      return { ...e, selected: false };
    }, filterBy);
    asidel.setState({ tag: filterState });
    asidem.setState({ tag: filterState });
    this.render();
  };

  const filterState = map((e) => {
    return { ...e, selected: false };
  }, filterBy);

  const onSubmit = () => {
    const $title = $(".new-discussion-title");
    const $content = $(".new-discussion-content");
    const $tag = $(".new-discussion-tag");

    const id = Date.now().toString();
    const userList = storage.getData("user");
    const currentUser = userList[user.getCurrentUser()];

    discussion.setDiscussion(id, {
      id,
      author: currentUser.id,
      bodyHTML: $content.value,
      title: $title.value,
      tag: $tag.value.toLowerCase(),
      avatarUrl: currentUser.url,
      createdAt: new Date().toISOString(),
      answer: null,
    });
  };

  const onTagClick = (e) => {
    if (e.target.dataset.filtername) {
      const filterName = e.target.dataset.filtername;
      const newState = {
        tag: map((e) => {
          if (e.name === filterName) {
            e.selected = !e.selected;
            if (e.selected) {
              const filteredDiscussion = {};
              go(
                Object.values(this.state.discussions),
                filterName === "unanswered"
                  ? filter((e) => !e.answer)
                  : filter((e) => e.tag === filterName),
                map((e) => (filteredDiscussion[e.id] = e))
              );
              discussionSection.setState({ discussions: filteredDiscussion });
            } else {
              discussionSection.setState({
                discussions: this.state.discussions,
              });
            }
          } else {
            e.selected = false;
          }
          return e;
        }, filterState),
      };
      asidel.setState(newState);
      asidem.setState(newState);
    } else if (e.target.tagName === "BUTTON") {
      console.log("t");
      const newDiscussion = new NewDiscussionModal(
        this.$target,
        {
          hide: false,
        },
        onSubmit
      );
    }
  };

  const asidel = new AsideL(
    this.$target,
    {
      tag: filterState,
    },
    onTagClick
  );
  const asidem = new AsideM(
    this.$target,
    {
      tag: filterState,
    },
    onTagClick
  );
  const discussionSection = new DiscussionSection(this.$target, {
    page: 0,
    discussions: this.state.discussions,
  });

  this.render = () => {};

  $app.append(this.$target);
  this.render();
}
