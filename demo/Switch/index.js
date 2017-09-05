/**
 * Switch Component Demo for tingle
 * @author ruiyang.dry
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('@ali/tingle-context');
// 插入svg
var IconSymbols = require('./svg/tingle-icon-symbols.svg');
ReactDOM.render(<IconSymbols/>, document.getElementById('TingleIconSymbols'));

// 渲染demo
var Demo = require('./SwitchDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
