import React from 'react';
import Slider from 'salt-slider';
import './SliderDemo.styl'

export default class App extends React.Component {
  log = (name) => {
    return (value) => {
      console.log(`${name}: ${value}`);
    };
  }

  render() {
    return (
      <div className="t-slider-example">
        <p className="sub-title">基本滑块</p>
        <Slider
          className="slider-demo"
          defaultValue={26}
          onChange={this.log('change')}
          onAfterChange={this.log('afterChange')}
        />
        <p className="sub-title">滑块-禁用</p>
        <Slider
          className="slider-demo"
          defaultValue={26}
          min={0}
          max={30}
          disabled
          onChange={this.log('change')}
          onAfterChange={this.log('afterChange')}
        />
        <p className="sub-title">滑块-带刻度</p>
        <Slider
          className="slider-demo"
          defaultValue={26}
          min={0}
          max={30}
          marks={{5: 'mark1',15: 'mark2'}}
          onChange={this.log('change')}
          onAfterChange={this.log('afterChange')}
        />
        <p className="sub-title">滑块-自定义颜色</p>
        <Slider
          className="slider-demo"
          defaultValue={26}
          min={0}
          max={30}
          trackStyle={{
            backgroundColor: '#F4606C',
            height: '5px',
          }}
          railStyle={{
            backgroundColor: '#BEE7E9',
            height: '5px',
          }}
          handleStyle={{
            borderColor: '#BEE7E9',
            height: '14px',
            width: '14px',
            marginLeft: '-7px',
            marginTop: '-4.5px',
            backgroundColor: '#BEE7E9',
          }}
        />
      </div>
    )
  }
}
