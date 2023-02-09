import { qs } from './utils.js';

export default function AddForm({ addItem }) {
  this.usernameInputEl = qs('.form__input-username');
  this.titleInputEl = qs('.form__input-title');
  this.textareaEl = qs('.form__textarea');
  this.submitBtnEl = qs('.form__submit-btn');

  this.usernameInputEl.addEventListener('input', () => this.toggleSubmitBtn());
  this.titleInputEl.addEventListener('input', () => this.toggleSubmitBtn());
  this.textareaEl.addEventListener('input', () => this.toggleSubmitBtn());

  this.submitBtnEl.addEventListener('click', event => {
    event.preventDefault();
    const newItem = {
      author: this.usernameInputEl.value,
      title: this.titleInputEl.value,
      content: this.textareaEl.value,
    };
    addItem(newItem);
  });

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

  this.focus = () => {
    this.usernameInputEl.focus();
  };
}
