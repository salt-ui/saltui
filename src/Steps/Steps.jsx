/**
 * Steps Component for tingle
 * @author muwen.lb
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import Step from './Step';

const { prefixClass } = Context;

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      tailWidth: 0,
    };
    this.previousStepsWidth = 0;
    this.itemsWidth = [];
  }

  componentDidMount() {
    if (this.props.direction === 'vertical') {
      return;
    }

    const $dom = this.root;
    const len = $dom.children.length - 1;
    this.itemsWidth = new Array(len + 1);

    let i;
    for (i = 0; i <= len - 1; i++) {
      this.itemsWidth[i] = this.props.maxDescriptionWidth;
    }
    this.itemsWidth[i] = this.props.maxDescriptionWidth;
    this.previousStepsWidth = Math.floor(this.root.offsetWidth);
    this.update();

    /*
     * 把最后一个元素设置为absolute，是为了防止动态添加元素后滚动条出现导致的布局问题。
     * 未来不考虑ie8一类的浏览器后，会采用纯css来避免各种问题。
     */
    $dom.children[len].style.position = 'absolute';

    this.fixLastDetailHeight();

    /*
     * 下面的代码是为了兼容window系统下滚动条出现后会占用宽度的问题。
     * componentDidMount时滚动条还不一定出现了，这时候获取的宽度可能不是最终宽度。
     * 对于滚动条不占用宽度的浏览器，下面的代码也不二次render，resize里面会判断要不要更新。
     */
    setTimeout(() => {
      this.resize();
    });

    this.resizeBind = this.resize.bind(this);

    if (window.attachEvent) {
      window.attachEvent('onresize', this.resizeBind);
    } else {
      window.addEventListener('resize', this.resizeBind);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children.length !== this.props.children.length) {
      if (this.props.direction === 'vertical') {
        return;
      }
      const len = nextProps.children.length - 1;
      this.itemsWidth = new Array(len + 1);

      let i;
      for (i = 0; i <= len - 1; i++) {
        this.itemsWidth[i] = nextProps.maxDescriptionWidth;
      }
      this.itemsWidth[i] = nextProps.maxDescriptionWidth;
      this.update(nextProps);
    }
  }

  componentDidUpdate() {
    this.resize();
    const $dom = this.root;

    const len = $dom.children.length - 1;
    /*
     * 把最后一个元素设置为absolute，是为了防止动态添加元素后滚动条出现导致的布局问题。
     * 未来不考虑ie8一类的浏览器后，会采用纯css来避免各种问题。
     */
    for (let i = 0; i <= len; i++) {
      $dom.children[i].style.position = 'relative';
    }
    $dom.children[len].style.position = 'absolute';
    this.fixLastDetailHeight();
  }

  componentWillUnmount() {
    if (this.props.direction === 'vertical') {
      return;
    }
    if (window.attachEvent) {
      window.detachEvent('onresize', this.resizeBind);
    } else {
      window.removeEventListener('resize', this.resizeBind);
    }
  }

  resize() {
    this.fixLastDetailHeight();
    const w = Math.floor(this.root.offsetWidth);
    if (this.previousStepsWidth === w) {
      return;
    }
    this.previousStepsWidth = w;
    this.update();
  }

  fixLastDetailHeight() {
    /*
     * 把整体高度调整为适合高度,处理最后一个detail是绝对定位的问题
     * */
    const $dom = this.root;
    const len = $dom.children.length - 1;
    const $domLastDetail = $dom.children[len];
    if (this.props.currentDetail === len && $dom.offsetHeight <= $domLastDetail.offsetHeight) {
      $dom.style.height = `${$domLastDetail.offsetHeight}px`;
    } else {
      $dom.style.height = 'auto';
    }
  }

  update(props = this.props) {
    const len = props.children.length - 1;
    const tw = this.itemsWidth.reduce(
      (prev, w) =>
        prev + w
      , 0,
    );
    const dw = Math.floor((this.previousStepsWidth - tw) / len) - 1;
    if (dw <= 0) {
      return;
    }
    this.setState({
      init: true,
      tailWidth: dw,
    });
  }

  render() {
    let { current } = this.props;
    const {
      className,
      children,
      maxDescriptionWidth,
      iconPrefix,
      direction,
      showIcon,
      type,
      showDetail,
      currentDetail,
      onChange,
    } = this.props;
    const len = children.length - 1;
    const iws = this.itemsWidth;
    const clsName = classnames(prefixClass('steps'), className, {
      [prefixClass('steps-vertical')]: direction === 'vertical',
      [prefixClass(`steps-type-${type}`)]: direction !== 'vertical',
      [prefixClass('steps-noicon')]: !showIcon,
    });

    let fixStyle;
    if (direction !== 'vertical') {
      // fix #5
      if (type === 'default') {
        const descItemsCount = children.filter(d => d.props.description).length;
        if (descItemsCount > 0 && descItemsCount !== len + 1) {
          fixStyle = {
            marginTop: 70,
          };
        }
      }
    }
    if (typeof current !== 'number') {
      current = Number(current);
    }
    return (
      <div className={clsName} ref={(c) => { this.root = c; }}>
        {React.Children.map(children, (ele, idx) => {
          const np = {
            stepNumber: showIcon ? (idx + 1).toString() : '',
            stepLast: idx === len,
            tailWidth: iws.length === 0 || idx === len ? 'auto' : iws[idx] + this.state.tailWidth,
            iconPrefix,
            maxDescriptionWidth,
            fixStyle,
            showDetail: showDetail && currentDetail === idx && direction !== 'vertical' && type !== 'long-desc',
            detailContentFixStyle: {
              marginLeft: !Number.isNaN(-(iws[idx] + this.state.tailWidth) * idx)
                ? -(iws[idx] + this.state.tailWidth) * idx
                : 0,
              width: this.previousStepsWidth,
            },
            onChange,
            hasDetail: showDetail && direction !== 'vertical' && type !== 'long-desc',
          };
          if (!ele.props.status) {
            if (idx === current) {
              np.status = 'process';
            } else if (idx < current) {
              np.status = 'finish';
            } else {
              np.status = 'wait';
            }
          }
          return React.cloneElement(ele, np);
        }, this)}
      </div>
    );
  }
}

Steps.defaultProps = {
  className: '',
  iconPrefix: '',
  maxDescriptionWidth: 100,
  current: 0,
  direction: '',
  showIcon: true,
  type: 'default',
  showDetail: false,
  currentDetail: 0,
  onChange: () => {
  },
  children: [],
};

// http://facebook.github.io/react/docs/reusable-components.html
Steps.propTypes = {
  className: PropTypes.string,
  iconPrefix: PropTypes.string,
  maxDescriptionWidth: PropTypes.number,
  current: PropTypes.number,
  direction: PropTypes.string,
  showIcon: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'title-on-top', 'long-desc']),
  showDetail: PropTypes.bool,
  currentDetail: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.any,
};

Steps.displayName = 'Steps';
Steps.Step = Step;

export default Steps;
