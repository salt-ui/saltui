/**
 * ActionSheet Component for tingle
 * @author
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Context from '../Context';
import Popup from '../Popup';

import Panel from './Panel';
import SharePanel from './SharePanel';

class ActionSheet extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  static displayName = 'ActionSheet';

  render() {
    const t = this;
    return (
      <div
        className={classnames(Context.prefixClass('action-sheet'), {
          [t.props.className]: !!t.props.className,
        })}
      >
        Test Component for Tingle!
      </div>
    );
  }
}

const createActionSheet = (type, options, callback) => {
  const {
    maskClosable,
  } = options;

  const panelMap = {
    NORMAL: Panel,
    SHARE: SharePanel,
  };

  const TruePanel = panelMap[type];
  const handleItemClick = (index, rowIndex) => {
    const res = callback(index, rowIndex);
    if (res && res.then) {
      res.then(() => {
        Popup.hide();
      });
    } else {
      Popup.hide();
    }
  };
  const content = <TruePanel {...options} onItemClick={handleItemClick} />;
  return Popup.show(content, {
    maskClosable,
  });
};

ActionSheet.show = (options, callback) => createActionSheet('NORMAL', options, callback);

ActionSheet.showShare = (options, callback) => createActionSheet('SHARE', options, callback);


export default ActionSheet;
