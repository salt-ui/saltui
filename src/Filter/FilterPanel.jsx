import react from 'react'
import Context from "../Context/Context";
import Popup from '../Popup'
import Icon from 'salt-icon'
import Button from '../Button'
import classnames from "classnames";
import deepCopy from "lodash/cloneDeep";
import Grid from '../Grid'
import Picker from '../Picker'
import Switch from '../Switch';


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
      name: '',
      value: []
    }
  }

  onItemClick = e => {
    const target = e.currentTarget;
    const name = target.getAttribute('data-name');
    const value = target.getAttribute('data-value');
    const text = target.getAttribute('data-text');
    const classList = target.classList;

    if (!value || value === 'showAll') {
      this.showAll(name);
      return
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
      setActiveIndex
    } = this.props;
    const { _backItems } = options;
    const group = _backItems.find((item) => {
      return item.name === name
    });
    const selectData = getSelect();
    const currentSelectData = selectData[name] || [];

    if (!group.multiSelect) {
      setSelect({
        [name]: !currentSelectData.length || currentSelectData[0].value !== value ? [{ text, value }] : null
      });
      setActiveIndex(-1)
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

  renderOrder(group) {
    const { getSelect } = this.props;
    const { name, items } = group;
    const currentSelectData = getSelect()[name];
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
                onClick={this.onItemClick}
              >
                {typeof item.text === 'string' ? item.text : typeof item.text === 'function' ? item.text() : ''}
                {
                  isSelected
                    ? <Icon className={'icon'} width={26} height={26} name={'check'} fill={'#ff6f00'}/>
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
    if (_groupKey_ !== '_super_' && multiSelect) {
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
    const { items, maxLine, name } = group;
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
            <div data-name={group.name}>
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
        <Grid col={3} noLine>
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
      </div>
    );
  }

  resetSuper() {
    const { setSelect, getSelect, options } = this.props;
    const { children } = options.groups[options.groups.length - 1];
    const selectData = getSelect();
    children.forEach((item) => {
      if (selectData[item.name]) {
        setSelect({
          [item.name]: null
        })
      }
    });
    this.reset();
  }

  resetSelect(name) {
    const { setSelect } = this.props;
    setSelect({
      [name]: null
    });
    this.reset();
  }

  reset() {
    const { onReset, setActiveIndex, getSelect } = this.props;
    setActiveIndex(-1);
    onReset(getSelect());
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
  renderSuper(group) {
    const { showPicker, pickerOptions, multiple, name, value } = this.state;
    const { setActiveIndex, setSelect, getSelect } = this.props;
    const { children } = group;
    if (!children || !children.length) {
      return null;
    }
    return (
      <Popup
        stopBodyScrolling
        content={
          <div className={Context.prefixClass('filter-popup-container')} style={{ height: window.innerHeight - 84 }}>
            {group.children.map(item => {
              if (!item.name) {
                return null
              }
              const View = item.renderView;
              if (View && typeof View === 'function') {
                return (
                  <View
                    key={item.name}
                    name={item.name}
                    selectedDate={getSelect()}
                    onChange={setSelect}
                    props={this.props}
                  />
                )
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
            <Picker
              value={value}
              options={pickerOptions}
              multiple={multiple}
              showSearch={false}
              onConfirm={(value) => {
                setSelect({
                  [name]: value
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