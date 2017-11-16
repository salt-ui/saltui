import React from 'react';
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
      {title ? <h3 className={`${prefixCls}-title`}>{title}</h3> : null}
      {message ? <div className={`${prefixCls}-message`}>{message}</div> : null}
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
      {/* <div className={`${prefixCls}-item-split`} /> */}
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
  destructiveButtonIndex: React.PropTypes.number,
  prefixCls: React.PropTypes.string,
  options: React.PropTypes.array,
  locale: React.PropTypes.string,
};
export default Panel;
