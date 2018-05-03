import React from 'react';
import PropTypes from 'prop-types';
import DelIcon from 'salt-icon/lib/MinusRound';
import deepCopy from 'lodash/cloneDeep';
import deepEqual from 'lodash/isEqual';
import Context from '../Context';
import Avatar from '../Avatar';
import FoldablePane from '../FoldablePane';

class EmployeeList extends React.Component {
  static propTypes = {
    readOnly: PropTypes.bool,
    col: PropTypes.number,
    list: PropTypes.array,
    onDel: PropTypes.func,
  };

  static defaultProps = {
    readOnly: false,
    col: 5,
    list: [],
    onDel: () => {},
  };

  static displayName = 'EmployeeField';

  constructor(props) {
    super(props);
    this.state = {
      foldablePaneHeight: 164,
      isFold: true,
    };
  }

  componentDidMount() {
    this.resetFoldablePane();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !deepEqual(nextProps, this.props) || !deepEqual(nextState, this.state);
  }

  componentDidUpdate() {
    this.resetFoldablePane();
  }

  onFold(isFold) {
    this.setState({
      isFold,
    });
  }

  resetFoldablePane() {
    // 计算第一行和第二行的高度，赋值给FoldablePane
    const row0H = this.row0 ? this.row0.offsetHeight : 0;
    const row1H = this.row1 ? this.row1.offsetHeight : 0;
    this.setState({
      foldablePaneHeight: row0H + row1H + 1,
      isFold: this.state.isFold,
    });
  }

  /**
   * 重造数组。
   * 首先对col求余，把原数组补全成能够被col整除的数组
   * （由于使用了flex justify-content: space-between 布局，为避免一行元素不够时空间被平分导致元素不对齐，所以补齐数组）
   * 然后再对原数组按照col进行分组
   * */
  makeUpList(list) {
    const col = parseInt(this.props.col, 10);
    const lists = [];
    const copyList = deepCopy(list);
    const extraLen = copyList.length % col;
    const lostLen = extraLen ? col - extraLen : extraLen;
    for (let i = 0; i < lostLen; i++) {
      copyList.push('PLACEHOLDER');
    }
    const len = copyList.length / col;
    for (let i = 0; i < len; i++) {
      lists.push(copyList.splice(0, col));
    }
    return lists;
  }

  renderItem(item, idx) {
    if (item === 'PLACEHOLDER') {
      return <div className={Context.prefixClass('employee-field-list-item-placeholder')} key={idx} />;
    }
    return (
      <div className={Context.prefixClass('PR employee-field-list-item')} key={idx}>
        <Avatar
          className={Context.prefixClass('employee-field-list-item-avatar')}
          name={item.label}
          src={item.avatar}
          size={48}
        />
        <p className={Context.prefixClass('omit2 employee-field-list-item-name')}>
          {item.label}
        </p>
        {
          this.props.readOnly ? '' :
          <div
            className={Context.prefixClass('PA employee-field-list-item-del')}
            onClick={(e) => { this.props.onDel(item.key, e); }}
          >
            <DelIcon
              width={18}
              height={18}
            />
          </div>
        }
      </div>
    );
  }

  render() {
    const lists = this.makeUpList(this.props.list);
    if (!lists.length) {
      return null;
    }
    /* eslint-disable react/no-array-index-key */
    return (
      <FoldablePane
        className={Context.prefixClass('employee-field-foldable-pane')}
        foldHeight={this.state.foldablePaneHeight}
        isFold={this.state.isFold}
        onFold={(isFold) => { this.onFold(isFold); }}
      >
        <div
          className={Context.prefixClass('employee-field-list')}
        >
          {
            lists.map((list, index) => (
              <div
                ref={(c) => { this[`row${index}`] = c; }}
                key={index}
                className={Context.prefixClass('FBH FBJ employee-field-list-row')}
              >
                {
                  list.map((item, idx) => this.renderItem(item, idx))
                }
              </div>
            ))
          }
        </div>
      </FoldablePane>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

export default EmployeeList;
