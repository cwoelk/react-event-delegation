const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./App');
const OuterComponent = require('./OuterComponent');

ReactDOM.render(
  <App>
    <OuterComponent />
  </App>,
  document.getElementById('main')
);
