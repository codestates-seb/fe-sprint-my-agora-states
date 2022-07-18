import Component from '../Core/component.js';
const $ = (selector) => document.querySelector(selector);

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
            <div class="form__image">
              <label for="question">upload your profile iamge: </label>
              <input type="file" id="img_upload" name="img" accept="image/*">
              <input id="img_submit_btn" type="submit">
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

      if (e.target.id === 'img_upload' || e.target.id === 'img_submit_btn') {
        alert('구현중....');
      }
      if (!e.target.classList.contains('submit_btn')) {
        return;
      }

      this.handleNewData(nameInput.value, titleInput.value, questionContent.value);
      this.handlePostingTime();
    });
  }

  handleNewData(name, title, question) {
    // 바뀌는 정보들을 append 해줘야함
    const { updateData, postingTime } = this.props;

    const newDataObj = { author: name, title, url: question, createdAt: postingTime };

    updateData(newDataObj);
  }

  handlePostingTime() {
    const { updateTime } = this.props;

    updateTime();
  }
}
