import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import i18n from './i18n';

const isTwoDimArray = arr => arr.length && Array.isArray(arr[0]);


const Panel = (props) => {
  const {
    prefixCls,
    options,
    locale,
    cancelButton,
    onItemClick,
    title,
    message,
  } = props;
  const lang = i18n[locale];
  const multiLine = isTwoDimArray(options);
  const twoDimOptions = multiLine ? options : [options];
  /* eslint-disable react/no-array-index-key */
  return (
    <div className={`${prefixCls}`}>
      {(title || message) ? <div className={`${prefixCls}-message`}>
        {title ? <h3 className={`${prefixCls}-title`}>{title}</h3> : null}
        <p>{message}</p>
      </div> : null}
      <div className={`${prefixCls}-content`}>
        {twoDimOptions.map((item, rowIndex) => (
          <div>
            <div className={`${prefixCls}-item-list-wrapper`} key={rowIndex}>
              <div className={`${prefixCls}-item-list`}>
                {item.map((option, index) => (
                  <div
                    className={classnames(`${prefixCls}-item`, 'tTE', {
                    })}
                    onClick={() => {
                      onItemClick(index, rowIndex);
                    }}
                    key={index}
                  >
                    <div className={`${prefixCls}-item-icon`}>{option.icon}</div>
                    <div className={`${prefixCls}-item-title`}>{option.title}</div>
                  </div>
              ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`${prefixCls}-item-cancel tTE`}
        onClick={() => {
          onItemClick(-1, -1);
        }}
      >
        {cancelButton || lang.cancel}
      </div>
    </div>
  );
  /* eslint-enable react/no-array-index-key */
};

Panel.defaultProps = {
  title: '',
  message: '',
  cancelButton: '',
  prefixCls: 't-action-sheet-share-panel',
  locale: 'zh-cn',
  options: [],
  onItemClick: () => {},
  onCancel: () => {},
};
Panel.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  cancelButton: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onItemClick: PropTypes.func,
  onCancel: PropTypes.func,
  prefixCls: PropTypes.string,
  options: PropTypes.array,
  locale: PropTypes.string,
};
export default Panel;
