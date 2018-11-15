import react, { Component } from 'React'
import PropTypes from 'prop-types'
import { HBox, Box } from 'salt-boxs';
import Icon from 'salt-icon'
import classnames from 'classnames'
import Panel from './Panel'
import React from "react";

class HeaderBar extends Component{
  static displayName = 'FilterHeaderBar';

  static propTypes = {
    options: PropTypes.object,
    setSelect: PropTypes.func,
    onSelect: PropTypes.func,
    getSelect: PropTypes.func
  };

  static defaultProps = {
    options: {},
    setSelect: () => {},
    onSelect: () => {},
    getSelect: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
      popupOpen: true,
      titles: {},
      flags: {}
    }
  }

  changeActive(index, item) {
    const hasSelected = this.state.activeIndex === index;

    if (item.type === 'action') {
      this.doActionFilter(item, hasSelected);
    }
    this.setState({
      activeIndex: hasSelected ? -1 : index,
      popupOpen: !hasSelected && item.key === '_super_'
    })
  }

  doActionFilter(item, hasSelected) {
    const {onSelect, setSelect, getSelect} = this.props;
    !hasSelected ? setSelect({
      [item.key]: item.items
    }): setSelect({
      [item.key]: null
    });

    onSelect({
      key: item.key,
      currentItem: hasSelected ? null : item.items[0],
      allItems: getSelect()
    });
  }

  onClosePopup = () => {
    this.setState({
      activeIndex: -1,
      popupOpen: false
    })
  };

  setTitle(group, index) {
    let { titles, flags, activeIndex } = this.state;
    const classNames = classnames({active: activeIndex === index});
    if (titles[group.key]) {
      return (
        <span className={classNames}>
          {titles[group.key]}
        </span>
      )
    }
    return (
      <span className={classNames}>
        {typeof group.title === 'string' ? group.title : group.title()}
      </span>
    )
  };

  setGroupFlag = () => {
    const selectData = this.props.getSelect();
    let flags = {};
    for (let index in selectData ) if (selectData.hasOwnProperty(index)) {
      let data = selectData[index];
      flags[index] = !!(data && data.length)
    }
    this.setState({
      flags
    });
  };

  setGroupTitle = (key, title) => {
    this.setState({
      titles: {
        ...this.state.titles,
        [key]: title
      }
    })
  };

  render() {
    const { activeIndex, popupOpen } = this.state;
    const { size, items } = this.props.options;
    let filterGroups = [];
    if (items.length <= size) {
      filterGroups = items
    } else {
      let newFilterGroups = [...items];
      filterGroups = [
        ...newFilterGroups.splice(0, size - 1),
        {
          key: '_super_',
          title: '高级筛选',
          type: 'super',
          icon: 'star',
          children: [
            ...newFilterGroups.map(item => {
              item._parentGroup_ = '_super';
              return item;
            })
          ]
        }
      ]
    }
    const currentFilterGroup = filterGroups[activeIndex];
    return (
      <div>
        <HBox className={'wrapper'}>
          {filterGroups.map((group, index) => {
            return (
              <Box className={classnames({box: true})} flex={1} hAlign={'center'} key={group.key} onClick={() => {this.changeActive(index, group)} }>
                {this.setTitle(group, index)}
                {
                  group.icon !== false ? <Icon fill={ activeIndex === index ? '#ff6f00' : '#000' } name={group.icon || (activeIndex === index ? 'angle-up' : 'angle-down')} className={'icon'} /> : null
                }
              </Box>
            )
          })}
        </HBox>
        <Panel
          {...this.props}
          hidePanel={ () => {this.setState({activeIndex: -1})} }
          currentGroup={currentFilterGroup}
          onClose={this.onClosePopup}
          popupOpen={popupOpen}
          setGroupTitle={this.setGroupTitle}
          setGroupFlag={this.setGroupFlag}
        />
      </div>
    )
  }
}

export default HeaderBar;