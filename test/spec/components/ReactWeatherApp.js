'use strict';

describe('ReactWeatherApp', function () {
  var React = require('react/addons');
  var ReactWeatherApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactWeatherApp = require('components/ReactWeatherApp.js');
    component = React.createElement(ReactWeatherApp);
  });

  it('should create a new instance of ReactWeatherApp', function () {
    expect(component).toBeDefined();
  });
});
