/**
 * Switch Component for tingle
 * @author ruiyang.dry
 *
 * Copyright 2014-2016, Tingle Team, Alinw.
 * All rights reserved.
 */
let classnames = require('classnames');

const Context = require('@ali/tingle-context');

class Switch extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange(event) {
        let t = this;
        if (t.props.readOnly) {
            return;
        }
        t.props.onChange(!t.props.on, event)
    }

    render() {
        let t = this;
        let classSet = {
            "active": t.props.on,
            "readOnly": t.props.readOnly,
            [t.props.className]: !!t.props.className
        };
        return (
            <div
                className={classnames(Context.prefixClass('switch'), classSet)}
                readOnly={t.props.readOnly}
                onClick={t.handleChange.bind(this)}>
                <div className={Context.prefixClass('switch-back')}>
                    <div className={Context.prefixClass('switch-radius')}></div>
                </div>
            </div>
        );
    }
}

Switch.defaultProps = {
    on: true,
    onChange() {
    },
    readOnly: false
};

// http://facebook.github.io/react/docs/reusable-components.html
Switch.propTypes = {
    on: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool
};

Switch.displayName = "Switch";

module.exports = Switch;
