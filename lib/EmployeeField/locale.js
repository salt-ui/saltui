'use strict';

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

module.exports = locale;