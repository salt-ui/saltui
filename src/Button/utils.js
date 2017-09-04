import Context from '../Context';

const prefixClass = name => (Context.prefixClass ? Context.prefixClass(name) : `t-${name}`);

export default {
  prefixClass,
};
