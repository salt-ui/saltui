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

// 格式化方法类型
const FORMATTER_TYPES = {
  LABEL_FORMATTER: 'label', // 回填值显示
  OPTION_FORMATTER: 'option', // panel选项显示

};

export default {
  isArray,
  addUrlParam,
  FORMATTER_TYPES,
};
