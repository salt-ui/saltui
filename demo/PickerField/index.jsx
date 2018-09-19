/* global window, FastClick */

/**
 * PickerField Component Demo for SaltUI
 * @author longyan
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import 'salt-context';
import './PickerFieldDemo.styl';
import Demo from './PickerFieldDemo';

const React = window.React;
const ReactDOM = window.ReactDOM;

if (window.FastClick) {
  FastClick.attach(document.body);
}

export default Demo;
