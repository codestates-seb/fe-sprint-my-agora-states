import App from './js/app.js';
import { $ } from './js/common/utils/DOM.js';
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

new App($('#root'));
