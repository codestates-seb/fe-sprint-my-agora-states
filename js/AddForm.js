import { qs } from './utils.js';

export default function AddForm({ addNewItem }) {
  this.usernameInputEl = qs('.form__input-username');
  this.titleInputEl = qs('.form__input-title');
  this.textareaEl = qs('.form__textarea');
  this.submitBtnEl = qs('.form__submit-btn');

  this.usernameInputEl.addEventListener('input', () => this.toggleSubmitBtn());
  this.titleInputEl.addEventListener('input', () => this.toggleSubmitBtn());
  this.textareaEl.addEventListener('input', () => this.toggleSubmitBtn());

  this.submitBtnEl.addEventListener('click', event => {
    debugger;
    event.preventDefault();

    const newItem = this.createNewItem({
      author: this.usernameInputEl.value,
      title: this.titleInputEl.value,
      content: this.textareaEl.value,
    });

    addNewItem(newItem);
    this.clear();
  });

  this.createNewItem = ({ author, title, content }) => {
    return {
      author,
      title,
      answer: null,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toJSON(),
      bodyHTML: `<p>${content}</p>`,
      avatarUrl:
        'https://user-images.githubusercontent.com/41741221/211465725-a41312a6-81d6-4074-a9b7-8db46c2a6754.jpg',
    };
  };

  this.isValid = () =>
    this.usernameInputEl.value.trim().length > 0 &&
    this.titleInputEl.value.trim().length > 0 &&
    this.textareaEl.value.trim().length > 0;

  this.toggleSubmitBtn = () => {
    this.isValid()
      ? this.submitBtnEl.removeAttribute('disabled')
      : this.submitBtnEl.setAttribute('disabled', 'true');
  };

  this.clear = () => {
    this.usernameInputEl.value = '';
    this.titleInputEl.value = '';
    this.textareaEl.value = '';
    this.toggleSubmitBtn();
  };
}
