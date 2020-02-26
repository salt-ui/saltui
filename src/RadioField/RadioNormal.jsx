import React from 'react';
import classnames from 'classnames';
import Context from '../Context';

const { prefixClass } = Context;

export default props => (
  <svg className={classnames(props.className)} width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g className={prefixClass('radio-field-icon-border')} stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeOpacity="0.3">
      <g transform="translate(0.000000, -1.000000)" fill="#FFFFFF" stroke="#1F3858">
        <path d="M8,1.5 C5.92893219,1.5 4.05393219,2.33946609 2.69669914,3.69669914 C1.33946609,5.05393219 0.5,6.92893219 0.5,9 C0.5,11.0710678 1.33946609,12.9460678 2.69669914,14.3033009 C4.05393219,15.6605339 5.92893219,16.5 8,16.5 C10.0710678,16.5 11.9460678,15.6605339 13.3033009,14.3033009 C14.6605339,12.9460678 15.5,11.0710678 15.5,9 C15.5,6.92893219 14.6605339,5.05393219 13.3033009,3.69669914 C11.9460678,2.33946609 10.0710678,1.5 8,1.5 Z" />
      </g>
    </g>
  </svg>
);
