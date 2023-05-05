import Component from './Component.js';
import AvatarWrapper from './AvatarWrapper.js';
import DiscussionContent from './DiscussionContent.js';
import DiscussionDetail from './DiscussionDetail.js';

export default class DiscussionItem extends Component {
  constructor({ className, props }) {
    super({ tagName: 'li', className, props });
  }
  render() {
    const { id, author, title, avatarUrl, bodyHTML, answer, createdAt } =
      this.props;

    const avatarWrapper = new AvatarWrapper({
      className: 'discussion__avatar--wrapper',
      props: {
        avatarUrl,
      },
    }).el;

    const discussionContent = new DiscussionContent({
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
    const discussionTitleLink =
      discussionContent.querySelector('.discussion__title');
    discussionTitleLink.addEventListener('click', () => {
      const discussionDetail = new DiscussionDetail({
        className: 'discussion-detail__wrapper',
        props: this.props,
      });
      document.body.appendChild(discussionDetail.el);
    });

    const discussionRemove = document.createElement('div');
    discussionRemove.className = 'discussion__remove';
    const discussionRemoveButton = document.createElement('i');
    discussionRemoveButton.className = 'fa-solid fa-trash';
    discussionRemove.appendChild(discussionRemoveButton);
    discussionRemove.addEventListener('click', () => {
      const isDelete = confirm('정말 삭제하시겠습니까?');
      if (isDelete) {
        this.el.remove();
        alert('삭제되었습니다.');
      }
    });

    this.el.appendChild(avatarWrapper);
    this.el.appendChild(discussionContent);
    this.el.appendChild(discussionRemove);
  }
}
