/**
 * Steps Component Demo for tingle
 * @author muwen.lb
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import Steps, { Step } from '../../src';

class StepsDemo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Steps current={1} showIcon={false} maxDescriptionWidth={10}>
          <Step key={0}></Step>
          <Step key={1}></Step>
          <Step key={2}></Step>
          <Step key={3}></Step>
          <Step key={4}></Step>
        </Steps>
        <Steps current={1} direction="vertical">
          <Step key={0} title="步骤一"></Step>
          <Step key={1} title="步骤二"></Step>
          <Step key={2} title="步骤三"></Step>
          <Step key={3} title="步骤四"></Step>
          <Step key={4} title="步骤五"></Step>
        </Steps>
      </div>
    );
  }
}

export default StepsDemo;
