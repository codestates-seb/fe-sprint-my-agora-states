function $(selector) {
  const element = document.querySelector(selector);

  if (element && element instanceof HTMLElement) {
    return element;
  }

  throw new Error(`can't get element with selector like ${selector}`);
}

export default $;
