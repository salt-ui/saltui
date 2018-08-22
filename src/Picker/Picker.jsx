import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup';
import SearchPanel from './SearchPanel';
import i18n from './i18n';

const Picker = ({ visible, ...panelProps }) => {
  const { locale } = panelProps;
  const fixProps = {
    confirmText: panelProps.confirmText || i18n[locale].confirmText,
    searchPlaceholder: panelProps.confirmText || i18n[locale].searchPlaceholder,
    noData: panelProps.confirmText || i18n[locale].noData,
  };
  return (
    <Popup
      animationType="slide-left"
      stopBodyScrolling={false}
      visible={visible}
      content={<SearchPanel {...panelProps} {...fixProps} />}
    />
  );
};

Picker.defaultProps = {
  visible: false,
  value: [],
  historyStamp: undefined,
  confirmText: undefined,
  onConfirm: () => {},
  options: undefined,
  fetchUrl: '',
  fetchDataOnOpen: true,
  dataType: 'jsonp',
  beforeFetch: obj => obj,
  fitResponse: response => ({
    content: response.content || response,
    success: response.success === undefined ? true : response.success,
  }),
  afterFetch: obj => obj,
  locale: 'zh-cn',
  searchNotFoundContent: undefined,
  resultFormatter: undefined,
  formatter: (value) => {
    if (value) {
      if (value.text !== undefined) {
        return value.text;
      }
      if (value.value !== undefined) {
        return value.value;
      }
    }
    return '';
  },
  phonetic: value => (value.phonetic || []),
  multiple: false,
  grouping: false,
  groupingIndicator: false,
  showSearch: true,
  searchDelay: 100,
  searchPlaceholder: undefined,
};

Picker.propTypes = {
  visible: PropTypes.bool,
  locale: PropTypes.string,
  fetchUrl: PropTypes.string,
  options: PropTypes.array,
  fetchDataOnOpen: PropTypes.bool,
  dataType: PropTypes.string,
  beforeFetch: PropTypes.func,
  fitResponse: PropTypes.func,
  afterFetch: PropTypes.func,
  showSearch: PropTypes.bool,
  searchDelay: PropTypes.number,
  formatter: PropTypes.func,
  phonetic: PropTypes.func,
  multiple: PropTypes.bool,
  grouping: PropTypes.bool,
  groupingIndicator: PropTypes.bool,
  resultFormatter: PropTypes.func,
  value: PropTypes.array,
  historyStamp: PropTypes.string,
  searchNotFoundContent: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  searchPlaceholder: PropTypes.string,
};

Picker.displayName = 'Picker';

export default Picker;
