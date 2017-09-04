import classnames from 'classnames';
import React from 'react';
import { prefixClass } from '../Context';

const Count = props => <div
  className={classnames(prefixClass('textarea-field-count'), {
    [prefixClass('textarea-field-count-overflow')]: parseInt(props.length, 10) > parseInt(props.total, 10),
  })}
>
  <span
    className={classnames({
      [prefixClass('textarea-field-count-actual')]: true,
      [prefixClass('textarea-field-count-actual-overflow')]: parseInt(props.length, 10) > parseInt(props.total, 10),
    })}
  >{props.length}</span>
  <span className={prefixClass('textarea-field-count-slash')}>/</span>
  <span className={prefixClass('textarea-field-count-max')}>{props.total}</span>
</div>;


Count.defaultProps = {
  length: 0,
};

Count.propTypes = {
  length: React.PropTypes.number,
  total: React.PropTypes.number,
};

Count.displayName = 'Count';

export default Count;
