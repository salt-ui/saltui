import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';

import Aside from '../component/Aside';
import Nav from './Nav';

import '../../static/style';
const config = require('../../index');

export default class Layout extends React.Component {

  static defaultProps = {
    hasAside: true,
  }
  static propTypes = {
    hasAside: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);
    
  }

  render() {
    const { data, children, routeParams, route, hasAside, params } = this.props;
    
    return (
      <div className={classnames('page-wrap', {
        'hide-aside': !hasAside, 
      })}>

        <Nav route={route} components={data.components} />

        {
          hasAside && 
            <Aside 
              key="aside"
              sideNav={config.sideNav}  
              params={params} 
              components={data.components}/>
        }
        
        <div className="main">
          <div className={classnames({
            content: hasAside,
          })}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

/*<ReactCSSTransitionGroup
          transitionName="aside"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {
            hasAside && 
              <Aside 
                key="aside"
                sideNav={config.sideNav}  
                params={params} 
                components={data.components}/>
          }
        </ReactCSSTransitionGroup>*/




