/**
 * Group.List Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Context = require('../Context');
const { createStyleContext, unitize } = require('../Style');

let isEmptyValue = (v) => {
    return v === null || v === undefined || v === '';
};

let prefixClass = Context.prefixClass;
let style = createStyleContext(prefixClass('group-list'));

class List extends React.Component {

    constructor(props) {
        super(props);
        let t = this;
        t._lineIndentClassName = [];
        t._itemIndentClassName = [];

        props.lineIndent && t.addIndent('Line');
        props.itemIndent && t.addIndent('Item');
    }

    // 由props属性转换成css样式规则 并插入到页面
    addIndent(type) {
        let t = this;
        let indentArray = [].concat(t.props[type.toLowerCase() + 'Indent']);

        let className = [];
        className.push(t[`make${type}IndentClassName`]('left', unitize(indentArray[0])));
        className.push(t[`make${type}IndentClassName`]('right', unitize(indentArray[1])));

        t[`_${type}IndentClassName`] = className.join(' ');
    }

    /**
     * 生成间隔线缩进对应的`classClass`值和`CSS`样式
     * @param side {String} Left|Right
     * @param value {String} `CSS`样式的长度值
     * @returns {String} 生成的`className`字符串
     */
    makeLineIndentClassName(side, value) {
        if (!value) {
            return;
        }
        let t = this;
        let lowerSide = side.toLowerCase();
        let indent = `${side}-${value}`;
        style.add(`line-indent-${indent}`, `
            .${prefixClass('group-list')}.line-indent-${indent} .${prefixClass('group-list-item')}:after{
                ${lowerSide}: ${value}
            }
        `);
        return `line-indent-${indent}`;
    }

    /**
     * 生成Item缩进对应的`classClass`值和`CSS`样式
     * @param side {String} Left|Right
     * @param value {String} `CSS`样式的长度值
     * @returns {String} 生成的`className`字符串
     */
    makeItemIndentClassName(side, value) {
        if (!value) {
            return;
        }
        let t = this;
        let lowerSide = side.toLowerCase();
        let indent = `${side}-${value}`;
        style.add(`item-indent-${indent}`, `
            .${prefixClass('group-list')}.item-indent-${indent} .${prefixClass('group-list-item')}{
                padding-${lowerSide}: ${value}
            }
        `);
        return `item-indent-${indent}`;
    }

    render() {
        let t = this;
        return (
            <div className={classnames(prefixClass('group-list'), {
                [t.props.className]: !!t.props.className,
                [t._LineIndentClassName]: !!t._LineIndentClassName,
                [t._ItemIndentClassName]: !!t._ItemIndentClassName,
                [prefixClass('BT1')]: !t.props.borderTopNone
            })}>
                {React.Children.map(t.props.children, (Item) => {
                    // 需要过滤掉空值的item
                    return !isEmptyValue(Item) ? <div className={prefixClass('group-list-item')}>{Item}</div> : null;
                })}
            </div>
        );
    }
}

List.displayName = 'Group.List';

let indentType = React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
    React.PropTypes.array
]);

List.propTypes = {
    className: React.PropTypes.string,
    lineIndent: indentType,
    itemIndent: indentType,
    borderTopNone: React.PropTypes.bool
};

List.defaultProps = {
    borderTopNone: false
};

module.exports = List;
