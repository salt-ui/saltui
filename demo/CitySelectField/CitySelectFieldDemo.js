/**
 * CitySelectField Component Demo for tingle
 * @author qingnan.yqn
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

const React = require('react');
const districtData = require('./staticData');
const CitySelectField = require('../../src');

// build之后, 测试一下下面一行, 把上面一行注释掉
// const CitySelectField = require('../../dist');

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  render() {
    return (
      <div>
        <div>
          <CitySelectField
            // value={['110000', '110100']}
            layout="v"
            selectorType="city"
            label="省市选择"
            placeholder="请选择"
            required
            confirmText="确认"
            cancelText="取消"
            provinceText="省"
            cityText="市"
            districtText="区"
            // readOnly
            districtData={districtData}
          // onSelect={value => this.setState({ value })}
          />
        </div>
        <div>
          <CitySelectField
            // value={['110000', '110100']}
            layout="v"
            selectorType="province"
            label="省市选择"
            placeholder="请选择"
            required
            confirmText="确认"
            cancelText="取消"
            provinceText="省"
            cityText="市"
            districtText="区"
            // readOnly
            districtData={districtData}
          // onSelect={value => this.setState({ value })}
          />
        </div>
        <div>
          <CitySelectField
            // value={['110000', '110100']}
            layout="v"
            selectorType="district"
            label="省市选择"
            placeholder="请选择"
            required
            confirmText="确认"
            cancelText="取消"
            provinceText="省"
            cityText="市"
            districtText="区"
            // readOnly
            districtData={districtData}
          // onSelect={value => this.setState({ value })}
          />
        </div>
        <div>
          <CitySelectField
            // value={['110000', '110100']}
            layout="v"
            // selectorType="city"
            label="省市选择"
            placeholder="请选择"
            required
            confirmText="确认"
            cancelText="取消"
            provinceText="省"
            cityText="市"
            districtText="区"
            // readOnly
            districtData={districtData}
          // onSelect={value => this.setState({ value })}
          />
        </div>
        <div>
          <CitySelectField
            // value={['110000', '110100']}
            layout="v"
            // selectorType="city"
            label="省市选择"
            placeholder="请选择"
            required
            confirmText="确认"
            cancelText="取消"
            provinceText="省"
            cityText="市"
            districtText="区"
            readOnly
            value={["***"]}
            districtData={districtData}
          />
        </div>
      </div>

    );
  }
}

module.exports = Demo;
