import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import classnames from 'classnames';
import Context from '../Context';

const isUrl = str => /((\/\/)|^\.{0,2}\/|(^data:image)).+/g.test(str);
const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';

class TabBarItemIcon extends React.Component {
  static displayName = 'TabBarItemIcon';
  static propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.element,
    ]),
    activeIcon: PropTypes.string,
    iconStyle: PropTypes.object,
    activeIconStyle: PropTypes.object,
    type: PropTypes.string,
    iconHeight: PropTypes.number,
    title: PropTypes.string,
    className: PropTypes.string,
  };
 static defaultProps={
   active: undefined,
   icon: undefined,
   activeIcon: undefined,
   iconStyle: undefined,
   activeIconStyle: undefined,
   type: undefined,
   iconHeight: undefined,
   title: undefined,
   className: undefined,
 }
 getIcon() {
   const { icon } = this.props;
   return isArray(icon) ? icon[0] : icon;
 }

 getActiveIcon() {
   const { icon, activeIcon } = this.props;
   if (activeIcon) {
     return activeIcon;
   }
   return isArray(icon) ? icon[1] : icon;
 }

 renderImgIcon(icon, title, style) {
   let className;
   if (this.props.type === 'more') {
     className = classnames(
       Context.prefixClass('tabs-bar-item-img-icon'),
       Context.prefixClass('tabs-bar-item-img-more-icon'),
     );
   } else {
     className = Context.prefixClass('tabs-bar-img-icon');
   }
   return (<img
     className={className}
     style={style}
     src={icon}
     alt={title}
     width={this.props.iconHeight}
     height={this.props.iconHeight}
   />);
 }

 renderTingleIcon(icon, style = {}) {
   let className;
   if (this.props.type === 'more') {
     className = classnames(
       Context.prefixClass('tabs-bar-item-tingle-icon'),
       Context.prefixClass('tabs-bar-item-more-tingle-icon'),
     );
   } else if (this.props.type === 'center') {
     className = classnames(
       Context.prefixClass('tabs-bar-item-tingle-icon'),
       Context.prefixClass('tabs-bar-item-center-tingle-icon'),
     );
   } else {
     className = Context.prefixClass('tabs-bar-item-tingle-icon');
   }
   if (React.isValidElement(icon)) {
     return (React.cloneElement(
       icon,
       {
         width: this.props.iconHeight, height: this.props.iconHeight, className, style,
       },
     ));
   }
   return null;
 }

 render() {
   let iconElem;
   let className;
   const {
     active, title, iconStyle, activeIconStyle,
   } = this.props;
   const currentIconStyle = assign({}, iconStyle, active ? activeIconStyle : {});
   const currentIcon = active ? this.getActiveIcon() : this.getIcon();
   if (!currentIcon) {
     return null;
   }
   if (isUrl(currentIcon)) {
     iconElem = this.renderImgIcon(currentIcon, title, currentIconStyle);
   } else if (React.isValidElement(currentIcon)) {
     // TODO, DRY the code
     let IconClassName;
     if (this.props.type === 'more') {
       IconClassName = classnames(
         Context.prefixClass('tabs-bar-item-tingle-icon'),
         Context.prefixClass('tabs-bar-item-more-tingle-icon'),
       );
     } else if (this.props.type === 'center') {
       IconClassName = classnames(
         Context.prefixClass('tabs-bar-item-tingle-icon'),
         Context.prefixClass('tabs-bar-item-center-tingle-icon'),
       );
     } else {
       IconClassName = Context.prefixClass('tabs-bar-item-tingle-icon');
     }
     // icon 支持react element
     iconElem = React.cloneElement(currentIcon, {
       className: classnames(IconClassName, currentIcon.props.className),
       style: currentIconStyle,
       width: this.props.iconHeight,
       height: this.props.iconHeight,
     });
   } else {
     iconElem = this.renderTingleIcon(currentIcon, currentIconStyle);
   }

   if (this.props.type === 'more') {
     className = classnames(
       Context.prefixClass('tabs-bar-item-icon'),
       Context.prefixClass('tabs-bar-item-more-icon'),
     );
   } else {
     className = Context.prefixClass('tabs-bar-item-icon');
   }
   return (
     <div className={classnames(className, this.props.className)}>
       {iconElem}
     </div>
   );
 }
}

export default TabBarItemIcon;
