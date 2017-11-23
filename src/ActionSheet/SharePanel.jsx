import React from 'react';
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
  return (
    <div className={`${prefixCls}`}>
      {title ? <h3 className={`${prefixCls}-title`}>{title}</h3> : null}
      {message ? <div className={`${prefixCls}-message`}>{message}</div> : null}
      {twoDimOptions.map((item, rowIndex) => (
        <div>
          <div className={`${prefixCls}-item-list-split-line`} />
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
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  message: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  cancelButton: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  onItemClick: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  prefixCls: React.PropTypes.string,
  options: React.PropTypes.array,
  locale: React.PropTypes.string,
};
export default Panel;
