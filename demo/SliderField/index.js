import 'salt-context';

import Demo from './SliderFieldDemo';
import './SliderFieldDemo.styl';

// 渲染 demo
if (window.FastClick) {
  window.FastClick.attach(document.body);
}

export default Demo;
