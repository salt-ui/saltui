/**
 * Button Component Demo for tingle
 * @author cm
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */


import 'salt-context';
import './DrawerDemo.styl';

import Demo from './DrawerDemo';
// import Demo from './DrawerDockDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}


// 渲染demo
export default Demo;
