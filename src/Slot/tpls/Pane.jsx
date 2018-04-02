/**
 * Slot Component for tingle
 * @author caoke.ck
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

const React = require('react');
const classnames = require('classnames');
const Context = require('../../Context');
const Scroller = require('../../Scroller');
const PropTypes = require('prop-types');

// 滑动效果的动画函数
const LINEAR_EASE = {
  style: 'linear',
  fn: k => k,
};

const equals = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

class SlotPane extends React.Component {
  static displayName = 'SlotPane'

  static propTypes = {
    visible: PropTypes.bool,
    // className: PropTypes.string,
    data: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func,
    onScrolling: PropTypes.func,
    scrollMod: PropTypes.string,
    columns: PropTypes.array,
    columnsFlex: PropTypes.array,
  }

  static defaultProps = {
    visible: true,
    // className:'',
    value: [],
    data: [],
    onChange() { },
    onScrolling() { },
    scrollMod: 'reset',
    columns: [],
    columnsFlex: undefined,
  }

  constructor(props) {
    super(props);

    const t = this;
    // 初始状态
    t.state = {
      scrolling: false,
      data: this.props.data || [],
      selectedIndex: t.findSelectedIndex(this.props),
    };
  }


  componentDidMount() {
    const t = this;

    // 获取所有 scroller 的容器
    const slotBody = t.pane.querySelector(`.${Context.prefixClass('slot-body')}`);

    // 获取选项高度
    t.findItemHeight(slotBody);

    // tap 事件触发选中状态变更
    slotBody.addEventListener('iscroll:tap', (e) => {
      const { className } = e.target;
      const reg = new RegExp(Context.prefixClass('slot-item(\\d+)_(\\d+)'));
      const match = reg.exec(className);
      if (match && className.indexOf(Context.prefixClass('slot-item-active')) === -1) {
        const column = parseInt(match[1], 10);
        const index = parseInt(match[2], 10);
        t.props.onChange(t.getData(column, index), column, index);
      }
    }, false);

    // 初始化滚动的标记
    t.willRefresh = true;
    this.scrollAll(0);
  }


  // 减少渲染次数
  componentWillReceiveProps(nextProps) {
    const t = this;

    const { data } = nextProps;
    const selectedIndex = t.findSelectedIndex(nextProps);

    // 数据变化需要重新初始化 scroller
    const state = {};
    let willRefresh = false;
    if (!equals(t.state.data, data)) {
      state.data = data;
      if (t.props.scrollMod === 'keep') { // 替换列后仍保留指定值的位置
        // 记录旧值在新数据中的索引
        t.selectedIndex = t.findSelectedIndex({
          data,
          value: t.state.selectedIndex.map((n, i) => t.state.data[i][n]),
        });
        // 标记变更的列
        t.columnChanged = t.state.data.map((n, i) => !equals(data[i], n));
      }
      willRefresh = true;
    }
    if (!equals(t.state.selectedIndex, selectedIndex)) {
      state.selectedIndex = selectedIndex;
      willRefresh = true;
    }
    if (willRefresh) {
      t.willRefresh = true;
      t.setState(state);
    }
  }

  componentDidUpdate() {
    const t = this;

    // 获取选项高度
    t.findItemHeight();

    // 可见的时候滚动到选中的选项
    if (t.willRefresh) {
      t.willRefresh = false;
      t.scrollAll(200);
    }
  }

  // 获取值的时候指定变更的列，为什么要这么做，是因为有变更后我不直接改 state！
  getData(sColumn, sIndex) {
    const t = this;
    const ret = [];
    const { data, selectedIndex } = t.state;

    selectedIndex.forEach((index, column) => {
      ret[column] = data[column][column === sColumn ? sIndex : index];
    });

    return ret;
  }


  setDefaultLastChoose(value) {
    if (value && value.length > 0) {
      return value;
    }

    const ret = [];
    this.props.data.forEach((item) => {
      ret.push(item[0]);
    });

    return ret;
  }

  handleScrollEnd(column) {
    const t = this;
    t.setState({
      scrolling: false,
    }, () => {
      t.props.onScrolling(t.state.scrolling);
    });
    const { scroller } = t.refs[`scroller${column}`];
    const height = t.itemHeight;
    const remainder = Math.abs(scroller.y % height);
    let index = scroller.y / height;

    // 没有滚动到选项，需要继续滚动一段距离
    if (remainder) {
      let func;
      if (scroller.distY > 0) { // 向下滚动
        if (remainder < height * 0.7) {
          func = 'ceil';
        } else {
          func = 'floor';
        }
      } else if (remainder > height * 0.3) {
        // 向上滚动
        func = 'floor';
      } else {
        func = 'ceil';
      }


      index = Math[func](scroller.y / height);
    }

    // 在 onChange 中设置状态
    index = Math.abs(index);
    t.props.onChange(t.getData(column, index), column, index);
  }

  handleScrollStart() {
    const t = this;
    t.setState({
      scrolling: true,
    }, () => {
      t.props.onScrolling(t.state.scrolling);
    });
  }


  findSelectedIndex(props) {
    const data = props.data || [];
    const value = props.value || this.setDefaultLastChoose();
    const selectedIndex = [];

    // 遍历数据模型
    data.forEach((columnData, column) => {
      selectedIndex[column] = 0;

      // 遍历每一列
      for (let i = 0; i < columnData.length; i++) {
        // 定位选中值
        if (value[column] && columnData[i].value === value[column].value) {
          selectedIndex[column] = i;
          break;
        }
      }
    });

    return selectedIndex;
  }

  scrollAll(time) {
    const t = this;
    if (t.props.scrollMod === 'keep' && t.selectedIndex) {
      t.selectedIndex.forEach((index, column) => {
        const { scroller } = t.refs[`scroller${column}`];
        if (t.columnChanged[column]) {
          scroller.scrollTo(0, -index * t.itemHeight, 0, LINEAR_EASE);
        }
      });
      delete t.selectedIndex;
      setTimeout(() => {
        t.state.selectedIndex.forEach((index, column) => {
          const { scroller } = t.refs[`scroller${column}`];
          scroller.scrollTo(0, -index * t.itemHeight, time, LINEAR_EASE);
        });
      }, 5);
    } else {
      t.state.selectedIndex.forEach((index, column) => {
        const { scroller } = t.refs[`scroller${column}`];
        scroller.scrollTo(0, -index * t.itemHeight, time, LINEAR_EASE);
      });
    }
  }

  findItemHeight(slotBody) {
    const t = this;
    if (!t.itemHeight) {
      const newSlotBody = slotBody || t.pane.querySelector(`.${Context.prefixClass('slot-body')}`);
      const li = newSlotBody.querySelector('li');
      t.itemHeight = li ? parseFloat(getComputedStyle(li, null).height) : 0;
    }
  }

  render() {
    const t = this;
    const { visible, columnsFlex } = t.props;
    /* eslint-disable react/no-array-index-key */
    return (
      <div ref={(c) => { this.pane = c; }} className={Context.prefixClass('slot-pane')}>
        {t.props.columns && t.props.columns.length ? (
          <ul className={Context.prefixClass('slot-columns FBH')}>
            {t.props.columns.map((c, i) => {
              const style = {};
              if (columnsFlex instanceof Array && typeof columnsFlex[i] === 'number') {
                style.flex = columnsFlex[i];
              }
              return (
                <li key={`column${i}`} style={style} className={Context.prefixClass('FB1 FAC')}>{c}</li>
              );
            })}
          </ul>
        ) : null}
        <div className={Context.prefixClass('slot-body FBH FC9 PR')}>
          {t.state.data.map((m, i) => {
            const style = {};
            if (columnsFlex instanceof Array && typeof columnsFlex[i] === 'number') {
              style.flex = columnsFlex[i];
            }
            return (
              <Scroller
                ref={`scroller${i}`}
                key={`scroller${i}`}
                className={Context.prefixClass('FB1')}
                style={style}
                tap="iscroll:tap"
                bounce={false}
                // deceleration={0.001}
                autoRefresh={!!visible}
                onScrollStart={() => { t.handleScrollStart(); }}
                onScrollEnd={() => { t.handleScrollEnd(i); }}
              >
                <ul>
                  <li />
                  <li />
                  {m.map((n, j) => (
                    <li
                      key={`item${i}_${j}`}
                      className={classnames(Context.prefixClass(`slot-item${i}_${j}`), {
                        [Context.prefixClass('slot-item-active')]: j === t.state.selectedIndex[i],
                      })}
                    >{n.text}
                    </li>
                  ))}
                  <li />
                  <li />
                </ul>
              </Scroller>
            );
          })}
        </div>
      </div>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

module.exports = SlotPane;
