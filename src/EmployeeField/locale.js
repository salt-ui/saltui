const locale = {
  'zh-cn': {
    ok: '确定',
    corpIdRequired: 'corpId 不能为空',
    getTotalText(total) {
      return `共${total}人`;
    },
    onlyForDd: '非钉钉内仅支持查看。 ',
  },
  'en-us': {
    ok: 'OK',
    corpIdRequired: 'corpId is required',
    getTotalText(total) {
      return `Total ${total}`;
    },
    onlyForDd: 'Read only when not in Dingtalk. ',
  },
};

export default locale;
