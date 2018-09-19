/**
 * Toast Component Demo for SaltUI
 * @author minjie
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import 'salt-context';
import './ToastDemo.styl';


import Demo from './ToastDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

export default Demo;
