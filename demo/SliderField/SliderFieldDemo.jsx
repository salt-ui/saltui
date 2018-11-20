import React from 'react';
import SliderField from 'salt-slider-field';
import './SliderFieldDemo.styl';

export default class SliderFieldDemo extends React.Component {
  log = name => (value) => {
    console.log(`${name}: ${value}`);
  }

  render() {
    return (
      <div className="t-slider-example">
        <SliderField
          label="基本"
          className="slider-field-demo"
          defaultValue={30}
          onChange={this.log('change')}
          onAfterChange={this.log('afterChange')}
        />
        <SliderField
          label="纵向"
          layout="v"
          className="slider-field-demo"
          defaultValue={30}
          onChange={this.log('change')}
          onAfterChange={this.log('afterChange')}
        />
        <SliderField
          label="显示值"
          showValue
          className="slider-field-demo"
          defaultValue={30}
          onChange={this.log('change')}
          onAfterChange={this.log('afterChange')}
        />
        <SliderField
          label="禁用"
          className="slider-field-demo"
          defaultValue={30}
          min={0}
          max={50}
          disabled
          onChange={this.log('change')}
          onAfterChange={this.log('afterChange')}
        />
        <SliderField
          label="带刻度"
          className="slider-field-demo"
          defaultValue={30}
          min={0}
          max={50}
          marks={{ 5: 'mark1', 15: 'mark2' }}
          onChange={this.log('change')}
          onAfterChange={this.log('afterChange')}
        />
        <SliderField
          label="自定义颜色"
          className="slider-field-demo"
          defaultValue={30}
          min={0}
          max={50}
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
    );
  }
}
