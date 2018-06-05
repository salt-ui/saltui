import TagField from 'salt-tag-field';
import React from 'react';

const { Item } = TagField;

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['用户体验', '精品打造', '精益求精', '用户体验', '精品打造', '精益求精'],
    };
  }

  handleAdd = (tag) => {
    this.setState({
      list: [tag].concat(this.state.list),
    });
  }

  handleDelete = (tag) => {
    this.setState({
      list: this.state.list.filter(key => key !== tag),
    });
  }

  render() {
    return (
      <TagField label="标签" tip="这是一句描述，这是一句描述，这是一句描述" onAdd={this.handleAdd}>
        {this.state.list.map((key, index) => (
          <Item tag={key} key={index} canDelete onDelete={this.handleDelete}>{key}</Item>
        ))}
      </TagField>
    );
  }
}

