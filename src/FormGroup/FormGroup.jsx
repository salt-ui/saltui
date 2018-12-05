/**
 * FormGroup Component Style for SaltUI
 * @author xuhao.wxh
 *
 * Copyright 2018-2019, SaltUI Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './FormGroup.styl';
import cx from 'classnames'

const changeEvents = [
  'onChange',
  'onSelect',
  'onOk',
  'onConfirm',
];

// 缓存每一个组件的change事件名称，props变化时需要刷新
const changeEventsKeyCache = {};

const noop = () => {};

export default class FormGroup extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    data: PropTypes.array,
    children: PropTypes.node,
    title: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
    className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ])
  }

  static defaultProps = {
    onChange: noop,
    data: [],
  }

  constructor(props) {
    super(props);

    // 初始化表单组数据
    let { data } = this.props;
    if (Object.prototype.toString.call(data) !== '[object Array]') {
      console.error('Component FormGroup prop data must be a Array');
      data = [];
    }
    this.state = {
      data,
    };

    this.cloneForm = this.cloneForm.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  /**
   * 触发onChange回调
   * @param {*} type change类型
   * @param {*} value 变动内容
   * @param {*} data 表单组全部值
   * 
   * value格式：
   * 新增或删除操作：只传变动的组的序号
   * {
   *    index: 1,
   * }
   * 编辑操作：传变动的组的序号，field name，和变动值
   * {
   *    index: 1,
   *    name: 'selectField',
   *    value: 'xxx'
   * }
   */
  onChange(type, value, data) {
    this.props.onChange(type, value, data)
  }

  setValue(itemIndex, name, value) {
    const { data } = this.state;
    data[itemIndex][name] = value;
    this.setState({
      data,
    });
    this.onChange('modify', {
      index: itemIndex,
      name,
      value,
    }, data);
  }


  /**
   * 根据数组中的数据，和传入的fields，复制整个表单
   * @param {*} fields 传入的fields，即children
   * 
   * formSlice：根据一行数据复制出来的表单切片
   * 复制field的时候，需要：
   * 1. 劫持change事件
   * 2. 覆盖value值
   */
  cloneForm(fields) {
    const { title } = this.props;
    const { data } = this.state;

    return data.map((item, itemIndex) => { // 循环数据
      const formSlice = React.Children.map(fields, field => {
        const name = field.props.name;
        if (!name) { // 如果非field,直接赋值
          return React.cloneElement(field);
        }
        const propsToMerge = {
          value: item[name],
        };

        // 根据name获取组件的change事件名称
        let changeEventKey = changeEventsKeyCache[name];
        if (changeEventKey === null || Boolean(changeEventKey)) {
          // 值为null 代表搜索过但是没有搜索到change key，所以设置了null
          // Boolean(changeEventKey) 为true代表，搜索到了change key
        } else {
          // 没有搜索过key，在changeEvents里搜索一次
          const key = Object.keys(field.props).find(propKey => changeEvents.find(event => event === propKey));
          if (key) {
            changeEventKey = key;
            changeEventsKeyCache[name] = key; // 缓存找到的change key
          } else {
            changeEventsKeyCache[name] = null; // 设置null代表搜索过但是没有搜索到
          }
        }

        // 代理组件的change事件，merge进propsToMerge
        if (changeEventKey) {
          propsToMerge[changeEventKey] = value => {
            this.setValue(itemIndex, name, value);
            field.props[changeEventKey](value, itemIndex);
          };
        }
        return React.cloneElement(field, propsToMerge);
      });

      let titleComponent = null;
      if (typeof title === 'string') {
        titleComponent = (<span>{title}</span>);
      } else if (typeof title === 'function') {
        titleComponent = (<span>{title(itemIndex + 1)}</span>);
      }

      return (
        <div className="t-form-group-slice" key={itemIndex}>
          <div className="t-form-group-slice-title">
            { titleComponent }
            <a className="t-form-group-slice-delete" onClick={this.delete.bind(this, itemIndex)}>
              删除
            </a>
          </div>
          <div>
            { formSlice }
          </div>
        </div>
      );

    });
  }

  add() {
    const computed = this.state.data.concat({});
    this.setState({
      data: computed,
    });

    this.onChange('add', {
      index: computed.length - 1,
    }, computed);
  }

  delete(index, e) {
    e && e.preventDefault();
    const { data } = this.state;
    if (data.length === 1) { // 当只剩最后一个的时候
      const computed = [{}];
      this.setState({
        data: computed,
      });

      this.onChange('delete', {
        index: 0,
      }, computed);
    } else {
      data.splice(index, 1); // 删除index位
      this.setState({
        data,
      });

      this.onChange('delete', {
        index: 0,
      }, data);
    }
  }

  render() {
    return (
      <div className={cx('t-form-group', this.props.className)}>
        { this.cloneForm(this.props.children) }
        <div className="t-form-group-add" onClick={this.add}>
          新增一条
        </div>
      </div>
    )
  }
}
