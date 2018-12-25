/**
 * CheckboxField Component for SaltUI
 * @author shanchao
 *
 * Copyright 2018-2019, SaltUI Team.
 * All rights reserved.
 */
import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CheckRound from 'salt-icon/lib/CheckRound';
import FieldRequired from 'salt-icon/lib/FieldRequired';
import AngleRight from 'salt-icon/lib/AngleRight';
import Context from '../Context';
import Group from '../Group';
import Field from '../Field';
import SelectLayer from './SelectLayer';
import { shouldUpdate } from '../Utils';

const { prefixClass } = Context;


const renderIcon = (checked, disable, position) => {
  const iconClassName = classnames(prefixClass('checkbox-field-icon'), {
    checked,
    'un-checked': !checked,
    disable,
    [`${prefixClass('checkbox-field-icon')}-list`]: true,
  });
  return (
    <div className={classnames(prefixClass('checkbox-field-icon-wrapper FBH FBAC'), {
      [position]: !!position,
    })}
    >
      {
        checked ?
          <CheckRound
            width={26}
            height={26}
            className={iconClassName}
          /> :
          <div className={iconClassName} />
      }
    </div>
  );
};

class CheckboxField extends React.Component {
  constructor(props) {
    super(props);

    const t = this;
    t.state = {
      selectedText: CheckboxField.getSelectedText(props.data, props),
      prevData: props.data,
    };
    t.handleClick = t.handleClick.bind(t);
    t.handleConfirm = t.handleConfirm.bind(t);
  }

  static getDerivedStateFromProps(nextProps, { prevData }) {
    if (shouldUpdate(nextProps, { data: prevData }, ['data'])) {
      return {
        selectedText: CheckboxField.getSelectedText(nextProps.data, nextProps),
        prevData: nextProps.data,
      };
    }
    return null;
  }

  static getSelectedText(data, props) {
    let selectedText = '';
    data.forEach((item) => {
      if (item.checked) {
        if (props.mode === 'list') {
          selectedText = selectedText + props.titleBreakStr + item.text;
        } else {
          selectedText =
            selectedText + props.titleBreakStr + (item.slotText ? item.slotText : item.text);
        }
      }
    });

    if (selectedText) {
      selectedText = selectedText.substring(props.titleBreakStr.length);
    }

    return selectedText;
  }

  getData() {
    const t = this;
    const data = [];

    t.props.data.forEach((item) => {
      if (item.checked) {
        data.push(item);
      }
    });

    return data;
  }
  /* eslint-disable no-param-reassign */
  clickAction(value, item) {
    const t = this;
    const { onChange } = t.props;
    const { disable } = item;
    if (t.props.readOnly || disable) {
      return;
    }
    item.checked = !item.checked;
    if (onChange) {
      onChange(t.getData());
    }
    t.forceUpdate();
  }
  /* eslint-enable no-param-reassign */

  handleClick() {
    if (!this.props.readOnly && !this.props.disabled) {
      this.slot.show();
    }
  }

  handleConfirm(data) {
    this.setState({
      value: data,
      selectedText: CheckboxField.getSelectedText(data, this.props),
    });
    this.props.onChange(data);
  }

