/**
 * Field Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Icon = require('@ali/tingle-icon/dist/Symbol');
const Context = require('../Context');
const FieldRequired = require('@ali/tingle-icon/lib/FieldRequired');

const prefixClass = Context.prefixClass;

const requiredTag = (
  <FieldRequired
    className={prefixClass('field-layout-label-required')}
    width={6}
    height={6}
    fill="red"
  />
);

class Field extends React.Component {

  renderIcon() {
    const t = this;
    if (t.props.icon) {
      let icon = null;
      if (typeof t.props.icon.type === 'function') {
        icon = t.props.icon;
      } else if (t.props.icon.name) {
        icon = <Icon {...t.props.icon} />;
      }
      if (icon) {
        return <div className={prefixClass('FBH FBAC field-icon')}>{icon}</div>;
      }
    }
    return null;
  }
  render() {
    const t = this;
    return (
      <div
        className={classnames(prefixClass('field'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        {
          t.props.label && t.props.layout === 'v' &&
            <div className={prefixClass('field-layout-v-label')}>
              {t.props.label}
              {this.props.required && requiredTag}
            </div>
        }
        <div
          className={classnames(prefixClass('field-box FBH'), {
            [prefixClass('TE')]: t.props.tappable,
            [prefixClass('FBAC')]: !t.props.multiLine,
          })}
        >
          {
            t.props.label && t.props.layout === 'h' &&
              <div className={prefixClass('field-layout-h-label')}>
                {t.props.label}
                {this.props.required && requiredTag}
              </div>
          }
          <div
            className={classnames(prefixClass('FB1 PR'), {
              [prefixClass('field-multi')]: t.props.multiLine,
            })}
          >
            {t.props.children}
          </div>
          {t.props.extra}
          {this.renderIcon()}
        </div>
        {
          !t.props.readOnly && t.props.tip &&
            <div className={prefixClass('FBH FBAC LH1_5 field-tip')}>{t.props.tip}</div>
        }
      </div>
    );
  }
}

Field.defaultProps = {
  label: '',
  tappable: false,
  required: false,
  readOnly: false,
  multiLine: false,
  icon: {},
  layout: 'h',
  tip: '',
  extra: '',
};

// http://facebook.github.io/react/docs/reusable-components.html
Field.propTypes = {
  label: React.PropTypes.string,
  icon: React.PropTypes.object,
  required: React.PropTypes.bool,
  tappable: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  multiLine: React.PropTypes.bool,
  layout: React.PropTypes.oneOf(['h', 'v']),
  tip: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  extra: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
};

Field.displayName = 'Field';

module.exports = Field;
