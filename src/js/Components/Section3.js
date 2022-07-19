import { $ } from '../../index.js';
import { PAGE, NUMBER } from '../common/constants/constants.js';
import Component from '../Core/component.js';

export default class Section3 extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { data } = this.props;
    const lengthOfDataArray = data ? data.length : NUMBER.MAX_LENGTH;
    const maxPageNumber = Math.ceil(lengthOfDataArray / 10);
    const numberOfElements = new Array(maxPageNumber).fill(0);

    return `
    <div class="page__container">
      <i class="page_indicator" id="previous_page"><</i>
      <ul class="page__list">
        ${numberOfElements
          .map((item, i) => {
            return `<li><p class="page_number">${i + 1}</p></li>`;
          })
          .join('')}
      </ul>
      <i class="page_indicator" id="next_page">></i>
    </div>
    
    `;
  }

  componentDidMount() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.classList.contains(PAGE.NUMBER)) {
        const pageNumber = target.textContent;

        this.handleCurrentPage(pageNumber);
        this.handlePages();
      }

      if (target.classList.contains(PAGE.INDICATOR)) {
        this.handlePageIndicator(target.textContent);
      }
    });
  }

  handleCurrentPage(pageNumber) {
    const { updateCurrentPage } = this.props;

    updateCurrentPage(pageNumber);
  }

  handlePages() {
    const { updatePages } = this.props;

    updatePages();
  }

  handlePageIndicator(pageIndicator) {
    let { handleIndicator } = this.props;

    handleIndicator(pageIndicator);
  }
}
