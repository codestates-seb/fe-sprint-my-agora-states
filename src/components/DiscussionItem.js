import Component from './Component.js';
import AvatarWrapper from './AvatarWrapper.js';
import DiscussionContent from './DiscussionContent.js';
import DiscussionDetail from './DiscussionDetail.js';
import { deleteLocalDiscussion } from '../model/localDiscussion.js';

export default class DiscussionItem extends Component {
  constructor({ className, props }) {
    super({ tagName: 'li', className, props });
  }
  render() {
    const { id, author, title, avatarUrl, bodyHTML, answer, createdAt } =
      this.props;

    const avatarWrapperEl = new AvatarWrapper({
      className: 'discussion__avatar--wrapper',
      props: {
        avatarUrl,
      },
    }).el;

    const discussionContentEl = new DiscussionContent({
      className: 'discussion__content',
      props: {
        id,
        title,
        author,
        avatarUrl,
        createdAt,
        answer,
        bodyHTML,
      },
    }).el;
    const discussionTitleLinkEl =
      discussionContentEl.querySelector('.discussion__title');
    discussionTitleLinkEl.addEventListener('click', () => {
      const discussionDetailEl = new DiscussionDetail({
        className: 'discussion-detail__wrapper',
        props: this.props,
      }).el;
      document.body.appendChild(discussionDetailEl);
    });

    const discussionRemoveEl = document.createElement('div');
    discussionRemoveEl.className = 'discussion__remove';
    const discussionRemoveButtonEl = document.createElement('i');
    discussionRemoveButtonEl.className = 'fa-solid fa-trash';
    discussionRemoveEl.appendChild(discussionRemoveButtonEl);

    this.el.appendChild(avatarWrapperEl);
    this.el.appendChild(discussionContentEl);
    this.el.appendChild(discussionRemoveEl);
  }
}
