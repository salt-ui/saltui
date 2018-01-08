'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _saltIcon = require('salt-icon');

var _saltIcon2 = _interopRequireDefault(_saltIcon);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

var _Layer = require('../Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Scroller = require('../Scroller');

var _Scroller2 = _interopRequireDefault(_Scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var prefixClass = _Context2.default.prefixClass;

var SelectLayer = function (_React$Component) {
    _inherits(SelectLayer, _React$Component);

    function SelectLayer(props) {
        _classCallCheck(this, SelectLayer);

        var _this = _possibleConstructorReturn(this, (SelectLayer.__proto__ || Object.getPrototypeOf(SelectLayer)).call(this, props));

        var t = _this;

        // 初始状态
        t.state = {
            visible: false
        };
        return _this;
    }

    _createClass(SelectLayer, [{
        key: 'retain',
        value: function retain() {
            var _this2 = this;

            this.checks = [];
            this.props.data.forEach(function (item) {
                _this2.checks.push(item.checked);
            });
        }
    }, {
        key: 'reset',
        value: function reset() {
            var _this3 = this;

            this.props.data.forEach(function (item, i) {
                item.checked = _this3.checks[i];
            });
        }
    }, {
        key: 'show',
        value: function show() {
            var t = this;

            t.retain();
            t.setState({
                visible: true
            }, function () {});
        }
    }, {
        key: 'hide',
        value: function hide() {
            var t = this;

            t.setState({
                visible: false
            }, function () {});
        }
    }, {
        key: 'handleCancel',
        value: function handleCancel() {
            var t = this;
            try {
                t.props.onCancel();
            } finally {
                t.reset();
                t.hide();
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(item) {
            if (item.disable) {
                return;
            }
            item.checked = !item.checked;
            this.setState(this.state);
        }
    }, {
        key: 'getData',
        value: function getData() {
            var t = this;
            var data = [];

            this.props.data.forEach(function (item) {
                if (item.checked) {
                    data.push(item);
                }
            });
            return data;
        }
    }, {
        key: 'handleConfirm',
        value: function handleConfirm() {
            var t = this;
            try {
                t.props.onConfirm(t.getData());
            } finally {
                t.hide();
            }
        }
    }, {
        key: 'renderIcon',
        value: function renderIcon(checked, disable, position) {
            var iconClassName = (0, _classnames4.default)(prefixClass("checkbox-field-icon"), {
                "checked": checked,
                "un-checked": !checked,
                "disable": disable
            });
            return checked ? _react2.default.createElement(_saltIcon2.default, {
                key: 'check-round',
                width: 26,
                height: 26,
                name: 'check-round',
                className: iconClassName
            }) : _react2.default.createElement('div', { className: iconClassName });
        }
    }, {
        key: 'render',
        value: function render() {
            var t = this;
            var _t$props = t.props,
                className = _t$props.className,
                maskCloseable = _t$props.maskCloseable,
                cancelText = _t$props.cancelText,
                confirmText = _t$props.confirmText,
                iconPosition = _t$props.iconPosition;


            return _react2.default.createElement(
                _Layer2.default,
                {
                    visible: t.state.visible,
                    bottom: 0,
                    onMaskClick: maskCloseable ? t.handleCancel.bind(t) : function () {
                        return maskCloseable;
                    }
                },
                _react2.default.createElement(
                    'div',
                    {
                        ref: 'root',
                        className: (0, _classnames4.default)(prefixClass('select-layer'), _defineProperty({}, className, !!className))
                    },
                    _react2.default.createElement(
                        'div',
                        { className: prefixClass('select-layer-header FBH FBAC') },
                        _react2.default.createElement(
                            'div',
                            {
                                className: prefixClass('select-layer-cancel'),
                                onClick: t.handleCancel.bind(t)
                            },
                            cancelText
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: prefixClass('FB1 FAC select-layer-title') },
                            t.props.title
                        ),
                        _react2.default.createElement(
                            'div',
                            {
                                className: (0, _classnames4.default)(prefixClass('select-layer-confirm')),
                                onClick: t.handleConfirm.bind(t)
                            },
                            confirmText
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: prefixClass('select-layer-body FBH FC9 PR') },
                        _react2.default.createElement(
                            _Scroller2.default,
                            {
                                ref: 'scroller',
                                key: 'scroller',
                                click: true,
                                className: prefixClass('FB1'),
                                autoRefresh: true,
                                tap: 'iscroll:tap' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'select-list' },
                                t.props.data.map(function (m, i) {
                                    return _react2.default.createElement(
                                        'li',
                                        {
                                            key: 'item' + i,
                                            onClick: t.handleClick.bind(t, m),
                                            className: (0, _classnames4.default)(prefixClass('FBH'), {
                                                'select-layer-item': true,
                                                disable: m.disable
                                            })
                                        },
                                        iconPosition === 'left' && t.renderIcon(m.checked, m.disable),
                                        _react2.default.createElement(
                                            'div',
                                            { className: (0, _classnames4.default)(prefixClass('FB1'), _defineProperty({}, 'item-content', true)) },
                                            m.content || m.text
                                        ),
                                        iconPosition === 'right' && t.renderIcon(m.checked, m.disable, 'right'),
                                        m.disable && _react2.default.createElement('div', { className: prefixClass('checkbox-field-disable-mask') })
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SelectLayer;
}(_react2.default.Component);

SelectLayer.defaultProps = {
    title: '',
    value: [],
    maskCloseable: true,
    data: [],
    className: '',
    confirmText: '完成',
    cancelText: '取消',
    iconPosition: 'left',
    onConfirm: function onConfirm() {},
    onCancel: function onCancel() {}
};

// http://facebook.github.io/react/docs/reusable-components.html
SelectLayer.propTypes = {
    className: _propTypes2.default.string,
    title: _propTypes2.default.string,
    data: _propTypes2.default.array.isRequired,
    value: _propTypes2.default.array,
    maskCloseable: _propTypes2.default.bool,
    confirmText: _propTypes2.default.string,
    cancelText: _propTypes2.default.string,
    iconPosition: _propTypes2.default.string,
    onConfirm: _propTypes2.default.func,
    onCancel: _propTypes2.default.func
};

SelectLayer.displayName = 'SelectLayer';

exports.default = SelectLayer;
module.exports = exports['default'];