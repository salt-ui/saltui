/**
 * Datetime Component Demo for SaltUI
 * @author quanyun.mqy
 *
 * Copyright 2014-2017, SaltUI Team.
 * All rights reserved.
 */

import 'salt-context';
import './DatetimeDemo.styl';
import Demo from './DatetimeDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
export default Demo;
