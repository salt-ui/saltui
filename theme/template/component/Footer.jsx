import React from 'react';
import classnames from 'classnames';

export default class Footer extends React.PureComponent {
  render() {
    return <div className="site-footer">
    <div className="footer-right">
      © 2016 Alibaba, Inc. Licensed under MIT license.
    </div>
    <div className="footer-power">
      <span>DESIGNED BY</span>
      <img src="//img.alicdn.com/tps/TB1uIG_OXXXXXa2aXXXXXXXXXXX-160-70.png" />
      <span>阿里巴巴信息平台前端团队</span>
    </div>
  </div>
  }
}