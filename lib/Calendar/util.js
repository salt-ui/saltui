'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

var _locale = require('./locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isSameDay(day1, day2) {
  return this.isNil(day1) && this.isNil(day2) || parseInt(day1, 10) === parseInt(day2, 10) || (0, _formatter2.default)(day1, 'YYYY-MM-DD') === (0, _formatter2.default)(day2, 'YYYY-MM-DD');
  // 可以不使用formatter的方式来判断两天是否相等
  // todo...
}

// 是否在指定的时间内（含起止时间）
// 参数格式均为时间戳
function isInRange(startDate, endDate, targetDate) {
  return targetDate > startDate && targetDate < endDate || targetDate === startDate || targetDate === endDate;
}

function isNil(value) {
  return value === null || value === undefined || isNaN(value) && typeof value === 'number';
}

// 渲染特殊的工作日或休息日，比如国家因节假日而进行的调休
// 传入的dayMap的格式为：{
//    '2017-01-02': 'work',
//    '2017-01-03': 'leave',
// }
function generateSpecialWorkdayOrHolidayRender(dayMap) {
  var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zh-cn';

  return function (data, locale, current) {
    var currentDate = (0, _formatter2.default)(new Date(current), 'YYYY-MM-DD');
    var type = data[currentDate];
    if (type) {
      if (type === 'work') {
        return React.createElement(
          'span',
          { className: 'workday-label' },
          _locale2.default[locale] && _locale2.default[locale].workday
        );
      }
      return React.createElement(
        'span',
        { className: 'holiday-label' },
        _locale2.default[locale] && _locale2.default[locale].holiday
      );
    }
    return null;
  }.bind(null, dayMap, lang);
}

// 对系统的判断来自：https://github.com/madrobby/zepto/blob/master/src/detect.js
function isIos() {
  var ua = navigator.userAgent;
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  var os = {};
  if (iphone && !ipod) {
    os.ios = os.iphone = true;
    os.version = iphone[2].replace(/_/g, '.');
  }
  if (ipad) {
    os.ios = os.ipad = true;
    os.version = ipad[2].replace(/_/g, '.');
  }
  if (ipod) {
    os.ios = os.ipod = true;
    os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
  }
  return os.ios;
}

function addUrlParam(name, value) {
  var currentUrl = location.href;
  var reg = void 0;
  if (/\?/g.test(currentUrl)) {
    reg = new RegExp(name + '=[-\\w]{4,25}', 'g');
    if (reg.test(currentUrl)) {
      currentUrl = currentUrl.replace(reg, name + '=' + value);
    } else {
      currentUrl += '&' + name + '=' + value;
    }
  } else {
    currentUrl += '?' + name + '=' + value;
  }
  return currentUrl;
}

exports.default = {
  isSameDay: isSameDay,
  isInRange: isInRange,
  isNil: isNil,
  generateSpecialWorkdayOrHolidayRender: generateSpecialWorkdayOrHolidayRender,
  isIos: isIos,
  addUrlParam: addUrlParam
};
module.exports = exports['default'];