/**
 * Filter Component for SaltUI
 * @author taoqili
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import FilterBar from './FilterBar'
import FilterPanel from './FilterPanel'
import Context from '../Context'
import classnames from 'classnames'
import Mask from '../Mask'

class Filter extends React.Component {
  static displayName = 'Filter';

  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    size: PropTypes.oneOf([1, 2, 3, 4]),
    activeIndex: PropTypes.number,
    onSelect: PropTypes.func,
    onConfirm: PropTypes.func,
    onReset: PropTypes.func,
    value: PropTypes.object
  };

  static defaultProps = {
    className: undefined,
    options: [],
    size: 4,
    activeIndex: -1,
    value: null,
    onSelect: () => {
    },
    onConfirm: () => {
    },
    onReset: () => {
    }
  };

  constructor(props) {
    super(props);
    this.selectData = {};
    if (props.defaultValue) {
      this.setSelect(props.defaultValue)
    }
    this.state = {
      activeIndex: props.activeIndex,
      maskVisible: false
    }
  }

  setSelect = (data = {}, ignoreOnSelect) => {
    const name = Object.keys(data)[0];
    const { onSelect } = this.props;
    this.selectData = {
      ...this.selectData,
      ...data
    };
    !ignoreOnSelect && onSelect({
      name,
      currentSelected: data[name],
      allSelected: this.getSelect()
    })
  };

  getSelect = () => {
    let data = this.selectData;
    Object.keys(this.selectData).map(name => {
      if (!data[name] || !data[name].length) {
        delete data[name]
      }
    });
    return data;
  };

  getActiveIndex = () => {
    return this.state.activeIndex
  };

  setActiveIndex = index => {
    this.setState({
      activeIndex: index,
    });
    if (index === -1) {
      this.setState({
        maskVisible: false
      })
    }
  };

  handleMask = (isShow, group) => {
    this.setState({
      maskVisible: isShow && group.type !== 'switch' && group.type !== 'super'
    })
  };

  formatOptions = () => {
    const { size, options } = this.props;
    let maxSize = size > 4 ? 4 : size;
    if (options.length <= maxSize) {
      return {
        maxSize,
        groups: options,
        _backItems: options
      }
    }
    let newFilterGroups = [...options];
    return {
      maxSize,
      groups: [
        ...newFilterGroups.splice(0, maxSize - 1),
        {
          name: '_super_',
          title: '高级筛选',
          icon: 'setting',
          type: 'super',
          children: [
            ...newFilterGroups.map(item => {
              item._groupKey_ = '_super_';
              return item;
            })
          ]
        }
      ],
      _backItems: options
    }
  };

  render() {
    const options = this.formatOptions();
    const {
      activeIndex,
      maskVisible
    } = this.state;
    const props = {
      ...this.props,
      activeIndex,
      options,
      setSelect: this.setSelect,
      getSelect: this.getSelect,
      getActiveIndex: this.getActiveIndex,
      setActiveIndex: this.setActiveIndex,
      handleMask: this.handleMask
    };
    return (
      <div className={classnames(Context.prefixClass('filter-wrapper'), {
        [props.className]: !!props.className,
      })}>
        <FilterBar {...props} />
        <FilterPanel {...props} />
        <Mask
          visible={maskVisible}
          opacity={0.4}
          zIndex={800}
        />
      </div>
    );
  }
}

export default Filter;