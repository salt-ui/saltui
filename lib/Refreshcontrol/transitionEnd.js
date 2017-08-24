export default function transitionEnd(el, fun) {
  const arr = [
    'msTransitionEnd',
    'mozTransitionEnd',
    'oTransitionEnd',
    'webkitTransitionEnd',
    'transitionend',
  ];

  const handler = {
    handleEvent(...args) {
      arr.forEach((eventName) => {
        el.removeEventListener(eventName, handler, false);
      });
      fun.apply(el, args);
    },
  };
  arr.forEach((eventName) => {
    el.addEventListener(eventName, handler, false);
  });
}
