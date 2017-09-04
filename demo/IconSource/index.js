/**
 * IconSource Component Demo for tingle
 * @author fushan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('salt-context');
window.FastClick && FastClick.attach(document.body);

const IconSource = require('salt-icon-source');
// const IconSource = require('../../dist');

// 渲染demo
const Demo = require('./IconSourceDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
