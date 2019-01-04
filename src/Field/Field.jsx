/**
 * Field Component for SaltUI
 * @author gnosaij
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import NoteRound from 'salt-icon/lib/NoteRound';
import classnames from 'classnames';
import Icon from 'salt-icon/dist/Symbol';
import { prefixClass } from '../Context';
import Label from './Label';


class Field extends React.Component {
  renderErrMsg() {
    if (!this.props.errMsg || this.props.readOnly || this.props.disabled) return null;
    const Toast = this.props.toastComponent;
    return (
      <NoteRound
        className={prefixClass('field-error-icon')}
        onClick={(e) => {
          if (Toast) {
            e.stopPropagation();
            Toast.show({
              content: this.props.errMsg,
            });
          }
        }}
      />
    );
  }

  renderIcon(isMiddleIcon) {
    let icon = this.props[isMiddleIcon ? 'middleIcon' : 'icon'];
    if (icon) {
      if (icon.name) {
        icon = <Icon {...icon} />;
      }
      return icon;
    }
    return null;
  }

  renderMiddleIcon() {
    return (
      <div className={classnames(prefixClass('field-pos-icon'), {
        [prefixClass('FBH FBAC')]: true
      })}>
        {this.renderErrMsg()}
        {this.renderIcon(true)}
      </div>
    )
  }

  renderTip() {
    const t = this;
    const {
      readOnly, disabled, tip, errMsg, showErrInTip, layout,
    } = t.props;
    if (!readOnly && !disabled && (tip || (errMsg && showErrInTip))) {
      const message = errMsg || tip;
      const hasError = errMsg && showErrInTip;
      return (
        <div className={classnames(prefixClass('field-box FBH field-tip-box'), {
          [prefixClass('field-tip-box-error')]: hasError,
        })}
        >
          {layout === 'h' ? t.renderLabel({ className: prefixClass('field-tip-placeholder') }) : null}
          <div className={prefixClass('FBH FBAC LH1_5 field-tip')}>{message}</div>
        </div>
      );
    }
    return null;
  }

  renderLabelRight() {
    return this.props.labelRight;
  }

  renderLabel(options = {}) {
    const t = this;
    if (t.props.label || t.props.labelRight) {
      return (
        <Label
          label={t.props.label}
          required={t.props.required}
          layout={t.props.layout}
          right={t.props.layout === 'v' ? this.renderLabelRight() : null}
          {...options}
        />
      );
    }
    return null;
  }

  renderContent(needMiddleIcon) {
    const t = this;
    const {
      children, extra, icon, errMsg, layout, tappable, multiLine, showErrInTip, disabled,
    } = t.props;
    if (layout === 'v' && !children && !extra && !icon && !errMsg) {
      return null;
    }
    return (
      <div
        className={classnames(prefixClass('field-box field-content-box FBH'), {
          [prefixClass('TE')]: tappable,
          [prefixClass('FBAC')]: !multiLine,
        })}
      >
        {
          layout === 'h' ? t.renderLabel() : null
        }
        <div
          className={classnames(prefixClass('FB1 PR'), {
            [prefixClass('field-multi')]: multiLine && layout === 'h',
          })}
        >
          {children}
        </div>
        {extra}
        {(icon || (errMsg && !showErrInTip)) ?
          <div className={prefixClass('FBH FBAC field-icon')}>
            {!needMiddleIcon ? this.renderErrMsg() : null}
            {this.renderIcon()}
          </div> : null}
      </div>
    );
  }

  render() {
    const t = this;
    const {middleIcon, layout} = t.props;
    return (
      <div
        className={classnames(prefixClass('field'), {
          [prefixClass('field-disabled')]: t.props.disabled,
          [t.props.className]: !!t.props.className,
          [prefixClass('FBH FBAC')]: middleIcon
        })}
      >
        <div className={classnames({
          [prefixClass('field-pos-box')]: middleIcon,
          [prefixClass('FB1 PR')]: middleIcon
        })}>
          {layout === 'v' ? t.renderLabel() : null}
          {t.renderContent(!!middleIcon)}
          {t.renderTip()}
        </div>
        {middleIcon ? t.renderMiddleIcon() : null}
      </div>
    );
  }
}

Field.defaultProps = {
  label: '',
  tappable: false,
  required: false,
  readOnly: false,
  disabled: false,
  multiLine: false,
  layout: 'h',
  tip: '',
  icon: undefined,
  iconMiddle: false,
  middleIcon: undefined,
  extra: undefined,
  toastComponent: undefined,
  errMsg: undefined,
  showErrInTip: true,
};

// http://facebook.github.io/react/docs/reusable-components.html
Field.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.object,
  iconMiddle: PropTypes.bool,
  middleIcon: PropTypes.object,
  required: PropTypes.bool,
  tappable: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  multiLine: PropTypes.bool,
  layout: PropTypes.oneOf(['h', 'v']),
  tip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  extra: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  toastComponent: PropTypes.func,
  errMsg: PropTypes.string,
  showErrInTip: PropTypes.bool,
};

Field.getFieldProps = (props = {}) => {
  const fieldProps = {};
  Object.keys(props).forEach((key) => {
    if (key in Field.propTypes) {
      fieldProps[key] = props[key];
    }
  });
  return fieldProps;
};

Field.displayName = 'Field';

export default Field;
