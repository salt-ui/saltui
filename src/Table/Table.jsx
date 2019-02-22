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
import { polyfill } from 'react-lifecycles-compat';
import deepEqual from 'lodash/isEqual';
import chunk from "lodash/chunk";
import React from 'react';
import Scroller from '../Scroller';
import Context from '../Context';
import Pagination from '../Pagination';
import Icon from 'salt-icon'
import Popup from '../Popup'

class Table extends React.Component {

  constructor(props) {
    super(props);
    const hasSubTable = this.hasSubTable();
    this.state = {
      columns: Table.processColumns(props, hasSubTable),
      prevColumns: deepcopy(props.columns),
      subTableVisible: false,
      subTableData: {},
      rowData: {},
      subColumns: [],
      // 是否存在子表格，用于初始状态下最右侧列的显示判断
      hasSubTable
    };
  }

  /**
   * 为 column 添加默认值
   */
  static processColumns(props, hasSubTable) {
    // const newProps = props;
    let columns = deepcopy(props.columns).map((column) => {
      const columns = column;
      columns.width = Context.rem((columns.width || 0.25) * (hasSubTable && props.columns.length > 3 ? 598 : 640), 640);
      columns.align = columns.align || 'left';
      return columns;
    });
    // arrow
    columns.push({
      dataKey: 'actionColumn',
      title: '',
      align: 'center',
      width: Context.rem(40, 640),
      rightFixed: true,
      render(cellData, rowData, isSubTable) {
        return this.renderActionColumn(cellData, rowData, isSubTable)
      }
    });
    return columns
  }

