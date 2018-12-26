/**
 * TextareaField Component Demo for SaltUI
 * @author zhangshun@alipay.com
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import 'salt-context';
import './TextareaDemo.styl';


import Demo from './TextareaDemo';

if (window.FastClick) {
  window.FastClick.attach(document.body);
}

// 渲染demo
export default Demo;
