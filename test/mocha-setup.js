global.requireNoCache = function(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
};

global.React = require('react');
global.ReactDOM = require('react-dom');
global.TestUtils = require('react-addons-test-utils');
require('../public/js/common/rubix-bootstrap/rubix-bootstrap-test.js');

global.renderComponent = function(component) {
  return ReactDOM.findDOMNode(TestUtils.renderIntoDocument(component));
};
