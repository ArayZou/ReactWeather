React = require("react");

CurrentWeather = require("../ui/CurrentWeather.js");
Per3Hour = require("../ui/Per3Hour.js");
PerDay = require("../ui/PerDay.js");

WeatherWrap = React.createClass({
  componentDidMount: function() {
    var self = this;
    self.snapper = new Snap({
      element: self.refs.snapContent.getDOMNode(),
      disable: 'right',
      touchToDrag: false
    });
    self.iscrollWrap = new IScroll(self.refs.iscrollWrap.getDOMNode(), {
      snap:false,
      probeType: 2,
      momentum: true,
      click:true,
      startY:0,
      deceleration:0.0005
    });
  },
  openLeftSnap: function(){
    var self = this;
    var snapState = self.snapper.state() ? self.snapper.state().state:null;
    if(snapState==='closed'){
      self.snapper.open('left');
    }else if(snapState==='left'){
      self.snapper.close();
    }
  },
  showAddPositionFrom:function(){
    var self = this;
    self.snapper.close();
    self.props.showAddPositionFromFn();
  },
  deletePosition: function(e){
    var positionName = $(e.currentTarget).attr('data-name');
    this.props.removePositionArray(positionName);
  },
  render: function() {
    var positionList=[];
    for(var i=0;i<this.props.positionArray.length;i++){
      var listHtml = <div className="item position_item" key={i}>
        <a className="link" href="javascript:;" data-lat={this.props.positionArray[i].lat} data-lon={this.props.positionArray[i].lon} data-name={this.props.positionArray[i].name} onClick={this.positionJump}>{this.props.positionArray[i].name}</a>
        <span className="delete" data-name={this.props.positionArray[i].name} onClick={this.deletePosition}><i className="ion-ios-minus-outline"></i></span>
      </div>;
      positionList.push(listHtml);
    }
    return (
      <div className="wrap">
        <div className='snap-drawer snap-drawer-left leftslider_wrap'>
          <div className="leftslider">
            <div className="list leftslider_list">
              <a href="javascript:;" className="item">当前位置</a>
              {positionList}
              <a href="javascript:;" className="item" onClick={this.showAddPositionFrom}>添加当前位置</a>
            </div>
            <p className="bottom_editor">作者:ArayZou<br/>你若安好，便是晴天<br/>项目源码：github.com/ArayZou/ArayDeWeather</p>
          </div>
        </div>
        <div className="snap-content weather_wrap" ref="snapContent">
          <div className="weather_main" ref="iscrollWrap">
            <div className="weather_content">
              <div className="pullrefresh">下拉刷新</div>
              <div className="weather_header bar bar-header">
                <a className="leftslider_btn icon ion-navicon button button-outline button-light" onClick={this.openLeftSnap}></a>
                <h1 className="title">{this.props.currentPositionName}</h1>
                <a className="button button-clear button-light icon ion-ios-plus-outline" onClick={this.showAddPositionFrom}></a>
              </div>
              <CurrentWeather weather={this.props.weather} forecastByDayPart1={this.props.forecastByDayPart1} />
              <Per3Hour weather3Hour={this.props.weather3Hour} />
              <PerDay forecastByDayPart1={this.props.forecastByDayPart1} forecastByDayPart2={this.props.forecastByDayPart2} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = WeatherWrap;
