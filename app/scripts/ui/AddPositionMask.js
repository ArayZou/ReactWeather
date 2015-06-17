React = require("react");

AddPositionMask = React.createClass({
  showAddPositionFrom: function(){
    this.props.showAddPositionFromFn();
  },
  submitAddPosition: function(){
    var position = this.refs.positioninput.getDOMNode().value;
    this.props.addPositionArray(position);
  },
  render: function() {
    return (
      <div className="view_mask">
        <div className="addpositon_form">
          <div className="form_title">添加当前位置(可自定义名称)</div>
          <div className="form_content">
            <label className="form_input item-input">
              <i className="icon ion-search placeholder-icon"></i>
              <input ref="positioninput" type="text" placeholder="添加当前位置名称" />
            </label>
          </div>
          <div className="button-bar">
            <a className="button button-block button-light" onClick={this.showAddPositionFrom}>取消</a>
            <a className="button button-block button-positive" onClick={this.submitAddPosition}>添加</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddPositionMask;
