const Context = require('@ali/tingle-context');

export const prefixClass = (name) => {
  if (Context.prefixClass) {
    return Context.prefixClass(name);
  }
  return `t-${name}`;
};

export default {
  prefixClass,
};
