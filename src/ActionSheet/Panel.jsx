import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import i18n from './i18n';


const Panel = (props) => {
  const {
    prefixCls,
    options,
    locale,
    cancelButton,
    destructiveButtonIndex,
    onItemClick,
    title,
    message,
  } = props;
  const lang = i18n[locale];
  return (
    <div className={`${prefixCls}`}>
      {(title || message) ? <div className={`${prefixCls}-message`}>
        {title ? <h3 className={`${prefixCls}-title`}>{title}</h3> : null}
        <p>{message}</p>
      </div> : null}
      {options.map((option, index) => (
        <div
          className={classnames(`${prefixCls}-item`, 'tTE', {
            [`${prefixCls}-item-destructive`]: destructiveButtonIndex === index,
          })}
          onClick={() => {
            onItemClick(index);
          }}
          // eslint-disable-next-line
          key={index}
        >
          {option}
        </div>
      ))}
      <div className={`${prefixCls}-item-split`} />
      <div
        className={`${prefixCls}-item ${prefixCls}-item-cancel tTE`}
        onClick={() => {
          onItemClick(-1);
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
  prefixCls: 't-action-sheet-panel',
  locale: 'zh-cn',
  options: [],
  onItemClick: () => {},
  onCancel: () => {},
  destructiveButtonIndex: undefined,
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
  destructiveButtonIndex: PropTypes.number,
  prefixCls: PropTypes.string,
  options: PropTypes.array,
  locale: PropTypes.string,
};
export default Panel;
