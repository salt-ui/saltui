/**
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

const React = require('react');
const classnames = require('classnames');
const Context = require('../Context');
const Icon = require('salt-icon');
const Layer = require('../Layer');
const Scroller = require('../Scroller');

const prefixClass = Context.prefixClass;

class SelectLayer extends React.Component {

    constructor(props) {
        super(props);

        const t = this;

        // 初始状态
        t.state = {
            visible: false,
        };
    }

    retain() {
        this.checks = [];
        this.props.data.forEach( item => {
            this.checks.push(item.checked);
        })
    }

    reset() {
        this.props.data.forEach( (item, i) => {
            item.checked = this.checks[i];
        });
    }

    show() {
        let t = this;

        t.retain();
        t.setState({
            visible: true
        }, () => {
        });
    }

    hide() {
        let t = this;

        t.setState({
            visible: false
        }, () => {
        });
    }

    handleCancel() {
        let t = this;
        try {
            t.props.onCancel();
        } finally {
            t.reset();
            t.hide();
        }
    }

    handleClick(item) {
        if (item.disable) {
            return;
        }
        item.checked = !item.checked;
        this.setState(this.state);
    }

    getData() {
        const t = this;
        const data = [];

        this.props.data.forEach( function (item) {
            if (item.checked) {
                data.push(item);
            }
        });
        return data;
    }

    handleConfirm() {
        let t = this;
        try {
            t.props.onConfirm(t.getData());
        } finally {
            t.hide();
        }
    }

    renderIcon(checked, disable, position) {
        let iconClassName = classnames(prefixClass("checkbox-field-icon"), {
            "checked": checked,
            "un-checked": !checked,
            "disable": disable
        });
        return (
            checked ?
                <Icon
                    key="check-round"
                    width={26}
                    height={26}
                    name="check-round"
                    className={iconClassName}
                /> : <div className={iconClassName} ></div>
        );
    }

    render() {
        const t = this;
        const { className, maskCloseable, cancelText, confirmText, iconPosition } = t.props;

        return (
            <Layer
                visible={t.state.visible}
                bottom={0}
                onMaskClick={maskCloseable ? t.handleCancel.bind(t) : (() => maskCloseable)}
            >
                <div
                    ref="root"
                    className={
                        classnames(prefixClass('select-layer'), {
                            [className]: !!className
                        })}
                >
                    <div className={prefixClass('select-layer-header FBH FBAC')}>
                        <div
                            className={prefixClass('select-layer-cancel')}
                            onClick={t.handleCancel.bind(t)}
                        >{cancelText}</div>
                        <div className={prefixClass('FB1 FAC select-layer-title')}>{t.props.title}</div>
                        <div
                            className={classnames(prefixClass('select-layer-confirm'))}
                            onClick={t.handleConfirm.bind(t)}
                        >{confirmText}</div>
                    </div>
                    <div className={prefixClass('select-layer-body FBH FC9 PR')}>
                        <Scroller
                            ref={`scroller`}
                            key={`scroller`}
                            click={true}
                            className={prefixClass('FB1')}
                            autoRefresh={true}
                            tap="iscroll:tap" >
                            <ul className="select-list">
                            {
                                t.props.data.map(function(m, i) {
                                    return (
                                        <li
                                            key={`item${i}`}
                                            onClick={t.handleClick.bind(t, m)}
                                            className={classnames(prefixClass('FBH'), {
                                                'select-layer-item': true,
                                                disable: m.disable,
                                            })}
                                        >
                                        {
                                            iconPosition === 'left' && t.renderIcon(m.checked, m.disable)
                                        }
                                        <div className={classnames(prefixClass('FB1'), {
                                            ['item-content']: true
                                        })}>{m.content || m.text}</div>
                                        {
                                            iconPosition === 'right' && t.renderIcon(m.checked, m.disable, 'right')
                                        }
                                        {
                                            m.disable && <div className={prefixClass('checkbox-field-disable-mask')} />
                                        }
                                    </li>);
                            })}
                            </ul>
                        </Scroller>
                    </div>
                </div>
            </Layer>
        )
    }
}

SelectLayer.defaultProps = {
    title: '',
    value: [],
    maskCloseable: true,
    data:[],
    className:'',
    confirmText: '完成',
    cancelText: '取消',
    iconPosition: 'left',
    onConfirm() {},
    onCancel() {}
};

// http://facebook.github.io/react/docs/reusable-components.html
SelectLayer.propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    value: React.PropTypes.array,
    maskCloseable: React.PropTypes.bool,
    confirmText: React.PropTypes.string,
    cancelText: React.PropTypes.string,
    iconPosition: React.PropTypes.string,
    onConfirm: React.PropTypes.func,
    onCancel: React.PropTypes.func
};

SelectLayer.displayName = 'SelectLayer';

module.exports = SelectLayer;
