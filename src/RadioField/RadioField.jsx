/**
 * RadioField Component for tingle
 * @author shanchao
 * update by ruiyang.dry
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import OptionCheckedIcon from 'salt-icon/lib/OptionChecked';
import FieldRequiredIcon from 'salt-icon/lib/FieldRequired';
import { prefixClass } from '../Context';
import Group from '../Group';
import Popup from '../Popup';

const renderIcon = (checked, position) => (
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
class RadioField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (this.props.layoutType === 'popup') {
      if (!this.instance) {
        this.instance = Popup.show(this.finalJSX, {
          animationType: 'slide-up',
        });
      }
    }
  }

  componentDidUpdate() {
    if (this.instance) {
      this.instance.update(this.finalJSX);
    }
  }

  /* eslint-disable no-param-reassign */
  clickAction(value, item, index, data) {
    const t = this;
    const { data: radioArray, onChange } = t.props;

    const { disable } = item;
    if (disable) {
      return;
    }
    radioArray.map((radioItem) => {
      radioItem.checked = false;
      return radioItem;
    });
    item.checked = !item.checked;
    t.forceUpdate(() => {
      if (onChange) {
        onChange(value, index, data, t.instance);
      }
      t.instance.close();
    });
  }
  /* eslint-enable no-param-reassign */
  render() {
    const t = this;
    // add layoutType for mobile Popup layout;
    const {
      rootClassName,
      className,
      data: radioArray,
      groupListArgument,
      groupListFlag,
      label,
      layoutType,
    } = t.props;

    const radioArrayComponent = radioArray.map((item, index, data) => {
      const { checked, disable, value } = item;
      /* eslint-disable react/no-array-index-key */
      return (
        <div
          key={index}
          className={classnames(prefixClass('radio-field-row FBAC FBH'), {
            disable,
          })}
          onClick={t.clickAction.bind(t, value, item, index, data)}
        >
          {
            t.props.iconPosition === 'left' && renderIcon(checked)
          }
          <div
            ref={`content${index}`}
            className={prefixClass('radio-field-content FB1')}
          >
            {item.content || item.text}
          </div>
          {
            t.props.iconPosition === 'right' && renderIcon(checked, 'right')
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

    this.finalJSX = (
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
      this.finalJSX = (
        <div
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

    return <div>{layoutType === 'popup' ? null : this.finalJSX }</div>;
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
  className: undefined,
  layoutType: 'default',
  visible: false,
};

// http://facebook.github.io/react/docs/reusable-components.html
RadioField.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
  groupListFlag: PropTypes.bool,
  groupListArgument: PropTypes.object,
  iconPosition: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.node,
  layoutType: PropTypes.string,
  visible: PropTypes.bool,
};

RadioField.displayName = 'RadioField';

export default RadioField;
