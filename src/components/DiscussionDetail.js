import Component from './Component.js';
import AvatarWrapper from './AvatarWrapper.js';
import DiscussionContent from './DiscussionContent.js';
import { getLocaleDate } from '../utils.js';

export default class DiscussionDetail extends Component {
  constructor({ className = '', props = {} }) {
    super({ className, props });
  }
  render() {
    const { title, author, avatarUrl, createdAt, answer, bodyHTML } =
      this.props;

    // 백드롭 생성
    const backdropEl = document.createElement('div');
    backdropEl.className = 'backdrop';
    this.el.appendChild(backdropEl);
    backdropEl.addEventListener('click', () => {
      this.el.remove();
    });

    // 디스커션 디테일 생성
    const discussionDetailContainerEl = document.createElement('div');
    discussionDetailContainerEl.className = 'discussion-detail__container';

    // 디스커션 질문
    const discussionHeadEL = document.createElement('div');
    discussionHeadEL.className = 'discussion-detail__head';
    const discussitonContentEL = new DiscussionContent({
      className: 'discussion__content',
      props: {
        title,
        author,
        avatarUrl,
        createdAt,
        answer,
      },
    }).el;
    discussionHeadEL.appendChild(discussitonContentEL);
    const avatar = new AvatarWrapper({
      className: 'discussion__avatar--wrapper',
      props: {
        avatarUrl,
      },
    }).el;
    discussionHeadEL.appendChild(avatar);
    discussionDetailContainerEl.appendChild(discussionHeadEL);

    const discussionBodyEl = document.createElement('div');
    discussionBodyEl.className = 'discussion-detail__body';
    discussionBodyEl.innerHTML = bodyHTML;
    discussionDetailContainerEl.appendChild(discussionBodyEl);

    // 디스커션 답변
    if (answer) {
      const { author, avatarUrl, createdAt, bodyHTML } = answer;
      const localeCreatedAt = getLocaleDate(createdAt);

      const discussionAnswerEl = document.createElement('div');
      discussionAnswerEl.className = 'discussion-detail__answer';

      const arrow = document.createElement('i');
      arrow.className = 'fa-solid fa-arrow-turn-up fa-rotate-90';
      discussionAnswerEl.appendChild(arrow);

      const discussionAnswerHeadEl = document.createElement('div');
      discussionAnswerHeadEl.className = 'discussion-detail__head';
      const avatar = new AvatarWrapper({
        className: 'discussion__avatar--wrapper',
        props: {
          avatarUrl,
        },
      }).el;
      discussionAnswerHeadEl.appendChild(avatar);
      const discussonAnswerInfoEl = document.createElement('div');
      discussonAnswerInfoEl.className = 'discussion-detail__answer-info';
      discussonAnswerInfoEl.innerHTML = /*html*/ `
        <p><span>${author}</span>님의 답변</p>
        <span>${localeCreatedAt}</span>
      `;
      discussionAnswerHeadEl.appendChild(discussonAnswerInfoEl);
      discussionAnswerEl.appendChild(discussionAnswerHeadEl);

      const discussionAnswerBodyEl = document.createElement('div');
      discussionAnswerBodyEl.className = 'discussion-detail__body';
      discussionAnswerBodyEl.innerHTML = bodyHTML;
      discussionAnswerEl.appendChild(discussionAnswerBodyEl);
      discussionDetailContainerEl.appendChild(discussionAnswerEl);
    } else {
      const noAnswerMessageEl = document.createElement('div');
      noAnswerMessageEl.className = 'discussion-detail__no-answer';
      noAnswerMessageEl.textContent = '아직 답변이 없습니다.';
      discussionDetailContainerEl.appendChild(noAnswerMessageEl);
    }

    this.el.appendChild(discussionDetailContainerEl);
  }
}
