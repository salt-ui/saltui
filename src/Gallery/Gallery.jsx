/**
 * Gallery Component for tingle
 * @author cm
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Slide from '../Slide';
import Context from '../Context';

const prefixClass = name => (Context.prefixClass ? Context.prefixClass(name) : `t-${name}`);

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images,
      displayImages: [], // 懒加载图片缓存区
    };
    this.currentIndex = this.props.active || 0;
  }

  componentDidMount() {
    this._detectLazyImages();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      images: nextProps.images,
    });
  }

  _onSlideEnd(o) {
    this.currentIndex = o.index;
    this._detectLazyImages();
    if (this.props.onSlideEnd) {
      this.props.onSlideEnd.call(this, o);
    }
  }

  _detectLazyImages() {
    const { currentIndex } = this;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.state.images.length - 1;
    const nextIndex = currentIndex >= this.state.images.length - 1 ? 0 : currentIndex + 1;
    const { displayImages } = this.state;
    let changed = false;
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
      // slide 无法 re-render，会造成之前的移位被重置
      this.setState({ displayImages });
    }
  }

  _onItemClick(o) {
    const { href } = this.state.images[o.index];
    const { onGalleryClick } = this.props;
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
    const {
      images, onSlideEnd, ...otherProps
    } = this.props;
    let { className } = this.props;
    const { displayImages } = this.state;
    className = classnames({
      [this.props.className]: !!this.props.className,
      [prefixClass('gallery')]: true,
    });

    return (
      <Slide
        ref={(c) => { this.root = c; }}
        className={className}
        onSlideClick={this._onItemClick.bind(this)}
        onSlideEnd={this._onSlideEnd.bind(this)}
        {...otherProps}
      >
        {
          this.state.images.map((item, i) => {
            let url = this.props.lazyLoad ? '' : item.src;
            let style = {};
            const { href } = item;
            if (displayImages.indexOf(i) > -1) {
              url = item.src;
            }
            if (url) {
              style = { backgroundImage: `url(${url})` };
            }
            /* eslint-disable react/no-array-index-key */
            return (
              <Slide.Item
                className={prefixClass('gallery-item')}
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
            );
            /* eslint-enable react/no-array-index-key */
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
  active: undefined,
  onSlideEnd: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
Gallery.propTypes = {
  className: PropTypes.string,
  images: PropTypes.array,
  lazyLoad: PropTypes.bool,
  onGalleryClick: PropTypes.func,
  active: PropTypes.any,
  onSlideEnd: PropTypes.any,
};

Gallery.displayName = 'Gallery';

export default Gallery;
