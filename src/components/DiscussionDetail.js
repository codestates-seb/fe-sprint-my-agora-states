import Component from './Component.js';
import AvatarWrapper from './AvatarWrapper.js';
import DiscussionContent from './DiscussionContent.js';

export default class DiscussionDetail extends Component {
  constructor({ className = '', props = {} }) {
    super({ className, props });
  }
  render() {
    const { title, author, avatarUrl, createdAt, answer, bodyHTML } =
      this.props;
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
    // 백드롭 생성
    const backdrop = document.createElement('div');
    backdrop.className = 'backdrop';
    this.el.appendChild(backdrop);
    backdrop.addEventListener('click', () => {
      this.el.remove();
    });

    // 디스커션 디테일 생성
    const discussionDetailContainer = document.createElement('div');
    discussionDetailContainer.className = 'discussion-detail__container';
    // 디스커션 질문
    const discussionHead = document.createElement('div');
    discussionHead.className = 'discussion-detail__head';
    const discussitonContent = new DiscussionContent({
      className: 'discussion__content',
      props: {
        title,
        author,
        avatarUrl,
        createdAt,
        answer,
      },
    }).el;
    discussionHead.appendChild(discussitonContent);
    const avatar = new AvatarWrapper({
      className: 'discussion__avatar--wrapper',
      props: {
        avatarUrl,
      },
    }).el;
    discussionHead.appendChild(avatar);
    discussionDetailContainer.appendChild(discussionHead);

    const discussionBody = document.createElement('div');
    discussionBody.className = 'discussion-detail__body';
    discussionBody.innerHTML = bodyHTML;
    discussionDetailContainer.appendChild(discussionBody);

    // 디스커션 답변
    if (answer) {
      const { author, avatarUrl, createdAt, bodyHTML } = answer;
      const localeCreatedAt = new Date(
        Date.parse(createdAt)
      ).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'long',
      });

      const discussionAnswer = document.createElement('div');
      discussionAnswer.className = 'discussion-detail__answer';

      const arrow = document.createElement('i');
      arrow.className = 'fa-solid fa-arrow-turn-up fa-rotate-90';
      discussionAnswer.appendChild(arrow);

      const discussionAnswerHead = document.createElement('div');
      discussionAnswerHead.className = 'discussion-detail__head';
      const avatar = new AvatarWrapper({
        className: 'discussion__avatar--wrapper',
        props: {
          avatarUrl,
        },
      }).el;
      discussionAnswerHead.appendChild(avatar);
      const discussonAnswerInfo = document.createElement('div');
      discussonAnswerInfo.className = 'discussion-detail__answer-info';
      discussonAnswerInfo.innerHTML = /*html*/ `
        <p><span>${author}</span>님의 답변</p>
        <span>${localeCreatedAt}</span>
      `;
      discussionAnswerHead.appendChild(discussonAnswerInfo);
      discussionAnswer.appendChild(discussionAnswerHead);

      const discussionAnswerBody = document.createElement('div');
      discussionAnswerBody.className = 'discussion-detail__body';
      discussionAnswerBody.innerHTML = bodyHTML;
      discussionAnswer.appendChild(discussionAnswerBody);
      discussionDetailContainer.appendChild(discussionAnswer);
    } else {
      const noAnswerMessage = document.createElement('div');
      noAnswerMessage.className = 'discussion-detail__no-answer';
      noAnswerMessage.textContent = '아직 답변이 없습니다.';
      discussionDetailContainer.appendChild(noAnswerMessage);
    }

    this.el.appendChild(discussionDetailContainer);
  }
}
