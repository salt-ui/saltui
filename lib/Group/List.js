'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Group.List Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */
var React = require('react');
var classnames = require('classnames');
var Context = require('../Context');

var _require = require('../Style'),
    createStyleContext = _require.createStyleContext,
    unitize = _require.unitize;

var isEmptyValue = function isEmptyValue(v) {
    return v === null || v === undefined || v === '';
};

var prefixClass = Context.prefixClass;
var style = createStyleContext(prefixClass('group-list'));

var List = function (_React$Component) {
    _inherits(List, _React$Component);

    function List(props) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

        var t = _this;
        t._lineIndentClassName = [];
        t._itemIndentClassName = [];

        props.lineIndent && t.addIndent('Line');
        props.itemIndent && t.addIndent('Item');
        return _this;
    }

    // 由props属性转换成css样式规则 并插入到页面


    _createClass(List, [{
        key: 'addIndent',
        value: function addIndent(type) {
            var t = this;
            var indentArray = [].concat(t.props[type.toLowerCase() + 'Indent']);

            var className = [];
            className.push(t['make' + type + 'IndentClassName']('left', unitize(indentArray[0])));
            className.push(t['make' + type + 'IndentClassName']('right', unitize(indentArray[1])));

            t['_' + type + 'IndentClassName'] = className.join(' ');
        }

        /**
         * 生成间隔线缩进对应的`classClass`值和`CSS`样式
         * @param side {String} Left|Right
         * @param value {String} `CSS`样式的长度值
         * @returns {String} 生成的`className`字符串
         */

    }, {
        key: 'makeLineIndentClassName',
        value: function makeLineIndentClassName(side, value) {
            if (!value) {
                return;
            }
            var t = this;
            var lowerSide = side.toLowerCase();
            var indent = side + '-' + value;
            style.add('line-indent-' + indent, '\n            .' + prefixClass('group-list') + '.line-indent-' + indent + ' .' + prefixClass('group-list-item') + ':after{\n                ' + lowerSide + ': ' + value + '\n            }\n        ');
            return 'line-indent-' + indent;
        }

        /**
         * 生成Item缩进对应的`classClass`值和`CSS`样式
         * @param side {String} Left|Right
         * @param value {String} `CSS`样式的长度值
         * @returns {String} 生成的`className`字符串
         */

    }, {
        key: 'makeItemIndentClassName',
        value: function makeItemIndentClassName(side, value) {
            if (!value) {
                return;
            }
            var t = this;
            var lowerSide = side.toLowerCase();
            var indent = side + '-' + value;
            style.add('item-indent-' + indent, '\n            .' + prefixClass('group-list') + '.item-indent-' + indent + ' .' + prefixClass('group-list-item') + '{\n                padding-' + lowerSide + ': ' + value + '\n            }\n        ');
            return 'item-indent-' + indent;
        }
    }, {
        key: 'render',
        value: function render() {
            var _classnames;

            var t = this;
            return React.createElement(
                'div',
                { className: classnames(prefixClass('group-list'), (_classnames = {}, _defineProperty(_classnames, t.props.className, !!t.props.className), _defineProperty(_classnames, t._LineIndentClassName, !!t._LineIndentClassName), _defineProperty(_classnames, t._ItemIndentClassName, !!t._ItemIndentClassName), _defineProperty(_classnames, prefixClass('BT1'), !t.props.borderTopNone), _classnames)) },
                React.Children.map(t.props.children, function (Item) {
                    // 需要过滤掉空值的item
                    return !isEmptyValue(Item) ? React.createElement(
                        'div',
                        { className: prefixClass('group-list-item') },
                        Item
                    ) : null;
                })
            );
        }
    }]);

    return List;
}(React.Component);

List.displayName = 'Group.List';

var indentType = React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string, React.PropTypes.array]);

List.propTypes = {
    className: React.PropTypes.string,
    lineIndent: indentType,
    itemIndent: indentType,
    borderTopNone: React.PropTypes.bool
};

List.defaultProps = {
    borderTopNone: false
};

module.exports = List;