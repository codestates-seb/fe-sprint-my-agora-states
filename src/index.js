import App from './js/app.js';
export const $ = (selector) => document.querySelector(selector);

new App($('#root'));
