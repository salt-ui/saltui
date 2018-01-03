'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Popup = require('../Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _SharePanel = require('./SharePanel');

var _SharePanel2 = _interopRequireDefault(_SharePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ActionSheet Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ActionSheet = function (_React$Component) {
  _inherits(ActionSheet, _React$Component);

  function ActionSheet() {
    _classCallCheck(this, ActionSheet);

    return _possibleConstructorReturn(this, (ActionSheet.__proto__ || Object.getPrototypeOf(ActionSheet)).apply(this, arguments));
  }

  _createClass(ActionSheet, [{
    key: 'render',
    value: function render() {
      var t = this;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames3.default)(_Context2.default.prefixClass('action-sheet'), _defineProperty({}, t.props.className, !!t.props.className))
        },
        'Test Component for Tingle!'
      );
    }
  }]);

  return ActionSheet;
}(_react2.default.Component);

ActionSheet.propTypes = {
  className: _react2.default.PropTypes.string
};
ActionSheet.defaultProps = {
  className: ''
};
ActionSheet.displayName = 'ActionSheet';


var createActionSheet = function createActionSheet(type, options, callback) {
  var maskClosable = options.maskClosable;


  var panelMap = {
    NORMAL: _Panel2.default,
    SHARE: _SharePanel2.default
  };

  var TruePanel = panelMap[type];
  var handleItemClick = function handleItemClick(index, rowIndex) {
    var res = callback(index, rowIndex);
    if (res && res.then) {
      res.then(function () {
        _Popup2.default.hide();
      });
    } else {
      _Popup2.default.hide();
    }
  };
  var content = _react2.default.createElement(TruePanel, _extends({}, options, { onItemClick: handleItemClick }));
  _Popup2.default.show(content, {
    maskClosable: maskClosable
  });
};

ActionSheet.show = function (options, callback) {
  createActionSheet('NORMAL', options, callback);
};

ActionSheet.showShare = function (options, callback) {
  createActionSheet('SHARE', options, callback);
};

exports.default = ActionSheet;
module.exports = exports['default'];