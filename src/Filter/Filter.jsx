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

class Filter extends React.Component {
  static displayName = 'Filter';

  static propTypes = {
    options: PropTypes.object,
    activeIndex: PropTypes.number,
    onSelect: PropTypes.func,
    onConfirm: PropTypes.func,
    onReset: PropTypes.func
  };

  static defaultProps = {
    options: {},
    activeIndex: -1,
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
    this.state = {
      activeIndex: props.activeIndex
    }
  }

  setSelect = (data = {}) => {
    this.selectData = {
      ...this.selectData,
      ...data
    }
  };

  getSelect = () => {
    return this.selectData
  };

  getActiveIndex = () => {
    return this.state.activeIndex
  };

  setActiveIndex = index => {
    this.setState({
      activeIndex: index
    })
  };

  formatOptions = () => {
    const {size, items} = this.props.options;
    let maxSize = size > 4 ? 4 : size;
    if (items.length <= maxSize) {
      return {
        maxSize,
        groups: items,
        _backItems: items
      }
    }
    let newFilterGroups = [...items];
    return {
      maxSize,
      groups: [
        ...newFilterGroups.splice(0, maxSize - 1),
        {
          key: '_super_',
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
      _backItems: items
    }
  };

  render() {
    const options = this.formatOptions();
    const { activeIndex } = this.state;
    const props = {
      ...this.props,
      activeIndex,
      options,
      setSelect: this.setSelect,
      getSelect: this.getSelect,
      getActiveIndex: this.getActiveIndex,
      setActiveIndex: this.setActiveIndex,
    };
    return (
      <div className={Context.prefixClass('filter-wrapper')}>
        <FilterBar {...props} />
        <FilterPanel {...props} />
      </div>
    );
  }
}

export default Filter;