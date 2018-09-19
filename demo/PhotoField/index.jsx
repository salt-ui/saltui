/**
 * PhotoField Component Demo for SaltUI
 * @author
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import 'salt-context';
import './PhotoFieldDemo.styl';


if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
import Demo from './PhotoFieldDemo';

export default Demo;
