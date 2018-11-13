/**
 * Field Component Demo for SaltUI
 * @author jiasong.js
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import 'salt-context';
import './FilterDemo.styl';


import Demo from './FilterDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
export default Demo;
