React = window.React = require("react");

DateMoment = require("./common/dateMoment.js");
LocalStorage = require("./common/localStorage.js");
WeatherIcon = require("./common/weatherIcon.js");
WeatherWindDeg = require("./common/weatherWindDeg.js");
WeatherWindLevel = require("./common/weatherWindLevel.js");

Wrap = React.createClass({
  getInitialState: function() {
    var installed = navigator.standalone;
    return {
      installed: installed,
      webapp: false,
      showloading : true,
      showWeather : false,
      weatherDateComplete:false,
      weather3HourDateComplete:false,
      forecastByDayDateComplete:false
    }
  },
  componentDidMount: function() {
    var self = this;
    //安卓跳过判断
    if (/android/.test(navigator.userAgent.toLowerCase())) {
      self.setState({
        webapp:true
      });
      self.getLocation();
    }
  },
  componentWillUnmount: function() {

  },
  getLocation: function(){
    if (window.navigator.geolocation) {
      console.log('geolocation');
      window.navigator.geolocation.getCurrentPosition(this.showPosition);
    } else{
      console.log('geolocation error');
    }
  },
  showPosition: function(position){
    var lat = position.coords.latitude,
      lon = position.coords.longitude;
    this.lat = lat;
    this.lon = lon;
    console.log('lat:'+lat);
    console.log('lon:'+lon);
    //地理数据
    this.httpCurrentPosition(lat,lon);
    this.httpCurrentWeather(lat,lon);
    this.httpForecast3hour(lat,lon);
    this.httpForecast16day(lat,lon);
  },
  //位置名
  httpCurrentPosition: function(lat,lon){
    var self = this;
    $.getJSON('http://api.map.baidu.com/geocoder/v2/?ak=izzcWKDNO77b3VodC1ipezPh&callback=?&location='+lat+','+lon+'&output=json&pois=1',function(location){
      console.log(location);
      self.location = location.result;
      self.currentPositionName = location.result.addressComponent.city;
    });
  },
  //当天天气数据
  httpCurrentWeather:function(lat,lon){
    var self = this;
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&lang=zh_cn&APPID=ed158d368307ef2644fe349ffa6a50d4'
    }).success(function(weather){
      if(weather.cod===200){
        console.log(weather);
        //计算风向
        weather.wind.deg = WeatherWindDeg(weather.wind.deg);
        //计算风力
        weather.wind.windinfo = WeatherWindLevel(weather.wind.speed);
        //天气icon转换
        weather.weather[0].icon = WeatherIcon(weather.weather[0].id);
        //日出日落转换
        weather.sys.sunrise = DateMoment.getDateClock(weather.sys.sunrise);
        weather.sys.sunset = DateMoment.getDateClock(weather.sys.sunset);

        self.weather = weather;
        self.weatherDateComplete = true;
        //数据处理完成
        self.checkDateComplete();
      }
    }).error(function(){
      httpCurrentWeather(lat,lon)
    });
  },
  //5天每3小时天气数据
  httpForecast3hour:function(lat,lon){
    var self = this;
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&lang=zh_cn&APPID=ed158d368307ef2644fe349ffa6a50d4'
    }).success(function (weather3Hour) {
      if (weather3Hour.cod === '200') {
        for (var i = 0; i < weather3Hour.list.length; i++) {
          var thisdate = weather3Hour.list[i].dt;
          weather3Hour.list[i].timedate = DateMoment.getDateDay(thisdate);
          weather3Hour.list[i].timeclock = DateMoment.getDateClock(thisdate);
          weather3Hour.list[i].weekday = DateMoment.getWeekDay(thisdate);
          weather3Hour.list[i].weather[0].icon = WeatherIcon(weather3Hour.list[i].weather[0].id);
        }

        console.log(weather3Hour);
        self.weather3Hour = weather3Hour;
        self.weather3HourDateComplete = true;
        //数据处理完成
        self.checkDateComplete();
      }
    }).error(function () {
      httpForecast3hour(lat,lon)
    });
  },
  //16天天气预报数据
  httpForecast16day:function(lat,lon) {
    var self = this;
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&lang=zh_cn&cnt=16&mode=json&APPID=ed158d368307ef2644fe349ffa6a50d4'
    }).success(function (forecastByDay) {
      if (forecastByDay.cod === '200') {
        console.log(forecastByDay);
        var forecastByDay = forecastByDay,
          dateArray = [],
          maxArray = [],
          minArray = [],
          forecastByDayPart1 = [],
          forecastByDayPart2 = [];
        for (var i = 0; i < 15; i++) {
          if (forecastByDay.list[i]) {
            var thisdate = forecastByDay.list[i].dt;
            forecastByDay.list[i].timedate = DateMoment.getDateDay(thisdate);
            forecastByDay.list[i].weekday = DateMoment.getWeekDay(thisdate);
            forecastByDay.list[i].weather[0].icon = WeatherIcon(forecastByDay.list[i].weather[0].id);
            if (i < 7) {
              var dayDate = '<div class="chart_xlabels"><span>' + DateMoment.getDateDay(thisdate) + '</span><br>' +
                '<span>周' + forecastByDay.list[i].weekday + '</span><br>' +
                '<span class="wi ' + forecastByDay.list[i].weather[0].icon + '"></span><br>' +
                '<span>' + forecastByDay.list[i].weather[0].description + '</span></div>';
              dateArray.push(dayDate);
              maxArray.push(parseInt(forecastByDay.list[i].temp.max - 273.15));
              minArray.push(parseInt(forecastByDay.list[i].temp.min - 273.15));
              forecastByDayPart1.push(forecastByDay.list[i]);
            } else {
              forecastByDayPart2.push(forecastByDay.list[i]);
            }
          }
        }

        self.forecastByDay = forecastByDay;
        self.forecastByDayPart1 = forecastByDayPart1;
        self.forecastByDayPart2 = forecastByDayPart2;
        self.forecastByDayDateComplete = true;
        //数据处理完成
        self.checkDateComplete();
      }
    }).error(function () {
      httpForecast16day(lat,lon);
    });
  },
  // 检查参数完整显示页面
  checkDateComplete:function(){
    var self = this;
    if(self.weatherDateComplete && self.weather3HourDateComplete && self.forecastByDayDateComplete){
      self.setState({
        //渲染内容
        showloading : false,
        //显示内容
        showWeather : true,
        ifRefresh : false,
        showMaskLoadding : false
      });

      var x = new Date();
      console.log('加载完成:'+x);
    }
  },
  openWebApp: function(){
    var self = this;
    self.setState({
      webapp: true
    });
    self.getLocation();
  },
  render: function() {
    var loadingHtml;
    loadingHtml = this.state.showloading?<div className="loading"><div className="spinner"></div></div>:null;
    var wrapHtml = <div className="wrap">
      {loadingHtml}
      <div className="leftslider_wrap">
        <div className="leftslider">
          <p className="bottom_editor">作者:ArayZou<br/>你若安好，便是晴天<br/>项目源码：github.com/ArayZou/ArayDeWeather</p>
        </div>
      </div>
      <div className="weather_wrap">
        <div className="weather_content">
          <div className="pullrefresh">下拉刷新</div>
          <div className="weather_header bar bar-header">
            <a className="leftslider_btn icon ion-navicon button button-outline button-light"></a>
            <h1 className="title">城市</h1>
            <a className="button button-clear button-light icon ion-ios-plus-outline"></a>
          </div>
        </div>
      </div>
    </div>;
    if(this.state.installed){
      return (
        <div className="wrap">
          <div className="iosheader"></div>
          {wrapHtml}
        </div>
      )
    }else if(this.state.webapp) {
      var x = new Date();
      console.log('渲染:'+x);
      return (
        <div className="wrap">
          {wrapHtml}
        </div>
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
