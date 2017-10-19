/**
 * PickerField Component for tingle
 * @author longyan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Context from '../Context';
import Field from '../Field';
import Popup from '../Popup';
import SearchPanel from './SearchPanel';
import utils from './utils';

class PickerField extends React.Component {

  static normalizeValue(input) {
    if (input) {
      if (utils.isArray(input)) {
        return input;
      }
      if (input.text) {
        return [input];
      }
    }
    return [];
  }

  constructor(props) {
    super(props);
    const t = this;
    const value = PickerField.normalizeValue(props.value);
    t.state = {
      value,
      confirmedValue: value,
      popupVisible: false,
    };

    t.listener = t.handleHidePopup.bind(t);
  }

  componentWillReceiveProps(nextProps) {
    const t = this;
    const value = PickerField.normalizeValue(nextProps.value);
    t.setState({
      value,
      confirmedValue: value,
    });
  }


  handleHidePopup(e) {
    const { state } = e;
    if (!state || !state.PickerField) {
      const t = this;
      window.removeEventListener('popstate', t.listener, false);
      t.setState({
        popupVisible: false,
      });
    }
  }

  handleClick() {
    const t = this;
    if (!t.props.readOnly) {
      t.setState({
        popupVisible: true,
      }, () => {
        history.pushState({
          PickerField: 'SearchPanel.index',
        }, '', utils.addUrlParam('PICKER', Date.now()));

        window.addEventListener('popstate', t.listener, false);
      });
    }
  }

  handleConfirm(value) {
    const t = this;
    t.setState({
      confirmedValue: value,
      value,
    });
    t.props.onSelect(t.props.multiple ? value : value[0]);
  }

  handleCancel() {
    const t = this;
    t.setState({
      value: t.state.confirmedValue,
    });
  }

  renderResult() {
    if (this.props.multiple) {
      return this.state.confirmedValue.map(this.props.formatter).join('；');
    }
    return this.props.formatter(this.state.confirmedValue[0]);
  }

  render() {
    const t = this;
    const icon = t.props.readOnly ? null : {
      className: Context.prefixClass('picker-field-icon'),
      name: 'angle-right',
      width: 26,
      height: 26,
      onClick: (e) => {
        t.handleClick(e);
      },
    };

    const panelProps = {
      value: t.state.confirmedValue,
      confirmText: t.props.confirmText,
      cancelText: t.props.cancelText,
      onConfirm: (value) => {
        t.handleConfirm(value);
        history.go(-1);
      },
      fetchUrl: t.props.fetchUrl,
      fetchDataOnOpen: t.props.fetchDataOnOpen,
      dataType: t.props.dataType,
      beforeFetch: t.props.beforeFetch,
      fitResponse: t.props.fitResponse,
      afterFetch: t.props.afterFetch,
      showSearch: t.props.showSearch,
      searchTitle: t.props.searchTitle || t.props.placeholder,
      searchDelay: t.props.searchDelay,
      searchPlaceholder: t.props.searchPlaceholder,
      searchNotFoundContent: t.props.searchNotFoundContent,
      formatter: t.props.formatter,
      multiple: t.props.multiple,
      selectText: t.props.selectText,
      searchText: t.props.searchText,
    };

    return (
      <Field
        {...t.props}
        icon={icon}
        className={classnames(Context.prefixClass('picker-field'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        <div
          onClick={(e) => {
            t.handleClick(e);
          }}
        >
          {!t.state.confirmedValue[0] ?
            <div className={Context.prefixClass('omit picker-field-placeholder')}>{t.props.placeholder}</div> : ''}
          <div className={Context.prefixClass('picker-field-value FBH FBAC')}>
            <span
              className={classnames(Context.prefixClass('FB1 omit'), {
                [Context.prefixClass('picker-field-readonly')]: t.props.readOnly,
              })}
            >{t.renderResult()}</span>
          </div>
        </div>
        <Popup visible={this.state.popupVisible} animationType="slide-left" content={<SearchPanel {...panelProps} />} />
      </Field>
    );
  }
}

PickerField.defaultProps = {
  readOnly: false,
  placeholder: '请选择',
  searchText: '搜索',
  confirmText: '确认',
  cancelText: '取消',
  fetchUrl: '',
  fetchDataOnOpen: true,
  dataType: 'jsonp',
  beforeFetch: obj => obj,
  fitResponse: response => ({
    content: response.content || response,
    success: response.success === undefined ? true : response.success,
  }),
  afterFetch: obj => obj,
  showSearch: true,
  searchTitle: '',
  searchDelay: 100,
  searchPlaceholder: '搜索',
  searchNotFoundContent: '无搜索结果',
  formatter: value => (value ? value.text : ''),
  onSelect() {},
  multiple: false,
  selectText: '已选择：',
};

// http://facebook.github.io/react/docs/reusable-components.html
PickerField.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
  readOnly: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  searchText: React.PropTypes.string,
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  fetchUrl: React.PropTypes.string.isRequired,
  fetchDataOnOpen: React.PropTypes.bool,
  dataType: React.PropTypes.string,
  beforeFetch: React.PropTypes.func,
  fitResponse: React.PropTypes.func,
  afterFetch: React.PropTypes.func,
  showSearch: React.PropTypes.bool,
  searchTitle: React.PropTypes.string,
  searchDelay: React.PropTypes.number,
  searchPlaceholder: React.PropTypes.string,
  searchNotFoundContent: React.PropTypes.string,
  formatter: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  multiple: React.PropTypes.bool,
  selectText: React.PropTypes.string,
};

PickerField.displayName = 'PickerField';

export default PickerField;
