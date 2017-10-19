/**
 * Collection Component Demo for tingle
 * @author gnosaij, changming.zy
 *
 * Copyright 2014-2017, Tingle Team, Alinw.
 * All rights reserved.
 */

const React = require('react');
const Context = require('../Context');
const { VBox } = require('../Boxs');

const prefixClass = Context.prefixClass;

class Row extends React.Component {
  // 根据`col`的设置，补充空的`item`
  fillEmptyItem(n) {
    if (n === 0) {
      return null;
    }

    const t = this;
    const ret = [];

    while (n-- > 0) {
      ret.push(
        <VBox
          flex={1}
          hAlign={t.props.itemHAlign}
          vAlign={t.props.itemVAlign}
          className={prefixClass('grid-item')}
          style={t.props.square ? { height: `${10 / t.props.col}rem` } : {}}
        />
      );
    }
    return React.Children.toArray(ret);
  }

  render() {
    const t = this;
    const toFilledItemNumber = t.props.col - React.Children.count(t.props.children);

    return (
      <div className={`${prefixClass('grid-row')} ${prefixClass('FBH')}`}>
        {
          React.Children.map(t.props.children, (child, i) => (
            <VBox
              flex={1}
              hAlign={t.props.itemHAlign}
              vAlign={t.props.itemVAlign}
              className={prefixClass('grid-item')} key={i}
              style={t.props.square ? { height: `${10 / t.props.col}rem` } : {}}
            >
              {child}
            </VBox>
          ))
        }
        {t.fillEmptyItem(toFilledItemNumber)}
      </div>
    );
  }
}

Row.defaultProps = {
  col: 4,
  square: false,
};

Row.propTypes = {
  col: React.PropTypes.number,
  square: React.PropTypes.bool,
  // 单个格子的水平对其方式
  itemHAlign: VBox.propTypes.hAlign,
  // 单个格子的垂直对其方式
  itemVAlign: VBox.propTypes.vAlign,
};

module.exports = Row;
