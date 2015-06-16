React = require("react");

Per3Hour = React.createClass({
  componentDidMount: function() {
    var self = this;
    self.iscrollWrap = new IScroll(self.refs.per3hour.getDOMNode(), {
      snap:false,
      scrollX: true,
      scrollY: false,
      mouseWheel: true,
      preventDefault: true
    });
  },
  render: function() {
    var per3HourList=[];
    for(var i=0;i<this.props.weather3Hour.list.length;i++){
      var listIcon = 'large-wi wi ' + this.props.weather3Hour.list[i].weather[0].icon;
      var listHtml = <li key={i}>
        {this.props.weather3Hour.list[i].timedate}<br/>
        {this.props.weather3Hour.list[i].timeclock}<br/>
        <i className={listIcon}></i><br/>
        {this.props.weather3Hour.list[i].weather[0].description}<br/>
        {parseInt(this.props.weather3Hour.list[i].main.temp - 273.15)}<i className="wi wi-degrees"></i>
      </li>
      per3HourList.push(listHtml);
    }
    return (
      <div className="per3hour_body">
        <h2>未来5天整点预报<span>(每3小时)</span></h2>
        <div ref="per3hour" className="per3hourwrapper">
          <div className="per3hourscroller" style={{width:this.props.weather3Hour.list.length * 50}}>
            <ul className="per3hourlist">
              {per3HourList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Per3Hour;
