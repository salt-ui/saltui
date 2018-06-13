import React from 'react';
import classnames from 'classnames';
// import PlusCircle from 'salt-icon/lib/PlusCircle';
import CrossRound from 'salt-icon/lib/CrossRound';
import PropTypes from 'prop-types';
import Context from '../Context';
import Field from '../Field';
import FoldablePane from '../FoldablePane';
import Dialog from '../Dialog';
import Item from './Item';
import i18n from './i18n';


export default class TagField extends React.Component {
  static displayName = 'TagField';

  static propTypes = {
    ...Field.propTypes,
    locale: PropTypes.string,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    locale: 'zh-cn',
    onAdd: () => { },
    onChange: () => { },
  }

  static Item = Item;

  constructor(props) {
    super(props);
    this.state = {
      dialogShow: false,
      inputValue: '',
      hasError: false,
      canEdit: false,
    };
  }


  getTags() {
    return React.Children.map(this.props.children, child => child.props.tag);
  }

  handleAdd = () => {
    this.setState({
      dialogShow: true,
      inputValue: '',
      hasError: false,
    });
  }

  handleDelete(tag, onDelete) {
    if (typeof onDelete === 'function') {
      onDelete(tag);
    }
    const tags = this.getTags();
    this.props.onChange(tags.filter(key => key !== tag));
  }

  handleEdit = () => {
    this.setState({
      canEdit: !this.state.canEdit,
    });
  }

  handleDialogConfirm = () => {
    const tags = this.getTags();
    const hasError = tags.indexOf(this.state.inputValue) !== -1;
    if (hasError) {
      this.setState({
        hasError,
      });
    } else {
      this.props.onAdd(this.state.inputValue);
      this.props.onChange([this.state.inputValue].concat(tags));
      this.setState({
        dialogShow: false,
      });
    }
  }

  handleDialogCancel = () => {
    this.setState({
      dialogShow: false,
    });
  }

  renderTags() {
    const count = React.Children.count(this.props.children);
    if (count) {
      return (
        <FoldablePane foldHeight={168} isFold>
          <div className={Context.prefixClass('tag-field-tags')}>
            {React.Children.map(this.props.children, child =>
              React.cloneElement(child, {
                canEdit: this.state.canEdit,
                onDelete: (tag) => { this.handleDelete(tag, child.props.onDelete); },
              }))}
          </div>
        </FoldablePane>
      );
    }
    return null;
  }

  renderAction() {
    const { readOnly, locale, children } = this.props;
    if (readOnly) return null;
    const childrenCount = React.Children.count(children);
    return (
      <div className={Context.prefixClass('tag-field-actions')}>
        {childrenCount ? (
          <span
            className={Context.prefixClass('tag-field-action')}
            onClick={this.handleEdit}
          >{this.state.canEdit ? i18n[locale].finish : i18n[locale].edit}
          </span>
        ) : null}
        <span
          className={Context.prefixClass('tag-field-action')}
          onClick={this.handleAdd}
        >{i18n[locale].add}
        </span>
      </div>
    );
  }

  renderError() {
    if (this.state.hasError) {
      const { locale } = this.props;
      return (
        <div className={Context.prefixClass('tag-field-dialog-error')}>
          <CrossRound width={16} height={16} className={Context.prefixClass('tag-field-dialog-error-icon')} />
          {i18n[locale].errorTip}
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      className, children, locale, ...otherProps
    } = this.props;

    const fieldProps = {
      labelRight: this.renderAction(),
      layout: 'v',
    };
    return (
      <div
        className={classnames(Context.prefixClass('tag-field'), {
          [className]: !!className,
        })}
      >
        <Field {...otherProps} {...fieldProps} />
        {this.renderTags()}
        <Dialog
          show={this.state.dialogShow}
          title={i18n[locale].addTag}
          locale={locale}
          type="confirm"
          onConfirm={this.handleDialogConfirm}
          onCancel={this.handleDialogCancel}
        >
          <div className={Context.prefixClass('tag-field-dialog-content')}>
            <input
              value={this.state.inputValue}
              className={Context.prefixClass('tag-field-dialog-input')}
              placeholder={i18n[locale].inputPlaceholder}
              onChange={(e) => { this.setState({ inputValue: e.target.value }); }}
            />
            {this.renderError()}
          </div>
        </Dialog>
      </div>

    );
  }
}
