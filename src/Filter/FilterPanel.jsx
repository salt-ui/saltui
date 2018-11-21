import react from 'react'
import PropTypes from 'prop-types'
import Animate from 'rc-animate'
import Context from "../Context/Context";
import Popup from 'salt-popup'
import Icon from 'salt-icon'
import Button from 'salt-button'
import classnames from "classnames";
import deepCopy from "lodash/cloneDeep";
import Grid from 'salt-grid'
import Picker from 'salt-picker'

class FilterPanel extends react.Component {
  static displayName = 'FilterPanel';

  static propTypes = {

  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      pickerOptions: [],
      multiple: false,
      key: ''
    }
  }

  onItemClick = e => {
    const target = e.target;
    const key = target.getAttribute('data-key');
    const value = target.getAttribute('data-value');
    const text = target.getAttribute('data-text');
    const classList = target.classList;
    classList.toggle('active');
    if (!value) {
      if (target.getAttribute('data-action') === 'showAll') {
        this.showAll(key)
      }
      return
    }
    this.doItemFilter({ value,text, key })
  };

  showAll(key) {
    console.log('showAll');
    const { options, getSelect } = this.props;
    const { _backItems } = options;
    const currentData = getSelect()[key];
    const pick = _backItems.find(item => {
      return item.key === key
    }) || {};

    this.setState({
      key,
      showPicker: true,
      pickerOptions: pick.items || [],
      multiple: pick.multiSelect,
      value: currentData
    })
  }

  doItemFilter({value, text, key}) {
    const {
      options,
      onSelect,
      setSelect,
      getSelect,
      setActiveIndex
    } = this.props;
    const { _backItems } = options;
    const group = _backItems.find((item) => {return item.key === key});
    const selectData = getSelect();
    const currentSelectData = selectData[key] || [];

    if (!group.multiSelect) {
      setSelect({
        [key]: !currentSelectData.length || currentSelectData[0].value !== value ? [{text, value}] : null
      });
      setActiveIndex(-1)
    } else {
      const hasSelected = currentSelectData.find((item) => {
        return item.value === value
      });

      if (!hasSelected) {
        setSelect({
          [key]: [...currentSelectData, {value, text}]
        })
      } else {
        setSelect({
          [key]: currentSelectData.filter((item) => {
            return item.value !== value
          })
        })
      }
    }

    onSelect({
      key,
      currentItem: {text, value},
      allItems: getSelect()
    })
  }

  renderList(group) {
    const { getSelect } = this.props;
    const { key, items } = group;
    const currentSelectData = getSelect()[key];
    return (
      <div>
        {
          items.map((item) => {
            let isSelected = false;
            if (currentSelectData && currentSelectData[0]) {
              isSelected = currentSelectData[0].value === item.value
            }
            return (
              <div
                key={item.value}
                className={classnames({
                  [Context.prefixClass('filter-list-item')]: true,
                  'active': isSelected
                })}
                data-key={key}
                data-value={item.value}
                data-text={item.text}
                onClick={this.onItemClick}
              >
                {item.text}
                {
                  isSelected
                    ? <Icon className={'icon'} width={26} height={26} name={'check'} fill={'#ff6f00'} />
                    : null
                }
              </div>
            )
          })
        }
      </div>
    );
  }

  renderGridTitle(group) {
    const { tip } = group;
    return (
      tip ? <p className={Context.prefixClass('filter-group-title')}>{tip}</p> : null
    )
  }

  renderGridFooter(group) {
    const { _groupKey_, multiSelect } = group;
    if (_groupKey_ !== '_super_' && multiSelect) {
      return (
        <div className={Context.prefixClass('filter-grid-footer')}>
          <Button.Group>
            <Button type={'secondary'} display={'inline'} onClick={() => { this.resetGrid(group.key) }}>重 置</Button>
            <Button type={'primary'} display={'inline'} onClick={() => { this.confirm() }}>确 定</Button>
          </Button.Group>
        </div>
      )
    }
  }

  renderGrid(group) {
    const { getSelect } = this.props;
    const { items, maxLine, key} = group;
    const currentSelectData = getSelect()[key];

    const max = maxLine || 4;
    let renderItems;
    if (items.length > 3 * (max) ) {
      renderItems = deepCopy(items);
      renderItems.length = 3 * max - 1;
      renderItems.push({
        value: 'showAll',
        text: () => {
          return (
            <span data-key={group.key} data-action="showAll">全部 ></span>
          )
        },
      });
    } else {
      renderItems = items
    }
    return (
      <div>
        { this.renderGridTitle(group)}
        <Grid col={3} noLine>
          {renderItems.map(item => {
            let isSelected = false;
            if (currentSelectData && currentSelectData.find(i => {
              return i.value === item.value && i.text === item.text
            })) {
              isSelected = true
            }
            return (
              <div
                className={classnames({
                  [Context.prefixClass('filter-grid-item')]: true,
                  'active': isSelected
                })}
                key={item.value}
                data-key={key}
                data-value={item.value}
                data-text={typeof item.text === 'string' ? item.text : ''}
                onClick={this.onItemClick}
              >
                {typeof item.text === 'string' ? item.text : item.text()}
              </div>
            )
          })}
        </Grid>
        {this.renderGridFooter(group)}
      </div>
    );
  }

  resetSuper() {
    const { setSelect, getSelect, options } = this.props;
    const { children } = options.groups[options.groups.length - 1];
    const selectData = getSelect();
    children.forEach((item) => {
      if (selectData[item.key]) {
        setSelect({
          [item.key]: null
        })
      }
    });
    this.reset();
  }

  resetGrid(key) {
    const { setSelect } = this.props;
    setSelect({
      [key]: null
    });
    this.reset();
  }

  reset() {
    const { onReset, setActiveIndex, getSelect } = this.props;
    setActiveIndex(-1);
    onReset(getSelect());
  }

  confirm() {
    const { onSelect, getSelect, setActiveIndex } = this.props;
    const selectData = getSelect();
    setActiveIndex(-1);
    onSelect(selectData);
  }

  renderSuper(group) {
    const { setActiveIndex } = this.props;
    const { children } = group;
    if (!children || !children.length) {
      return null;
    }
    return (
      <Popup
        stopBodyScrolling
        content={
          <div className={Context.prefixClass('filter-popup-container')} style={{height: window.innerHeight - 80}}>
            {group.children.map(item => {
              if (item.type === 'list') {
                return null;
              }
              item.tip = item.title;
              if (item.items.length > 8) {
                item.needCollapse = true
              }
              return (
                <div key={item.key}>
                  {this.renderPanel(item)}
                </div>
              )
            })}
            <div className={Context.prefixClass('filter-popup-footer')}>
              <Button.Group>
                <Button type={'secondary'} display={'inline'} onClick={() => { this.resetSuper() }}>重 置</Button>
                <Button type={'primary'} display={'inline'} onClick={() => { this.confirm() }}>确 定</Button>
              </Button.Group>
            </div>
          </div>
        }
        animationType="slide-left"
        onMaskClick={() => { setActiveIndex(-1) }}
        visible={true}
      >
        {null}
      </Popup>
    )
  }

  renderPanel(group) {
    if (!group) {
      return null;
    }
    switch (group.type) {
      case 'list':
        return this.renderList(group);
      case 'grid':
        return this.renderGrid(group);
      case 'super':
        return this.renderSuper(group);
      default:
        return null
    }
  }

  render() {
    const { showPicker, pickerOptions, multiple, key, value } = this.state;
    const { options, activeIndex, setSelect } = this.props;
    const group = options.groups[activeIndex];
    console.log(activeIndex);
    return (
      <div className={Context.prefixClass('filter-panel-wrapper')}>
        {this.renderPanel(group)}
        <Picker
          value={value}
          options={pickerOptions}
          multiple={multiple}
          showSearch={false}
          onConfirm={(value) => {
            setSelect({
              [key]: value
            });
            this.setState({
              showPicker: false
            })
          }}
          confirmText={'确认'}
          filterOption={false}
          onSearch={(keyword) => {
            // const items = pickerOptions.find(item => {
            //   return item.text.indexOf(keyword !== -1)
            // });
            // this.setState({
            //   pickerOptions: items
            // });
          }}
          visible={showPicker}
        />
      </div>
    )
  }
}

export default FilterPanel;