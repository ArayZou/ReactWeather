React = require("react");

WeatherWrap = React.createClass({
  getInitialState: function() {
    return {
      secondsElapsed: 0
    };
  },
  tick: function() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    });
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return <div className="wrap">Seconds Elapsed: {this.state.secondsElapsed}</div>;
  }
});

module.exports = WeatherWrap;
