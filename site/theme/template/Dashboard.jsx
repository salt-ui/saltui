import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Layout from './layout/Layout';
import Card from './layout/Card';
import CardWrap from './layout/CardWrap';
import classnames from 'classnames';

const COMPONENT_NAME_REG = /^(?:uxcore-)?((\w).*)$/;
const DEFAULT_IMAGE_SRC = '//img.alicdn.com/tps/TB1QBvyOXXXXXcMXXXXXXXXXXXX-256-256.png';

export default class Dashboard extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCardContent(name) {
    let mc = name.match(COMPONENT_NAME_REG);
    let letter = mc[2].toUpperCase();
    let displayName = mc[1].toUpperCase();
    return (
      <Card key={name} className="ds-item">
        <Link to={`/components/${name}`}>
          <img className="cover default-cover" src={DEFAULT_IMAGE_SRC} />
          <em className="ds-item-title">{letter}</em>
          <span className="ds-item-name" title={displayName}>{displayName}</span>
        </Link>
      </Card>
    );
  }

  render() {
    console.log('dashboard', this.props);
    const { pageData } = this.props;
    console.log(pageData);
    return (
      <DocumentTitle title={`Dashboard - Component`}>
        <CardWrap className="ds-wrap" width={200} extendable={false}>
          {
            Object.keys(pageData.components).map(this.renderCardContent)
          }
        </CardWrap>
      </DocumentTitle>
    );
  }
}
