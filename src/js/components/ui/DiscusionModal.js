import { discussion } from "../../discussion/discussions.js";
import { user } from "../../user/user.js";
import { $c } from "../../utils/createElement.js";
import { $ } from "../../utils/query.js";
import toStringFormat from "../../utils/toStringFormat.js";

//TODO: 1. remove discussion done  2. add answer  3. if can edit discussion
//TODO: answer Modal => discussion data handling

export default function DiscussionModal($app, initialState) {
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
    if (e.target.textContent === "ANSWER") {
      if (!this.state.answering) {
        this.setState({ answering: true });
      } else {
        const $answer = $(".answer-content");
        const curDiscussion =
          discussion.getDiscussions()[this.state.discussionId];
        const createdAt = new Date().toISOString();
        console.log(curDiscussion);
        curDiscussion.answer = {
          author: user.getCurrentUser(),
          bodyHTML: $answer.value,
          createdAt,
          id: Date.now(),
        };
        discussion.setDiscussion(this.state.discussionId, curDiscussion);
      }
    }
    if (e.target.textContent === "REMOVE") {
      this.setState({ hide: true });
      discussion.removeDiscussion(this.state.discussionId);
    }
  });

  this.render = () => {
    const curDiscussion = discussion.getDiscussions()[this.state.discussionId];
    if (this.state.hide) {
      $app.removeChild(this.$target);
    } else {
      this.$target.style.display = "flex";
    }
    const html = `
    <div class="modal__container">
      <header class="modal__title">DISCUSSION</header>
      <div class='modal__text modal__discussionInfo'>
        <span>author: ${curDiscussion.author}</span>
        <span>tag: ${curDiscussion.tag}</span>
        <span>created: ${toStringFormat(
          new Date(curDiscussion.createdAt)
        )}</span>
      </div>
      <div class="modal__contentBody">
        <div class="modal__topText modal__text">TITLE</div>
        <div class="modal__body" />
          ${curDiscussion.title}
        </div>
      </div>
      <div class="modal__contentBody">
        <div class="modal__topText modal__text">CONTENT</div>
        <div class="modal__body" />
          ${curDiscussion.bodyHTML}
        </div>
      </div>
      ${
        this.state.answering
          ? `
          <div class="modal__contentBody">
            <div class="modal__topText modal__text">ANSWER</div>
            <textarea class="modal__body answer-content" ></textarea>
          </div>`
          : ""
      }
      ${
        curDiscussion.answer
          ? `
          <div class="modal__contentBody">
            <div class="modal__topText modal__text">ANSWER</div>
            <div class="modal__body" />
              ${curDiscussion.answer.bodyHTML}
            </div>
          </div>`
          : ``
      }
      ${
        user.getCurrentUser()
          ? `
        <div class="modal__btnList">
          ${
            curDiscussion.author === user.getCurrentUser()
              ? '<button class="modal__btnList--btn btn btn-remove">REMOVE</button>'
              : !curDiscussion.answer
              ? '<button class="modal__btnList--btn btn answer">ANSWER</button>'
              : ""
          }
        </div>`
          : ""
      }
      
    </div>`;

    this.$target.innerHTML = html;
  };
  $app.append(this.$target);
  this.render();
}
