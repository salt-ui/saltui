/**
 * Slot Component Demo for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import 'salt-context';

import './SkeletonDemo.styl';
import Demo from './SkeletonDemo';
// import Demo from './SkeletonSimpleDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}
// 渲染demo

export default Demo;
