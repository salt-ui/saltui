import react, { Component } from 'react';
import Icon from "salt-icon";
import Grid from 'salt-grid'
import Picker from 'salt-picker'
import Popup from 'salt-popup'
import deepCopy from 'lodash/cloneDeep';


class Panel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }
  onItemClick = (e) => {
    const value = e.target.getAttribute('data-value')
    if (value) {
      console.log(value)
    }
  };

  renderPanel(props) {
    const { type, items, onSelect, children, onClose, tip, maxLine } = props
    switch(type) {
      case 'list':
        return (
          items.map((item) => {
            return (
              <div key={item.value} className={'list-item'} data-value={item.value} data-text={item.text}>
                {item.text}
              </div>
            )
          })
        );
      case 'action':
        onSelect && onSelect(props);
        return null;
      case 'grid':
        const max = maxLine || 4
        let renderItems
        if (items.length > 3 * (max) ) {
          renderItems = deepCopy(items);
          renderItems.length = 3 * max - 1;
          renderItems.push({
            value: 'showAll',
            text: () => {
              return (
                <span>全部 ></span>
              )
            },
          });
        } else {
          renderItems = items
        }
        return (
          <div>
            { tip ? <p>{tip}</p> : null }
            <Grid col={3}>
              {renderItems.map(item => {
                return (
                  <div key={item.value} data-value={item.value} data-text={typeof item.text === 'string' ? item.text : ''} className={'grid-item'}>
                    {typeof item.text === 'string' ? item.text : item.text()}
                  </div>
                )
              })}
            </Grid>
          </div>
        );
      case 'super':
        return (
          <Popup
            stopBodyScrolling
            content={
              <div className={'super-filter-container'} onClick={this.onItemClick}
              >
                {children.map(item => {
                  if (item.type === 'list') {
                    return null;
                  }
                  item.tip = item.title;
                  return (
                    <div key={item.key}>
                      {this.renderPanel(item)}
                    </div>
                  )
                })}
              </div>
            }
            animationType="slide-left"
            onMaskClick={() => { this.setState({ visible: false }); onClose && onClose() }}
            visible={this.state.visible}
          >
            {null}
          </Popup>
        )
      default:
        return null;
    }
  }

  render() {
    return (
      <div onClick={this.onItemClick}>
        {
          this.renderPanel(this.props)
        }
      </div>
    )
  }
}

export default Panel