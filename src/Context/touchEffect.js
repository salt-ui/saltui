/**
 * Tingle Context
 * The environment for tingle's initialization
 * @author yize
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

import env from './env';

const { TOUCH_START, TOUCH_END, TOUCH_CANCEL } = env;

class TouchEffect {
  /**
     *
     * @param layer
     * @param options
     */
  constructor(layer, options) {
    const t = this;
    t.layer = layer;
    t.options = options || {
      selector: 'tTE', // abbr. tTouchEffect
      activeClass: 'hover',
    };
    t.selector = t.options.selector;
    t.activeClass = t.options.activeClass;
    t.initEvent();
  }

  initEvent() {
    const t = this;
    const { layer } = t;

    layer.addEventListener(TOUCH_START, t.onTouchStart.bind(t), false);
    layer.addEventListener(TOUCH_END, t.onTouchEnd.bind(t), false);
    layer.addEventListener(TOUCH_CANCEL, t.onTouchEnd.bind(t), false);
  }

  onTouchStart(event) {
    const t = this;
    let { target } = event;

    while (target && target.classList && !target.classList.contains(t.selector)) {
      target = target.parentNode;
    }

    if (target && target.classList && target.classList.contains(t.selector)) {
      target.classList.add(t.activeClass);
    }
  }

  onTouchEnd(event) {
    const t = this;
    let { target } = event;

    while (target && target.classList && !target.classList.contains(t.selector)) {
      target = target.parentNode;
    }

    if (target && target.classList && target.classList.contains(t.selector)) {
      target.classList.remove(t.activeClass);
    }
  }

  destroy() {
    const t = this;
    const { layer } = t;
    layer.removeEventListener(TOUCH_START, t.onTouchStart.bind(t), false);
    layer.removeEventListener(TOUCH_END, t.onTouchEnd.bind(t), false);
    layer.removeEventListener(TOUCH_CANCEL, t.onTouchEnd.bind(t), false);
  }
}

TouchEffect.attach = (layer, options) => new TouchEffect(layer, options);

export default TouchEffect;

