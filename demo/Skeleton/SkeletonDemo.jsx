/**
 * Slot Component Demo for tingle
 * @author lj124435
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Skeleton from 'salt-skeleton';

class Demo extends React.Component {
  constructor(props) {
    super(props);


    const t = this;
    t.state = {
      visible: false,
    };
  }


  render() {
    return (
      <div className="demo">
        <Skeleton visible animate rows={2} type={1} />
        <Skeleton visible animate rows={2} type={2} />
        <Skeleton visible animate rows={2} type={3} />
      </div>
    );
  }
}

export default Demo;

