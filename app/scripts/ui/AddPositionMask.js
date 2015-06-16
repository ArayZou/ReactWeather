React = require("react");

CurrentWeather = React.createClass({
  render: function() {
    return (
      <div className="view_mask">
        <div className="addpositon_form">
          <div className="form_title">添加当前位置(可自定义名称)</div>
          <div className="form_content">
            <label className="form_input item-input">
              <i className="icon ion-search placeholder-icon"></i>
              <input type="text" placeholder="添加当前位置名称" ng-model="currentPosition.name" />
            </label>
          </div>
          <div className="button-bar">
            <a className="button button-block button-light" ng-click="showAddPositionFromFn()">取消</a>
            <a className="button button-block button-positive" ng-click="submitAddPosition()">添加</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CurrentWeather;
