import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { prefixClass } from '../Context';

const Count = props => (
  <div
    className={classnames(prefixClass('text-field-count'), {
    [prefixClass('text-field-count-overflow')]: parseInt(props.length, 10) > parseInt(props.total, 10),
  })}
  >
    <span
      className={classnames({
      [prefixClass('text-field-count-actual')]: true,
      [prefixClass('text-field-count-actual-overflow')]: parseInt(props.length, 10) > parseInt(props.total, 10),
    })}
    >{props.length}
    </span>
    <span className={prefixClass('text-field-count-slash')}>/</span>
    <span className={prefixClass('text-field-count-max')}>{props.total}</span>
  </div>);


Count.defaultProps = {
  length: 0,
  total: undefined,
};

Count.propTypes = {
  length: PropTypes.number,
  total: PropTypes.number,
};

Count.displayName = 'Count';

export default Count;
