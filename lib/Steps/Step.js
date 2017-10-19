'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Check = require('salt-icon/lib/Check');

var _Check2 = _interopRequireDefault(_Check);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Steps Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author muwen.lb
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var prefixClass = _Context2.default.prefixClass;

var Step = function (_React$Component) {
  _inherits(Step, _React$Component);

  function Step(props) {
    _classCallCheck(this, Step);

    var _this = _possibleConstructorReturn(this, (Step.__proto__ || Object.getPrototypeOf(Step)).call(this, props));

    _this.onIconClick = _this.onIconClick.bind(_this);
    return _this;
  }

  _createClass(Step, [{
    key: 'onIconClick',
    value: function onIconClick() {
      if (this.props.hasDetail) {
        this.props.onChange(Number(this.props.stepNumber) - 1);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var props = this.props;
      var status = props.status || 'wait';
      var maxWidth = props.maxDescriptionWidth;
      var fixStyle = props.fixStyle;
      var icon = void 0;
      var stepCls = (0, _classnames4.default)(prefixClass('steps-item steps-status-' + status), (_classnames = {}, _defineProperty(_classnames, prefixClass('steps-item-last'), props.stepLast), _defineProperty(_classnames, prefixClass('steps-custom'), props.icon), _defineProperty(_classnames, prefixClass('steps-no-desc'), !props.description), _classnames));
      var tail = void 0;
      var description = void 0;
      if (!props.icon && status !== 'process' || !props.stepLast) {
        icon = _react2.default.createElement(
          'span',
          { className: prefixClass('steps-icon') },
          props.stepNumber
        );
      } else {
        icon = _react2.default.createElement(
          'span',
          { className: prefixClass('steps-icon') },
          _react2.default.createElement(_Check2.default, { width: 20, height: 20, fill: '#FFF' })
        );
      }

      if (!props.stepLast) {
        tail = _react2.default.createElement(
          'div',
          { className: prefixClass('steps-tail') },
          _react2.default.createElement('i', null)
        );
      }
      if (props.description) {
        description = _react2.default.createElement(
          'div',
          { className: prefixClass('steps-description') },
          props.description
        );
      }

      if (fixStyle) {
        fixStyle.width = props.tailWidth;
      } else {
        fixStyle = {
          width: props.tailWidth
        };
      }

      var detailCls = (0, _classnames4.default)(prefixClass('steps-detail'), _defineProperty({}, prefixClass('steps-detail-current'), props.showDetail));
      var headStyleFixed = { cursor: props.hasDetail ? 'pointer' : 'default' };
      return _react2.default.createElement(
        'div',
        { className: stepCls, style: fixStyle },
        tail,
        _react2.default.createElement(
          'div',
          { className: prefixClass('steps-head'), style: headStyleFixed, onClick: this.onIconClick },
          _react2.default.createElement(
            'div',
            { className: prefixClass('steps-head-inner') },
            icon
          )
        ),
        _react2.default.createElement(
          'div',
          { className: prefixClass('steps-main'), style: { maxWidth: maxWidth } },
          _react2.default.createElement('div', { className: prefixClass('steps-detail-arrow'), style: { display: props.showDetail ? 'block' : 'none' } }),
          _react2.default.createElement(
            'div',
            { className: prefixClass('steps-title') },
            props.title
          ),
          _react2.default.createElement(
            'div',
            null,
            description,
            description ? _react2.default.createElement('div', { className: prefixClass('steps-description-arrow') }) : null
          )
        ),
        _react2.default.createElement(
          'div',
          { className: detailCls },
          _react2.default.createElement(
            'div',
            { className: prefixClass('steps-detail-con'), style: props.detailContentFixStyle },
            _react2.default.createElement(
              'div',
              { className: prefixClass('steps-detail-content') },
              props.children
            )
          )
        )
      );
    }
  }]);

  return Step;
}(_react2.default.Component);

Step.propTypes = {
  hasDetail: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  stepNumber: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
};
Step.defaultProps = {
  hasDetail: true,
  onChange: function onChange() {},

  stepNumber: ''
};

exports.default = Step;
module.exports = exports['default'];