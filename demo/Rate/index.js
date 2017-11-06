/**
 * Rate Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import 'salt-context';
import './RateDemo.styl';
import Demo from './RateDemo';

if (window.FastClick) {
  FastClick.attach(document.body);
}

// 渲染demo
export default Demo;
