import react, { Component } from 'React'
import PropTypes from 'prop-types'
import { HBox, Box } from 'salt-boxs';
import Icon from 'salt-icon'
import classnames from 'classnames'
import Panel from './Panel'
import Popup from 'salt-popup'
import React from "react";

class HeaderBar extends Component{
  static displayName = 'FilterHeader';

  static defaultProps = {
    activeIndex: {
      type: PropTypes.number,
      default: 0
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex || 0
    }
  }

  changeActive(index) {
    this.setState({
      activeIndex: this.state.activeIndex === index ? -1 : index
    })
  }

  onClosePanel = (e) => {
    this.setState({
      activeIndex: -1
    })
  }

  render() {
    const { activeIndex } = this.state;
    const { options } = this.props;
    return (
      <div>
        <HBox className={'wrapper'}>
          {options.map((item, index) => {
            return (
              <Box className={classnames({box: true})} flex={1} hAlign={'center'} key={item.key} onClick={() => {this.changeActive(index)} }>
                <span className={classnames({active: activeIndex === index})}>
                  {typeof item.title === 'string' ? item.title : item.title()}
                </span>
                {
                  item.icon !== false ? <Icon fill={ activeIndex === index ? '#ff6f00' : '#000' } name={item.icon || (activeIndex === index ? 'angle-up' : 'angle-down')} className={'icon'} /> : null
                }
              </Box>
            )
          })}
        </HBox>
        <Panel {...options[activeIndex]} onClose={this.onClosePanel} />
      </div>
    )
  }
}

export default HeaderBar;