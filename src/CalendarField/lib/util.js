

const defaultFormatter = {
  y: 'YYYY',
  m: 'YYYY-MM',
  d: 'YYYY-MM-DD',
};

const Locale = {
  cn: 'zh-cn',
  en: 'en-us',
};

// 以下方法，只做简单判断

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isString(str) {
  return typeof str === 'string';
}

function isNumber(str) {
  return /^\d*$/.test(str);
}

function isStringOrNumber(str) {
  return isString(str) || isNumber(str);
}


function getTimestamp(date) {
  let dateObj = new Date(date);
  if (isNumber(date)) {
    dateObj = new Date(parseInt(date, 10));
  }
  return Number.isNaN(dateObj.getTime()) ? undefined : dateObj.getTime();
}

export {
  defaultFormatter,
  Locale,
  isObject,
  isString,
  isNumber,
  isStringOrNumber,
  getTimestamp,
};
