import Context from '@ali/tingle-context';

const prefixClass = name => (Context.prefixClass ? Context.prefixClass(name) : `t-${name}`);

export default {
  prefixClass,
};
