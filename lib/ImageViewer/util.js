// 参考：https://github.com/xiangpaopao/blog/issues/8
// innerHeight, innerHeight havs the best compability
const getHeight = ele => ele.getBoundingClientRect().height;

const isXiaomi = () => {
  if (navigator) {
    return /xiaomi/i.test(navigator.userAgent);
  }
  return false;
};

export default {
  getHeight,
  isXiaomi,
};

