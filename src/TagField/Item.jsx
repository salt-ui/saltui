import React from 'react';
import PropTypes from 'prop-types';
import CrossRound from 'salt-icon/lib/CrossRound';
import Context from '../Context';

export default class TagFieldItem extends React.Component {
  static displayName = 'TagFieldItem';
  static propTypes = {
    canEdit: PropTypes.bool,
    canDelete: PropTypes.bool,
    onDelete: PropTypes.func,
    tag: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };
  static defaultProps = {
    canEdit: false,
    canDelete: false,
    onDelete: () => {},
    tag: undefined,
  }

  handleDel = () => {
    this.props.onDelete(this.props.tag);
  }
  render() {
    const { canDelete, canEdit, tag } = this.props;
    return (
      <div className={Context.prefixClass('tag-field-item')}>
        <div className={Context.prefixClass('tag-field-item-text')}>
          {tag}
        </div>
        {(canEdit && canDelete) ? <CrossRound
          width={20}
          height={20}
          className={Context.prefixClass('tag-field-item-icon-delete')}
          onClick={this.handleDel}
        /> : null}
      </div>
    );
  }
}
