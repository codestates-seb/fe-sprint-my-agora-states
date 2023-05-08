import Component from './Component.js';
import { getLocaleDate } from '../utils.js';

export default class DiscussionContent extends Component {
  constructor({ className = '', props = {} }) {
    super({ className, props });
  }
  render() {
    const { title, author, createdAt, answer } = this.props;
    const localeCreatedAt = getLocaleDate(createdAt);

    this.el.className = 'discussion__content';

    const discussionTitleEl = document.createElement('h2');
    const discussionIsAnsweredEl = document.createElement('span');
    discussionIsAnsweredEl.className = answer
      ? 'discussion__is-answered answered'
      : 'discussion__is-answered';
    discussionIsAnsweredEl.textContent = answer ? '[답변완료] ' : '[미해결] ';
    discussionTitleEl.appendChild(discussionIsAnsweredEl);
    discussionTitleEl.className = 'discussion__title';
    const discussionTitleTextEl = document.createElement('span');
    discussionTitleTextEl.textContent = title;

    const discussionInformationEl = document.createElement('div');
    discussionInformationEl.className = 'discussion__information';
    discussionInformationEl.innerHTML = `<span>${author}</span> / ${localeCreatedAt}`;
    discussionTitleEl.appendChild(discussionTitleTextEl);

    this.el.appendChild(discussionTitleEl);
    this.el.appendChild(discussionInformationEl);
  }
}
