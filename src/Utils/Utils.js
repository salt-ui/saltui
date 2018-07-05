import contains from 'rc-util/lib/Dom/contains';
import isEuqal from 'lodash/isEqual';

const preventDefault = (e) => {
  e.preventDefault();
};

const stopBodyScrolling = (bool) => {
  if (bool === true) {
    document.body.addEventListener('touchmove', preventDefault, false);
  } else {
    document.body.removeEventListener('touchmove', preventDefault, false);
  }
};

const stopBodyScroll = (element) => {
  const pd = (e) => {
    if (!element || !contains(element, e.target)) {
      e.preventDefault();
    }
  };
  document.body.addEventListener('touchmove', pd, false);
  // TODO how to stop body scroll when element is scrolled to the end?
  // const sp = (e) => {
  //   e.stopPropagation();
  // };
  // if (element) {
  //   element.addEventListener('touchmove', sp, false);
  // }
  return {
    enable: () => {
      document.body.removeEventListener('touchmove', pd, false);
      // if (element) {
      //   element.removeEventListener('touchmove', sp, false);
      // }
    },
  };
};

// uniform locale for en-us, en_US
const getLocale = (locale) => {
  if (typeof locale === 'string') {
    const spliter = locale.match(/[-_]/) ? locale.match(/[-_]/)[0] : '';
    if (!spliter) {
      return locale;
    }
    return locale.toLowerCase().split(spliter).join('-');
  }
  return locale;
};

const shouldUpdate = (prevProps, nextProps, keys = []) => {
  let update = false;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    update = !isEuqal(prevProps[key], nextProps[key]);
    if (update) break;
  }
  return update;
};

export default {
  stopBodyScrolling,
  getLocale,
  stopBodyScroll,
  shouldUpdate,
};
