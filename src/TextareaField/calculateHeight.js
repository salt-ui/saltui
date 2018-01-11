const HIDDEN_TEXTAREA_STYLE = [
  'height: 0',
  'visibility: hidden',
  'overflow: hidden',
  'position: absolute',
  'z-index: -1000',
  'top: 0',
  'right: 0',
];

const STYLES = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'font-family',
  'font-weight',
  'font-size',
  'text-transform',
  'width',
  'border-width',
  'box-sizing',
];

let shadowTextarea = null;

const getPrefixedStyle = (computedStyle, name) => {
  const prefix = ['-o-', '-ms-', '-moz-', '-webkit-', ''];
  let tmp;
  for (let i = prefix.length; i--;) {
    tmp = computedStyle.getPropertyValue(prefix[i] + name);
    if (tmp) {
      return tmp;
    }
  }
  return null;
};

const getStyleNumber = (computedStyle, name) => parseFloat(computedStyle.getPropertyValue(name));


function getStyleInfo(textarea) {
  const computedStyle = window.getComputedStyle(textarea);
  const boxSizing = getPrefixedStyle(computedStyle, 'box-sizing');
  let heightAdjust = 0;
  const padding = getStyleNumber(computedStyle, 'padding-top') + getStyleNumber(computedStyle, 'padding-bottom');
  const border = getStyleNumber(computedStyle, 'border-bottom-width') + getStyleNumber(computedStyle, 'border-top-width');
  if (boxSizing === 'border-box') {
    heightAdjust += border;
  } else if (boxSizing === 'content-box') {
    heightAdjust -= padding;
  }
  return {
    styles: STYLES.map(name => `${name}:${computedStyle.getPropertyValue(name)}`),
    padding,
    border,
    heightAdjust,
  };
}

/* eslint-disable no-param-reassign */
const getSingleRowHeight = (textarea) => {
  const tmp = textarea.value;
  textarea.value = 'x';
  const result = textarea.scrollHeight;
  textarea.value = tmp;
  return result;
};
/* eslint-enable no-param-reassign */

const calculateHeight = (textarea, minRows, maxRows) => {
  if (!shadowTextarea) document.body.appendChild(shadowTextarea = document.createElement('textarea'));
  const styleInfo = getStyleInfo(textarea);
  const { styles } = styleInfo;
  const {
    heightAdjust,
    padding,
  } = styleInfo;
  shadowTextarea.setAttribute('style', styles.concat(HIDDEN_TEXTAREA_STYLE).join(';'));
  shadowTextarea.value = textarea.value;
  let height = shadowTextarea.scrollHeight + heightAdjust;
  let minHeight = -Infinity;
  let maxHeight = Infinity;
  const singleRowHeight = getSingleRowHeight(shadowTextarea) - padding;
  if (minRows !== null || maxRows !== null) {
    if (minRows !== null) {
      minHeight = (singleRowHeight * minRows) + padding + heightAdjust;
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = (singleRowHeight * maxRows) + padding + heightAdjust;
      height = Math.min(maxHeight, height);
    }
  }
  return {
    rows: (height / singleRowHeight) > maxRows ? maxRows : (height / singleRowHeight),
  };
};

export default calculateHeight;
