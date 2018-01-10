const getData = (response) => {
  let data = {};
  if (response.content) {
    if (response.content.data) {
      ({ data } = response.content);
    } else {
      data = response.content;
    }
  } else if (response.data) {
    ({ data } = response);
  } else {
    data = typeof response === 'object' ? response : {};
  }
  return data;
};

const normalizeLocale = (locale) => {
  const newLocale = locale.toLowerCase();
  if (newLocale.indexOf('-') !== -1) {
    return newLocale;
  } else if (newLocale.indexOf('_') !== -1) {
    return newLocale.split('_').join('-');
  } else if (newLocale) {
    let normalizedLocale;
    const locales = ['zh-cn', 'en-us'];
    for (let i = 0; i < locales.length; i++) {
      const item = locales[i];
      if (item.indexOf(newLocale) !== -1) {
        normalizedLocale = item;
        break;
      }
    }
    return normalizedLocale;
  }
  return undefined;
};

export default {
  getData,
  normalizeLocale,
};
