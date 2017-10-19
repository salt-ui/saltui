"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Tingle Context
 * The environment for tingle's initialization
 * @author yize
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

var env = require('./env');
var TOUCH_START = env.TOUCH_START,
    TOUCH_END = env.TOUCH_END,
    TOUCH_CANCEL = env.TOUCH_CANCEL;

var TouchEffect = function () {
    /**
     *
     * @param layer
     * @param options
     */
    function TouchEffect(layer, options) {
        _classCallCheck(this, TouchEffect);

        var t = this;
        t.layer = layer;
        t.options = options || {
            selector: "tTE", // abbr. tTouchEffect
            activeClass: "hover"
        };
        t.selector = t.options.selector;
        t.activeClass = t.options.activeClass;
        t.initEvent();
    }

    _createClass(TouchEffect, [{
        key: "initEvent",
        value: function initEvent() {
            var t = this;
            var layer = t.layer;

            layer.addEventListener(TOUCH_START, t.onTouchStart.bind(t), false);
            layer.addEventListener(TOUCH_END, t.onTouchEnd.bind(t), false);
            layer.addEventListener(TOUCH_CANCEL, t.onTouchEnd.bind(t), false);
        }
    }, {
        key: "onTouchStart",
        value: function onTouchStart(event) {

            var t = this;
            var target = event.target;

            while (target && target.classList && !target.classList.contains(t.selector)) {
                target = target.parentNode;
            }

            if (target && target.classList && target.classList.contains(t.selector)) {
                target.classList.add(t.activeClass);
            }
        }
    }, {
        key: "onTouchEnd",
        value: function onTouchEnd(event) {

            var t = this;
            var target = event.target;

            while (target && target.classList && !target.classList.contains(t.selector)) {
                target = target.parentNode;
            }

            if (target && target.classList && target.classList.contains(t.selector)) {
                target.classList.remove(t.activeClass);
            }
        }
    }, {
        key: "destroy",
        value: function destroy() {
            var t = this;
            var layer = t.layer;
            layer.removeEventListener(TOUCH_START, t.onTouchStart.bind(t), false);
            layer.removeEventListener(TOUCH_END, t.onTouchEnd.bind(t), false);
            layer.removeEventListener(TOUCH_CANCEL, t.onTouchEnd.bind(t), false);
        }
    }]);

    return TouchEffect;
}();

TouchEffect.attach = function (layer, options) {
    return new TouchEffect(layer, options);
};

module.exports = TouchEffect;