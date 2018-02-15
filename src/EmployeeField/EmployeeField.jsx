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
  };

  static defaultProps = {
    placeholder: '',
    multiple: true,
    max: 100,
    isNeedSearch: true,
    locale: 'zh-cn',
    startWithDepartmentId: -1,
    readOnly: false,
    value: [],
    disabledUsers: [],
    onChange: () => {},
    className: undefined,
    corpId: undefined,
  };

  static displayName = 'EmployeeField';

  onPickHandler() {
    if (this.props.readOnly) {
      return;
    }
    const i18n = locale[this.props.locale];
    const option = {
      multiple: this.props.multiple,
      max: this.props.max,
      isNeedSearch: this.props.isNeedSearch,
      startWithDepartmentId: this.props.startWithDepartmentId, //  SELF TOP
      users: this.props.value.map(v => v.key),
      disabledUsers: this.props.disabledUsers,
    };
    const Ali = window.Ali || {};
    if (Ali.contacts) {
      if (!this.props.corpId) {
        Ali.alert({
          message: i18n.corpIdRequired,
          okButton: i18n.ok,
        });
        return;
      }
      if (Ali.isDingDing) {
        option.corpId = this.props.corpId;
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
      const _this = this;
      // fall back to dd api
      window.dd.biz.contact.choose({
        ...option,
        onSuccess(results) {
          /* eslint-disable no-param-reassign */
          for (let i = 0; i < results.length; i++) {
            results[i].phoneNumber = results[i].mobilePhone;
            const result = {
              results,
            };
            _this.props.onChange(transToValue(result.results));
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


  renderEmployeeList() {
    return (
      <EmployeeList
        readOnly={this.props.readOnly}
        list={this.props.value}
        onDel={(id) => { this.onItemDel(id); }}
      />
    );
  }

  render() {
    const t = this;
    const iconProps = {
      className: classnames(Context.prefixClass('employee-field-icon'), {
        active: !t.props.readOnly,
      }),
      // name: 'plus-circle',
      width: 20,
      height: 20,
      onClick(e) {
        t.onPickHandler(e);
      },
    };

    const icon = !t.props.readOnly ? <PlusCircle {...iconProps} /> : null;
    const { className, ...otherProps } = t.props;
    delete otherProps.layout;
    return (
      <div
        className={classnames(Context.prefixClass('employee-field'), {
          [className]: !!className,
        })}
      >
        <Field {...otherProps} icon={icon}>
          <div onClick={(e) => { t.onPickHandler(e); }}>
            {
              !t.props.value.length ?
                <div className={Context.prefixClass('omit employee-field-placeholder')}>{t.props.placeholder}</div>
                :
                <div className={Context.prefixClass('omit employee-field-num')}>{t.getTotalText()}</div>
            }
          </div>
        </Field>
        {
          t.renderEmployeeList()
        }
      </div>
    );
  }
}

export default EmployeeField;
