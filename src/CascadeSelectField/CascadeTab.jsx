/**
 * 级联 Slot
 * @author: changming <mailto:changming.zy@alibaba-inc.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import IconCheck from 'salt-icon/lib/Check';

import TingleCtx from '../Context';
import Tab from '../Tab';
import i18n from './i18n';

const getOptionsByValue = (options, valueItem = {}) => {
  const backArr = options.filter(item => item.value === valueItem.value);
  if (backArr.length) {
    return backArr[0].children;
  }
  return [];
};

export default class CascadeTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value && props.value.length ? props.value : [{}], // 数据结构：[{ text, value }]
      activeTab: 'tab-1',
    };
  }

  onItemClick(level = 0, selectedValue) {
    let { value } = this.state;
    value = value.slice(0, level);
    value[level] = {
      value: selectedValue.value,
      text: selectedValue.label,
    };

    let { activeTab } = this.state;

    if (selectedValue.children && selectedValue.children.length) {
      value[level + 1] = {};
      activeTab = `tab-${level + 2}`;
    }

    this.setState({ value, activeTab }, () => {
      this.handleEvent('change');
    });
  }

  handleEvent(eventName, e) {
    if (e) {
      e.preventDefault();
    }
    switch (eventName) {
      case 'change':
        this.props.onChange(this.state.value);
        break;
      case 'cancel':
        this.setState({
          value: this.props.value,
          activeTab: 'tab-1',
        });
        this.props.onCancel(this.state.value);
        break;
      case 'confirm':
        this.props.onConfirm(this.state.value);
        break;
      default:
        break;
    }
  }

  handleTabChange({ activeKey }) {
    this.setState({
      activeTab: activeKey,
    });
  }

  renderHeader() {
    const { title, locale } = this.props;
    const { value } = this.state;
    let { confirmText, cancelText } = this.props;
    if (!confirmText) {
      ({ confirmText } = i18n[locale]);
    }
    if (!cancelText) {
      ({ cancelText } = i18n[locale]);
    }
    const confirmEnabled = value && value.length && value[value.length - 1].value !== undefined;

    return (
      <div className={TingleCtx.prefixClass('cascade-slot-header-wrap FBH')}>
        <button onClick={this.handleEvent.bind(this, 'cancel')}>{cancelText}</button>
        <h1 className={TingleCtx.prefixClass('FB1')}>{title}</h1>
        <button disabled={!confirmEnabled} onClick={this.handleEvent.bind(this, 'confirm')}>{confirmText}</button>
      </div>
    );
  }

  renderBody() {
    const { options } = this.props;
    const { value } = this.state;
    const textPleaseSelect = i18n[this.props.locale].pleaseSelect;
    let loopOptions;
    return (
      <div className={TingleCtx.prefixClass('cascade-slot-body-wrap')}>
        <Tab
          activeKey={this.state.activeTab}
          swipeable={false}
          speed={1}
          onChange={(tabData) => { this.handleTabChange(tabData); }}
        >
          {
            value.map((val, index) => {
              if (index === 0) {
                loopOptions = options;
              } else {
                loopOptions = getOptionsByValue(loopOptions, value[index - 1]);
              }
              return (
                <Tab.Item key={`tab-${index + 1}`} title={<div className="title">{val.text || textPleaseSelect}</div>}>
                  <ul className={TingleCtx.prefixClass('cascade-slot-list')}>
                    {
                        loopOptions.map((level, levelIndex) => (
                          <li key={level.value}>
                            <button
                              className={classnames(TingleCtx.prefixClass('cascade-slot-list-button'), {
                                active: this.state.value[index].value === level.value,
                              })}
                              onClick={this.onItemClick.bind(this, index, level, levelIndex)}
                            >
                              <span className="text">{level.label}</span> {this.state.value[index].value === level.value ? <IconCheck width={16} height={16} /> : null }
                            </button>
                          </li>
                        ))
                      }
                  </ul>
                </Tab.Item>
              );
            })
          }
        </Tab>
      </div>
    );
  }

  render() {
    // const { visible } = this.props;
    return (
      <div>
        {this.renderHeader()}
        {this.renderBody()}
      </div>
    );
  }
}

CascadeTab.defaultProps = {
  visible: false,
  options: [],
  value: [],
  locale: 'zh-cn',
  title: '',
  onChange() { },
  onCancel() { },
  onConfirm() { },
  confirmText: i18n['zh-cn'].confirmText,
  cancelText: i18n['zh-cn'].cancelText,
};

CascadeTab.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  locale: PropTypes.string,
};
