/**
 * Calendar2 Component Demo for SaltUI
 * @author quanyun.mqy
 *
 * Copyright 2014-2017, SaltUI Team.
 * All rights reserved.
 */

import 'salt-context';
import './CalendarDemo.styl';
import Demo from './CalendarDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
export default Demo;
