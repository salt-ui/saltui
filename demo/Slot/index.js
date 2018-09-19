/**
 * Slot Component Demo for SaltUI
 * @author caoke.ck
 *
 * Copyright 2018-2019, SaltUI Team.
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
