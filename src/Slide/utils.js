const Context = require('../Context');

export const prefixClass = (name) => {
  if (Context.prefixClass) {
    return Context.prefixClass(name);
  }
  return `t-${name}`;
};

export default {
  prefixClass,
};
