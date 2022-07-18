import Component from '../Core/component.js';

export default class Section2 extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    let { data } = this.props;

    const details = [...data];

    const reversedData = details.slice(-10).reverse();

    return `
      <ul class="discussions__container">
      ${reversedData
        .map((details) => {
          const { title, author, avatarUrl, createdAt, url, answer } = details;
          return `
        <li class="discussion__container">
          <div class="discussion__avatar--wrapper">
            <img
              class="discussion__avatar--image"
              src=${avatarUrl}
              alt="avatar of ${author}"
              width="50px"
            />
          </div>
          <div class="discussion__content">
            <h2 class="discussion__title"><a href=${url}>[${title}]</a></h2>
            <div class="discussion__information">${author} / ${createdAt}</div>
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
