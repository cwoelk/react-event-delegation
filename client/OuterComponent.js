const React = require('react');

const Label = require('./Label');
const Input = require('./Input');

const OuterComponent = React.createClass({
  getInitialState() {
    return { hasInputFocus: false };
  },

  focusHandler(ev) {
    // This check can be implemented better
    if (ev.target.nodeName === 'INPUT') {
      console.log(`Having ${ev.type} on input`);
      this.setState({ hasInputFocus: ev.type === 'focus' });
    }
  },

  render() {
    const className = this.state.hasInputFocus
      ? 'outerComponent inputFocussed'
      : 'outerComponent';

    return (
      <div
        onBlur={this.focusHandler}
        onFocus={this.focusHandler}
        className={className}>
        <Label>
          <Input />
        </Label>
      </div>
    );
  },
});

module.exports = OuterComponent;
