import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Icon from './Icon';

export default class Aside extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderNavList(sideNav, route) {
    return (
      <ul>
        {
          sideNav.map((c, i) => {
            return <li key={c.name} className={classnames({
              active: route.path === c.path,
            })}><Link to={c.path}><Icon name={c.icon} />{c.name}</Link></li>
          })
        }
      </ul>
    );
  }

  render() {
    const { route, sideNav } = this.props;
    return (
        <div className="aside">
          { this.renderNavList(sideNav, route) }
        </div>
    );
  }
} 
