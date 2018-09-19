/**
 * Rate Component Demo for SaltUI
 * @author quanyun.mqy
 *
 * Copyright 2018-2019, SaltUI Team.
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
