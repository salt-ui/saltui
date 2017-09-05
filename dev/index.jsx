
import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import App from './App';
import Button from '../demo/Button/';

class Demo extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/button" component={Button} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
