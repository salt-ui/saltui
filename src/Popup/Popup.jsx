/**
 * Popup Component for tingle
 * @author guanghong.wsj
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 * fork from https://github.com/ant-design/ant-design-mobile/blob/master/components/popup
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';
import classnames from 'classnames';
import { stopBodyScrolling } from '../Utils';

function create(instanceId, config, content, afterClose = () => { }) {
  const props = {
    prefixCls: 't-popup',
    animationType: 'slide-up',
    ...config,
  };
  const {
    prefixCls,
    transitionName,
    maskTransitionName,
    maskClosable = true,
    animationType,
    className,
    onClose,
  } = props;

  let div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    if (div) {
      ReactDOM.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
      div = null;
    }
    afterClose(instanceId);
  }

  const transName = `${prefixCls}-${animationType}`;

  function handleMaskClick() {
    if (maskClosable) {
      if (props.onMaskClose && typeof props.onMaskClose === 'function') {
        const res = props.onMaskClose();
        if (res && res.then) {
          res.then(() => {
            close();
          });
        } else {
          close();
        }
      } else {
        close();
      }
    }
  }

  const maskProps = {
    onClick: (e) => {
      e.preventDefault();
      handleMaskClick();
    },
  };

  const update = (newContent) => {
    ReactDOM.render(
      <Dialog
        prefixCls={prefixCls}
        visible
        title=""
        footer=""
        className={classnames(`${prefixCls}-${animationType}`, {
          [className]: !!className,
        })}
        onClose={() => {
          if (onClose) {
            onClose();
          } else {
            handleMaskClick();
          }
        }}
        transitionName={transitionName || transName}
        maskTransitionName={maskTransitionName || 't-fade'}
        maskClosable={maskClosable}
        wrapProps={props.wrapProps || {}}
        maskProps={props.maskProps || maskProps}
      >
        {newContent || content}
      </Dialog>,
      div,
    );
  };

  update();

  return {
    instanceId,
    close,
    update,
  };
}

const ins = {
  defaultInstance: null,
  instances: [],
};
let instanceId = 1;

class Popup extends React.Component {
  static newInstance = () => {
    let j;
    return {
      show: (content, config) => {
        j = create(instanceId, config, content, (iId) => {
          for (let i = 0; i < ins.instances.length; i++) {
            if (ins.instances[i].instanceId === iId) {
              ins.instances.splice(i, 1);
              return;
            }
          }
        });
        instanceId += 1;
        ins.instances.push(j);
      },
      hide: () => {
        j.close();
      },
      update: (content) => {
        j.update(content);
      },
    };
  }
  static show = (content, config) => {
    Popup.hide();
    ins.defaultInstance = create('0', config, content, (iId) => {
      if (iId === '0') {
        ins.defaultInstance = null;
      }
    });
    return ins.defaultInstance;
  }
  static hide = () => {
    if (ins.defaultInstance) {
      ins.defaultInstance.close();
    }
  }
  static propTypes = {
    children: PropTypes.node,
    content: PropTypes.node,
    options: PropTypes.object,
    visible: PropTypes.bool,
    onMaskClick: PropTypes.func,
    stopBodyScrolling: PropTypes.bool,
  }

  static defaultProps = {
    onMaskClick: () => {},
    children: undefined,
    content: undefined,
    options: undefined,
    visible: undefined,
    stopBodyScrolling: true,
  }

  componentDidMount() {
    if (this.props.visible === true) {
      this.show();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.instance) {
      this.instance.update(this.props.content);
    }
    if (this.props.visible === true && prevProps.visible === false) {
      this.show();
    } else if (this.props.visible === false && prevProps.visible === true) {
      this.hide();
    }
  }

  componentWillUnmount() {
    this.hide();
  }

  getOptions() {
    const options = { ...this.props };
    delete options.content;
    if ('visible' in this.props) {
      options.maskProps = {
        onClick: () => {
          this.props.onMaskClick();
        },
      };
      options.onClose = () => {
        this.props.onMaskClick();
      };
    }
    return options;
  }

  hide() {
    if (this.instance) {
      this.instance.hide();
      this.instance = null;
      if (this.props.stopBodyScrolling) {
        stopBodyScrolling(false);
      }
    }
  }

  show() {
    if (!this.instance) {
      this.instance = Popup.newInstance();
    }
    this.instance.show(this.props.content, this.getOptions());
    if (this.props.stopBodyScrolling) {
      stopBodyScrolling(true);
    }
  }

  handleClick(e) {
    this.fireEvents('onClick', e);
    if (!Object.prototype.hasOwnProperty.call(this.props, 'visible')) {
      this.show();
    }
  }

  fireEvents(type, e) {
    const childCallback = this.props.children.props[type];
    if (childCallback) {
      childCallback(e);
    }
  }

  render() {
    const { children } = this.props;
    if (children === undefined || children === null) {
      return null;
    }
    const child = React.Children.only(children);
    const newChildProps = {
      onClick: (e) => { this.handleClick(e); },
    };
    return React.cloneElement(child, newChildProps);
  }
}

export default Popup;
