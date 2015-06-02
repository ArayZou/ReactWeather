'use strict';

var ReactWeatherApp = require('./ReactWeatherApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={ReactWeatherApp}>
    <Route name="/" handler={ReactWeatherApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
