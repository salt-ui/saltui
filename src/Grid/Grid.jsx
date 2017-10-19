/**
 * Collection Component Demo for tingle
 * @author gnosaij, changming.zy
 *
 * Copyright 2014-2017, Tingle Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Context = require('../Context');
const { VBox } = require('../Boxs');
const Row = require('./Row');

const prefixClass = Context.prefixClass;

class Grid extends React.Component {
  /**
  * 将子元素的索引值根据列数划分成组
  * @returns {Array}
  */
  cutIndexesIntoRows() {
    const t = this;
    const rowIndexes = [];
    let childrenCount = React.Children.count(t.props.children);
    const dummyIndexArray = [];
    let dummyIndex = 0;
    while (childrenCount > 0) {
      childrenCount -= 1;
      dummyIndexArray.push(dummyIndex);
      dummyIndex += 1;
    }

    while (dummyIndexArray.length) {
      rowIndexes.push(dummyIndexArray.splice(0, t.props.col));
    }

    return rowIndexes;
  }

  render() {
    const t = this;
    // react0.14
    const children = React.Children.toArray(t.props.children);

    const rows = t.cutIndexesIntoRows();
    const { className, noLine, ...rowProps } = t.props;

    return (
      <div
        className={classnames(prefixClass('grid'), {
          [className]: !!className,
          [prefixClass('no-line')]: noLine,
          [prefixClass('has-line')]: !noLine,
          [prefixClass('grid-touchable')]: this.props.touchable,
        })}
      >
        {
          rows.map((indexes, i) => (
            <Row {...rowProps} key={i}>
              {indexes.map(index => children[index])}
            </Row>
          ))
        }
      </div>
    );
  }
}

Grid.defaultProps = {
  className: '',
  col: 4,
  square: false,
  noLine: false,
  itemHAlign: 'center',
  itemVAlign: 'center',
  touchable: false,
};

// http://facebook.github.io/react/docs/reusable-components.html
Grid.propTypes = {
  className: React.PropTypes.string,
  // 列数
  col: React.PropTypes.number,
  // 是否自适应单元格的高度 使单元格成为正方形
  square: React.PropTypes.bool,
  // 是否隐藏分割线
  noLine: React.PropTypes.bool,
  // 单个格子的水平对其方式
  itemHAlign: VBox.propTypes.hAlign,
  // 单个格子的垂直对其方式
  itemVAlign: VBox.propTypes.vAlign,
  // 单元格是否可点击
  touchable: React.PropTypes.bool,
};

Grid.displayName = 'Grid';

module.exports = Grid;
