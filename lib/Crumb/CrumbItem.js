const React = require('react');
const classnames = require('classnames');
const Context = require('@ali/tingle-context');

class CrumbItem extends React.Component {

    handleClick() {
        const t = this;
        if (!t.props.disabled) {
            t.props.onClick();
        }
    }

    render() {
        const t = this;
        const classNames = classnames(Context.prefixClass('crumb-item'), {
            [t.props.className]: !!t.props.className,
            disabled: t.props.disabled
        });
        return (
            <span
                className={classNames}
                onClick={t.props.onClick.bind(t)}
            >{t.props.children}</span>
        );
    }
}

CrumbItem.defaultProps = {
    disabled: false,
    onClick: () => {},
};

CrumbItem.propTypes = {
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
};

CrumbItem.displayName = 'CrumbItem';

module.exports = CrumbItem;