  renderList() {
    const t = this;
    const { props } = t;
    const {
      className, data: checkboxArray, groupListArgument, groupListFlag, label, iconPosition,
    } = props;
    const requiredTag = (
      <FieldRequired
        className={prefixClass('field-layout-label-required')}
        width={6}
        height={6}
        fill="red"
      />
    );
    /* eslint-disable react/no-array-index-key */
    const checkboxArrayComponent = checkboxArray.map((item, index) => {
      const { checked, disable, value } = item;
      const finalItemJSX = (
        <div
          onClick={() => { t.clickAction(value, item, index, checkboxArray); }}
          key={index}
          className={classnames(prefixClass('checkbox-field-row FBAC FBH'), {
            disable,
          })}
        >
          {
            iconPosition === 'left' && renderIcon(checked, disable)
          }
          <div
            ref={`content${index}`}
            className={classnames(prefixClass('checkbox-field-content FB1'), { disable })}
          >{item.content || item.text}
          </div>
          {
            iconPosition === 'right' && renderIcon(checked, disable, 'right')
          }
          {
            disable && <div className={prefixClass('checkbox-field-disable-mask')} />
          }
        </div>

      );
      return (
        finalItemJSX
      );
    });
    /* eslint-enable react/no-array-index-key */


    let finalJSX = (
      <Group className={classnames(prefixClass('checkbox-field'), {
        [className]: !!className,
        [prefixClass('checkbox-field-readonly')]: t.props.readOnly,
      })}
      >
        {
          label === '' ?
            null :
            <Group.Head
              className={classnames(prefixClass('checkbox-field-label'))}
            >
              {label}
              {this.props.required && requiredTag}
            </Group.Head>
        }
        <Group.List {...groupListArgument} >
          {checkboxArrayComponent}
        </Group.List>
      </Group>
    );

    if (!groupListFlag) {
      finalJSX = (
        <div
          ref={(c) => { this.root = c; }}
          className={classnames(prefixClass('checkbox-field'), {
            [className]: !!className,
            [prefixClass('checkbox-field-readonly')]: t.props.readOnly,
          })}
        >
          {checkboxArrayComponent}
        </div>
      );
    }
    return finalJSX;
  }

  renderSlot() {
    const t = this;
    const middleIcon = !t.props.readOnly ? (
      <AngleRight
        className={classnames(prefixClass('checkbox-field-icon'), {
          [`${prefixClass('checkbox-field-icon')}-slot`]: true,
          [prefixClass('hide')]: t.props.readOnly,
        })}
        width={26}
        height={26}
        onClick={t.handleClick}
      />
    ) : null;
    return (
      <Field
        {...t.props}
        middleIcon={middleIcon}
        className={classnames(prefixClass('checkbox-field'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        <div onClick={t.handleClick} className={prefixClass('checkbox-field-value-wrap')}>
          {
            t.state.selectedText ?
              <div className={classnames(prefixClass('checkbox-field-value-list'), {
                [prefixClass('checkbox-field-slot-mode-readonly')]: t.props.readOnly,
              })}
              >
                {t.state.selectedText}
              </div> :
              <div className={prefixClass('omit checkbox-field-placeholder')}>
                {t.props.placeholder}
              </div>
          }
        </div>
        <SelectLayer
          ref={(c) => { this.slot = c; }}
          title={t.props.label}
          confirmText={t.props.confirmText}
          cancelText={t.props.cancelText}
          data={t.props.data}
          value={t.state.value}
          maskCloseable={t.props.maskCloseable}
          iconPosition={t.props.iconPosition}
          onCancel={t.handleCancel}
          onConfirm={t.handleConfirm}
        />
      </Field>
    );
  }

  render() {
    return this.props.mode === 'list' ? this.renderList() : this.renderSlot();
  }
}

CheckboxField.defaultProps = {
  className: '',
  mode: 'slot', // slot, list
  readOnly: false,
  label: '',
  titleBreakStr: '，',
  data: [],
  onChange() { },
  placeholder: '',
  maskCloseable: true,
  groupListFlag: true,
  groupListArgument: {
    lineIndent: 0,
    itemIndent: 16,
  },
  required: false,
  disabled: false,
  iconPosition: 'left',
};

// http://facebook.github.io/react/docs/reusable-components.html
CheckboxField.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.string,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  titleBreakStr: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maskCloseable: PropTypes.bool,
  groupListFlag: PropTypes.bool,
  groupListArgument: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  iconPosition: PropTypes.string,
};

CheckboxField.displayName = 'CheckboxField';

polyfill(CheckboxField);

export default CheckboxField;
