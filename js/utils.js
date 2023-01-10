const qs = (selector, target = document) => {
  const element = target.querySelector(selector);

  if (!element) throw new Error('$ : no element selected');

  return element;
};

const qsAll = (selector, target = document) => {
  const nodeList = target.querySelectorAll(selector);

  return nodeList;
};

const getLocalStorage = key => {
  try {
    const state = JSON.parse(localStorage.getItem(key));
    return state;
  } catch (error) {
    throw new Error('Error occured: ', error);
  }
};

const setLocalStorage = (key, value) => {
  try {
    const newValue = JSON.stringify(value);
    localStorage.setItem(key, newValue);
  } catch (error) {
    throw new Error('Error occured: ', error);
  }
};

export { qs, qsAll, getLocalStorage, setLocalStorage };
