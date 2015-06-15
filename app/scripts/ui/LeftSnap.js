React = require("react");

LeftSnap = React.createClass({
  render: function() {
    return (
      <div className='snap-drawer snap-drawer-left leftslider_wrap'>
        <div className="leftslider">
          <div className="list leftslider_list">
            <a href="javascript:;" className="item">当前位置</a>
            <a href="javascript:;" className="item">添加当前位置</a>
          </div>
          <p className="bottom_editor">作者:ArayZou<br/>你若安好，便是晴天<br/>项目源码：github.com/ArayZou/ArayDeWeather</p>
        </div>
      </div>
    );
  }
});

module.exports = LeftSnap;
