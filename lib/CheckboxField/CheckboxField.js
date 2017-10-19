'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * CheckboxField Component for tingle
 * @author shanchao
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var React = require('react');
var classnames = require('classnames');
var Icon = require('salt-icon');
var Context = require('../Context');
var Group = require('../Group');
var Field = require('../Field');
var SelectLayer = require('./SelectLayer');
var prefixClass = Context.prefixClass;

var CheckboxField = function (_React$Component) {
    _inherits(CheckboxField, _React$Component);

    function CheckboxField(props) {
        _classCallCheck(this, CheckboxField);

        var _this = _possibleConstructorReturn(this, (CheckboxField.__proto__ || Object.getPrototypeOf(CheckboxField)).call(this, props));

        var t = _this;
        t.state = {
            selectedText: ''
        };
        return _this;
    }

    _createClass(CheckboxField, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.getSelectedText(nextProps.data);
        }
    }, {
        key: 'getSelectedText',
        value: function getSelectedText(data) {
            var _this2 = this;

            var selectedText = '';
            data.forEach(function (item) {
                if (item.checked) {
                    if (_this2.props.mode === 'list') {
                        selectedText = selectedText + _this2.props.titleBreakStr + item.text;
                    } else {
                        selectedText = selectedText + _this2.props.titleBreakStr + (item.slotText ? item.slotText : item.text);
                    }
                }
            });

            if (selectedText) {
                selectedText = selectedText.substring(this.props.titleBreakStr.length);
            }

            this.state.selectedText = selectedText;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getSelectedText(this.props.data);
        }
    }, {
        key: 'getData',
        value: function getData() {
            var t = this;
            var data = [];

            t.props.data.forEach(function (item) {
                if (item.checked) {
                    data.push(item);
                }
            });

            return data;
        }
    }, {
        key: 'clickAction',
        value: function clickAction(value, item, index, data) {
            var t = this;
            var onChange = t.props.onChange;

            var disable = item.disable;
            if (t.props.readOnly || disable) {
                return;
            }
            item.checked = !item.checked;
            onChange && onChange(t.getData());
            t.forceUpdate();
        }
    }, {
        key: 'renderIcon',
        value: function renderIcon(checked, disable, position) {
            var iconClassName = classnames(prefixClass('checkbox-field-icon'), _defineProperty({
                checked: checked,
                'un-checked': !checked,
                disable: disable
            }, prefixClass('checkbox-field-icon') + '-list', true));
            return React.createElement(
                'div',
                { className: classnames(prefixClass("checkbox-field-icon-wrapper FBH FBAC"), _defineProperty({}, position, !!position)) },
                checked ? React.createElement(Icon, {
                    key: 'check-round',
                    width: 26,
                    height: 26,
                    name: 'check-round',
                    className: iconClassName
                }) : React.createElement('div', { className: iconClassName })
            );
        }
    }, {
        key: 'renderList',
        value: function renderList() {
            var _classnames3;

            var t = this;
            var props = t.props;
            var className = props.className,
                checkboxArray = props.data,
                groupListArgument = props.groupListArgument,
                groupListFlag = props.groupListFlag,
                label = props.label,
                iconPosition = props.iconPosition;

            var requiredTag = React.createElement(Icon, {
                name: 'field-required',
                className: prefixClass('field-layout-label-required'),
                width: 6,
                height: 6,
                fill: 'red'
            });

            var checkboxArrayComponent = checkboxArray.map(function (item, index, data) {
                var checked = item.checked,
                    disable = item.disable,
                    value = item.value;

                var finalItemJSX = React.createElement(
                    'div',
                    {
                        onClick: t.clickAction.bind(t, value, item, index, checkboxArray),
                        key: index,
                        className: classnames(prefixClass("checkbox-field-row FBAC FBH"), {
                            disable: disable
                        })
                    },
                    iconPosition === 'left' && t.renderIcon(checked, disable),
                    React.createElement(
                        'div',
                        {
                            ref: "content" + index,
                            className: classnames(prefixClass("checkbox-field-content FB1"), { disable: disable })
                        },
                        item.content || item.text
                    ),
                    iconPosition === 'right' && t.renderIcon(checked, disable, 'right'),
                    disable && React.createElement('div', { className: prefixClass('checkbox-field-disable-mask') })
                );
                return finalItemJSX;
            });

            var finalJSX = React.createElement(
                Group,
                { className: classnames(prefixClass('checkbox-field'), (_classnames3 = {}, _defineProperty(_classnames3, className, !!className), _defineProperty(_classnames3, prefixClass('checkbox-field-readonly'), t.props.readOnly), _classnames3)) },
                label == '' ? null : React.createElement(
                    Group.Head,
                    { className: classnames(prefixClass('checkbox-field-label')) },
                    label,
                    this.props.required && requiredTag
                ),
                React.createElement(
                    Group.List,
                    groupListArgument,
                    checkboxArrayComponent
                )
            );

            if (!groupListFlag) {
                var _classnames4;

                finalJSX = React.createElement(
                    'div',
                    { ref: 'root', className: classnames(prefixClass('checkbox-field'), (_classnames4 = {}, _defineProperty(_classnames4, className, !!className), _defineProperty(_classnames4, prefixClass('checkbox-field-readonly'), t.props.readOnly), _classnames4)) },
                    checkboxArrayComponent
                );
            }
            return finalJSX;
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            !this.props.readOnly && this.refs.slot.show();
        }
    }, {
        key: 'handleCancel',
        value: function handleCancel() {}
    }, {
        key: 'handleConfirm',
        value: function handleConfirm(data) {
            this.state.value = data;
            this.getSelectedText(data);
            this.setState(this.state);
            this.props.onChange(data);
        }
    }, {
        key: 'renderSlot',
        value: function renderSlot() {
            var _classnames5;

            var t = this;
            return React.createElement(
                Field,
                _extends({}, t.props, {
                    icon: {
                        className: classnames(prefixClass('checkbox-field-icon'), (_classnames5 = {}, _defineProperty(_classnames5, prefixClass("checkbox-field-icon") + '-slot', true), _defineProperty(_classnames5, prefixClass('hide'), t.props.readOnly), _classnames5)),
                        name: 'angle-right',
                        width: 24,
                        height: 24,
                        onClick: t.handleClick.bind(t)
                    },
                    className: classnames(prefixClass('checkbox-field'), _defineProperty({}, t.props.className, !!t.props.className)) }),
                React.createElement(
                    'div',
                    { onClick: t.handleClick.bind(t), className: prefixClass('checkbox-field-value-wrap') },
                    t.state.selectedText ? React.createElement(
                        'div',
                        { className: classnames(prefixClass('checkbox-field-value-list'), _defineProperty({}, prefixClass('checkbox-field-slot-mode-readonly'), t.props.readOnly)) },
                        t.state.selectedText
                    ) : React.createElement(
                        'div',
                        { className: prefixClass('omit checkbox-field-placeholder') },
                        t.props.placeholder
                    )
                ),
                React.createElement(SelectLayer, {
                    ref: 'slot',
                    title: t.props.label,
                    confirmText: t.props.confirmText,
                    cancelText: t.props.cancelText,
                    data: t.props.data,
                    value: t.state.value,
                    maskCloseable: t.props.maskCloseable,
                    iconPosition: t.props.iconPosition,
                    onCancel: t.handleCancel.bind(t),
                    onConfirm: t.handleConfirm.bind(t) })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.mode === 'list' ? this.renderList() : this.renderSlot();
        }
    }]);

    return CheckboxField;
}(React.Component);

CheckboxField.defaultProps = {
    mode: 'slot', // slot, list
    readOnly: false,
    label: '',
    titleBreakStr: '，',
    data: [],
    onChange: function onChange() {},
    placeholder: '',
    maskCloseable: true,
    groupListFlag: true,
    groupListArgument: {
        lineIndent: 0,
        itemIndent: 16
    },
    required: false,
    iconPosition: 'left'
};

// http://facebook.github.io/react/docs/reusable-components.html
CheckboxField.propTypes = {
    className: React.PropTypes.string,
    mode: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    label: React.PropTypes.string,
    titleBreakStr: React.PropTypes.string,
    data: React.PropTypes.array,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    maskCloseable: React.PropTypes.bool,
    groupListFlag: React.PropTypes.bool,
    groupListArgument: React.PropTypes.object,
    required: React.PropTypes.bool,
    iconPosition: React.PropTypes.string
};

CheckboxField.displayName = 'CheckboxField';

module.exports = CheckboxField;