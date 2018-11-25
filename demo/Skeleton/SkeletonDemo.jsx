/**
 * Slot Component Demo for tingle
 * @author lj124435
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Skeleton from 'salt-skeleton';

const {
  ImageSmall,
  ImageBig,
  TextBar,
  Circle,
  OperationBar,
} = Skeleton;

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
        <Circle animate />
        <TextBar animate />
        <ImageSmall animate />
        <ImageBig animate />
        <OperationBar animate />
        {/* <Skeleton visible animate rows={10} /> */}
      </div>
    );
  }
}

export default Demo;

