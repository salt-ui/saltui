'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IS_TOUCH = window !== undefined && ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);

var Drag = function () {
  function Drag(element) {
    _classCallCheck(this, Drag);

    this.el = element;
    this.startPos = {};
    this.endPos = {};
    this.starts = [];
    this.drags = [];
    this.ends = [];
    if (IS_TOUCH) {
      this.el.addEventListener('touchstart', this, false);
    } else {
      this.el.addEventListener('mousedown', this, false);
    }
  }

  _createClass(Drag, [{
    key: 'handleEvent',
    value: function handleEvent(event) {
      switch (event.type) {
        case 'touchstart':
          this.touchStart(event);
          break;
        case 'touchmove':
          this.touchMove(event);
          break;
        case 'touchcancel':
        case 'touchend':
          this.touchEnd(event);
          break;
        case 'mousedown':
          this.mouseStart(event);
          break;
        case 'mousemove':
          this.mouseMove(event);
          break;
        case 'mouseleave':
        case 'mouseup':
          this.mouseEnd(event);
          break;
        default:
          break;
      }
    }
  }, {
    key: 'touchStart',
    value: function touchStart(event) {
      var _this = this;

      var touch = event.touches[0];
      this.startPos = { // 取第一个touch的坐标值
        x: touch.pageX,
        y: touch.pageY,
        time: new Date().getTime()
      };
      this.endPos = {};
      this.el.addEventListener('touchmove', this, false);
      this.el.addEventListener('touchend', this, false);
      this.starts.map(function (func) {
        return func.call(_this, _this.startPos, event);
      });
    }
  }, {
    key: 'touchMove',
    value: function touchMove(event) {
      var _this2 = this;

      if (event.touches.length > 1 || event.scale && event.scale !== 1) return;

      var touch = event.touches[0];
      this.endPos = {
        x: touch.pageX - this.startPos.x,
        y: touch.pageY - this.startPos.y,
        time: new Date().getTime() - this.startPos.time
      };
      this.drags.map(function (func) {
        return func.call(_this2, _this2.endPos, event);
      });
    }
  }, {
    key: 'touchEnd',
    value: function touchEnd(event) {
      var _this3 = this;

      this.endPos.time = new Date().getTime() - this.startPos.time;

      this.el.removeEventListener('touchmove', this, false);
      this.el.removeEventListener('touchend', this, false);
      this.ends.map(function (func) {
        return func.call(_this3, _this3.endPos, event);
      });
    }
  }, {
    key: 'mouseStart',
    value: function mouseStart(event) {
      var _this4 = this;

      this.startPos = {
        x: event.clientX,
        y: event.clientY,
        time: new Date().getTime()
      };
      this.endPos = {};
      this.el.addEventListener('mousemove', this, false);
      this.el.addEventListener('mouseup', this, false);
      this.starts.map(function (func) {
        return func.call(_this4, _this4.startPos, event);
      });
    }
  }, {
    key: 'mouseMove',
    value: function mouseMove(event) {
      var _this5 = this;

      this.endPos = {
        x: event.clientX - this.startPos.x,
        y: event.clientY - this.startPos.y
      };

      this.drags.map(function (func) {
        return func.call(_this5, _this5.endPos, event);
      });
    }
  }, {
    key: 'mouseEnd',
    value: function mouseEnd(event) {
      var _this6 = this;

      this.el.removeEventListener('mousemove', this, false);
      this.el.removeEventListener('mouseup', this, false);

      this.endPos.time = new Date().getTime() - this.startPos.time;

      this.ends.map(function (func) {
        return func.call(_this6, _this6.endPos, event);
      });
    }
  }, {
    key: 'start',
    value: function start(fun) {
      this.starts.push(fun);
      return this;
    }
  }, {
    key: 'end',
    value: function end(fun) {
      this.ends.push(fun);
      return this;
    }
  }, {
    key: 'drag',
    value: function drag(fun) {
      this.drags.push(fun);
      return this;
    }
  }, {
    key: 'reset',
    value: function reset(event) {
      var touch = event.touches ? event.touches[0] : {};
      this.startPos = { // 取第一个touch的坐标值
        x: touch.pageX || event.clientX,
        y: touch.pageY || event.clientY,
        time: new Date().getTime()
      };
      this.endPos = {
        x: 0,
        y: 0
      };
    }
  }, {
    key: 'destory',
    value: function destory() {
      if (IS_TOUCH) {
        this.el.removeEventListener('touchstart', this, false);
      } else {
        this.el.removeEventListener('mousedown', this, false);
      }
    }
  }]);

  return Drag;
}();

exports.default = Drag;
module.exports = exports['default'];