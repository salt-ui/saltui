/**
 * Slot Component Demo for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import 'salt-context';

import './SlotDemo.styl';
// import Demo from './SlotDemo';
import Demo from './SlotSimpleDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}
// 渲染demo

export default Demo;
