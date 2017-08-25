/**
 * Icon Component Demo for tingle
 * @author hanyu
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const Grid = require('@ali/tingle-grid');

const Icon = require('../../src');

const SymbolIcon = require('../../src/Symbol');

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      colorIcons: [
        'cross',
        'check',
        'map',
        'pen',
        'photo',
      ],
      icons: [
        'angle-down',
        'angle-left',
        'angle-right',
        'angle-up',
        'direction-bottom',
        'direction-left',
        'direction-right',
        'direction-top',
        'check-round',
        'cross-round',
        'check',
        'cross',
        'option-checked',
        'face-sad-full',
        'face-sad-line',
        'face-smile-full',
        'face-smile-line',
        'info-circle',
        'info-round',
        'note-round',
        'warn-line',
        'field-required',
        'loading',
        'loading-round',
        'map',
        'plus-round',
        'minus-round',
        'plus-circle',
        'minus-circle',
        'plus-thin',
        'plus',
        'minus-thin',
        'pen',
        'photo',
        'search',
        'star-full',
        'star-line',
        'star',
        'time',
        'setting',
        'toast-error',
        'toast-fail',
        'toast-loading',
        'toast-success',
        'user',
        'totop',
        'eye',
        'eye-close',
        'lock',
        'upload',
      ],
    };
  }

  render() {
    return (
      <div>
        <div className="t-P20 t-FAC">
          <Icon name="star" className="logo" />
        </div>
        <div className="t-BCe t-FAC t-LH44">单色SVG图标</div>
        <Grid col={5} square>
          {React.Children.toArray(this.state.icons.map((icon) => {
            return (
              <span className="t-FBV t-FB1 t-FBJC t-FBAC">
                <Icon name={icon} className="demoIcon" />
                <p className="icon-name">{icon}</p>
              </span>
            );
          }))}
        </Grid>
        <div className="t-BCe t-FAC t-LH44">单色SVG图标, 设置尺寸和颜色</div>
        <Grid col={5} square>
          {React.Children.toArray(this.state.icons.map((icon) => {
            return (
              <span className="t-FBV t-FB1 t-FBJC t-FBAC">
                <Icon name={icon} className="demoIcon2" />
                <p className="icon-name">{icon}</p>
              </span>
            );
          }))}
          <Icon name="toast-error" fill="#4d9df0" />
          <Icon name="toast-fail" fill="#9462a9" />
          <Icon name="toast-loading" fill="#7bc380" />
          <Icon name="toast-success" fill="#942a09" />
          <Icon name="plus-circle" fill="#e65100" />
        </Grid>
        <div className="t-BCe t-FAC t-LH44">使用 Symbol</div>
        <SymbolIcon name="field-required" fill="#e65100" />
      </div>
    );
  }
}

module.exports = Demo;

