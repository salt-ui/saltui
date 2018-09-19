/**
 * Style Component Demo for SaltUI
 * @author guanghong.wsj
 *
 * Copyright 2014-2017, SaltUI Team.
 * All rights reserved.
 */


import 'salt-context';
import './StyleDemo.styl';
// import Demo from './StyleDemo';
// import Demo from './Reset';
// import Demo from './Flexbox';
import Demo from './VarsDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
export default Demo;
