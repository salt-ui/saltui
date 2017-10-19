'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var HIDDEN_TEXTAREA_STYLE = ['height: 0', 'visibility: hidden', 'overflow: hidden', 'position: absolute', 'z-index: -1000', 'top: 0', 'right: 0'];

var STYLES = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right', 'font-family', 'font-weight', 'font-size', 'text-transform', 'width', 'border-width', 'box-sizing'];

var shadowTextarea = null;

var getPrefixedStyle = function getPrefixedStyle(computedStyle, name) {
  var prefix = ['-o-', '-ms-', '-moz-', '-webkit-', ''];
  var tmp = void 0;
  for (var i = prefix.length; i--;) {
    tmp = computedStyle.getPropertyValue(prefix[i] + name);
    if (tmp) {
      return tmp;
    }
  }
  return null;
};

var getStyleNumber = function getStyleNumber(computedStyle, name) {
  return parseFloat(computedStyle.getPropertyValue(name));
};

function getStyleInfo(textarea) {
  var computedStyle = window.getComputedStyle(textarea);
  var boxSizing = getPrefixedStyle(computedStyle, 'box-sizing');
  var heightAdjust = 0;
  var padding = getStyleNumber(computedStyle, 'padding-top') + getStyleNumber(computedStyle, 'padding-bottom');
  var border = getStyleNumber(computedStyle, 'border-bottom-width') + getStyleNumber(computedStyle, 'border-top-width');
  if (boxSizing === 'border-box') {
    heightAdjust += border;
  } else if (boxSizing === 'content-box') {
    heightAdjust -= padding;
  }
  return {
    styles: STYLES.map(function (name) {
      return name + ':' + computedStyle.getPropertyValue(name);
    }),
    padding: padding,
    border: border,
    heightAdjust: heightAdjust
  };
}

/* eslint-disable no-param-reassign */
var getSingleRowHeight = function getSingleRowHeight(textarea) {
  var tmp = textarea.value;
  textarea.value = 'x';
  var result = textarea.scrollHeight;
  textarea.value = tmp;
  return result;
};
/* eslint-enable no-param-reassign */

var calculateHeight = function calculateHeight(textarea, minRows, maxRows) {
  if (!shadowTextarea) document.body.appendChild(shadowTextarea = document.createElement('textarea'));
  var styleInfo = getStyleInfo(textarea);
  var styles = styleInfo.styles;
  var heightAdjust = styleInfo.heightAdjust,
      padding = styleInfo.padding;

  shadowTextarea.setAttribute('style', styles.concat(HIDDEN_TEXTAREA_STYLE).join(';'));
  shadowTextarea.value = textarea.value;
  var height = shadowTextarea.scrollHeight + heightAdjust;
  var minHeight = -Infinity;
  var maxHeight = Infinity;
  var singleRowHeight = getSingleRowHeight(shadowTextarea) - padding;
  if (minRows !== null || maxRows !== null) {
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows + padding + heightAdjust;
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows + padding + heightAdjust;
      height = Math.min(maxHeight, height);
    }
  }
  return {
    rows: height / singleRowHeight > maxRows ? maxRows : height / singleRowHeight
  };
};

exports.default = calculateHeight;
module.exports = exports['default'];