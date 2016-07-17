#!node
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _index = require('./src/comp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = _server2.default.renderToString(_react2.default.createElement(_index2.default, { title: "title" }));

console.log(result);