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

/* eslint-disable react/no-array-index-key */
const renderRow = (options) => {
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
        const isSubRowArrow = column.dataKey === 'subRowArrow';

        return (
          <div
            className={classnames(Context.prefixClass('table-row-item DIB omit'), {
              firstRow: index === 0,
              [Context.prefixClass('PL12 PR12')]: !isSubRowArrow,
              [Context.prefixClass('arrow-column')]: isSubRowArrow
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
};


const renderHeader = (columns) => {
  const cl = columns.length;
  return (
    <div
      className={classnames(Context.prefixClass('table-header'))}
    >
      {columns.map((column, index) => {
        const headerItemStyle = {
          width: column.width,
          textAlign: column.align,
        };
        return (
          <div
            className={classnames(Context.prefixClass('table-header-item omit DIB'), {
            firstRow: index === 0,
            lastRow: index === cl - 1,
            [Context.prefixClass('PL12 PR12')]: column.dataKey !== 'subRowArrow'
          })}
            style={headerItemStyle}
            key={index}
          >
            {column.title}
          </div>);
      })}
    </div>
  );
};
/* eslint-enable react/no-array-index-key */

class Table extends React.Component {
  /**
   * 为 column 添加默认值
   */
  static processColumns(props) {
    // const newProps = props;
    let columns = deepcopy(props.columns).map((column) => {
      const columns = column;
      columns.width = Context.rem((columns.width || 0.25) * 640, 640);
      columns.align = columns.align || 'left';
      return columns;
    });
    // arrow
    columns.push({
      dataKey: 'subRowArrow',
      title: '',
      align: 'center',
      width: Context.rem(40, 640),
      render(column, cellData) {
        debugger
        return '>'
      }
    });
    return columns
  }

  constructor(props) {
    super(props);
    this.state = {
      columns: Table.processColumns(props),
      prevColumns: deepcopy(props.columns),
    };
  }

  componentDidMount() {
    this.checkScroll(this.getIscroll());
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


  handlePagerChange(current) {
    this.props.onPagerChange(current);
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

  renderBody(columns, fixed) {
    const t = this;
    const { data } = t.props;
    let content = '';
    if (data.data && data.data.length) {
      content = data.data.map((item, index) => {
        let last = false;
        if (index === data.data.length - 1) {
          last = true;
        }
        return renderRow({
          item,
          index,
          last,
          columns,
          fixed,
        });
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

  renderSubRow() {

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


  renderPager() {
    const t = this;
    const { data, pageSize } = t.props;
    if (data.totalCount && data.currentPage) {
      return (<Pagination
        className={Context.prefixClass('table-pager')}
        total={data.totalCount}
        current={data.currentPage}
        onChange={(current) => { t.handlePagerChange(current); }}
        pageSize={pageSize}
      />);
    }
    return null;
  }

  renderFixed(columns, direction) {
    const t = this;
    let columnsValue = columns;
    const { leftFixed, rightFixed } = t.props;
    if (direction === 'left') {
      columnsValue = columnsValue.slice(0, leftFixed);
    } else {
      columnsValue = columnsValue.slice(columnsValue.length - rightFixed - 1, columnsValue.length);
    }
    if (columnsValue.length) {
      return (
        <div
          className={classnames(Context.prefixClass(`table-${direction}-fixed PA`), {
            'only-arrow': direction === 'right' && columnsValue.length === 1
          })}
          ref={(c) => { this[`${direction}Fixed`] = c; }}
        >
          {t.props.showHeader ? renderHeader(columnsValue) : null}
          {t.renderBody(columnsValue, true)}
        </div>
      );
    }
    return null;
  }

  renderActionColumn() {
    return 1
  }

  render() {
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
        className={classnames(Context.prefixClass('table FS12 PR'), {
          [className]: !!className,
          // 'hide-cols-split-line': t.props.hideSplitLine && t.props.leftFixed === 0,
          'hide-rows-split-line': t.props.hideSplitLine,
        })}
      >
        <Scroller {...scrollerProps} className={Context.prefixClass('table-content-container')}>
          <div ref={(c) => { t.mainTable = c; }} className={Context.prefixClass('table-content')}>
            {t.props.showHeader ? renderHeader(columns) : null}
            {t.renderBody(columns)}
          </div>
        </Scroller>
        {t.renderFixed(columns, 'left')}
        {t.renderFixed(columns, 'right')}
        {t.renderPager()}
      </div>
    );
  }
}

Table.defaultProps = {
  data: {},
  // 展示类型
  displayType: 'table',
  pageSize: 10,
  // 子表格显示行数
  subRowPageSize: 8,
  emptyText: '暂无数据',
  leftFixed: 0,
  hideSplitLine: false,
  rightFixed: 0,
  showHeader: true,
  onPagerChange: () => {},
  // 子表格翻页回调
  onSubRowPagerChange: () => {},
  columns: undefined,
  className: undefined,
};

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.object,
  displayType: PropTypes.oneOf(['table', 'list']),
  pageSize: PropTypes.number,
  subRowPageSize: PropTypes.number,
  onSubRowPagerChange: PropTypes.func,
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
