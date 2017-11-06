/**
 * Calendar2 Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2017, Tingle Team.
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
