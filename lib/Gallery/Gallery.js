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

var _Slide = require('../Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _Context = require('../Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Gallery Component for tingle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author cm
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-2016, Tingle Team.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var prefixClass = function prefixClass(name) {
    return _Context2.default.prefixClass ? _Context2.default.prefixClass(name) : 't-' + name;
};

var Gallery = function (_React$Component) {
    _inherits(Gallery, _React$Component);

    function Gallery(props) {
        _classCallCheck(this, Gallery);

        var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

        _this.state = {
            images: _this.props.images,
            displayImages: [] // 懒加载图片缓存区
        };
        _this.currentIndex = _this.props.active || 0;
        return _this;
    }

    _createClass(Gallery, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._detectLazyImages();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                images: nextProps.images
            });
        }
    }, {
        key: '_onSlideEnd',
        value: function _onSlideEnd(o) {
            this.currentIndex = o.index;
            this._detectLazyImages();
            this.props.onSlideEnd && this.props.onSlideEnd.call(this, o);
        }
    }, {
        key: '_detectLazyImages',
        value: function _detectLazyImages() {
            var currentIndex = this.currentIndex;
            var prevIndex = currentIndex > 0 ? currentIndex - 1 : this.state.images.length - 1;
            var nextIndex = currentIndex >= this.state.images.length - 1 ? 0 : currentIndex + 1;
            var displayImages = this.state.displayImages;

            var changed = false;
            if (displayImages.indexOf(currentIndex) === -1) {
                displayImages.push(currentIndex);
                changed = true;
            }
            if (displayImages.indexOf(prevIndex) === -1) {
                displayImages.push(prevIndex);
                changed = true;
            }
            if (displayImages.indexOf(nextIndex) === -1) {
                displayImages.push(nextIndex);
                changed = true;
            }
            if (changed) {
                this.setState(displayImages);
            }
        }
    }, {
        key: '_onItemClick',
        value: function _onItemClick(o) {
            var href = this.state.images[o.index].href;
            var onGalleryClick = this.props.onGalleryClick;

            if (onGalleryClick) {
                onGalleryClick(o.index, this.state.images[o.index]);
            } else if (href) {
                window.location.href = href;
            }
        }

        /*
         lazy load 策略
         加载当前显示图片的前一个跟后一个
         // 获取前一个 index
         // 获取后一个 index
         // 如果存在不曾加载的图片，就 changeState
         */

    }, {
        key: 'render',
        value: function render() {
            var _classnames,
                _this2 = this;

            if (!this.state.images.length) {
                return _react2.default.createElement('div', null);
            }

            var t = this;

            var _props = this.props,
                images = _props.images,
                onSlideEnd = _props.onSlideEnd,
                className = _props.className,
                otherProps = _objectWithoutProperties(_props, ['images', 'onSlideEnd', 'className']);

            var displayImages = this.state.displayImages;

            className = (0, _classnames3.default)((_classnames = {}, _defineProperty(_classnames, this.props.className, !!this.props.className), _defineProperty(_classnames, prefixClass('gallery'), true), _classnames));

            return _react2.default.createElement(
                _Slide2.default,
                _extends({ ref: 'root', className: className,
                    onSlideClick: this._onItemClick.bind(this),
                    onSlideEnd: this._onSlideEnd.bind(this) }, otherProps),
                this.state.images.map(function (item, i) {
                    var url = _this2.props.lazyLoad ? '' : item.src;
                    var style = {};
                    var href = item.href;
                    if (displayImages.indexOf(i) > -1) {
                        url = item.src;
                    }
                    if (url) {
                        style = { backgroundImage: 'url(' + url + ')' };
                    }

                    return _react2.default.createElement(
                        _Slide2.default.Item,
                        { className: prefixClass('gallery-item'),
                            key: i,
                            title: item.name,
                            style: style
                        },
                        href ? _react2.default.createElement(
                            'a',
                            {
                                style: { width: '100%', height: '100%', display: 'block' },
                                href: href,
                                target: item.target || ''
                            },
                            '\xA0'
                        ) : _react2.default.createElement('div', null)
                    );
                })
            );
        }
    }]);

    return Gallery;
}(_react2.default.Component);

Gallery.defaultProps = {
    className: '',
    images: [],
    lazyLoad: true,
    onGalleryClick: null

    // http://facebook.github.io/react/docs/reusable-components.html
};Gallery.propTypes = {
    className: _react2.default.PropTypes.string,
    images: _react2.default.PropTypes.array,
    lazyLoad: _react2.default.PropTypes.bool,
    onGalleryClick: _react2.default.PropTypes.func
};

Gallery.displayName = 'Gallery';

exports.default = Gallery;
module.exports = exports['default'];