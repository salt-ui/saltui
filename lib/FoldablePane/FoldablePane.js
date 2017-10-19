'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames5 = require('classnames');

var _classnames6 = _interopRequireDefault(_classnames5);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _DirectionBottom = require('salt-icon/lib/DirectionBottom');

var _DirectionBottom2 = _interopRequireDefault(_DirectionBottom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * FoldablePane Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingnan.yqn
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2017, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var FoldablePane = function (_React$Component) {
  _inherits(FoldablePane, _React$Component);

  function FoldablePane(props) {
    _classCallCheck(this, FoldablePane);

    var _this = _possibleConstructorReturn(this, (FoldablePane.__proto__ || Object.getPrototypeOf(FoldablePane)).call(this, props));

    _this.shell = null;
    _this.state = {
      // 折叠状态
      fold: !!props.isFold,
      // 高度是否达到可以折叠
      foldable: false
    };

    _this.events = {
      changeFoldState: _this.changeFoldState.bind(_this)
    };
    return _this;
  }

  _createClass(FoldablePane, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkFoldable();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isFold !== this.state.fold) {
        this.setState({
          fold: nextProps.isFold
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.checkFoldable();
    }
  }, {
    key: 'checkFoldable',
    value: function checkFoldable() {
      if (this.innerBoxHeight !== undefined && this.innerBoxHeight === this.innerBox.clientHeight && this.foldHeight === this.props.foldHeight) {
        return;
      }
      this.innerBoxHeight = this.innerBox.clientHeight;
      this.foldHeight = this.props.foldHeight;
      var foldable = this.innerBoxHeight > this.props.foldHeight;
      this.setState({
        foldable: foldable
      });

      //  增加时延，等待 setState 处理完毕之后再算内部内容的高度
      // setTimeout(() => {
      //   if (t.shell && window.getComputedStyle) {
      //     const { height } = window.getComputedStyle(t.shell);
      //     const heightVal = +height.split('px')[0];
      //     foldable = heightVal >= t.props.foldHeight;
      //   }
      //   if (foldable !== t.state.foldable) {
      //     t.setState({ foldable });
      //   }
      // }, 10);
    }
  }, {
    key: 'changeFoldState',
    value: function changeFoldState() {
      if (this.props.onFold) {
        this.props.onFold.call(this, !this.state.fold);
      }
      this.setState({
        fold: !this.state.fold
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this,
          _classnames3;

      var foldablePaneFold = _Context2.default.prefixClass('foldable-pane-fold');
      var foldablePaneTrigger = _Context2.default.prefixClass('foldable-pane-trigger-fold');
      var limitStyle = this.state.fold ? { maxHeight: this.props.foldHeight + 'px' } : {};
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames6.default)(_Context2.default.prefixClass('foldable-pane'), _defineProperty({}, this.props.className, !!this.props.className))
        },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(shell) {
              _this2.shell = shell;
            },
            className: (0, _classnames6.default)(_Context2.default.prefixClass('foldable-pane-container'), _defineProperty({}, foldablePaneFold, this.state.fold)),
            style: limitStyle
          },
          _react2.default.createElement(
            'div',
            {
              className: _Context2.default.prefixClass('foldable-pane-inner'),
              ref: function ref(c) {
                _this2.innerBox = c;
              }
            },
            this.props.children
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames6.default)(_Context2.default.prefixClass('foldable-pane-trigger'), (_classnames3 = {}, _defineProperty(_classnames3, foldablePaneTrigger, this.state.fold), _defineProperty(_classnames3, _Context2.default.prefixClass('hide'), !this.state.foldable), _classnames3)),
            onClick: this.events.changeFoldState
          },
          _react2.default.createElement(_DirectionBottom2.default, {
            className: (0, _classnames6.default)(_Context2.default.prefixClass('foldable-pane-trigger-icon'), _defineProperty({}, _Context2.default.prefixClass('foldable-pane-trigger-icon-reverse'), !this.state.fold)),
            fill: '',
            width: 16,
            height: 16
          })
        )
      );
    }
  }]);

  return FoldablePane;
}(_react2.default.Component);

FoldablePane.propTypes = {
  className: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node,
  foldHeight: _react2.default.PropTypes.number,
  isFold: _react2.default.PropTypes.bool,
  onFold: _react2.default.PropTypes.func
};
FoldablePane.defaultProps = {
  foldHeight: 240
};
FoldablePane.displayName = 'FoldablePane';
exports.default = FoldablePane;
module.exports = exports['default'];