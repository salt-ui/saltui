/**
 * RateField Component for tingle
 * @author yuguo.qyg
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import Field from '../Field';
import Rate from '../Rate';

class RateField extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    ...Rate.propTypes,
  };

  static defaultProps = {
    className: undefined,
  };

  static displayName = 'RateField';

  render() {
    const t = this;
    return (
      <Field
        {...Field.getFieldProps(t.props)}
        layout="h"
        className={classnames(Context.prefixClass('rate-field'), {
          [t.props.className]: !!t.props.className,
          readOnly: t.props.readOnly,
        })}
      >
        <Rate
          total={t.props.total}
          width={18}
          gap={t.props.gap}
          value={t.props.value}
          size={t.props.label ? 'normal' : t.props.size}
          showTip={t.props.label ? false : t.props.showTip}
          scoreTips={t.props.scoreTips}
          readOnly={t.props.readOnly}
          onChange={(value) => { t.props.onChange(value); }}
        />
      </Field>

    );
  }
}

export default RateField;
