/**
 * RadioField Component for tingle
 * @author shanchao
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import OptionCheckedIcon from 'salt-icon/lib/OptionChecked';
import FieldRequiredIcon from 'salt-icon/lib/FieldRequired';
import Context from '../Context';
import Group from '../Group';

const prefixClass = Context.prefixClass;


class RadioField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  clickAction(value, item, index, data) {
    const t = this;
    const { data: radioArray, onChange } = t.props;

    const disable = item.disable;
    if (disable) {
      return;
    }
    radioArray.map((radioItem) => {
      radioItem.checked = false;
      return radioItem;
    });
    item.checked = !item.checked;
    if (onChange) {
      onChange(value, index, data);
    }
    t.forceUpdate();
  }

  renderIcon(checked, position) {
    return (
      <div className={classnames(prefixClass('radio-field-icon-wrapper FBAC FBH'), {
        [position]: !!position,
      })}
      >
        <OptionCheckedIcon
          width={16}
          height={16}
          className={classnames(prefixClass('radio-field-icon'), {
            'un-checked': !checked,
          })}
        />
      </div>
    );
  }

  render() {
    const t = this;
    const {
      rootClassName,
      className,
      data: radioArray,
      groupListArgument,
      groupListFlag,
      label,
    } = t.props;

    const radioArrayComponent = radioArray.map((item, index, data) => {
      const { checked, disable, value } = item;
      return (
        <div
          key={index}
          className={classnames(prefixClass('radio-field-row FBAC FBH'), {
            disable,
          })}
          onClick={t.clickAction.bind(t, value, item, index, data)}
        >
          {
            t.props.iconPosition === 'left' && t.renderIcon(checked)
          }
          <div
            ref={`content${index}`}
            className={prefixClass('radio-field-content FB1')}
          >
            {item.content || item.text}
          </div>
          {
            t.props.iconPosition === 'right' && t.renderIcon(checked, 'right')
          }
          {
            disable && <div className={prefixClass('radio-field-disable-mask')} />
          }
        </div>
      );
    });

    const requiredTag = (
      <FieldRequiredIcon
        className={prefixClass('radio-field-label-required')}
        width={6}
        height={6}
        fill="red"
      />
    );

    let finalJSX = (
      <Group className={classnames(prefixClass('radio-field'), {
        [rootClassName]: !!rootClassName,
      }, {
        [className]: !!className,
      })}
      >
        {
            label === ''
            ? null
            : (
              <Group.Head className={classnames(prefixClass('radio-field-label'))}>
                {label}
                {this.props.required && requiredTag}
              </Group.Head>
            )
          }
        <Group.List {...groupListArgument}>
          {radioArrayComponent}
        </Group.List>
      </Group>
    );

    if (!groupListFlag) {
      finalJSX = (
        <div
          ref="root"
          className={classnames(prefixClass('radio-field'), {
            [rootClassName]: !!rootClassName,
            [className]: !!className,
          })
        }
        >
          {radioArrayComponent}
        </div>
      );
    }

    return finalJSX;
  }
}

RadioField.defaultProps = {
  data: [],
  onChange() { },
  groupListFlag: true,
  groupListArgument: {
    lineIndent: 0,
    itemIndent: 16,
  },
  label: '',
  iconPosition: 'right',
  required: false,
};

// http://facebook.github.io/react/docs/reusable-components.html
RadioField.propTypes = {
  className: React.PropTypes.string,
  data: React.PropTypes.array,
  onChange: React.PropTypes.func,
  groupListFlag: React.PropTypes.bool,
  groupListArgument: React.PropTypes.object,
  iconPosition: React.PropTypes.string,
  required: React.PropTypes.bool,
};

RadioField.displayName = 'RadioField';

module.exports = RadioField;
