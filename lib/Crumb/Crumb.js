/**
 * Crumb Component for tingle
 * @author quanyun.mqy
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Context = require('@ali/tingle-context');
const Scroller = require('@ali/tingle-scroller');
const IScroll = require("@ali/tingle-scroller/dist/iscroll");
const Item = require('./CrumbItem');

class Crumb extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // 计算宽度和滚动
        let t = this;
        if (t.props.showScroll) {
            let w = 0;
            let scrollEl = ReactDOM.findDOMNode(t.refs.scroll);
            let chNodes = scrollEl.childNodes;
            for (let i = 0, l = chNodes.length; i < l; i++) {
                w += chNodes[i].offsetWidth + 1;
            }

            scrollEl.style.width = w + "px";
            // t.refs.root.scroller.scrollTo(-w, 0, 1000, IScroll.utils.ease.elastic);
            t.refs.root.scroller.scrollTo(-w);
            // 实例化滚动
            t.refs.root.scroller.refresh();
        }
    }

    renderItems() {
        const t = this;
        const len = React.Children.count(t.props.children);
        let crumbArray = [];
        React.Children.forEach(t.props.children, (child, idx) => {
            if (child.type.displayName === 'CrumbItem') {
                crumbArray.push(
                    React.cloneElement(child, {
                        key: idx,
                        className: t.props.showScroll ? Context.prefixClass('FL') : '',
                        disabled: idx === len - 1,
                        onClick: t.props.onClick.bind(t, idx),
                    })
                );
                if (idx !== len - 1) {
                    crumbArray.push(
                        <span
                            key={`nav-${idx}`}
                            className={classnames(Context.prefixClass('crumb-nav-icon'), {
                                [Context.prefixClass('FL')]: t.props.showScroll
                            })}
                        >&gt;</span>
                    );
                }
            }
        });
        return crumbArray;
    }

    render() {
        const t = this;
        const scroll = t.props.showScroll;
        const classNames = classnames(Context.prefixClass('crumb'), {
            [t.props.className]: !!t.props.className
        });
        if(scroll) {
            return (
                <Scroller
                    ref='root'
                    className={classNames}
                    scrollX={true}
                    scrollY={false}
                >
                    <div className={Context.prefixClass('CL crumb-scroll')} ref="scroll">
                        {
                            t.renderItems()
                        }
                    </div>
                </Scroller>
            );
        }
        return (
            <div
                ref='root'
                className={classNames}
            >
                {
                    t.renderItems()
                }
            </div>
        );
    }
}

Crumb.defaultProps = {
    className: '',
    showScroll: true,
    onClick: () => {},
};

// http://facebook.github.io/react/docs/reusable-components.html
Crumb.propTypes = {
    className: React.PropTypes.string,
    showScroll: React.PropTypes.bool,
    onClick: React.PropTypes.func,
};

Crumb.displayName = 'Crumb';

Crumb.Item = Item;

module.exports = Crumb;
