/**
 * Table Component for tingle
 * @author sujingjing
 *
 * Copyright 2014-2016, Tingle Team.
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

        return (
          <div
            className={classnames(Context.prefixClass('table-row-item PL12 PR12 DIB omit'), {
              firstRow: index === 0,
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
            className={classnames(Context.prefixClass('table-header-item omit DIB PL12 PR12'), {
            firstRow: index === 0,
            lastRow: index === cl - 1,
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
  constructor(props) {
    super(props);
    this.state = {
      columns: this.processColumns(),
    };
    // columns 和 data 的类型是对象，用户在修改 props 时可能会出现 now 和 next 总是一致的问题
    // 这里对这两份数据进行一个缓存
    this.columns = deepcopy(props.columns);
    this.data = deepcopy(props.data);
  }

  componentDidMount() {
    this.checkScroll(this.getIscroll());
  }
  componentWillReceiveProps(nextProps) {
    const t = this;
    const newState = {};
    if (!deepEqual(t.columns, nextProps.columns)) {
      // 不在这里更新 t.columns 是因为后面 didUpdate 时还用的到。
      newState.columns = t.processColumns(nextProps);
    }
    if (Object.keys(newState).length) {
      t.setState(newState);
    }
  }

  componentDidUpdate() {
    const t = this;
    if (!deepEqual(t.props.columns, t.columns) || !deepEqual(t.props.data, t.data)) {
      t.data = deepcopy(t.props.data);
      t.columns = deepcopy(t.props.columns);
    }
    this.checkScroll(this.getIscroll());
  }

  getIscroll() {
    return this.scroller.scroller;
  }

  /**
   * 为 column 添加默认值
   */
  processColumns(props) {
    const t = this;
    const newProps = props || t.props;
    return deepcopy(newProps.columns).map((column) => {
      const columns = column;
      columns.width = Context.rem((columns.width || 0.25) * 640, 640);
      columns.align = columns.align || 'left';
      return columns;
    });
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
      columnsValue = columnsValue.slice(columnsValue.length - rightFixed, columnsValue.length);
    }
    if (columnsValue.length) {
      return (
        <div
          className={classnames(Context.prefixClass(`table-${direction}-fixed PA`))}
          ref={(c) => { this[`${direction}Fixed`] = c; }}
        >
          {t.props.showHeader ? renderHeader(columnsValue) : null}
          {t.renderBody(columnsValue, true)}
        </div>
      );
    }
    return null;
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
          'hide-cols-split-line': t.props.hideSplitLine && t.props.leftFixed === 0,
          'hide-rows-split-line': t.props.hideSplitLine && t.props.leftFixed > 0,
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
  pageSize: 10,
  emptyText: '暂无数据',
  leftFixed: 0,
  hideSplitLine: false,
  rightFixed: 0,
  showHeader: true,
  onPagerChange: () => {},
  columns: undefined,
  className: undefined,
};

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.object,
  pageSize: PropTypes.number,
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
