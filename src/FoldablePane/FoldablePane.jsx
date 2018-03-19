/**
 * FoldablePane Component for tingle
 * @author qingnan.yqn
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import DirectionBottomIcon from 'salt-icon/lib/DirectionBottom';
import classnames from 'classnames';
import Context from '../Context';

class FoldablePane extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    foldHeight: PropTypes.number,
    isFold: PropTypes.bool,
    onFold: PropTypes.func,
  };

  static defaultProps = {
    foldHeight: 240,
    className: undefined,
    children: undefined,
    isFold: undefined,
    onFold: undefined,
  };

  static displayName = 'FoldablePane';

  constructor(props) {
    super(props);

    this.shell = null;
    this.state = {
      // 折叠状态
      fold: !!props.isFold,
      // 高度是否达到可以折叠
      foldable: false,
    };

    this.events = {
      changeFoldState: this.changeFoldState.bind(this),
    };
  }

  componentDidMount() {
    this.checkFoldable();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFold !== this.state.fold) {
      this.setState({
        fold: nextProps.isFold,
      });
    }
  }


  componentDidUpdate() {
    this.checkFoldable();
  }

  checkFoldable() {
    if (this.innerBoxHeight !== undefined
      && (this.innerBoxHeight === this.innerBox.clientHeight)
      && (this.foldHeight === this.props.foldHeight)) {
      return;
    }
    this.innerBoxHeight = this.innerBox.clientHeight;
    this.foldHeight = this.props.foldHeight;
    const foldable = this.innerBoxHeight > this.props.foldHeight;
    this.setState({
      foldable,
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

  changeFoldState() {
    if (this.props.onFold) {
      this.props.onFold.call(this, !this.state.fold);
    }
    this.setState({
      fold: !this.state.fold,
    });
  }


  render() {
    const foldablePaneFold = Context.prefixClass('foldable-pane-fold');
    const foldablePaneTrigger = Context.prefixClass('foldable-pane-trigger-fold');
    const limitStyle = this.state.fold ? { maxHeight: `${this.props.foldHeight}px` } : {};
    return (
      <div
        className={classnames(Context.prefixClass('foldable-pane'), {
          [this.props.className]: !!this.props.className,
        })}
      >
        <div
          ref={(shell) => { this.shell = shell; }}
          className={classnames(Context.prefixClass('foldable-pane-container'), {
            [foldablePaneFold]: this.state.fold,
          })}
          style={limitStyle}
        >
          <div
            className={Context.prefixClass('foldable-pane-inner')}
            ref={(c) => { this.innerBox = c; }}
          >
            {this.props.children}
          </div>
        </div>
        <div
          className={classnames(Context.prefixClass('foldable-pane-trigger'), {
            [foldablePaneTrigger]: this.state.fold,
            [Context.prefixClass('hide')]: !this.state.foldable,
          })}
          onClick={this.events.changeFoldState}
        >
          <DirectionBottomIcon
            className={
              classnames(Context.prefixClass('foldable-pane-trigger-icon'), {
                [Context.prefixClass('foldable-pane-trigger-icon-reverse')]: !this.state.fold,
              })
            }
            fill=""
            width={16}
            height={16}
          />
        </div>
      </div>
    );
  }
}

export default FoldablePane;
