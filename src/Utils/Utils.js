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

export default {
  stopBodyScrolling,
};
