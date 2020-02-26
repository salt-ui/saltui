import React from 'react';
import classnames from 'classnames';

export default props => (
  <svg className={classnames(props.className)} width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(0.000000, -1.000000)" fill="#1F3858">
        <g transform="translate(0.000000, 1.000000)">
          <rect strokeOpacity="0.2" stroke="#1F3858" fillOpacity="0.04" x="0.5" y="0.5" width="15" height="15" rx="3" />
          <path d="M5,4 L5,8 L13,8 L13,10 L3,10 L3,4 L5,4 Z" fillOpacity="0.2" transform="translate(8.000000, 7.000000) rotate(-45.000000) translate(-8.000000, -7.000000) " />
        </g>
      </g>
    </g>
  </svg>
);
