/**
 * Slide Component Demo for tingle
 * @author cm
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */
import 'salt-context';

import Demo from './SlideDemo';
import './SlideDemo.styl';

// 渲染 demo
if (window.FastClick) {
  window.FastClick.attach(document.body);
}

export default Demo;
