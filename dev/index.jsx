
import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import App from './App';
import ButtonDemo from '../demo/Button/';
// TODO: lazyload
// import Bundle from './Bundle';
// import loadButton from 'bundle-loader?lazy!../demo/Button/';

// const ButtonDemo = props => (
//   <Bundle load={loadButton}>
//     {Button => <Button {...props} />}
//   </Bundle>
// );

class Demo extends React.Component {
  // TODO: lazyload
  // componentDidMount() {
  //   loadButton(() => {});
  // }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/button" component={ButtonDemo} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
