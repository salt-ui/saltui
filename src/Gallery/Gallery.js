/**
 * Gallery Component for tingle
 * @author cm
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Slide = require('../Slide');
const Context = require('../Context');

const prefixClass = function(name) {
    return Context.prefixClass ? Context.prefixClass(name) : 't-' + name
}

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images,
            displayImages: [] // 懒加载图片缓存区
        }
        this.currentIndex = this.props.active || 0;
    }

    componentDidMount() {
        this._detectLazyImages();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            images: nextProps.images
        })
    }

    _onSlideEnd(o) {
        this.currentIndex = o.index;
        this._detectLazyImages();
        this.props.onSlideEnd && this.props.onSlideEnd.call(this, o);
    }

    _detectLazyImages() {
        let currentIndex = this.currentIndex;
        let prevIndex = currentIndex > 0 ? currentIndex - 1 : this.state.images.length - 1;
        let nextIndex = currentIndex >= this.state.images.length - 1 ? 0 : currentIndex + 1;
        let {displayImages} = this.state;
        let changed = false;
        if (displayImages.indexOf(currentIndex) === -1) {
            displayImages.push(currentIndex)
            changed = true;
        }
        if (displayImages.indexOf(prevIndex) === -1) {
            displayImages.push(prevIndex)
            changed = true;
        }
        if (displayImages.indexOf(nextIndex) === -1) {
            displayImages.push(nextIndex)
            changed = true;
        }
        if (changed) {
            this.setState(displayImages);
        }
    }

    _onItemClick(o) {
        const href = this.state.images[o.index].href;
        const {onGalleryClick} = this.props;
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

    render() {
        if (!this.state.images.length) {
            return <div />;
        }

        let t = this;
        let {images, onSlideEnd, className, ...otherProps} = this.props;
        let {displayImages} = this.state;
        className = classnames({
            [this.props.className] : !!this.props.className,
            [prefixClass('gallery')]: true
        });

        return (
            <Slide ref="root" className={className}
                onSlideClick={this._onItemClick.bind(this)}
                onSlideEnd={this._onSlideEnd.bind(this)} {...otherProps}>
                {
                    this.state.images.map((item, i) => {
                        let url = this.props.lazyLoad ? '' : item.src;
                        let style = {};
                        const href = item.href;
                        if (displayImages.indexOf(i) > -1) {
                            url = item.src;
                        }
                        if (url) {
                            style = {backgroundImage:`url(${url})`}
                        }

                        return (
                            <Slide.Item className={prefixClass('gallery-item')}
                                key={i}
                                title={item.name}
                                style={style}
                            >
                                {
                                    href ?
                                        <a
                                            style={{ width: '100%', height: '100%', display: 'block' }}
                                            href={href}
                                            target={item.target || ''}
                                        >
                                            &nbsp;
                                        </a> :
                                        <div />
                                }
                            </Slide.Item>
                        )
                    })
                }
            </Slide>
        );
    }
}

Gallery.defaultProps = {
    className: '',
    images: [],
    lazyLoad: true,
    onGalleryClick: null,
}

// http://facebook.github.io/react/docs/reusable-components.html
Gallery.propTypes = {
    className: React.PropTypes.string,
    images: React.PropTypes.array,
    lazyLoad: React.PropTypes.bool,
    onGalleryClick: React.PropTypes.func
}

Gallery.displayName = 'Gallery';

module.exports = Gallery;
