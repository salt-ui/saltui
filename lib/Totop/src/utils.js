const setWindowScrollY = (scrollY) => {
  if (window) {
    window.scrollTo(0, scrollY);
  }
};


const getWindowScrollY = () => {
  if (window.pageYOffset) { // expect IE 6/7/8
    return window.pageYOffset;
  } else if (document.documentElement.scrollTop) { // IE6/7/8 non-quirks mode
    return document.documentElement.scrollTop;
  } else if (document.body.scrolltop) { // IE6/7/8 quirks mode
    return document.body.scrolltop;
  }
  return 0;
};

export default {
  setWindowScrollY,
  getWindowScrollY,
};
