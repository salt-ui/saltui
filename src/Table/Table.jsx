/**
 * Table Component for SaltUI
 * @author sujingjing
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import deepcopy from 'lodash/cloneDeep';
import deepEqual from 'lodash/isEqual';
import React from 'react';
import Scroller from '../Scroller';
import Context from '../Context';
import Pagination from '../Pagination';
import Icon from 'salt-icon'
import Popup from '../Popup'

class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: this.processColumns(props),
      prevColumns: deepcopy(props.columns),
      subTableVisible: false,
      subTableData: [],
      // 是否存在子表格，用于初始状态下最右侧列的显示判断
      hasSubTable: this.hasSubTable()
    };
  }

  /**
   * 为 column 添加默认值
   */
  processColumns(props) {
    // const newProps = props;
    let columns = deepcopy(props.columns).map((column) => {
      const columns = column;
      columns.width = Context.rem((columns.width || 0.25) * 640, 640);
      columns.align = columns.align || 'left';
      return columns;
    });
    // arrow
    columns.push({
      dataKey: 'actionColumn',
      title: '',
      align: 'center',
      width: Context.rem(40, 640),
      render: (cellData, item) => {
        return this.renderActionColumn(cellData, item)
      }
    });
    return columns
  }

  hasSubTable() {
    const { data } = this.props.data || [];
    let ret = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].data && data[i].data.length) {
        ret = true;
        break
      }
    }
    return ret;
  }

  toggleSubTable = (data) => {
    this.setState({
      subTableVisible: !this.state.subTableVisible,
      subTableData: data
    })
  }

  renderActionColumn(cellData, item) {
    if (item.data && item.data.length) {
      return <Icon className={Context.prefixClass('table-row-item-icon')} onClick={() => { this.toggleSubTable({
        totalCount: item.data.length,
        currentPage: 1,
        data: item.data
      }) }} width={20} name={'angle-right'} />
    }
    return null
  }

  componentDidMount() {
    this.checkScroll(this.getIscroll());
  }

  renderRow(options, isSubTable) {
    const { item, index, columns } = options;
    return (
      <div
        className={classnames(Context.prefixClass('table-row'))}
        key={index}
      >
        {columns.map((column, i) => {
          const rowItemStyle = {
            width: column.width,
            textAlign: column.align,
          };
          const isActionColumn = column.dataKey === 'actionColumn';
          // todo don't support third subrow
          if (isActionColumn && (isSubTable || !this.state.hasSubTable)) {
            return null
          }
          return (
            <div
              className={classnames(Context.prefixClass('table-row-item DIB omit'), {
                firstRow: index === 0,
                [Context.prefixClass('PL12 PR12')]: !isActionColumn,
                [Context.prefixClass('arrow-column')]: isActionColumn
              })}
              style={rowItemStyle}
              key={i}
            >
              {column.render ? column.render(item[column.dataKey], item) : item[column.dataKey]}
            </div>
          );
        })}
      </div>
    );
  }

  renderHeader(columns, isSubTable){
    const cl = columns.length;
    return (
      <div
        className={classnames(Context.prefixClass('table-header'))}
      >
        <div className={Context.prefixClass('table-header-main')}>
          {columns.map((column, index) => {
            const headerItemStyle = {
              width: column.width,
              textAlign: column.align,
            };
            const isActionColumn = column.dataKey === 'actionColumn';
            // todo don't support third subrow
            if (isActionColumn && (isSubTable || !this.state.hasSubTable)) {
              return null
            }

            return (
              <div
                className={classnames(Context.prefixClass('table-header-item omit DIB'), {
                  firstRow: index === 0,
                  lastRow: index === cl - 1,
                  [Context.prefixClass('PL12 PR12')]: isActionColumn
                })}
                style={headerItemStyle}
                key={index}
              >
                {column.title}
              </div>);
          })}
        </div>

      </div>
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!deepEqual(prevState.prevColumns, nextProps.columns)) {
      // 不在这里更新 this.columns 是因为后面 didUpdate 时还用的到。
      const columns = this.processColumns(nextProps);

      return {
        columns,
        prevColumns: deepcopy(nextProps.columns),
      };
    }

    return null;
  }

  componentDidUpdate() {
    this.checkScroll(this.getIscroll());
  }

  getIscroll() {
    return this.scroller.scroller;
  }

  handlePagerChange(current, isSubTable) {
    console.log(current, isSubTable)
    const { onSubTablePagerChange, onPagerChange } = this.props;
    if (isSubTable) {
      onSubTablePagerChange(current)
    } else {
      onPagerChange(current)
    }
  }

  checkScroll(iscroll) {
    const { maxScrollX, startX } = iscroll;
    const scrollClassName = Context.prefixClass('table-fixed__has-scroll');

    if (this.leftFixed) {
      if (startX !== undefined) {
        if (startX === 0) {
          this.leftFixed.classList.remove(scrollClassName);
        } else {
          this.leftFixed.classList.add(scrollClassName);
        }
      }
    }

    if (this.rightFixed) {
      if (startX !== undefined) {
        if (startX === maxScrollX) {
          this.rightFixed.classList.remove(scrollClassName);
        } else {
          this.rightFixed.classList.add(scrollClassName);
        }
      } else if (maxScrollX < 0) {
        this.rightFixed.classList.add(scrollClassName);
      }
    }
  }

  renderBody(columns, fixed, isSubTable) {
    const t = this;
    const data = isSubTable ? t.state.subTableData : t.props.data;
    let content = '';
    if (data.data && data.data.length) {
      content = data.data.map((item, index) => {
        let last = false;
        if (index === data.data.length - 1) {
          last = true;
        }
        return this.renderRow({
          item,
          index,
          last,
          columns,
          fixed,
        }, isSubTable);
      });
    } else {
      content = t.renderEmptyContent();
    }
    return (
      <div
        className={classnames(Context.prefixClass('table-body FS12 FC6 BCf'))}
      >
        {content}
      </div>
    );
  }

  renderEmptyContent() {
    const t = this;
    const { emptyText } = t.props;
    const screenWidth = window.innerWidth || document.body.clientWidth;
    return (
      <div
        className={classnames(Context.prefixClass('table-empty-content H40 FC9 FAC'))}
        style={{
        width: screenWidth,
      }}
      >
        {emptyText}
      </div>);
  }


  renderPager(isSubTable) {
    const t = this;
    const { pageSize, subTablePageSize } = t.props;
    const data = isSubTable ? this.state.subTableData : t.props.data;
    if (isSubTable && data.totalCount <= subTablePageSize) {
      return null
    }
    if (data.totalCount && data.currentPage) {
      return (<Pagination
        className={Context.prefixClass('table-pager')}
        total={data.totalCount}
        current={data.currentPage}
        onChange={(current) => { t.handlePagerChange(current, isSubTable); }}
        pageSize={isSubTable ? subTablePageSize : pageSize}
      />);
    }
    return null;
  }

  renderFixed(columns, direction, isSubTable) {
    const t = this;
    let columnsValue = columns;
    const { leftFixed, rightFixed } = t.props;
    if (direction === 'left') {
      columnsValue = columnsValue.slice(0, leftFixed);
    } else {
      columnsValue = columnsValue.slice(columnsValue.length - rightFixed - 1, columnsValue.length);
      if (columnsValue.length === 1 && columns.length < 5) {
        columnsValue = []
      }
    }
    if (columnsValue.length) {
      return (
        <div
          className={classnames(Context.prefixClass(`table-${direction}-fixed PA`), {
            'only-arrow': direction === 'right' && columnsValue.length === 1
          })}
          ref={(c) => { this[`${direction}Fixed`] = c; }}
        >
          {t.props.showHeader ? this.renderHeader(columnsValue, isSubTable) : null}
          {t.renderBody(columnsValue, true, isSubTable)}
        </div>
      );
    }
    return null;
  }

  renderSubTable() {
    const { subTableVisible } = this.state;
    return(
      <Popup
        content={this.renderTable(true)}
        animationType="slide-up"
        onMaskClick={() => { this.setState({ subTableVisible: false }); }}
        visible={subTableVisible}
      >
        {null}
      </Popup>
    )
  }

  renderTable(isSubTable) {
    const t = this;
    const { className } = t.props;
    const { columns } = t.state;
    const scrollerProps = {
      ref: (c) => { this.scroller = c; },
      bounce: false,
      mouseWheel: !!Context.isPC,
      scrollX: true,
      scrollY: false,
      eventPassthrough: true,
      preventDefault: false,
      onScrollStart: (iscroll) => {
        this.checkScroll(iscroll);
      },
      onScrollEnd: (iscroll) => {
        this.checkScroll(iscroll);
      },
    };
    return (
      <div
        className={classnames(Context.prefixClass('FS12 PR'), {
          [className]: !!className,
          [Context.prefixClass(isSubTable ? 'table sub-table': 'table')]: true,
          'hide-rows-split-line': t.props.hideSplitLine,
        })}
      >
        {isSubTable ? <div className={'sub-table-back'} onClick={() => {this.setState({subTableVisible: false})}}>返回</div> : null}
        <div style={{position: 'relative'}}>
          <Scroller {...scrollerProps} className={Context.prefixClass('table-content-container')}>
            <div ref={(c) => { t.mainTable = c; }} className={Context.prefixClass('table-content')}>
              {t.props.showHeader ? this.renderHeader(columns, isSubTable) : null}
              {t.renderBody(columns, false, isSubTable)}
            </div>
          </Scroller>
          {t.renderFixed(columns, 'left', isSubTable)}
          {t.renderFixed(columns, 'right', isSubTable)}
          {t.renderPager(isSubTable)}
        </div>
        {isSubTable ? null : t.renderSubTable()}
      </div>
    );
  }

  render() {
    return this.renderTable()
  }
}

Table.defaultProps = {
  data: {},
  // 展示类型
  displayType: 'table',
  pageSize: 10,
  // 子表格显示行数
  subTablePageSize: 8,
  emptyText: '暂无数据',
  leftFixed: 0,
  hideSplitLine: false,
  rightFixed: 0,
  showHeader: true,
  onPagerChange: () => {},
  // 子表格翻页回调
  onSubTablePagerChange: () => {},
  columns: undefined,
  className: undefined,
};

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.object,
  displayType: PropTypes.oneOf(['table', 'list']),
  pageSize: PropTypes.number,
  subTablePageSize: PropTypes.number,
  onSubTablePagerChange: PropTypes.func,
  emptyText: PropTypes.string,
  className: PropTypes.string,
  showHeader: PropTypes.bool,
  leftFixed: PropTypes.number,
  rightFixed: PropTypes.number,
  hideSplitLine: PropTypes.bool,
  onPagerChange: PropTypes.func,
};

Table.displayName = 'Table';


export default Table;
