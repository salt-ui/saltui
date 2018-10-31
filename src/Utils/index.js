/**
 * Utils for SaltUI
 * @author eternalsky
 *
 * Copyright 2014-2018, XUX Team.
 * All rights reserved.
 */

import contains from 'rc-util/lib/Dom/contains';
import isEuqal from 'lodash/isEqual';

const preventDefault = (e) => {
  e.preventDefault();
};

const stopBodyScrolling = (bool) => {
  if (bool === true) {
    document.body.addEventListener('touchmove', preventDefault, { capture: false, passive: false });
  } else {
    document.body.removeEventListener('touchmove', preventDefault, { capture: false, passive: false });
  }
};

const stopBodyScroll = (element) => {
  const pd = (e) => {
    const ele = typeof element === 'function' ? element() : element;
    if (!ele || !contains(ele, e.target)) {
      e.preventDefault();
    }
  };
  document.body.addEventListener('touchmove', pd, { capture: false, passive: false });
  // TODO how to stop body scroll when element is scrolled to the end?
  // const sp = (e) => {
  //   e.stopPropagation();
  // };
  // if (element) {
  //   element.addEventListener('touchmove', sp, false);
  // }
  return {
    enable: () => {
      document.body.removeEventListener('touchmove', pd, { capture: false, passive: false });
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

export {
  stopBodyScrolling,
  getLocale,
  stopBodyScroll,
  shouldUpdate,
};

