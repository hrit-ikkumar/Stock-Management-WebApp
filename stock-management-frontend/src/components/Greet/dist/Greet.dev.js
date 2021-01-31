"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Greet = function Greet() {
  /*
  <div id="greet-conent" className=""> <h1></h1> </div>
  */
  return _react["default"].createElement('div', {
    id: 'greet-content',
    className: 'greet-collection'
  }, _react["default"].createElement('h1', {
    id: 'greet-heading',
    className: 'greet-collection-heading'
  }, 'Welcome to our main page!'));
};

var _default = Greet;
exports["default"] = _default;