  hasSubTable() {
    const { data } = this.props.data || [];
    let ret = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i] && data[i].data && data[i].data.length) {
        ret = true;
        break
      }
    }
    return ret;
  }

  toggleSubTable = (subData, rowData) => {
    const columns = subData.columns;
    this.subTablePageData = chunk(subData.data, this.props.subTablePageSize);
    this.setState({
      subTableVisible: !this.state.subTableVisible,
      subTableData: {
        ...subData,
        data: this.subTablePageData[0],
      },
      rowData,
      subColumns: columns || []
    })
  }

  renderActionColumn(cellData, rowData, isSubTable) {
    if (rowData.data && rowData.data.length) {
      return (
        <Icon
          className={Context.prefixClass('table-row-item-icon')}
          style={{
            opacity: isSubTable ? 0 : 1
          }}
          onClick={() => {
            if (isSubTable) {
              return
            }
            this.toggleSubTable({
              totalCount: rowData.data.length,
              currentPage: 1,
              data: rowData.data,
              columns: rowData.columns
            }, rowData)
          }}
          width={20}
          height={18}
          name={'angle-right'}
        />
      )
    }
    // 需要占位一下，否则会导致样式错误
    return <div style={{display: 'inline-block'}} />
  }

  componentDidMount() {
    this.checkScroll(this.getIscroll());
  }

  renderRow(options, isSubTable) {
    const { rowData, index, columns } = options;
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
          if (isActionColumn && (!this.state.hasSubTable)) {
            return null
          }
          return (
            <div
              className={classnames({
                firstRow: index === 0,
                [Context.prefixClass('table-row-item DIB omit')]: true,
                [Context.prefixClass('PL12 PR12')]: !isActionColumn,
                [Context.prefixClass('arrow-column')]: isActionColumn
              })}
              style={rowItemStyle}
              key={i}
            >
              {column.render ? column.render.call(this, rowData[column.dataKey], rowData, isSubTable) : rowData[column.dataKey]}
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
            if (isActionColumn && (!this.state.hasSubTable)) {
              return null
            }

            return (
              <div
                className={classnames({
                  firstRow: index === 0,
                  lastRow: index === cl - 1,
                  [Context.prefixClass('table-header-item omit DIB')]: !isActionColumn,
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
      const columns = Table.processColumns(nextProps);
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
      this.setState({
        subTableData: {
          ...this.state.subTableData,
          data: this.subTablePageData[current - 1]
        }
      })
      onSubTablePagerChange(current)
    } else {
      onPagerChange(current)
    }
  }

  checkScroll(iscroll) {
    const { maxScrollX, startX } = iscroll;
    const scrollClassName = Context.prefixClass('table-fixed__has-scroll');

    if (this.leftFixed) {
      const classList = this.leftFixed.classList;
      if (startX !== undefined) {
        if (startX === 0) {
          classList.remove(scrollClassName);
        } else {
          classList.add(scrollClassName);
        }
      }
    }

    if (this.rightFixed) {
      const classList = this.rightFixed.classList

      if (startX !== undefined) {
        if (startX === maxScrollX || this.state.columns.length < 5) {
          classList.remove(scrollClassName);
        } else {
          classList.add(scrollClassName);
        }
      } else if (maxScrollX < 0) {
        classList.add(scrollClassName);
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
          rowData: item,
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

  getFixedColumns(columns) {
    const { leftFixed, rightFixed } = this.props;
    let leftFixedColumns = [];
    let rightFixedColumns = [];
    if (leftFixed || rightFixed) {
      if (leftFixed) {
        leftFixedColumns = columns.slice(0, leftFixed)
      }
      if (rightFixed) {
        rightFixedColumns = columns.slice(columns.length - rightFixed - 1, columns.length)
        if (rightFixedColumns.length === 1 && columns.length < 5) {
          rightFixedColumns = []
        }
      }
    } else {
      columns.map(column => {
        if (column.fixed) {
          leftFixedColumns.push(column)
        } else if (column.rightFixed){
          rightFixedColumns.push(column)
        }
      });
    }
    return {
      leftFixedColumns,
      rightFixedColumns
    }
  }

  renderFixed(columns, isSubTable) {
    const t = this;
    const scrollClassName = Context.prefixClass('table-fixed__has-scroll');
    let columnsValue = t.getFixedColumns(columns);
    return ['left', 'right'].map(direction => {
      const cols = columnsValue[`${direction}FixedColumns`];
      const onlyArrow = direction === 'right' && cols.length === 1
      if (!cols.length || onlyArrow && columns.length < 5) {
        return null
      }
      return (
        <div
          key={direction}
          className={classnames(Context.prefixClass(`table-${direction}-fixed PA`), {
            'only-arrow': onlyArrow,
            [scrollClassName]: isSubTable && direction === 'right' && columns > 5
          })}
          ref={(c) => { this[`${direction}Fixed`] = c; }}
        >
          {t.props.showHeader ? this.renderHeader(cols, isSubTable) : null}
          {t.renderBody(cols, true, isSubTable)}
        </div>
      )
    })
  }

  renderSubTablePopup() {
    const { renderSubComp } = this.props;
    const { subTableVisible, subTableData, rowData } = this.state;
    return(
      <Popup
        content={renderSubComp ? (() => {
          if (!subTableData.data || !subTableData.data.length) {
            return null
          }
          return renderSubComp.bind(this)(subTableData, rowData)
        })() : this.renderTable(true)}
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
    const { className, subTableClassName, showPager } = t.props;
    const { columns, subColumns } = t.state;
    const subTableColumns = subColumns.length ? Table.processColumns({columns: subColumns} ) : columns;
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
    const customClassName = isSubTable ? subTableClassName : className;
    return (
      <div
        className={classnames(Context.prefixClass('FS12 PR'), {
          [customClassName]: !!customClassName,
          [Context.prefixClass(isSubTable ? 'table sub-table': 'table')]: true,
          'hide-rows-split-line': t.props.hideSplitLine,
        })}
      >
        {isSubTable ? <div className={'sub-table-back'} onClick={() => {this.setState({subTableVisible: false})}}>返回</div> : null}
        <div style={{position: 'relative'}}>
          <Scroller {...scrollerProps} className={Context.prefixClass('table-content-container')}>
            <div ref={(c) => { t.mainTable = c; }} className={Context.prefixClass('table-content')}>
              {t.props.showHeader ? this.renderHeader(isSubTable ? subTableColumns : columns, isSubTable) : null}
              {t.renderBody(isSubTable ? subTableColumns : columns, false, isSubTable)}
            </div>
          </Scroller>
          {t.renderFixed(isSubTable ? subTableColumns : columns, isSubTable)}
          {showPager ? t.renderPager(isSubTable) : null}
        </div>
        {isSubTable ? null : t.renderSubTablePopup()}
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
  subTableClassName: undefined,
  renderSubComp: undefined,
  showPager: true
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
  subTableClassName: PropTypes.string,
  showHeader: PropTypes.bool,
  leftFixed: PropTypes.number,
  rightFixed: PropTypes.number,
  hideSplitLine: PropTypes.bool,
  onPagerChange: PropTypes.func,
  renderSubComp: PropTypes.func,
  showPager: PropTypes.bool
};

Table.displayName = 'Table';
polyfill(Table);

export default Table;
