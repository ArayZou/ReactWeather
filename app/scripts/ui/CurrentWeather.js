React = require("react");

CurrentWeather = React.createClass({
  render: function() {
    var currentIconClassName = 'current_wi wi '+this.props.weather.weather[0].icon,
        currentTemp = parseInt(this.props.weather.main.temp - 273.15),
        currentMaxTemp = parseInt(this.props.forecastByDayPart1[0].temp.max - 273.15),
        currentMinTemp = parseInt(this.props.forecastByDayPart1[0].temp.min - 273.15);
    return (
      <div className="current_weather">
        <div className="current_info">
          <i className={currentIconClassName}></i>
          <p className="current_infoline">
            <span className="current_des">{this.props.weather.weather[0].description}</span>
            <span className="current_temp">{currentTemp}<i className="wi wi-degrees"></i></span></p>
        </div>
        <div className="current_maxminline">
          <i className="ion-ios-arrow-thin-up"></i><span className="current_maxtemp">{currentMaxTemp}<i className="wi wi-degrees"></i></span> ~ <span className="current_mintemp">{currentMinTemp}<i className="wi wi-degrees"></i><i className="ion-ios-arrow-thin-down"></i></span>
        </div>
        <div className="current_wind">
          <span className="current_windspeed">风力-{this.props.weather.wind.windinfo.level}</span>
          <span className="current_winddeg">风向-{this.props.weather.wind.deg}风</span>
          <span className="current_windlevel">风速{this.props.weather.wind.speed}mps</span>
        </div>
        <div className="current_windinfo">
          <span className="current_windname">{this.props.weather.wind.windinfo.windname}</span>
          <span className="current_windintro">{this.props.weather.wind.windinfo.windintro}</span>
        </div>
        <div className="current_moreline">
          <span className="current_humidity">湿度{this.props.weather.main.humidity}%</span>
          <span className="current_pressure">气压{this.props.weather.main.pressure}hPa</span>
        </div>
        <div className="current_suntime">
          <span className="current_sunrise">日出{this.props.weather.sys.sunrise}</span>
          <span className="current_sunset">日落{this.props.weather.sys.sunset}</span>
        </div>
      </div>
    );
  }
});

module.exports = CurrentWeather;
