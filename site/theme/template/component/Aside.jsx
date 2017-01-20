import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

export default ({ sideNav, components, params }) => {


  const upperFirstCharactor = (word) => word.slice(0, 1).toUpperCase() + word.slice(1);

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
              <Link to={`/components/${component}`}>{ upperFirstCharactor(component)}</Link>
            </li>
          )) 
      }
      </ul>
    </div>
  );

}

