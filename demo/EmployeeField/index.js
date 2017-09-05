/**
 * EmployeeField Component Demo for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */
import ReactDOM from 'react-dom';
import '@ali/tingle-context';
import Demo from './EmployeeFieldDemo';

window.FastClick && FastClick.attach(document.body);

// 渲染demo
ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
