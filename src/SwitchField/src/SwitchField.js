/**
 * SwitchField Component for tingle
 * @dongrui.yang
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const Switch = require('@ali/tingle-switch');
const Field = require('@ali/tingle-field');
const classnames = require('classnames');
const Context = require('@ali/tingle-context');

class SwitchField extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange(on) {
        this.props.onChange(on);
    }

    render() {
        let t = this;
        return (
            <Field {...t.props} className={classnames(Context.prefixClass('switch-field'), t.props.className, {
                'readOnly': t.props.readOnly
            })}>
                <div className="t-FBH">
                    <div className="t-FB1"></div>
                    <Switch on={this.props.on} readOnly={t.props.readOnly} onChange={this.handleChange.bind(this)} />
                </div>
            </Field>
        );
    }
}

SwitchField.defaultProps = {
    label: '',
    className:''
};

// http://facebook.github.io/react/docs/reusable-components.html
SwitchField.propTypes = {
    label: React.PropTypes.string.isRequired,
    className:React.PropTypes.string
};

SwitchField.displayName = 'SwitchField';

module.exports = SwitchField;
