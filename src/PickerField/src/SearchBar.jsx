/**
 * PickerField Component for tingle
 * @author longyan
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Context from '@ali/tingle-context';
import Icon from '@ali/tingle-icon';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      activeMode: false,
    };
  }

  handleFocus() {
    this.setState({
      activeMode: true,
    });

    this.input.focus();
    this.props.onEnterSearchMode();
  }

  handleCancel() {
    this.setState({
      value: '',
      activeMode: false,
    });

    this.input.value = '';
    this.input.blur();
    this.props.onChange('');
    this.props.onLeaveSearchMode();
  }

  handleClear() {
    this.setState({
      value: '',
    });
    this.input.focus();
    this.input.value = '';
    this.props.onChange('');
  }

  handleChange() {
    const value = this.input.value;

    this.setState({
      value,
    });

    this.props.onChange(value);
  }

  resetValue(value = '') {
    this.setState({
      value,
    });

    this.input.value = value;
  }

  render() {
    const t = this;
    return (
      <div
        className={classnames(Context.prefixClass('picker-field-searchbar'), {
          [Context.prefixClass('picker-field-searchbar-active')]: t.state.activeMode,
        })}
      >
        <div
          className={Context.prefixClass('picker-field-searchbar-placeholder')}
          onClick={(e) => {
            t.handleFocus(e);
          }}
        >
          <Icon
            name="search"
            width={14}
            height={14}
          />
          {t.props.searchText}
        </div>
        <div className={Context.prefixClass('picker-field-searchbar-input')}>
          <a
            className={Context.prefixClass('picker-field-searchbar-input-cancel')}
            onClick={(e) => {
              t.handleCancel(e);
            }}
          >{t.props.cancelText}</a>
          <div
            className={classnames(Context.prefixClass('picker-field-searchbar-input-text'), {
              [Context.prefixClass('picker-field-searchbar-input-filled')]: !!t.state.value,
            })}
          >
            <input
              ref={(c) => {
                t.input = c;
              }} type="text"
              onChange={(e) => {
                t.handleChange(e);
              }}
            />
            <span className={Context.prefixClass('picker-field-searchbar-input-icon')}>
              <Icon
                name="search"
                width={14}
                height={14}
              />
            </span>
            <span
              className={Context.prefixClass('picker-field-searchbar-input-clear')}
              onClick={(e) => {
                t.handleClear(e);
              }}
            >
              <Icon
                name="cross"
                width={14}
                height={14}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.defaultProps = {
  searchText: '搜索',
  cancelText: '取消',
  onChange() {},
};

// http://facebook.github.io/react/docs/reusable-components.html
SearchBar.propTypes = {
  className: React.PropTypes.string,
  searchText: React.PropTypes.string.isRequired,
  cancelText: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  onEnterSearchMode: React.PropTypes.func,
  onLeaveSearchMode: React.PropTypes.func,
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
