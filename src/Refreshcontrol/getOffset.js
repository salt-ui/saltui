export default function getOffset(el) {
  const box = el.getBoundingClientRect();
  const { body } = document;
  const clientTop = el.clientTop || body.clientTop || 0;
  const clientLeft = el.clientLeft || body.clientLeft || 0;
  const scrollTop = window.pageYOffset || el.scrollTop;
  const scrollLeft = window.pageXOffset || el.scrollLeft;

  return {
    top: (box.top + scrollTop) - clientTop,
    left: (box.left + scrollLeft) - clientLeft,
  };
}
