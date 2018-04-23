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

export default {
  stopBodyScrolling,
  getLocale,
};
