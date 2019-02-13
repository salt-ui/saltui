/**
 * Card Component Demo for SaltUI
 * @author shixin
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
const React = window.React;
const ReactDOM = window.ReactDOM;
import 'salt-context';
import './CardDemo.styl';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
import Demo from './CardDemo';

export default Demo;
