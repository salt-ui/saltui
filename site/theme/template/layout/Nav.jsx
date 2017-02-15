import React from 'react';
import { withRouter, Link } from 'react-router';
import classnames from 'classnames';
import Select from 'uxcore-select2';

import Icon from '../component/Icon';
// import IconMenu from '../svg/Menu';
const { Option } = Select;
import NavLink from './NavLink';

class Nav extends React.PureComponent {
  
  constructor(props) {
    super(props);
    
    this._handleSearch = this._handleSearch.bind(this);
  }


  _handleSearch(component) {
    this.props.router.push(`/components/${component}`);
  }


  renderSearchOption(components) {
    return Object
      .keys(components)
      .map(component => <Option key={component} value={component} >{component}</Option>);
  }
  
  render() {
    const { components, route } = this.props;
    const defaultComp = Object.keys(components)[0];
    return (
      <nav className="nav">
        
        <div className="search-container">
          <Select
            ref="selectContainer"
            prefixCls="site-search"
            placeholder={'搜索...'}
            onChange={this._handleSearch}
            getPopupContainer={() => this.refs.dropdownContainer}>
            { this.renderSearchOption(components) }
          </Select>
          <div className="dropdown-container" ref="dropdownContainer"></div>
        </div>

        <div className="logo" />
        <NavLink href={`/`} name="首页" route={route} activeLink={`/`}/>
        <NavLink href={`/components/${defaultComp}`} name="组件" route={route} activeLink={`/components`}/>
        
      </nav>
    );
  }
} 

export default withRouter(Nav);
