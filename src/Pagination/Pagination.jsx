/**
 * Pagination Component for tingle
 * @author changming.zy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import Button from '../Button';
import Slot from '../Slot';
import i18n from './i18n';

const makeArray = (length) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i + 1);
  }
  return arr;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.current,
      pageSize: props.pageSize,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.state.current ||
    nextProps.pageSize !== this.state.pageSize) {
      this.setState({
        current: nextProps.current,
        pageSize: nextProps.pageSize,
      });
    }
  }

  onChange(current) {
    if (this.props.onChange) {
      this.props.onChange(current, this.state.pageSize);
    }
    this.setState({ current });
  }

  getTotalPage(pageSize = this.state.pageSize) {
    const { total } = this.props;
    return Math.ceil(total / pageSize);
  }

  render() {
    const { className, locale, simple } = this.props;
    const { current } = this.state;

    const totalPageCount = this.getTotalPage();

    const disablePrev = current === 1;
    const disableNext = current >= totalPageCount;
    const langs = i18n[locale];

    if (current > totalPageCount || current < 0) {
      console.warn('Pagination 组件异常, current 为 %d，totalPageCount 为 %d ', current, totalPageCount);
    }

    return (
      <div
        className={classnames({
          [Context.prefixClass('FBH')]: true,
          [Context.prefixClass('pagination')]: true,
          [className]: !!className,
        })}
      >
        <Button
          disabled={disablePrev}
          display="inline"
          type="secondary"
          size="small"
          onClick={(e) => {
            if (!disablePrev) {
              this.onChange(current - 1);
            }
            e.preventDefault();
          }}
        >
          {langs.prev}
        </Button>

        {
          !simple ?
            <div
              onClick={() => {
              this.current = current;
              this.slotCpnt.show();
            }}
              className={classnames(Context.prefixClass('FB1 FBH FBJC FBAC pagination-page-count'))}
            >
              <span className={Context.prefixClass('pagination-page-current')}>{`${current} `}</span>
              {`/ ${totalPageCount}`}
            </div> :
            <div className={Context.prefixClass('FB1')} />
        }

        <Button
          disabled={disableNext}
          display="inline"
          type="secondary"
          size="small"
          onClick={(e) => {
            if (!disableNext) {
              this.onChange(current + 1);
            }
            e.preventDefault();
          }}
        >
          {langs.next}
        </Button>
        <Slot
          title={langs.choosePageSize}
          ref={(c) => { this.slotCpnt = c; }}
          data={[makeArray(this.getTotalPage()).map(item => ({ text: item, value: item }))]}
          value={[{ text: current, value: current }]}
          onChange={(value) => {
            this.setState({
              current: value[0].value,
            });
          }}
          onCancel={() => {
            this.setState({
              current: this.current,
            });
          }}
          onConfirm={(selected) => {
            this.onChange(selected[0].value);
          }}
        />
      </div>
    );
  }
}

Pagination.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.oneOf(['zh-cn', 'en-us']),
  current: PropTypes.number,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
  simple: PropTypes.bool,
  sizeOptions: PropTypes.arrayOf(PropTypes.number),
  onShowSizeChange: PropTypes.func,
};

Pagination.defaultProps = {
  className: '',
  locale: 'zh-cn',
  current: 1,
  total: 0,
  pageSize: 10,
  onChange: () => { },
  simple: false,
  sizeOptions: [10, 20, 30, 40],
  onShowSizeChange: () => { },
};

Pagination.displayName = 'Pagination';

export default Pagination;
