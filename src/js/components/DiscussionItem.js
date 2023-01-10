import { $c } from "../utils/createElement.js";
import DiscussionModal from "./ui/DiscusionModal.js";
import toStringByFormatting from "../utils/toStringFormat.js";
export default function DiscussionItem($app, props) {
  const $li = $c("li");
  $li.className = "discussions";
  $li.dataset.discussionid = props.id;

  $li.addEventListener("click", (e) => {
    const discussionModal = new DiscussionModal($app, {
      discussionId: $li.dataset.discussionid,
      hide: false,
      answering: false,
    });
  });

  const tmpl = `
    <img src=${props.avatarUrl} class="discussions__tagImage" />
    <div class="discussions__contentBox">
      <div class="discussions_title">
        ${props.title}
      </div>
      <div class="discussions__infoBox">
        <div class="discussions__author">${props.author}</div>
        <div class="discussions__createAt">${toStringByFormatting(
          new Date(props.createdAt)
        )}</div>
      </div>
    </div>
    <div class="discussions__answered ${
      props.answer ? "answered" : ""
    }">Answered</div>
  `;
  $li.innerHTML = tmpl;
  return $li;
}
