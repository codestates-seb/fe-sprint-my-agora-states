import Component from './Component.js';

export default class DiscussionContent extends Component {
  constructor({ className = '', props = {} }) {
    super({ className, props });
  }
  render() {
    const { title, author, createdAt, answer } = this.props;
    const localeCreatedAt = new Date(Date.parse(createdAt)).toLocaleDateString(
      'ko-KR',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long',
      }
    );

    this.el.className = 'discussion__content';

    const discussionTitle = document.createElement('h2');
    const discussionIsAnswered = document.createElement('span');
    discussionIsAnswered.className = answer
      ? 'discussion__is-answered answered'
      : 'discussion__is-answered';
    discussionIsAnswered.textContent = answer ? '[답변완료] ' : '[미해결] ';
    discussionTitle.appendChild(discussionIsAnswered);
    discussionTitle.className = 'discussion__title';
    const discussionTitleLink = document.createElement('a');
    discussionTitleLink.href = 'javascript:void(0)';
    discussionTitleLink.textContent = title;

    const discussionInformation = document.createElement('div');
    discussionInformation.className = 'discussion__information';
    discussionInformation.textContent = `${author} / ${localeCreatedAt}`;
    discussionTitle.appendChild(discussionTitleLink);
    this.el.appendChild(discussionTitle);
    this.el.appendChild(discussionInformation);
  }
}
