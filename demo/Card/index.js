/**
 * Card Component Demo for tingle
 * @author caiyongmin
 *
 * Copyright 2014-2016, Tingle Team.
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
