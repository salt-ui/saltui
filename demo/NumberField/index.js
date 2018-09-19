/**
 * NumberField Component Demo for SaltUI
 * @author 
 *
 * Copyright 2014-2017, SaltUI Team.
 * All rights reserved.
 */

import 'salt-context';
import './NumberFieldDemo.styl';
import Demo from './NumberFieldDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
export default Demo;
