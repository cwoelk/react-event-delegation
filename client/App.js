const React = require('react');

const App = React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired,
  },

  render() {
    const { children } = this.props;
    return (
      <div className="app">
        <div className="content">
          { children }
        </div>
      </div>
    );
  },
});

module.exports = App;
