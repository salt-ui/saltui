'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * NavBar Component for tingle
 * @author ruiyang.dry
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
var classnames = require('classnames');

var Context = require('../Context');

var Icon = require('salt-icon');

var prefixClass = Context.prefixClass;

var NavBar = function (_React$Component) {
    _inherits(NavBar, _React$Component);

    function NavBar(props) {
        _classCallCheck(this, NavBar);

        var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

        _this.state = {
            isShow: _this.props.isShow
        };
        return _this;
    }

    _createClass(NavBar, [{
        key: 'handleBackClick',
        value: function handleBackClick() {
            this.props.onLeftClick();
        }
    }, {
        key: 'handleOptionClick',
        value: function handleOptionClick() {
            this.props.onRightClick();
        }
    }, {
        key: 'handleCloseView',
        value: function handleCloseView() {
            this.props.closeViewClick();
        }
    }, {
        key: 'render',
        value: function render() {
            var t = this;
            return React.createElement(
                'div',
                { ref: 'root', className: classnames(prefixClass('nav-bar'), _defineProperty({}, t.props.className, !!t.props.className)) },
                React.createElement(
                    'div',
                    { className: prefixClass('nav-bar-left FAL') },
                    React.createElement(
                        'div',
                        { className: prefixClass("nav-bar-left-option"), onClick: this.handleBackClick.bind(this) },
                        React.createElement(Icon, { className: prefixClass("nav-bar-arrow-left"), name: 'angle-left' }),
                        React.createElement(
                            'span',
                            null,
                            '\u8FD4\u56DE'
                        )
                    ),
                    this.state.isShow ? React.createElement(
                        'span',
                        { className: prefixClass("nav-bar-close"),
                            onClick: this.handleCloseView.bind(this) },
                        '\u5173\u95ED'
                    ) : null
                ),
                React.createElement(
                    'div',
                    { className: prefixClass('nav-bar-center nav-bar-center-text omit3 FAC') },
                    this.props.title
                ),
                React.createElement(
                    'div',
                    { className: prefixClass('nav-bar-right FAR'), onClick: this.handleOptionClick.bind(this) },
                    React.createElement(
                        'span',
                        { className: prefixClass("nav-bar-right-text") },
                        this.props.rightText
                    )
                )
            );
        }
    }]);

    return NavBar;
}(React.Component);

NavBar.defaultProps = {
    className: '',
    title: '',
    rightText: '更多',
    isShow: true,
    onLeftClick: function onLeftClick() {},
    onRightClick: function onRightClick() {},
    closeViewClick: function closeViewClick() {}
};

// http://facebook.github.io/react/docs/reusable-components.html
NavBar.propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    rightText: React.PropTypes.string,
    onLeftClick: React.PropTypes.func,
    onRightClick: React.PropTypes.func,
    closeViewClick: React.PropTypes.func,
    isShow: React.PropTypes.bool
};

NavBar.displayName = 'NavBar';

module.exports = NavBar;