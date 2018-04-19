/**
 * Refreshcontrol Component Demo for tingle
 * @author xiaohe.wp
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Refreshcontrol from 'salt-refreshcontrol';
import PropTypes from 'prop-types';

function Item(props) {
  return <div className="item">{`this is item ${props.index}`}</div>;
}

Item.propTypes = {
  index: PropTypes.number.isRequired,
};

class RefreshcontrolDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      repeat: 10,
    };
  }

  onRefresh() {
    this.setState({ refreshing: true });

    setTimeout(() => {
      this.setState({
        refreshing: false,
        repeat: this.state.repeat + 2,
      });
    }, 2000);
  }

  renderItems() {
    const items = [];
    for (let i = this.state.repeat; i >= 0; i--) {
      items.push(<Item key={i} index={i} />);
    }

    return items;
  }

  render() {
    return (
      <Refreshcontrol refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)}>
        <div className="demo">
          {this.renderItems()}
        </div>
      </Refreshcontrol>
    );
  }
}

export default RefreshcontrolDemo;
