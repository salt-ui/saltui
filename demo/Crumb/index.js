/**
 * Crumb Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('@ali/tingle-context');
window.FastClick && FastClick.attach(document.body);

// 插入通用svg
require('@ali/tingle-icon-source');

// 插入私有svg
var IconSymbols = require('./svg/private-symbols.svg');
ReactDOM.render(<IconSymbols/>, document.getElementById('PrivateSymbols'));

// 渲染demo
var Demo = require('./CrumbDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
