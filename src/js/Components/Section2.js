import Component from '../Core/component.js';
import { getCurrentTime } from '../common/utils/utils.js';
import { agoraStatesDiscussions } from '../common/data/data.js';
import { ICON, IMG } from '../common/constants/constants.js';
import { fetchDiscussions } from '../common/data/api.js';

export default class Section2 extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    let { data, pageStartNum, pageEndNum } = this.props;

    if (!data) {
      data = '';
    }

    const parsedData = [...data];
    const reversedData = parsedData.slice(pageStartNum, pageEndNum).reverse();

    return `
      <ul class="discussions__container">
      ${reversedData
        .map((detail) => {
          const { title, author, avatarUrl, createdAt, url, answer } = detail;

          // 제공되지 않은 정보는 랜덤으로 뽑는다 ??
          return `
        <li class="discussion__container">
          <div class="discussion__avatar--wrapper">
            <img
              class="discussion__avatar--image"
              src=${avatarUrl ? avatarUrl : IMG.DEFAULT}
              alt="avatar of ${author}"
              width="50px"
              data-id=""
            />
          </div>
          <div class="discussion__content">
            <h2 class="discussion__title"><a href=${url ? url : '#'}>[${title}]</a></h2>
            <div class="discussion__information">${author} / ${createdAt ? createdAt : getCurrentTime()}</div>
          </div>
          <p id="answer-check">답변</p>
          <div class="discussion__answered">${answer ? ICON.CHECK_BOX : ICON.EMPTY_BOX}</div>
        </li>
        `;
        })
        .join('')}
      </ul>
    `;
  }

  componentDidMount() {}
}
