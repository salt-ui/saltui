import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { Link } from 'react-router';
import '../../static/style';
import Aside from '../component/Aside';
import Nav from '../component/Nav';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

window.react = React;
window['react-dom'] = ReactDOM;

const config = require('../../index');

export default class Layout extends React.Component {
  static defaultProps = {
    hasAside: true,
    showAside: true,
  }
  static propTypes = {
    hasAside: React.PropTypes.bool,
    showAside: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      showAside: this.props.showAside,
    };
    this._handleAsideToggle = this._handleAsideToggle.bind(this); 
  }

  _handleAsideToggle(show) {
    this.setState({
      showAside: show,
    });
  }

  render() {
    const { data, children, routeParams, route, hasAside } = this.props;
    const { showAside } = this.state;
    return (
      <div className={classnames('page-wrap', {
        'hide-aside': !showAside || !hasAside, 
      })}>
        <Nav route={route} components={data.components} toggleAside={this._handleAsideToggle} hasAsideToggle={hasAside} />
        <ReactCSSTransitionGroup
          transitionName="aside"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {
            hasAside && showAside ? 
              <Aside sideNav={config.sideNav} key="aside" route={route} />
            : null
          }
        </ReactCSSTransitionGroup>
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

