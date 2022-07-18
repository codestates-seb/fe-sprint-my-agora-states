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
              <input type="text" name="name" id="title_input" required />
            </div>
            <div class="form__textbox">
              <label for="question">Your question: </label>
              <textarea id="question" name="question" placeholder="질문을 작성하세요" required></textarea>
            </div>
          </div>
          <div class="form__submit">
            <input class="submit_btn" type="submit" value="submit" />
          </div>
        </form>
    `;
  }

  componentDidMount() {
    const nameInput = $('#name');
    const titleInput = $('#title_input');
    const questionContent = $('#question');

    this.$target.addEventListener('click', (e) => {
      e.preventDefault();

      if (!e.target.classList.contains('submit_btn')) {
        return;
      }

      this.handleNewData(nameInput.value, titleInput.value, questionContent.value);
    });
  }

  handleNewData(name, title, question) {
    const { updateData } = this.props;

    const newDataObj = { author: name, title, url: question };

    updateData(newDataObj);
  }
}
