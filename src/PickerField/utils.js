const getPageSize = (() => {
  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

  const result = { width, height };

  return () => result;
})();

const processData = (data) => {
  let values = [];
  if (typeof data === 'object' && !(data instanceof Array)) {
    const keys = Object.keys(data);
    values = keys.map(key =>
      ({
        value: key,
        text: data[key],
      }));
  } else {
    values = data;
  }
  return values;
};

const debounce = (func, wait, immediate) => {
  let timeout;
  return function origin(...args) {
    const t = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(t, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(t, args);
  };
};

const { toString } = Object.prototype;

const isArray = arg => (toString.call(arg) === '[object Array]');

const addUrlParam = (name, value) => {
  let currentUrl = window.location.href;
  let reg;
  if (/\?/g.test(currentUrl)) {
    reg = new RegExp(`${name}=[-\\w]{4,25}`, 'g');
    if (reg.test(currentUrl)) {
      currentUrl = currentUrl.replace(reg, `${name}=${value}`);
    } else {
      currentUrl += `&${name}=${value}`;
    }
  } else {
    currentUrl += `?${name}=${value}`;
  }
  return currentUrl;
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#';

export default {
  getPageSize,
  processData,
  debounce,
  isArray,
  addUrlParam,
  alphabet,
};
