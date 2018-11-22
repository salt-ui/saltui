/**
 * DataView Component Demo for SaltUI
 * @author shuaige
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
const React = window.React;
const ReactDOM = window.ReactDOM;
import 'salt-context';
import './DataViewDemo.styl';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
import Demo from './DataViewDemo';

export default Demo;
