import React from 'react';
import classnames from 'classnames';

export default ({content, title, icon}) => {
  return (
      <div className="uxcore-content">
        <h2 className="uxcore-md-title">
          <i className={classnames('iconfont', `icon-${icon}`)}></i>{title}
        </h2>
        <div className="uxcore-md">
          { content }
        </div>
      </div>
  );
}
