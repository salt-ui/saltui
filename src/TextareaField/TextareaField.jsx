/**
 * TextareaField Component for SaltUI
 * @author zhangshun@alipay.com
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context, { prefixClass } from '../Context';
import Field from '../Field';
import Textarea from '../Textarea';

class TextareaField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: null,
    };
  }


  getAddons() {
    const addons = {};
    React.Children.forEach(this.props.children, (child) => {
      if (typeof child.type === 'function') {
        if (child.type.displayName === 'LeftAddon' && !addons.left) {
          addons.left = child;
        } else if (child.type.displayName === 'RightAddon' && !addons.right) {
          addons.right = child;
        } else if (child.type.displayName === 'Count' && !addons.count) {
          addons.count = child;
        }
      }
    });
    return addons;
  }

  handleChange(e) {
    this.props.onChange(e.target.value, e);
  }

  handleFocus(e) {
    this.props.onFocus(e);
  }

  handleBlur(e) {
    this.props.onBlur(e);
  }

  renderCount() {
    const addons = this.getAddons();
    if (addons.count && !this.props.readOnly) {
      return addons.count;
    }
    return null;
  }

  render() {
    const t = this;
    const {
      placeholder, readOnly, lineHeight, disabled,
    } = t.props;
    const style = {
      // height: t.state.height,
      lineHeight,
    };

    return (
      <Field
        {...t.props}
        multiLine
        className={classnames({
          [prefixClass('textarea-field')]: true,
          readonly: readOnly,
          [t.props.className]: !!t.props.className,
        })}
      >
        <Textarea
          ref={(c) => { this.textarea = c; }}
          className={prefixClass('textarea-field-content')}
          style={style}
          placeholder={placeholder}
          value={t.props.value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={(e) => { t.handleChange(e); }}
          onFocus={(e) => { t.handleFocus(e); }}
          onBlur={(e) => { t.handleBlur(e); }}
        />
        {t.renderCount()}
      </Field>
    );
  }
}

TextareaField.defaultProps = {
  placeholder: '',
  onChange: Context.noop,
  onFocus: Context.noop,
  onBlur: Context.noop,
  readOnly: false,
  lineHeight: '1.3',
  value: '',
  rows: undefined,
  className: undefined,
  children: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
TextareaField.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  readOnly: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  rows: PropTypes.number,
  lineHeight: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

TextareaField.displayName = 'TextareaField';

export default TextareaField;
