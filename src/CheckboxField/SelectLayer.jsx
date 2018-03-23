/**
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CheckRound from 'salt-icon/lib/CheckRound';
import { prefixClass } from '../Context';
import Layer from '../Layer';
import Scroller from '../Scroller';

const renderIcon = (checked, disable) => {
  const iconClassName = classnames(prefixClass('checkbox-field-icon'), {
    checked,
    'un-checked': !checked,
    disable,
  });
  return (
    checked ?
      <CheckRound
        key="check-round"
        width={26}
        height={26}
        className={iconClassName}
      /> : <div className={iconClassName} />
  );
};

class SelectLayer extends React.Component {
  constructor(props) {
    super(props);

    const t = this;

    // 初始状态
    t.state = {
      visible: false,
    };
  }

  getData() {
    const data = [];

    this.props.data.forEach((item) => {
      if (item.checked) {
        data.push(item);
      }
    });
    return data;
  }

  handleCancel() {
    const t = this;
    try {
      t.props.onCancel();
    } finally {
      t.reset();
      t.hide();
    }
  }

  handleClick(item) {
    if (item.disable) {
      return;
    }
    const itemNew = item;
    itemNew.checked = !itemNew.checked;
    this.setState(this.state);
  }


  hide() {
    const t = this;

    t.setState({
      visible: false,
    }, () => {
    });
  }

  show() {
    const t = this;

    t.retain();
    t.setState({
      visible: true,
    }, () => {
    });
  }

  reset() {
    this.props.data.forEach((item, i) => {
      const itemNew = item;
      itemNew.checked = this.checks[i];
    });
  }

  retain() {
    this.checks = [];
    this.props.data.forEach((item) => {
      this.checks.push(item.checked);
    });
  }

  handleConfirm() {
    const t = this;
    try {
      t.props.onConfirm(t.getData());
    } finally {
      t.hide();
    }
  }


  render() {
    const t = this;
    const {
      className, maskCloseable, cancelText, confirmText, iconPosition,
    } = t.props;
    /* eslint-disable react/no-array-index-key */
    return (
      <Layer
        visible={t.state.visible}
        bottom={0}
        onMaskClick={maskCloseable ? t.handleCancel.bind(t) : (() => maskCloseable)}
      >
        <div
          className={
                        classnames(prefixClass('select-layer'), {
                            [className]: !!className,
                        })}
        >
          <div className={prefixClass('select-layer-header FBH FBAC')}>
            <div
              className={prefixClass('select-layer-cancel')}
              onClick={t.handleCancel.bind(t)}
            >{cancelText}
            </div>
            <div className={prefixClass('FB1 FAC select-layer-title')}>{t.props.title}</div>
            <div
              className={classnames(prefixClass('select-layer-confirm'))}
              onClick={t.handleConfirm.bind(t)}
            >{confirmText}
            </div>
          </div>
          <div className={prefixClass('select-layer-body FBH FC9 PR')}>
            <Scroller
              key="scroller"
              click
              className={prefixClass('FB1')}
              autoRefresh
              tap="iscroll:tap"
            >
              <ul className="select-list">
                {
                                t.props.data.map((m, i) => (
                                  <li
                                    key={`item${i}`}
                                    onClick={t.handleClick.bind(t, m)}
                                    className={classnames(prefixClass('FBH'), {
                                                'select-layer-item': true,
                                                disable: m.disable,
                                            })}
                                    role="menuitem"
                                  >
                                    {
                                            iconPosition === 'left' && renderIcon(m.checked, m.disable)
                                        }
                                    <div className={classnames(prefixClass('FB1'), {
                                            'item-content': true,
                                        })}
                                    >{m.content || m.text}
                                    </div>
                                    {
                                            iconPosition === 'right' && renderIcon(m.checked, m.disable, 'right')
                                        }
                                    {
                                            m.disable && <div className={prefixClass('checkbox-field-disable-mask')} />
                                        }
                                  </li>))}
              </ul>
            </Scroller>
          </div>
        </div>
      </Layer>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

SelectLayer.defaultProps = {
  title: '',
  value: [],
  maskCloseable: true,
  className: '',
  confirmText: '完成',
  cancelText: '取消',
  iconPosition: 'left',
  onConfirm() {},
  onCancel() {},
};

// http://facebook.github.io/react/docs/reusable-components.html
SelectLayer.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  value: PropTypes.array,
  maskCloseable: PropTypes.bool,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  iconPosition: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

SelectLayer.displayName = 'SelectLayer';

export default SelectLayer;
