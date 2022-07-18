import { getLocalStorage } from '../common/utils/localStorage.js';
import Component from '../Core/component.js';

export default class Section3 extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const lengthOfDataArray = getLocalStorage('data').length;

    const numberOfElements = new Array(Math.ceil(lengthOfDataArray / 10)).fill(0);

    return `
    <div class="page__container">
    <i><</i>
    <ul class="page__list">
      ${numberOfElements
        .map((item, i) => {
          return `<li>${i + 1}</li>`;
        })
        .join('')}
    </ul>
    <i>></i>
    </div>
    
    `;
  }

  componentDidMount() {}
}
