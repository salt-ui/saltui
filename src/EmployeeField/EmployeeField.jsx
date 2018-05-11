/**
 * EmployeeField Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */


import React from 'react';
import PropTypes from 'prop-types';
import deepCopy from 'lodash/cloneDeep';
import remove from 'lodash/remove';
import PlusCircle from 'salt-icon/lib/PlusCircle';
import classnames from 'classnames';
import Context from '../Context';
import Field from '../Field';
import EmployeeList from './EmployeeList';
import locale from './locale';
import { transToValue } from './utils';

class EmployeeField extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    corpId: PropTypes.string,
    placeholder: PropTypes.string,
    multiple: PropTypes.bool,
    max: PropTypes.number,
    isNeedSearch: PropTypes.bool,
    locale: PropTypes.string,
    startWithDepartmentId: PropTypes.number,
    readOnly: PropTypes.bool,
    value: PropTypes.array,
    disabledUsers: PropTypes.array,
    onChange: PropTypes.func,
    enableNW: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: '',
    multiple: true,
    max: 100,
    isNeedSearch: true,
    locale: 'zh-cn',
    startWithDepartmentId: -1,
    readOnly: false,
    enableNW: false,
    value: [],
    disabledUsers: [],
    onChange: () => { },
    className: undefined,
    corpId: undefined,
  };

  static displayName = 'EmployeeField';

  componentDidMount() {
    const Ali = window.Ali || {};
    if (Ali.ready) {
      Ali.ready(() => {
        this.forceUpdate();
      });
    }
  }

  onPickHandler() {
    if (this.getReadOnly()) {
      return;
    }
    const i18n = locale[this.props.locale];
    const option = {
      multiple: this.props.multiple,
      max: this.props.max,
      isNeedSearch: this.props.isNeedSearch,
      startWithDepartmentId: this.props.startWithDepartmentId, //  SELF TOP
      // users: this.props.value.map(v => ({ emplId: v.key, name: v.label, nickNameCn: v.label })),
      users: this.props.value.map(v => v.key),
      disabledUsers: this.props.disabledUsers,
    };
    const Ali = window.Ali || {};
    if (Ali.contacts) {
      if (Ali.isDingDing) {
        if (!this.props.corpId) {
          Ali.alert({
            message: i18n.corpIdRequired,
            okButton: i18n.ok,
          });
          return;
        }
        option.corpId = this.props.corpId;
      } else if (this.props.enableNW) {
        option.users = this.props.value.map(v =>
          ({ emplId: v.key, name: v.label, nickNameCn: v.label }));
      }
      Ali.contacts.get(option, (result) => {
        if (result && !result.errorCode) {
          this.props.onChange(transToValue(result.results));
        } else {
          Ali.alert({
            message: result.errorMessage,
            okButton: i18n.ok,
          });
        }
      });
    } else if (window.dd) {
      // fall back to dd api
      const t = this;
      window.dd.biz.contact.choose({
        ...option,
        onSuccess(results) {
          /* eslint-disable no-param-reassign */
          for (let i = 0; i < results.length; i++) {
            results[i].phoneNumber = results[i].mobilePhone;
            const result = {
              results,
            };
            t.props.onChange(transToValue(result.results));
          }
          /* eslint-enable no-param-reassign */
        },
        onFail(err) {
          window.dd.device.notification.alert({
            message: err.message,
            buttonName: i18n.ok,
          });
        },
      });
    }
  }

  onItemDel(key) {
    const list = deepCopy(this.props.value);
    remove(list, item => item.key === key);
    this.props.onChange(list);
  }

  getTotalText() {
    const i18n = locale[this.props.locale];
    return i18n.getTotalText(this.props.value.length);
  }

  getReadOnly() {
    const nativeEnabled = this.isNativeEnabled();
    if (!nativeEnabled) {
      return true;
    }
    return this.props.readOnly;
  }

  isNativeEnabled() {
    if (typeof window === 'undefined') {
      return false;
    }
    if (window.dd) {
      return true;
    }
    if (window.Ali && window.Ali.isAliwork && this.props.enableNW) {
      return true;
    }
    return false;
  }

  renderEmployeeList() {
    return (
      <EmployeeList
        readOnly={this.getReadOnly()}
        list={this.props.value}
        onDel={(id) => { this.onItemDel(id); }}
      />
    );
  }

  render() {
    const t = this;
    const iconProps = {
      className: classnames(Context.prefixClass('employee-field-icon'), {
        active: !t.getReadOnly(),
      }),
      // name: 'plus-circle',
      width: 20,
      height: 20,
      onClick(e) {
        t.onPickHandler(e);
      },
    };

    const icon = !t.getReadOnly() ? <PlusCircle {...iconProps} /> : null;
    const { className, tip, ...otherProps } = t.props;
    delete otherProps.layout;
    const i18n = locale[this.props.locale];

    const modifiedTip = this.isNativeEnabled() ? tip : <div>{i18n.readOnly}{tip}</div>;

    return (
      <div
        className={classnames(Context.prefixClass('employee-field'), {
          [className]: !!className,
        })}
      >
        <Field
          {...otherProps}
          labelRight={
            <div>
              <div className={classnames(Context.prefixClass('employee-field-placeholder-wrapper'), 'needsclick')} onClick={(e) => { t.onPickHandler(e); }}>
                {
                  !t.props.value.length ?
                    <div className={Context.prefixClass('omit employee-field-placeholder')}>{t.props.placeholder}</div>
                    :
                    <div className={Context.prefixClass('omit employee-field-num')}>{t.getTotalText()}</div>
                }
              </div>
              {icon}
            </div>
          }
          tip={modifiedTip}
          layout="v"
        />
        {
          t.renderEmployeeList()
        }
      </div>
    );
  }
}

export default EmployeeField;
