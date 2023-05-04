import Component from './Component.js';
import AvatarWrapper from './AvatarWrapper.js';
import DiscussionContent from './DiscussionContent.js';

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
        title,
        author,
        createdAt,
        answer,
      },
    }).el;

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
