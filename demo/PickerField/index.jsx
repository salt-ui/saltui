/* global window, FastClick */

/**
 * PickerField Component Demo for tingle
 * @author longyan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import '@ali/tingle-context';
import Demo from './PickerFieldDemo';

const React = window.React;
const ReactDOM = window.ReactDOM;

if (window.FastClick) {
  FastClick.attach(document.body);
}

ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
