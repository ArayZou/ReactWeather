React = window.React = require("react");

WeatherWrap = require("./ui/WeatherWrap.js");

Wrap = React.createClass({
  getInitialState: function() {
    var installed = navigator.standalone;
    return {
      installed: installed,
      webapp: false
    };
  },
  openWebApp: function(){
    var installed = navigator.standalone;
    this.setState({
      installed: installed,
      webapp: true
    });
  },
  render: function() {
    if(this.state.installed){
      return (
        <div className="wrap">
          <div className="iosheader"></div>
          <WeatherWrap />
        </div>
      )
    }else if(this.state.webapp) {
      return (
        <WeatherWrap />
      )
    }else{
      return(
        <div className="install_wrap">
          <div className="install_intro">
            <p className="intro_text">IOS用户请在Safari中打开并将本应用添加到主屏幕以获得最佳体验效果</p>
            <a className="button button-energized" href="javascript:;" onClick={this.openWebApp}>我就要这么打开</a>
          </div>
        </div>
      )
    }
  }
});

React.render(React.createElement(Wrap), document.getElementById("wrap"));
