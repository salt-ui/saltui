/**
 * CheckboxField Component for tingle
 * @author shanchao
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
const React = require('react');
const classnames = require('classnames');
const Icon = require('@ali/tingle-icon');
const Context = require('../Context');
const Group = require('../Group');
const Field = require('../Field');
const SelectLayer = require('./SelectLayer');
const prefixClass = Context.prefixClass;

class CheckboxField extends React.Component {

    constructor(props) {
        super(props);

        const t = this;
        t.state = {
            selectedText: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.getSelectedText(nextProps.data);
    }

    getSelectedText(data) {
        let selectedText = '';
        data.forEach( item => {
            if (item.checked) {
                if(this.props.mode === 'list') {
                    selectedText = selectedText + this.props.titleBreakStr + item.text;
                } else {
                    selectedText = selectedText + this.props.titleBreakStr + (item.slotText ? item.slotText : item.text);
                }
            }
        });

        if (selectedText) {
            selectedText = selectedText.substring(this.props.titleBreakStr.length);
        }

        this.state.selectedText = selectedText;
    }

    componentWillMount() {
        this.getSelectedText(this.props.data);
    }

    getData() {
        let t = this;
        let data = [];

        t.props.data.forEach( function (item) {
            if (item.checked) {
                data.push(item);
            }
        });

        return data;
    }

    clickAction(value, item, index, data) {
        let t = this;
        let {onChange} = t.props;
        let disable = item.disable;
        if (t.props.readOnly || disable) {
            return;
        }
        item.checked = !item.checked;
        onChange && onChange(t.getData());
        t.forceUpdate();
    }

    renderIcon(checked, disable, position) {
        let iconClassName = classnames(prefixClass('checkbox-field-icon'), {
            checked,
            'un-checked': !checked,
            disable,
            [prefixClass('checkbox-field-icon') + '-list']: true,
        });
        return (
            <div className={classnames(prefixClass("checkbox-field-icon-wrapper FBH FBAC"), {
              [position]: !!position,
            })}>
            {
                checked ?
                    <Icon
                        key="check-round"
                        width={26}
                        height={26}
                        name="check-round"
                        className={iconClassName}
                    /> :
                    <div className={iconClassName}></div>
            }
            </div>
        );
    }

    renderList() {
        let t = this;
        let props = t.props;
        let {
            className, data:checkboxArray, groupListArgument, groupListFlag, label, iconPosition,
        } = props;
        const requiredTag = (
            <Icon
                name="field-required"
                className={prefixClass('field-layout-label-required')}
                width={6}
                height={6}
                fill="red"
            />
        );

        let checkboxArrayComponent = checkboxArray.map(function (item, index, data) {
            let {checked, disable, value} = item;
            let finalItemJSX = (
                <div
                    onClick={t.clickAction.bind(t, value, item,index, checkboxArray)}
                    key={index}
                    className={classnames(prefixClass("checkbox-field-row FBAC FBH"), {
                      disable,
                    })}
                >
                    {
                        iconPosition === 'left' && t.renderIcon(checked, disable)
                    }
                    <div
                      ref={"content" + index}
                      className={classnames(
                        prefixClass("checkbox-field-content FB1"),{ disable }
                      )}
                    >{item.content || item.text}</div>
                    {
                        iconPosition === 'right' && t.renderIcon(checked, disable, 'right')
                    }
                    {
                        disable && <div className={prefixClass('checkbox-field-disable-mask')} />
                    }
                </div>

            );
            return (
                finalItemJSX
            );
        });


        let finalJSX = (
            <Group className={classnames(prefixClass('checkbox-field'), {
                [className]: !!className,
                [prefixClass('checkbox-field-readonly')]: t.props.readOnly,
            })}>
                {
                    label == '' ? null :
                        <Group.Head className={classnames(prefixClass('checkbox-field-label'))}>
                            {label}
                            {this.props.required && requiredTag}
                        </Group.Head>
                }
                <Group.List {...groupListArgument} >
                    {checkboxArrayComponent}
                </Group.List>
            </Group>
        );

        if (!groupListFlag) {
            finalJSX = (
                <div ref='root' className={classnames(prefixClass('checkbox-field'), {
                    [className]: !!className,
                    [prefixClass('checkbox-field-readonly')]: t.props.readOnly,
                })}>
                    {checkboxArrayComponent}
                </div>
            )
        }
        return finalJSX;
    }

    handleClick() {
        !this.props.readOnly && this.refs.slot.show();
    }

    handleCancel() {
    }

    handleConfirm(data) {
        this.state.value = data;
        this.getSelectedText(data);
        this.setState(this.state);
        this.props.onChange(data);
    }

    renderSlot() {
        const t = this;
        return (
            <Field
                {...t.props}
                icon={{
                    className: classnames(prefixClass('checkbox-field-icon'), {
                        [prefixClass("checkbox-field-icon") + '-slot']: true,
                        [prefixClass('hide')]: t.props.readOnly,
                    }),
                    name: 'angle-right',
                    width: 24,
                    height: 24,
                    onClick: t.handleClick.bind(t)
                }}
                className={classnames(prefixClass('checkbox-field'), {
                    [t.props.className]: !!t.props.className,
                })}>
                <div onClick={t.handleClick.bind(t)} className={prefixClass('checkbox-field-value-wrap')}>
                    {
                        t.state.selectedText ?
                            <div className={classnames(prefixClass('checkbox-field-value-list'), {
                              [prefixClass('checkbox-field-slot-mode-readonly')]: t.props.readOnly,
                            })}>
                                {t.state.selectedText}
                            </div> :
                            <div className={prefixClass('omit checkbox-field-placeholder')}>
                                {t.props.placeholder}
                            </div>
                    }
                </div>
                <SelectLayer
                    ref="slot"
                    title={t.props.label}
                    confirmText={t.props.confirmText}
                    cancelText={t.props.cancelText}
                    data={t.props.data}
                    value={t.state.value}
                    maskCloseable={t.props.maskCloseable}
                    iconPosition={t.props.iconPosition}
                    onCancel={t.handleCancel.bind(t)}
                    onConfirm={t.handleConfirm.bind(t)}/>
            </Field>
        )
    }

    render() {
        return this.props.mode === 'list' ? this.renderList() : this.renderSlot();
    }
}

CheckboxField.defaultProps = {
    mode: 'slot', // slot, list
    readOnly: false,
    label:'',
    titleBreakStr:'，',
    data: [],
    onChange: function () {},
    placeholder: '',
    maskCloseable: true,
    groupListFlag: true,
    groupListArgument: {
        lineIndent: 0,
        itemIndent: 16
    },
    required: false,
    iconPosition: 'left',
};

// http://facebook.github.io/react/docs/reusable-components.html
CheckboxField.propTypes = {
    className: React.PropTypes.string,
    mode: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    label: React.PropTypes.string,
    titleBreakStr: React.PropTypes.string,
    data: React.PropTypes.array,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    maskCloseable: React.PropTypes.bool,
    groupListFlag: React.PropTypes.bool,
    groupListArgument: React.PropTypes.object,
    required: React.PropTypes.bool,
    iconPosition: React.PropTypes.string,
};

CheckboxField.displayName = 'CheckboxField';

module.exports = CheckboxField;
