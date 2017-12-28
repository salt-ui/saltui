'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var locale = {
  'zh-cn': {
    ok: '确定',
    corpIdRequired: 'corpId 不能为空',
    getTotalText: function getTotalText(total) {
      return '\u5171' + total + '\u4EBA';
    }
  },
  'en-us': {
    ok: 'OK',
    corpIdRequired: 'corpId is required',
    getTotalText: function getTotalText(total) {
      return 'Total ' + total;
    }
  }
};

exports.default = locale;
module.exports = exports['default'];