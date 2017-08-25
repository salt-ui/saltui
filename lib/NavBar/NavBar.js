/**
 * NavBar Component for tingle
 * @author ruiyang.dry
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const classnames = require('classnames');

const Context = require('../Context');

const Icon = require('salt-icon');

let prefixClass = Context.prefixClass;

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isShow: this.props.isShow
        };
    }

    handleBackClick() {
        this.props.onLeftClick();
    }

    handleOptionClick() {
        this.props.onRightClick();
    }

    handleCloseView() {
        this.props.closeViewClick();
    }

    render() {
        let t = this;
        return <div ref='root' className={classnames(prefixClass('nav-bar'), {
            [t.props.className]: !!t.props.className
        })}>
            <div className={prefixClass('nav-bar-left FAL')}>
                <div className={prefixClass("nav-bar-left-option")} onClick={this.handleBackClick.bind(this)}>
                    <Icon className={prefixClass("nav-bar-arrow-left")} name="angle-left"/>
                    <span>返回</span>
                </div>
                {this.state.isShow ? <span className={prefixClass("nav-bar-close")}
                                           onClick={this.handleCloseView.bind(this)}>关闭</span> : null}
            </div>
            <div className={prefixClass('nav-bar-center nav-bar-center-text omit3 FAC')}>
                {this.props.title}
            </div>
            <div className={prefixClass('nav-bar-right FAR')} onClick={this.handleOptionClick.bind(this)}>
                <span className={prefixClass("nav-bar-right-text")}>{this.props.rightText}</span>
            </div>
        </div>;
    }
}

NavBar.defaultProps = {
    className: '',
    title: '',
    rightText: '更多',
    isShow: true,
    onLeftClick: function () {
    },
    onRightClick: function () {
    },
    closeViewClick: function () {
    }
};

// http://facebook.github.io/react/docs/reusable-components.html
NavBar.propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    rightText: React.PropTypes.string,
    onLeftClick: React.PropTypes.func,
    onRightClick: React.PropTypes.func,
    closeViewClick: React.PropTypes.func,
    isShow: React.PropTypes.bool
};

NavBar.displayName = 'NavBar';

module.exports = NavBar;
