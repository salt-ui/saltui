import React from 'react';
import Select from 'uxcore-select2';
import { withRouter, Link } from 'react-router';
import Icon from './Icon';
import IconMenu from '../svg/Menu';
const { Option } = Select;
import classnames from 'classnames';

class Nav extends React.PureComponent {
  static defaultProps = {
    hasAsideToggle: true,
    toggleAside: () => {},
  }
  static propTypes = {
    hasAsideToggle: React.PropTypes.bool,
    toggleAside: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      asideHide: false,
    };
    this._handleSearch = this._handleSearch.bind(this);
    this._handleToggleClick = this._handleToggleClick.bind(this);
  }

  _handleSearch(component) {
    this.props.router.push(`/components/${component}`);
  }

  _handleToggleClick() {
    this.setState({
      asideHide: !this.state.asideHide,
    });
    this.props.toggleAside(this.state.asideHide);
  }

  renderSearchOption(components) {
    return Object.keys(components).map(d => {
      return <Option value={d} key={d}>{d}</Option>;
    })
  }
  
  render() {
    const { components, route, hasAsideToggle } = this.props;
    const componentLink = Object.keys(components)[0];
    return (
        <nav className="nav">
          <h1 className="logo">
            <Link to={`/`}>UXCore</Link>
          </h1>
          <h2>{route.name}</h2>
          <div className="search-container">
            <Select
              ref="selectContainer"
              prefixCls="site-search"
              placeholder={'搜索...'}
              onChange={this._handleSearch}
              getPopupContainer={() => {
                return this.refs.dropdownContainer;
              }}>
              { this.renderSearchOption(components) }
            </Select>
            <div className="dropdown-container" ref="dropdownContainer"></div>
          </div>
          {
            hasAsideToggle ? 
              <IconMenu size={24}
                color="#fff"
                className={classnames('aside-toggle', {
                  active: this.state.asideHide,
                })}
                onClick={this._handleToggleClick}
              /> :
              null
          }
        </nav>
    );
  }
} 

export default withRouter(Nav);
