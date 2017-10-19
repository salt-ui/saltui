'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var classnames = require('classnames');
var Context = require('../Context');

var CrumbItem = function (_React$Component) {
    _inherits(CrumbItem, _React$Component);

    function CrumbItem() {
        _classCallCheck(this, CrumbItem);

        return _possibleConstructorReturn(this, (CrumbItem.__proto__ || Object.getPrototypeOf(CrumbItem)).apply(this, arguments));
    }

    _createClass(CrumbItem, [{
        key: 'handleClick',
        value: function handleClick() {
            var t = this;
            if (!t.props.disabled) {
                t.props.onClick();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classnames;

            var t = this;
            var classNames = classnames(Context.prefixClass('crumb-item'), (_classnames = {}, _defineProperty(_classnames, t.props.className, !!t.props.className), _defineProperty(_classnames, 'disabled', t.props.disabled), _classnames));
            return React.createElement(
                'span',
                {
                    className: classNames,
                    onClick: t.props.onClick.bind(t)
                },
                t.props.children
            );
        }
    }]);

    return CrumbItem;
}(React.Component);

CrumbItem.defaultProps = {
    disabled: false,
    onClick: function onClick() {}
};

CrumbItem.propTypes = {
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func
};

CrumbItem.displayName = 'CrumbItem';

module.exports = CrumbItem;