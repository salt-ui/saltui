/**
 * CitySelectField Component for tingle
 * @author qingnan.yqn
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { prefixClass } from '../Context';
import Layer from '../Layer';
import { findCityList, findDistrictObjs } from './utils';

const containerClassName = prefixClass('city-selector FBV');
const topBarClassName = prefixClass('city-selector-top-bar FBH');
const topBarTextActiveClassName = prefixClass('city-selector-top-text-active');
const tabClassName = prefixClass('city-selector-tab-bar FBH');
const selectPaneClassName = prefixClass('city-selector-pane city-selector-pane-anime');
const selectItemClassName = prefixClass('city-selector-item omit');
const selectedItemClassName = prefixClass('city-selector-item-active omit');
const tabActiveClassName = prefixClass('city-selector-tab-active omit');
const tabNormalClassName = prefixClass('city-selector-tab-item');
const topBarLabelClassName = prefixClass('city-selector-top-bar-label');

const REQUIRED_LENGTH = {
  default: 3,
  city: 2,
  province: 1,
};

export default class CitySelector extends Component {
  static displayName = 'CitySelector';

  static propTypes = {
    value: PropTypes.array,
    districtData: PropTypes.array,
    label: PropTypes.string,
    selectorType: PropTypes.string,
    provinceText: PropTypes.string,
    cityText: PropTypes.string,
    districtText: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    enableAnimation: true,
    value: [],
    confirmText: '完成',
    cancelText: '取消',
    provinceText: '省/自治区/直辖市',
    cityText: '市',
    districtText: '县区',
  };

  constructor(props) {
    super(props);
    // 存储用于渲染动画的省市区三个面板
    this.selectionPanes = [];
    this.state = {
      // 当前选中的值
      value: this.props.value,
      isValueValid: (this.props.value || []).length
        === REQUIRED_LENGTH[this.props.selectorType],
      // 0: 选择省
      // 1: 选择市
      // 2: 选择区
      currentPanePosition: 0,
      currentSelectedItem: null,
    };
  }

  confirm() {
    this.props.onSelect(this.state.value);
  }

  cancel() {
    this.props.onCancel();
  }

  selectTab(position) {
    const dataCursor = position - 1 <= 0 ? 0 : position - 1;
    // 不可在无父节点的情况下，选择子节点的值
    if (!this.state.value[dataCursor]) return;
    this.setState({
      isValueValid: this.state.value.length === REQUIRED_LENGTH[this.props.selectorType],
      currentPanePosition: position,
    });
  }

  selectItem(listItem) {
    const { value, currentPanePosition } = this.state;
    let newPosition = currentPanePosition;

    // 部分省市是直辖市，没有第三项目
    if (listItem.children) {
      newPosition += 1;
    }
    value[currentPanePosition] = listItem.value;
    this.setState({
      value: value.slice(0, currentPanePosition + 1),
      isValueValid: (currentPanePosition + 1) === REQUIRED_LENGTH[this.props.selectorType],
      currentPanePosition: newPosition > 2 ? 2 : newPosition,
      currentSelectedItem: listItem,
    });
  }

  renderDistrictTab() {
    const { provinceText, cityText, districtText, districtData } = this.props;
    const { value, currentSelectedItem, currentPanePosition } = this.state;
    const gapStyle = { marginLeft: '30px', padding: '0 10px' };
    const districts = findDistrictObjs(districtData, value);
    const districtPanes = [
      { name: (districts[0] && districts[0].label) || provinceText },
      { name: (districts[1] && districts[1].label) || cityText, style: gapStyle },
      { name: (districts[2] && districts[2].label) || districtText, style: gapStyle },
    ];

    // 高亮当前面板
    districtPanes[currentPanePosition].active = true;

    // 保证当前面板的出场顺序正确
    let panes = [];
    if (currentSelectedItem && currentSelectedItem.children) {
      panes = districtPanes.slice(0, value.length + 1);
    } else {
      panes = districtPanes.slice(0, value.length > 0 ? value.length : 1);
    }

    return panes.map((pane, key) =>
      <div
        key={key}
        className={pane.active ? tabActiveClassName : tabNormalClassName}
        style={pane.style}
        onClick={this.selectTab.bind(this, key)}
      >
        {pane.name}
      </div>,
    );
  }

  renderSelectionPane() {
    const { districtData } = this.props;
    const { value, currentPanePosition } = this.state;
    const list = findCityList(districtData, value, currentPanePosition) || [];
    const selectionPanesClassName = prefixClass('city-selector-panes');
    const renderList = list.map((listItem, key) => {
      const classNames = classnames(selectItemClassName, {
        [selectedItemClassName]: listItem.value === value[currentPanePosition],
      });
      return (
        <div
          key={key}
          className={classNames}
          onClick={this.selectItem.bind(this, listItem)}
        >
          {listItem.label}
        </div>
      );
    });

    // 动画需要，预置三个空白面板
    this.selectionPanes[currentPanePosition] = (
      <div
        key={currentPanePosition}
        style={{ width: window.innerWidth }}
        className={selectPaneClassName}
      >
        {renderList}
      </div>
    );

    // 填补中间未经初始化的数据集为空白的占位符，否则无法凑齐三个面板
    // 从第一个 Tab 跳转到第三个的时候动画会失效
    for (let i = 0; i < this.selectionPanes.length; i += 1) {
      if (!this.selectionPanes[i]) {
        this.selectionPanes[i] = (
          <div
            key="fill"
            style={{ width: window.innerWidth }}
            className={selectPaneClassName}
          />
        );
      }
    }

    return (
      <div
        style={{
          width: window.innerWidth * this.selectionPanes.length,
          WebkitTransition: '.3s ease transform',
          transition: '.3s ease transform',
          WebkitTransform: `translateX(${-window.innerWidth * currentPanePosition}px)`,
          transform: `translateX(${-window.innerWidth * currentPanePosition}px)`,
        }}
        className={selectionPanesClassName}
      >
        {this.selectionPanes}
      </div>
    );
  }

  render() {
    const { confirmText, cancelText, label } = this.props;
    return (
      <Layer
        visible
        hasMask
        onMaskClick={this.cancel.bind(this)}
        bottom="0"
      >
        <div className={containerClassName}>
          <div className={topBarClassName}>
            <div onClick={this.cancel.bind(this)}>{cancelText}</div>
            <div className={topBarLabelClassName}>{label}</div>
            <div
              onClick={this.confirm.bind(this)}
              className={this.state.isValueValid ? topBarTextActiveClassName : ''}
            >
              {confirmText}
            </div>
          </div>
          <div className={tabClassName}>
            {this.renderDistrictTab()}
          </div>
          {this.renderSelectionPane()}
        </div>
      </Layer>
    );
  }
}
