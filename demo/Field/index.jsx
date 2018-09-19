/**
 * Field Component Demo for SaltUI
 * @author jiasong.js
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import 'salt-context';
import './FieldDemo.styl';


import Demo from './FieldDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
export default Demo;
