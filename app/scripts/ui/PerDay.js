React = require("react");
DateMoment = require("../common/dateMoment.js");

PerDay = React.createClass({
  componentDidMount: function() {
    var self = this,
      dateArray = [],
      maxArray = [],
      minArray = [];
    for(var i=0;i<this.props.forecastByDayPart1.length;i++){
      var thisdate = this.props.forecastByDayPart1[i].dt;
      var dayDate = '<div class="chart_xlabels"><span>' + DateMoment.getDateDay(thisdate) + '</span><br>' +
        '<span>周' + this.props.forecastByDayPart1[i].weekday + '</span><br>' +
        '<span class="wi ' + this.props.forecastByDayPart1[i].weather[0].icon + '"></span><br>' +
        '<span>' + this.props.forecastByDayPart1[i].weather[0].description + '</span></div>';
      dateArray.push(dayDate);
      maxArray.push(parseInt(this.props.forecastByDayPart1[i].temp.max - 273.15));
      minArray.push(parseInt(this.props.forecastByDayPart1[i].temp.min - 273.15));
    }
    $(self.refs.chart.getDOMNode()).highcharts({
      chart: {
        type: 'line',
        spacingLeft: 0,
        spacingRight: 0,
        spacingTop: 0,
        spacingBottom: 0,
        backgroundColor: '#1F8A70',
        borderColor: '#fff'
      },
      title: null,
      subtitle: null,
      xAxis: {
        categories: dateArray,
        labels: {
          useHTML: true
        },
        lineColor: '#fff'
      },
      yAxis: {
        showEmpty: true,
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        lineColor: '#fff'
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: 'max',
        data: maxArray,
        color:'#fff',
        dataLabels: {
          enabled: true,
          color: '#fff'
        }
      }, {
        name: 'min',
        data: minArray,
        color:'#fff',
        dataLabels: {
          enabled: true,
          color: '#fff'
        }
      }]
    })
  },
  render: function() {
    var last10day=[];
    for(var i=0;i<this.props.forecastByDayPart2.length;i++){
      var listIcon = 'wi ' + this.props.forecastByDayPart2[i].weather[0].icon;
      var listHtml = <li className="item row" key={i}>
              <span className="list_date col">
                {this.props.forecastByDayPart2[i].timedate}
                周{this.props.forecastByDayPart2[i].weekday}
              </span>
              <span className="list_weather col">
                <i className={listIcon}></i>
                {this.props.forecastByDayPart2[i].weather[0].description}
              </span>
              <span className="list_temp col">
                {parseInt(this.props.forecastByDayPart2[i].temp.max - 273.15)}<i className="wi wi-degrees"></i> ~ {parseInt(this.props.forecastByDayPart2[i].temp.min - 273.15)}<i className="wi wi-degrees"></i>
              </span>
      </li>
      last10day.push(listHtml);
    }
    return (
      <div className="perday_body">
        <h2>未来15天预报<span>(每天)</span></h2>
        <div ref="chart" style={{height:300}}></div>
        <ul className="perday_list list">
          {last10day}
        </ul>
      </div>
    );
  }
});

module.exports = PerDay;
