import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import Layout from './layout/Layout';

export default (props) => {
  // console.log(props);
  return (
    <DocumentTitle title="Not Found">
      <Layout {...props}>
        <h1>404 Not Found!</h1>
      </Layout>
    </DocumentTitle>
  );
}
