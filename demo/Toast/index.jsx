/**
 * Toast Component Demo for tingle
 * @author minjie
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import 'salt-context';
import './ToastDemo.styl';


import Demo from './ToastDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

export default Demo;
