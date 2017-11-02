import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import App from './App';
import SelectFieldDemo from '../demo/SelectField/';
// import '../build/salt-ui.css';
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
          <Route path="/select-field" component={SelectFieldDemo} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('TingleDemo'));
