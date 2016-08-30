const React = require('react');

const Label = React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired,
  },

  render() {
    const { children } = this.props;
    return (
      <label>
        { children }
      </label>
    );
  },
});

module.exports = Label;
