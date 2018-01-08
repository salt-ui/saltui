import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';

class CrumbItem extends React.Component {
  handleClick() {
    const t = this;
    if (!t.props.disabled) {
      t.props.onClick();
    }
  }

  render() {
    const t = this;
    const classNames = classnames(Context.prefixClass('crumb-item'), {
      [t.props.className]: !!t.props.className,
      disabled: t.props.disabled,
    });
    return (
      <span
        className={classNames}
        onClick={() => { t.props.onClick(); }}
      >{t.props.children}
      </span>
    );
  }
}

CrumbItem.defaultProps = {
  disabled: false,
  onClick: () => {},
};

CrumbItem.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

CrumbItem.displayName = 'CrumbItem';

export default CrumbItem;
