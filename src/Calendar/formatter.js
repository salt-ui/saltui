import util from './util';

function isDataObject(date) {
  return Object.prototype.toString.call(date) === '[object Date]';
}

function DateFormatter(originalDate, pattern) {
  if (util.isNil(originalDate)) {
    return originalDate;
  }
  let date;
  if (isDataObject(originalDate)) {
    date = originalDate;
  } else if (/^\d*$/.test(originalDate)) {
    date = new Date(parseInt(originalDate, 10));
  } else {
    date = new Date(originalDate);
  }
  if (isDataObject(date)) {
    if (Number.isNaN(date.getTime())) {
      // invalid
      console.warn('Formatter: invalid date');
      return '';
    }
    let actualPattern = pattern || 'YYYY-MM-DD';
    const o = {
      'M+': date.getMonth() + 1, // 月份
      'D+': date.getDate(), // 日
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'Q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/i.test(actualPattern)) {
      actualPattern = actualPattern.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    Object.keys(o).forEach((k) => {
      if (new RegExp(`(${k})`).test(actualPattern)) {
        actualPattern = actualPattern.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
      }
    });
    return actualPattern;
  }
  return '';
}

export default DateFormatter;
