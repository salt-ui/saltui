/**
 * Field Component Demo for tingle
 * @author jiasong.js
 *
 * Copyright 2014-2016, Tingle Team.
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
