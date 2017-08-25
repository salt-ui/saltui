/**
 * css util for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 *
 * Usage:
 *     const {createStyleContext} = require('tingle-style');
 *     let componentStyle = createStyleContext('tGroupList');
 *
 *     // 添加样式
 *     componentStyle.add(`
 *         body{
 *             background-color: red;
 *         }
 *     `);
 *
 *     // 添加带有标识的样式，这样可以优化去重
 *     componentStyle.add('redBG', `
 *         body{
 *             background-color: red;
 *         }
 *     `);
 */
const doc = document;


/**
 * 可使用`JS`动态插入样式的类
 */
class StyleContext {
  /**
   * 构造函数
   * @param id {String} required 用于创建`style`元素的`id`标识，建议使用`componentName`作为`id`的值，避免全局冲突
   */
  constructor(id) {
    const t = this;
    t.id = id;
    t.rules = [];
    t.createStyleEl();
  }

  createStyleEl() {
    const t = this;
    const el = doc.createElement('style');
    el.id = `${t.id}-style`;
    el.setAttribute('type', 'text/css');
    const headEl = doc.getElementsByTagName('head')[0];
    headEl.appendChild(el);
    t.el = el;
  }

  addRule(rule) {
    this.el.appendChild(doc.createTextNode(rule));
  }

  /**
   * 外部接口 添加新的样式规则
   */
  add(ruleId, rule) {
    const t = this;
    if (rule === undefined) {
      rule = ruleId;
      t.addRule(t.clearRuleIndent(rule));
    } else if (ruleId && t.rules.indexOf(ruleId) === -1) {
      t.rules.push(ruleId);
      t.addRule(`/* ${ruleId} */\n${t.clearRuleIndent(rule)}`);
    }
  }

  /**
   * 删除多余的缩进 更方便阅读
   */
  clearRuleIndent(rule) {
    // 为了取出正确的首行缩进数量 需要去掉第一行的换行
    rule = rule.replace(/^\n/, '');
    const whiteSpaceLength = rule.match(/^\s*/)[0].length;
    const firstLineIndentRegExp = new RegExp(`^\\s{${whiteSpaceLength}}`);
    const otherLinesIndentResExp = new RegExp(`\\n\\s{${whiteSpaceLength}}`, 'mg');
    // console.log(rule.match(otherLinesIndentResExp));
    // 删除多余的缩进
    rule = rule.replace(firstLineIndentRegExp, '').replace(otherLinesIndentResExp, '\n');

    return rule;
  }
}

// 创建一个Component的样式上下文
const existedInstances = {};
const createStyleContext = (contextId) => {
  if (!contextId) {
    console.error('The param(`contextId`) is required for `createStyleContext`(tingle-style/util.js) method. ');
    return;
  }
  return existedInstances[contextId] || (existedInstances[contextId] = new StyleContext(contextId));
};

/**
 * 添加长度单位，默认单位是`px`
 * @param any {Number|String|*}
 * @returns {Number|String} 返回Number时一定是0 否则返回的都是带有单位的长度字符串值
 * @demo
 *      unitize(10)     // 10px
 *      unitize('10px') // 10px
 *      unitize('1rem') // 1rem
 *      unitize()       // 0
 */
const unitize = (any) => {
  let ret;
  if (typeof any === 'number') {
    ret = `${any}px`;
  } else if (typeof any === 'string') {
    if (any.match(/^\d+$/)) {
      ret = `${any}px`;
    } else {
      ret = any;
    }
  } else {
    ret = 0;
  }
  return ret;
};

export default {
  createStyleContext,
  unitize,
};
