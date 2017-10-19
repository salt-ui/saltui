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
import ScrollView from '../ScrollView';
import Button from '../Button';
import CheckRound from 'salt-icon/lib/CheckRound';
import utils from './utils';

class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    const t = this;
    const value = props.value;
    t.state = {
      value: [...value],
    };
  }

  handleItemClick(item) {
    const t = this;
    const value = this.state.value;

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
        <span className={Context.prefixClass('picker-field-search-result-item-icon')}>
          {iconHTML}
        </span>
        <span className={Context.prefixClass('picker-field-search-result-item-entry')}>{t.props.formatter(item)}</span>
      </div>
    );
  }

  render() {
    const t = this;
    const pageSize = utils.getPageSize();
    const length = this.state.value.length;
    return (
      <div
        className={classnames(Context.prefixClass('picker-field-searchpanel'), 'multiple')}
        style={{
          width: `${pageSize.width}px`,
          height: `${pageSize.height}px`,
        }}
      >
        <div className={Context.prefixClass('picker-field-searchpanel-inner')}>
          <div className={Context.prefixClass('picker-field-searchpanel-content')}>
            <ScrollView>
              {t.renderResults()}
            </ScrollView>
          </div>
          <div className={Context.prefixClass('picker-field-searchpanel-footer')}>
            <Button
              className={Context.prefixClass('picker-field-searchpanel-btn-ok')}
              display="inline"
              size="small"
              onClick={(e) => {
                t.handleConfirm(e);
              }}
            >{t.props.confirmText}</Button>
            <div
              className={Context.prefixClass('picker-field-searchpanel-result-summary')}
              onClick={(e) => {
                t.handleEnterResultView(e);
              }}
            >
              <span>{t.props.selectText}{length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchResult.defaultProps = {
  onConfirm() {},
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchResult.propTypes = {
  value: React.PropTypes.array,
  confirmText: React.PropTypes.string,
  onConfirm: React.PropTypes.func,
  formatter: React.PropTypes.func,
  selectText: React.PropTypes.string,
};

SearchResult.displayName = 'SearchResult';

export default SearchResult;
