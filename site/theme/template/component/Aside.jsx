import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import {upperFirstCharactor, removeTingle, mappingNavItem } from '../../../utils';

export default ({ sideNav, components, params }) => {

  return (
    <div className="aside">
      <ul>
      { 
        Object.keys(components)
          .map( (component) => (
            <li 
              key={component}
              className={classnames({
                active: params.component === component,
              })}> 
              <Link to={`/components/${component}`}>
                { upperFirstCharactor(removeTingle(component))}
                <span>{ mappingNavItem(component)}</span>
              </Link>
            </li>
          )) 
      }
      </ul>
    </div>
  );

}

