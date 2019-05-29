import React from 'react'
import ReactDom from 'react-dom'
import Context from "../Context/Context";
import Popup from '../Popup'
import Icon from 'salt-icon'
import Button from '../Button'
import classnames from "classnames";
import deepCopy from "lodash/cloneDeep";
import Grid from '../Grid'
import Picker from '../Picker'
import Switch from '../Switch';


class FilterPanel extends React.Component {
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
      name: '',
      value: []
    }
    this.grids = {}
  }

  onItemClick = e => {
    const target = e.currentTarget;
    const name = target.getAttribute('data-name');
    const multiSelect = target.getAttribute('data-multi');
    const value = target.getAttribute('data-value');
    const text = target.getAttribute('data-text');
    const classList = target.classList;

    if (!value || value === 'showAll') {
      this.showAll(name);
      return
    }
    if (multiSelect === 'false') {
      const itemParentNode = ReactDom.findDOMNode(this.grids[name]);
      const items = itemParentNode.querySelectorAll(`.${Context.prefixClass('filter-grid-item')}`) || [];
      items.forEach(item => {
        if(item.getAttribute('data-value') !== value) {
          item.classList.remove('active')
        }
      });
    }
    classList.toggle('active');
    this.doItemFilter({ value, text, name })
  };

  showAll(name) {
    console.log('showAll');
    const { options, getSelect } = this.props;
    const { _backItems } = options;
    const currentData = getSelect()[name];
    const pick = _backItems.find(item => {
      return item.name === name
    }) || {};

    this.setState({
      name,
      showPicker: true,
      pickerOptions: pick.items || [],
      multiple: pick.multiSelect,
      value: currentData
    })
  }

  doItemFilter({ value, text, name }) {
    const {
      options,
      setSelect,
      getSelect,
      onConfirm,
      setActiveIndex
    } = this.props;
    const { _backItems } = options;
    const group = _backItems.find((item) => {
      return item.name === name
    });
    const selectData = getSelect();
    const currentSelectData = selectData[name] || [];
    if (group.multiSelect === false || group.type === 'order') {
      if (currentSelectData.length) {
        setSelect({
          [name]: null
        }, true)
      }
      setSelect({
        [name]: !currentSelectData.length || currentSelectData[0].value !== value ? [{ text, value }] : null
      });
      if (group._groupKey_ !== '_super_' || group.type === 'order') {
        setActiveIndex(-1);
        onConfirm(getSelect());
      }
    } else {
      const hasSelected = currentSelectData.find((item) => {
        return item.value === value
      });

      if (!hasSelected) {
        setSelect({
          [name]: [...currentSelectData, { value, text }]
        })
      } else {
        setSelect({
          [name]: currentSelectData.filter((item) => {
            return item.value !== value
          })
        })
      }
    }
  }

  renderRange(group) {
    const { getSelect } = this.props;
    const { name, items } = group;
    const currentSelectData = getSelect()[name];
    return (
      <div>112321</div>
    )
  }

  onOrderItemClick = (e) => {
    const target = e.currentTarget;
    const name = target.getAttribute('data-name');
    const value = target.getAttribute('data-value');
    const text = target.getAttribute('data-text');
    const classList = target.classList;
    const { getSelect } = this.props
    const currentSelectData = getSelect();
    if (!currentSelectData[name] || !currentSelectData[name].value) {
      this.doItemFilter({value, text, name})
      classList.toggle('toggle')
      return
    }
    if (value === currentSelectData[name][0].value) {
      return
    }
    const parent = target.parentElement;
    const items = parent.querySelectorAll(`.${Context.prefixClass('filter-grid-item')}`) || [];
    items.forEach(item => {
      if(item.getAttribute('data-value') !== value) {
        item.classList.remove('active')
      }
    });
    this.doItemFilter({value, text, name});
    classList.toggle('toggle')
  }

  renderOrder(group) {
    const { getSelect } = this.props;
    const { name, items } = group;
    let currentSelectData = getSelect()[name];
    if (!currentSelectData || !currentSelectData[0] || !currentSelectData[0].value) {
      currentSelectData = [items[0]]
    }
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
                data-name={name}
                data-value={item.value}
                data-text={typeof item.text === 'string' ? item.text : typeof item.text === 'function' ? item.text().toString() : ''}
                onClick={this.onOrderItemClick}
              >
                {typeof item.text === 'string' ? item.text : typeof item.text === 'function' ? item.text() : ''}
                {
                  isSelected
                    ? <Icon className={'icon'} width={20} height={20} name={'check'}/>
                    : null
                }
              </div>
            )
          })
        }
      </div>
    );
  }

  renderSelectTitle(group) {
    const { tip } = group;
    return (
      tip ? <p className={Context.prefixClass('filter-group-title')}>{tip}</p> : null
    )
  }

  renderSelectFooter(group) {
    const { _groupKey_, multiSelect } = group;
    if (_groupKey_ !== '_super_' && multiSelect !== false) {
      return (
        <div className={Context.prefixClass('filter-grid-footer')}>
          <Button.Group>
            <Button type={'secondary'} display={'inline'} onClick={() => {
              this.resetSelect(group.name)
            }}>重 置</Button>
            <Button type={'primary'} display={'inline'} onClick={() => {
              this.confirm()
            }}>确 定</Button>
          </Button.Group>
        </div>
      )
    }
  }

  renderSelect(group) {
    const { getSelect } = this.props;
    const { items, maxLine, name, multiSelect } = group;
    const currentSelectData = getSelect()[name];

    const max = maxLine || 4;
    let renderItems;
    if (items.length > 3 * (max)) {
      renderItems = deepCopy(items);
      renderItems.length = 3 * max - 1;
      renderItems.push({
        value: 'showAll',
        text: () => {
          return (
            <div data-name={name}>
              <span>全部</span>
              <Icon className={Context.prefixClass('filter-show-all-icon')} name={'angle-right'} width={20} height={20} fill={'#555'} />
            </div>
          )
        },
      });
    } else {
      renderItems = items
    }
    return (
      <div className={Context.prefixClass('filter-grid-row')}>
        {this.renderSelectTitle(group)}
        <Grid col={3} noLine ref={c => { this.grids[name] = c}}>
          {renderItems.map(item => {
            let isSelected = false;
            if (currentSelectData && currentSelectData.find(i => {
              return i.value === item.value
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
                data-name={name}
                data-multi={multiSelect}
                data-value={item.value}
                data-text={typeof item.text === 'string' ? item.text : typeof item.text === 'function' ? item.text().toString() : ''}
                onClick={this.onItemClick}
              >
                {typeof item.text === 'string' ? item.text : typeof item.text === 'function' ? item.text() : ''}
              </div>
            )
          })}
        </Grid>
        {this.renderSelectFooter(group)}
        {this.renderPicker()}
      </div>
    );
  }

  resetSuper() {
    const { setSelect, getSelect, options } = this.props;
    const { children } = options.groups[options.groups.length - 1];
    const selectData = getSelect();
    let resetNames = [];
    children.forEach((item) => {
      if (selectData[item.name]) {
        resetNames.push(item.name);
        setSelect({
          [item.name]: null
        })
      }
    });
    this.reset(resetNames);
  }

  resetSelect(name) {
    const { setSelect } = this.props;
    setSelect({
      [name]: null
    });
    this.reset([name]);
  }

  reset(names) {
    const { onReset, setActiveIndex, getSelect, onConfirm } = this.props;
    setActiveIndex(-1);
    const selected = getSelect();
    onReset({
      resetNames: names,
      allSelected: selected
    });
    onConfirm(selected);
  }

  confirm() {
    const { onConfirm, getSelect, setActiveIndex } = this.props;
    setActiveIndex(-1);
    onConfirm(getSelect());
  }

  handleSwitchChange(group, isOn) {
    const { setSelect } = this.props;
    setSelect({
      [group.name]: !isOn ? null : [group.items[0]]
    });
  }

  renderPicker() {
    const { showPicker, pickerOptions, multiple, name, value } = this.state;
    const { setSelect } = this.props
    return (
      <Picker
        value={value}
        options={pickerOptions}
        multiple={multiple}
        showSearch={false}
        onConfirm={(value) => {
          if (!multiple) {
            this.doItemFilter({value: value[0].value, text: value[0].text, name})
          } else {
            setSelect({
              [name]: value
            });
          }
          this.setState({
            showPicker: false
          })
        }}
        confirmText={'确认'}
        filterOption={false}
        onVisibleChange={(visible) => {
          if (!visible) {
            this.setState({
              showPicker: false
            });
          }
        }}
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
    )
  }

  renderCustomView(item) {
    const View = item.renderView;
    const { setSelect, getSelect, setActiveIndex } = this.props;
    return (
      <div key={item.name}>
        <View
          name={item.name}
          selectedDate={getSelect()}
          onChange={(selected) => {
            if (item.multiSelect === false) {
              if (item._groupKey_ !== '_super_' ) {
                setActiveIndex(-1)
              }
              this.doItemFilter({value: selected[0].value, text: selected[0].text, name: item.name})
            } else {
              setSelect({[item.name]: selected});
            }
          }}
          props={this.props}
        />
        {this.renderSelectFooter(item)}
      </div>
    )
  }

  renderSuper(group) {
    const { setActiveIndex, getSelect } = this.props;
    const { children } = group;
    if (!children || !children.length) {
      return null;
    }
    return (
      <Popup
        stopBodyScrolling = {false}
        content={
          <div className={Context.prefixClass('filter-popup-container')} style={{ height: window.innerHeight - 84 }}>
            {group.children.map(item => {
              if (!item.name) {
                return null
              }
              const View = item.renderView;
              if (View && typeof View === 'function') {
                return this.renderCustomView(item)
              }
              if (item.type === 'switch') {
                const currentSelectedData = getSelect()[item.name];
                const isOn = !!(currentSelectedData && currentSelectedData.length);
                return (
                  <div className={'switch-wrapper'} key={item.name}>
                    <label className="label">{!isOn ? item.title : currentSelectedData[0].text}</label>
                    <Switch on={isOn} onChange={() => { this.handleSwitchChange(item, !isOn)}} />
                  </div>
                );
              }
              item.tip = item.title;
              if (item.items.length > 8) {
                item.needCollapse = true
              }
              return (
                <div key={item.name}>
                  {this.renderPanel(item)}
                </div>
              )
            })}
            <div className={Context.prefixClass('filter-popup-footer')}>
              <Button.Group>
                <Button type={'secondary'} display={'inline'} onClick={() => {
                  this.resetSuper()
                }}>重 置</Button>
                <Button type={'primary'} display={'inline'} onClick={() => {
                  this.confirm()
                }}>确 定</Button>
              </Button.Group>
            </div>
            {this.renderPicker()}
          </div>
        }
        animationType="slide-left"
        onMaskClick={() => {
          setActiveIndex(-1)
        }}
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
      case 'order':
        return this.renderOrder(group);
      case 'select':
        return this.renderSelect(group);
      case 'super':
        return this.renderSuper(group);
      default:
        if (group.renderView && typeof group.renderView === 'function') {
          return this.renderCustomView(group)
        }
        return null
    }
  }

  render() {
    const { options, activeIndex } = this.props;
    const group = options.groups[activeIndex];
    return (
      <div className={Context.prefixClass('filter-panel-wrapper')}>
        {this.renderPanel(group)}
      </div>
    )
  }
}

export default FilterPanel;
