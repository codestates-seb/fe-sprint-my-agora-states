import Component from '../Core/component.js';
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export default class Section3 extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { data } = this.props;
    const lengthOfDataArray = data ? data.length : 42;

    const numberOfElements = new Array(Math.ceil(lengthOfDataArray / 10)).fill(0);

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
      if (target.classList.contains('page_number')) {
        const pageNumber = target.textContent;

        this.handleCurrentPage(pageNumber);
        console.log(this.props.pagesToShow);
      }
    });
  }

  handleCurrentPage(pageNumber) {
    const { updateCurrentPage } = this.props;

    updateCurrentPage(pageNumber);
  }
}
