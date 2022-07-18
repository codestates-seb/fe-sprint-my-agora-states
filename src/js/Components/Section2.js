import Component from '../Core/component.js';
import { getRandomNumber, getCurrentTime } from '../common/utils/utils.js';
import { agoraStatesDiscussions } from '../common/data/data.js';

export default class Section2 extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    let { data, pageStartNum, pageEndNum } = this.props;

    if (!data) {
      data = agoraStatesDiscussions;
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
              src=${avatarUrl ? avatarUrl : parsedData[getRandomNumber()].avatarUrl}
              alt="avatar of ${author}"
              width="50px"
            />
          </div>
          <div class="discussion__content">
            <h2 class="discussion__title"><a href=${url}>[${title}]</a></h2>
            <div class="discussion__information">${author} / ${createdAt ? createdAt : getCurrentTime()}</div>
          </div>
          <div class="discussion__answered"><p class="fa-square-0">${answer ? '체크' : '노체크'}</p></div>
        </li>
        `;
        })
        .join('')}
      </ul>
    `;
  }

  componentDidMount() {}
}
