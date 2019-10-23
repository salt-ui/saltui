import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../Popup';
import SearchPanel from './SearchPanel';
import i18n from './i18n';
import utils from './utils';

class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.listener = this.handleHidePopup.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.visible === false && this.props.visible === true) {
      this.historyStamp = `Picker.index_${Date.now()}`;
      window.history.pushState({
        PickerField: this.historyStamp,
      }, '', utils.addUrlParam('PICKER', Date.now()));

      window.addEventListener('popstate', this.listener, false);
    } else if (prevProps.visible === true && this.props.visible === false) {
      this.hide();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.listener, false);
  }

  handleHidePopup(e) {
    const { state } = e;
    if (!state || !state.PickerField || state.PickerField !== this.historyStamp) {
      this.hide(true);
    }
  }

  hide(fromEvent) {
    if (this.historyStamp) {
      const t = this;
      window.removeEventListener('popstate', t.listener, false);
      if (!fromEvent) {
        window.history.go(-1);
      }
      this.historyStamp = '';
      t.props.onVisibleChange(false);
    }
  }

  render() {
    const { visible, className, ...panelProps } = this.props;
    const { locale } = panelProps;
    const fixProps = {
      confirmText: panelProps.confirmText || i18n[locale].confirmText,
      searchPlaceholder: panelProps.searchPlaceholder || i18n[locale].searchPlaceholder,
      searchNotFoundContent: panelProps.searchNotFoundContent || i18n[locale].noData,
    };
    return (
      <Popup
        className={className}
        animationType="slide-left"
        stopBodyScrolling={false}
        visible={visible}
        content={<SearchPanel {...panelProps} {...fixProps} />}
      />
    );
  }
}

Picker.defaultProps = {
  visible: false,
  value: [],
  className: '',
  historyStamp: undefined,
  confirmText: undefined,
  onVisibleChange: () => {},
  onConfirm: () => {},
  options: undefined,
  fetchUrl: '',
  fetchMethod: 'GET',
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
  customRender: null
};

Picker.propTypes = {
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  locale: PropTypes.string,
  fetchUrl: PropTypes.string,
  fetchMethod: PropTypes.string,
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
  customRender: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

Picker.displayName = 'Picker';

export default Picker;
