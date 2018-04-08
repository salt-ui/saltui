/**
 * PickerField Component for tingle
 * @author longyan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
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
        window.history.pushState({
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
        window.history.go(-1);
      },
      options: t.props.options,
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
      phonetic: t.props.phonetic,
      multiple: t.props.multiple,
      grouping: t.props.grouping,
      groupingIndicator: t.props.groupingIndicator,
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
            >{t.renderResult()}
            </span>
          </div>
        </div>
        <Popup stopBodyScrolling={false} visible={this.state.popupVisible} animationType="slide-left" content={<SearchPanel {...panelProps} />} />
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
  phonetic: value => (value.phonetic || []),
  onSelect() { },
  multiple: false,
  grouping: false,
  groupingIndicator: false,
  selectText: '已选择：',
  className: undefined,
  value: undefined,
  options: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
PickerField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  searchText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  options: PropTypes.array,
  fetchUrl: PropTypes.string,
  fetchDataOnOpen: PropTypes.bool,
  dataType: PropTypes.string,
  beforeFetch: PropTypes.func,
  fitResponse: PropTypes.func,
  afterFetch: PropTypes.func,
  showSearch: PropTypes.bool,
  searchTitle: PropTypes.string,
  searchDelay: PropTypes.number,
  searchPlaceholder: PropTypes.string,
  searchNotFoundContent: PropTypes.string,
  formatter: PropTypes.func,
  phonetic: PropTypes.func,
  onSelect: PropTypes.func,
  multiple: PropTypes.bool,
  grouping: PropTypes.bool,
  groupingIndicator: PropTypes.bool,
  selectText: PropTypes.string,
};

PickerField.displayName = 'PickerField';

export default PickerField;
