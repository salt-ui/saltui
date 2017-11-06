/**
 * Button Component Demo for tingle
 * @author cm
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */


import 'salt-context';
import './ButtonDemo.styl';

import Demo from './ButtonDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}


// 渲染demo
export default Demo;
