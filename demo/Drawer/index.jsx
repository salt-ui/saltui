/**
 * Button Component Demo for SaltUI
 * @author cm
 *
 * Copyright 2018-2019, SaltUI Team.
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
