/**
 * Popover Component Demo for tingle
 * @author wenzhao.fw
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

import 'salt-context';
import './PopoverDemo.styl';
import Demo from './PopoverDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
export default Demo;
