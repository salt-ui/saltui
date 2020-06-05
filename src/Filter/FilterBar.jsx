import React from 'react';
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import Context from '../Context';
import { HBox, Box } from '../Boxs';
import AngleUp from 'salt-icon/lib/AngleUp';
import AngleDown from 'salt-icon/lib/AngleDown';
import classnames from 'classnames';

class FilterBar extends React.Component {
  static displayName = 'FilterBar';

  static propTypes = {
    options: PropTypes.object,
    setSelect: PropTypes.func,
    onChange: PropTypes.func,
    getSelect: PropTypes.func,
  };

  static defaultProps = {
    options: {},
    setSelect: () => {
    },
    onChange: () => {
    },
    getSelect: () => {
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
    };
  }

  getMaskOffset() {
    const filterBar = ReactDom.findDOMNode(this.filterBar)
    const rect = filterBar.getBoundingClientRect()
    return rect.top
  }

  changeActiveIndex(group, index) {
    const { activeIndex } = this.state;
    const {
      setActiveIndex,
      handleMask,
      setMaskOffset
    } = this.props;
    const isFocus = activeIndex !== index;
    const newIndex = !isFocus ? -1 : index;
    setActiveIndex(newIndex);
    if (group.type === 'switch') {
      this.doSwitchFilter(group);
    }
    setMaskOffset(this.getMaskOffset())
    handleMask(isFocus, group);
    this.setState({
      activeIndex: newIndex,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.activeIndex !== prevState.activeIndex) {
      return {
        activeIndex: nextProps.activeIndex,
      };
    }
    return null;
  }

  doSwitchFilter(group) {
    const { getSelect, setSelect, onConfirm } = this.props;
    const { name, items } = group;
    const currentSelectData = getSelect()[name];
    setSelect({
      [name]: currentSelectData && currentSelectData.length ? null : items,
    });
    onConfirm(getSelect())
  }

  renderTitle(group, index) {
    const { activeIndex } = this.state;
    const { getSelect } = this.props;
    const currentSelectData = getSelect()[group.name];
    const isFocus = group.type !== 'switch' ? activeIndex === index : currentSelectData && currentSelectData.length && activeIndex === index;
    const isFlag = this.checkFlag(group, index);
    const title = typeof group.title === 'function'
      ? <span>{group.title(isFocus, currentSelectData)}</span>
      : (<span>{
        isFlag && currentSelectData
          ? currentSelectData.length > 1 ? group.title : currentSelectData.length === 1 ? currentSelectData[0].text : group.title
          : group.title
      }
      </span>);
    return (
      <div className={classnames(
        'title-wrapper',
        {
          active: isFocus,
          selected: isFlag && (group.name === '_super_' || currentSelectData && currentSelectData.length),
        },
      )}
      >
        {title}
      </div>
    );
  }

  renderIcon(group, index) {
    const { activeIndex } = this.state;
    const isFocus = activeIndex === index;
    const { getSelect } = this.props;
    const currentSelectData = getSelect()[group.name];
    const isFlag = this.checkFlag(group, index);
    const iconProps = {
      width: group.type === 'super' ? 12 : 20,
      height: group.type === 'super' ? 12 : 20,
      className: 'icon'
    }
    const icon = group.icon || (isFocus ?
      <AngleUp {...iconProps}/> : <AngleDown {...iconProps}/>
    )
    return (
      group.icon !== false
        ? <div className={classnames("icon-wrapper", {
            active: isFocus,
            selected: isFlag && (group.name === '_super_' || currentSelectData && currentSelectData.length),
          })}
          >
          {icon}
        </div>
        : null
    );
  }

  checkFlag(group, index) {
    const { getSelect, options } = this.props;
    const { name } = group;
    const { groups } = options;
    const selectData = getSelect();
    let flag = false;
    if (group.name !== '_super_') {
      flag = selectData[name] && selectData[name].length;
    } else {
      const children = groups[index].children;
      for (let i = 0; i < children.length; i++) {
        const childName = children[i].name;
        for (const j in selectData) {
          if (selectData.hasOwnProperty(j)) {
            if (childName === j) {
              const s = selectData[j];
              if (s && s.length) {
                flag = true;
                break;
              }
            }
          }
        }
        if (flag) {
          break;
        }
      }
    }
    return flag;
  }

  render() {
    const { options } = this.props;
    const { groups } = options;
    return (
      <div ref={(c) => {this.filterBar = c}}>
        <HBox className={Context.prefixClass('filter-bar-wrapper')}>
          {groups.map((group, index) => (
            <Box
              key={group.name}
              className="item"
              flex={1}
              hAlign="center"
              onClick={() => {
                this.changeActiveIndex(group, index);
              }}
            >
              <div className={classnames(Context.prefixClass('FBH'), 'item-wrapper')}>
                {this.renderTitle(group, index)}
                {this.renderIcon(group, index)}
              </div>
            </Box>
          ))}
        </HBox>
      </div>
    );
  }
}

export default FilterBar;
