/**
 * PickerField Component for tingle
 * @author longyan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import CheckRound from 'salt-icon/lib/CheckRound';
import classnames from 'classnames';
import Context from '../Context';
import ScrollView from '../ScrollView';
// import Button from '../Button';
import utils from './utils';
import i18n from './i18n';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    const t = this;
    const { value } = props;
    t.state = {
      value: [...value],
    };
  }

  handleItemClick(item) {
    const t = this;
    const { value } = this.state;

    let found = -1;
    value.some((v, i) => {
      if (v.value === item.value) {
        found = i;
        return true;
      }
      return false;
    });

    if (found > -1) {
      value.splice(found, 1);
      t.setState({
        value,
      });
    } else {
      t.setState({
        value: [...value, item],
      });
    }
  }

  handleConfirm() {
    this.props.onConfirm(this.state.value);
  }

  isItemChecked(item) {
    const t = this;
    let found = -1;
    t.state.value.forEach((v, i) => {
      if (v.value === item.value) {
        found = i;
      }
    });
    return found > -1;
  }

  renderResults() {
    const t = this;
    return (
      <div className={Context.prefixClass('picker-field-search-results')}>
        {t.props.value.map((item, index) => t.renderResultItem(item, index))}
      </div>
    );
  }

  renderResultItem(item, index) {
    const t = this;

    const checked = t.isItemChecked(item);
    const iconHTML = (
      <CheckRound
        className={classnames({
          'un-checked': !checked,
        })}
        width={20}
        height={20}
      />
    );

    return (
      <div
        key={index}
        className={classnames(Context.prefixClass('picker-field-search-result-item'), Context.prefixClass('clear'))}
        onClick={() => {
          t.handleItemClick(item);
        }}
      >
        <span className={Context.prefixClass('picker-field-search-result-item-entry picker-field-right-icon')}>{t.props.formatter(item)}</span>
        <span className={Context.prefixClass('picker-field-search-result-item-icon picker-field-right-icon')}>
          {iconHTML}
        </span>
      </div>
    );
  }

  render() {
    const t = this;
    const pageSize = utils.getPageSize();
    const { locale } = t.props;
    const { length } = this.state.value;
    return (
      <div
        className={classnames(Context.prefixClass('picker-field-searchpanel'), 'multiple')}
        style={{
          width: `${pageSize.width}px`,
          height: `${pageSize.height}px`,
        }}
      >
        <div className={Context.prefixClass('picker-field-searchpanel-inner')}>
          <div className={Context.prefixClass('picker-field-searchpanel-head-bar')}>
            <div className={Context.prefixClass('picker-field-searchpanel-head-bar-total')}>{i18n[locale].selected(length)}</div>
            <div
              className={Context.prefixClass('picker-field-searchpanel-head-bar-button')}
              onClick={(e) => {
                t.handleConfirm(e);
              }}
            >{i18n[locale].complete}
            </div>
          </div>
          <div className={Context.prefixClass('picker-field-searchpanel-content')}>
            <ScrollView>
              {t.renderResults()}
            </ScrollView>
          </div>
          {/* <div className={Context.prefixClass('picker-field-searchpanel-footer')}>
            <Button
              className={Context.prefixClass('picker-field-searchpanel-btn-ok')}
              display="inline"
              size="small"
              onClick={(e) => {
                t.handleConfirm(e);
              }}
            >{t.props.confirmText}
            </Button>
            <div
              className={Context.prefixClass('picker-field-searchpanel-result-summary')}
              onClick={(e) => {
                t.handleEnterResultView(e);
              }}
            >
              <span>{t.props.selectText}{length}</span>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

SearchResult.defaultProps = {
  onConfirm() {},
  value: undefined,
  confirmText: undefined,
  formatter: undefined,
  selectText: undefined,
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchResult.propTypes = {
  value: PropTypes.array,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func,
  formatter: PropTypes.func,
  selectText: PropTypes.string,
};

SearchResult.displayName = 'SearchResult';

export default SearchResult;
