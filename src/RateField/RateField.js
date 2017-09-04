/**
 * RateField Component for tingle
 * @author yuguo.qyg
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
import React from 'react';
import classnames from 'classnames';
import Context from '@ali/tingle-context';
import Field from '@ali/tingle-field';
import Group from '@ali/tingle-group';
import Rate from '@ali/tingle-rate';

let prefixClass = Context.prefixClass;
class RateField extends React.Component {
    constructor(props) {
          super(props);
          this.state = {
              score: props.value
          }
    }
  static propTypes = {
    className: React.PropTypes.string,
  };

  static defaultProps = {};

  static displayName = 'RateField';

  handleChange(label, score) {
        this.setState({ 
            [label]: score,
        });
    }
  render() {
    const t = this;
    return (
        <Field showLabel={t.props.showLabel} layout={t.props.layout} label={t.props.label} className={classnames(Context.prefixClass('rate-field'), t.props.className)}>
            <div>
                <Group.List>
                    <Rate total={t.props.total} width={18} gap={7} value={t.state.score} size={t.props.size} showTip={t.props.showTip} scoreTips={t.props.scoreTips} onChange={t.handleChange.bind(t, 'score')} />
                </Group.List>
            </div>
        </Field>
        
    );
  }
}

export default RateField;
