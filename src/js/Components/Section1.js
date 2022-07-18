import { $ } from '../common/utils/dom.js';
import Component from '../Core/component.js';

export default class Section1 extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
        <form action="" method="get" class="form">
          <div class="form__input--wrapper">
            <div class="form__input--name">
              <label for="name">Enter your name: </label>
              <input type="text" name="name" id="name" required />
            </div>
            <div class="form__input--title">
              <label for="name">Enter your title: </label>
              <input type="text" name="name" id="name" required />
            </div>
            <div class="form__textbox">
              <label for="story">Your question: </label>
              <textarea id="story" name="story" placeholder="질문을 작성하세요" required></textarea>
            </div>
          </div>
          <div class="form__submit">
            <input type="submit" value="submit" />
          </div>
        </form>
    `;
  }

  componentDidMount() {}
}
