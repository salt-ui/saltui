/**
 * NoticeBar Component Demo for SaltUI
 * @author 
 *
 * Copyright 2014-2017, SaltUI Team.
 * All rights reserved.
 */

import 'salt-context';
import './NoticeBarDemo.styl';
import Demo from './NoticeBarDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
export default Demo;
