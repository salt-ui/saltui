import react, { Component } from 'react';
import Icon from "salt-icon";
import Grid from 'salt-grid'
import Picker from 'salt-picker'
import Context from '../Context';
import Popup from 'salt-popup'
import deepCopy from 'lodash/cloneDeep';
import PropTypes from "prop-types";
import classnames from 'classnames'


class Panel extends Component {
  static displayName = 'FilterPanel';

  static propTypes = {
    currentGroup: PropTypes.object,
    onSelect: PropTypes.func,
    getSelect: PropTypes.func,
    setSelect: PropTypes.func,
    onClose: PropTypes.func,
    hidePanel: PropTypes.func,
    setGroupTitle: PropTypes.func,
    setGroupFlag: PropTypes.func,
    popupOpen: PropTypes.bool
  };

  static defaultProps = {
    currentGroup: {},
    onSelect: () => {},
    getSelect: () => {},
    setSelect: () => {},
    onClose: () => {},
    hidePanel: () => {},
    setGroupTitle: () => {},
    setGroupTag:() => {},
    popupOpen: true
  };

  getRealCurrentGroup(key, groups) {
    let items = groups.filter((item) => {
      return item.key === key
    });
    return items && items[0] ? items[0] : {}
  }

  onItemClick = (e) => {
    const target = e.target;
    const groupKey = target.getAttribute('data-key');
    const value = target.getAttribute('data-value');
    const text = target.getAttribute('data-text');
    if (!value) {
      return
    }
    this.doItemFilter({ value,text, groupKey })
  };

  doItemFilter({value, text, groupKey}) {
    const {
      currentGroup,
      onSelect,
      setSelect,
      getSelect,
      hidePanel,
      setGroupTitle,
      setGroupFlag
    } = this.props;

    let realCurrentGroup;
    if (currentGroup.key === '_super_' && currentGroup.children) {
      realCurrentGroup = this.getRealCurrentGroup(groupKey, currentGroup.children)
    } else {
      realCurrentGroup = currentGroup
    }
    const realKey = realCurrentGroup.key;
    const selectData = getSelect();
    const currentSelectData = selectData[realKey] || [];
    if (!realCurrentGroup.multiSelect) {
      if (!currentSelectData.length || currentSelectData[0].value !== value) {
        setSelect({
          [realKey]: [{value, text}]
        })
      } else {
        setSelect({
          [realKey]: null
        })
      }
      currentGroup.key !=='_super_' && hidePanel()
      setGroupTitle(currentGroup.key, text)
    } else {
      const hasSelected = currentSelectData.find((item) => {
        return item.value === value
      });
      if (!hasSelected) {
        setSelect({
          [realKey]: [...currentSelectData, {value, text}]
        })
      } else {
        setSelect({
          [realKey]: currentSelectData.filter((item) => {
            return item.value !== value
          })
        })
      }
      setGroupFlag()
    }

    onSelect({
      key: realKey,
      currentItem: {text, value},
      allItems: getSelect()
    })
  }

  renderList(currentGroup) {
    const { getSelect, setSelect } = this.props;
    const { key, items } = currentGroup;
    let selected = getSelect()[key];
    if (selected && selected[0]) {
      selected = selected[0]
    }
    return (
      items.map((item) => {
        return (
          <div
            key={item.value}
            className={classnames({
              [Context.prefixClass('list-item')]: true,
              'active': selected && (selected.value === item.value)
            })}
            data-value={item.value}
            data-text={item.text}
            onClick={this.onItemClick}
          >
            {item.text}
          </div>
        )
      })
    );
  }

  renderGrid(currentGroup) {
    const { items, maxLine, tip, key} = currentGroup;
    const max = maxLine || 4;
    let renderItems;
    if (items.length > 3 * (max) ) {
      renderItems = deepCopy(items);
      renderItems.length = 3 * max - 1;
      renderItems.push({
        value: 'showAll',
        text: () => {
          return (
            <span>全部 ></span>
          )
        },
      });
    } else {
      renderItems = items
    }
    return (
      <div>
        { tip ? <p>{tip}</p> : null }
        <Grid col={3}>
          {renderItems.map(item => {
            return (
              <div
                onClick={this.onItemClick}
                data-key={key}
                key={item.value}
                data-value={item.value}
                data-text={typeof item.text === 'string' ? item.text : ''}
                className={Context.prefixClass('grid-item')}
              >
                {typeof item.text === 'string' ? item.text : item.text()}
              </div>
            )
          })}
        </Grid>
      </div>
    );
  }

  renderPanel(props) {
    const { onClose, currentGroup, popupOpen } = props;
    const { type, children, tip } = currentGroup;
    switch(type) {
      case 'list':
        return this.renderList(currentGroup);
      case 'grid':
        return this.renderGrid(currentGroup);
      case 'super':
        return (
          <Popup
            stopBodyScrolling
            content={
              <div className={'super-filter-container'}>
                {children.map(item => {
                  if (item.type === 'list') {
                    return null;
                  }
                  item.tip = item.title;
                  return (
                    <div key={item.key}>
                      {this.renderPanel({...this.props, currentGroup: item})}
                    </div>
                  )
                })}
              </div>
            }
            animationType="slide-left"
            onMaskClick={() => { onClose() }}
            visible={popupOpen}
          >
            {null}
          </Popup>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        { this.renderPanel(this.props) }
      </div>
    )
  }
}

export default Panel