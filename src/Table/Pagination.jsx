import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
     * 计算总页数
     */
  calcPage() {
    const t = this;
    const { total, pageSize } = t.props;
    return Math.floor((total - 1) / pageSize) + 1;
  }

  handlePageChange(direction) {
    const t = this;
    const { current, onChange } = t.props;
    const totalPages = t.calcPage();
    const newCurrent = current + direction;
    if (newCurrent < 1 || newCurrent > totalPages) return;
    onChange(newCurrent);
  }

  render() {
    const t = this;
    const { className, current } = t.props;
    const totalPages = t.calcPage();
    return (
      <div
        className={classnames({
          [className]: !!className,
        })}
      >
        <div
          className={classnames({
            goPrev: true,
            disable: current === 1,
          })}
          onClick={t.handlePageChange.bind(t, -1)}
        >上一页
        </div>
        <div className="options">
          {`${current}/${totalPages}`}
        </div>
        <div
          className={classnames({
            goNext: true,
            disable: current === totalPages,
          })}
          onClick={t.handlePageChange.bind(t, 1)}
        >下一页
        </div>
      </div>);
  }
}

Pagination.defaultProps = {
  current: 1,
  total: 0,
  pageSize: 10,
  onChange: () => {},
};

Pagination.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
};

Pagination.displayName = 'Pagination';

export default Pagination;
