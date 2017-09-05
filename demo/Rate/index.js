/**
 * Rate Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import '@ali/tingle-context';
import '@ali/tingle-icon-source';
import Demo from './RateDemo';

if (window.FastClick) {
    FastClick.attach(document.body);
}

// ReactDOM.render(<IconSymbols/>, document.getElementById('TingleIconSymbols'));

// 渲染demo
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
